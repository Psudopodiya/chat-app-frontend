import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send } from "lucide-react";
import { createWebSocket } from "@/service/chatApi";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

interface Message {
  message: string;
  user: string;
  profile_image_url: string;
}
interface ChatWindowProps {
  selectedRoom: string;
}

export default function ChatWindow({ selectedRoom }: ChatWindowProps) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const wsRef = useRef<WebSocket | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedRoom && user) {
      const token = localStorage.getItem("access_token");
      if (!token) return;

      wsRef.current = createWebSocket(selectedRoom, token);

      wsRef.current.onopen = () => {
        console.log("WebSocket connection established");
      };

      wsRef.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("Data", data);
        setMessages((prev) => [
          ...prev,
          {
            message: data.message,
            user: data.username,
            profile_image_url: data.profile_image_url,
          },
        ]);
      };

      wsRef.current.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      wsRef.current.onclose = (event) => {
        console.log("WebSocket connection closed:", event);
      };

      return () => {
        if (wsRef.current) {
          wsRef.current.close();
        }
      };
    }
  }, [selectedRoom, user]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(
        JSON.stringify({
          message: newMessage,
        })
      );
      setNewMessage("");
    }
  };

  if (!selectedRoom) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-500">
            Select a chat to start messaging
          </h2>
        </div>
      </div>
    );
  }

  console.log("Messages", messages);

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Room: {selectedRoom}</h2>
      </div>
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        {messages.map((message, index) => {
          const isCurrentUser = message.user === user?.username;
          return (
            <div
              key={index}
              className={`mb-4 flex items-end ${
                isCurrentUser ? "flex-row-reverse" : "flex-row"
              }`}
            >
              {!isCurrentUser && (
                <Avatar className="rounded-full border h-10 w-10">
                  <AvatarImage
                    src={message.profile_image_url}
                    alt={`${user}'s avatar`}
                    className="object-cover"
                  />
                  <AvatarFallback>
                    {message.user.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-[70%] p-3 rounded-2xl ${
                  isCurrentUser
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-800 rounded-bl-none"
                } shadow-sm border border-gray-200`}
              >
                <p className="text-sm">{message.message}</p>
              </div>
            </div>
          );
        })}
      </ScrollArea>
      <form onSubmit={handleSendMessage} className="p-4 border-t flex">
        <Input
          type="text"
          placeholder="Type a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 mr-2"
        />
        <Button type="submit">
          <Send className="h-5 w-5" />
        </Button>
      </form>
    </div>
  );
}
