import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send } from "lucide-react";
import { createWebSocket } from "@/service/chatApi";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

  useEffect(() => {
    if (selectedRoom && user) {
      const token = localStorage.getItem("access_token");
      if (!token) return;

      wsRef.current = createWebSocket(selectedRoom, token);

      wsRef.current.onopen = () => {
        console.log("WebSocket connection established");
        setMessages([]);
      };

      wsRef.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("Received message:", data);
        if (data.type === "chat_history") {
          setMessages(data.messages);
        } else {
          setMessages((prev) => [
            ...prev,
            {
              message: data.message,
              user: data.username,
              profile_image_url: data.profile_image_url,
            },
          ]);
        }
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
      <div className="flex-1 flex items-center justify-center bg-[#f2e8cf]">
        <div className="text-center">
          <MessageCircle className="h-16 w-16 text-[#2f3e46] mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-[#2f3e46]">
            Select a chat to start messaging
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-[#f2e8cf] max-h-full overflow-hidden">
      <div className="p-4 border-b border-[#2f3e46]">
        <h2 className="text-xl font-semibold text-[#2f3e46]">
          Room: {selectedRoom}
        </h2>
      </div>
      <ScrollArea className="flex-1 p-4">
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
                <Avatar className="h-10 w-10 border-2 border-[#2f3e46]">
                  <AvatarImage
                    src={message.profile_image_url}
                    alt={`${message.user}'s avatar`}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-[#d9c8a0] text-[#2f3e46] font-semibold">
                    {message.user.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              )}
              {!isCurrentUser ? (
                <div
                  className={`max-w-[70%] p-1 rounded-2xl ${
                    isCurrentUser
                      ? "bg-[#2f3e46] text-[#f2e8cf] rounded-br-none"
                      : "bg-[#d9c8a0] text-[#2f3e46] rounded-bl-none"
                  } shadow-md border-2 border-[#2f3e46] ml-2 mr-2`}
                >
                  <p className="text-xs mb-1 text-gray-500 text-center">
                    {message.user}
                  </p>
                  <p className="text-sm px-2 py-1 rounded-xl bg-[#b09c6c]">
                    {message.message}
                  </p>
                </div>
              ) : (
                <div
                  className={`max-w-[70%] p-1 rounded-2xl ${
                    isCurrentUser
                      ? "bg-[#2f3e46] text-[#f2e8cf] rounded-br-none"
                      : "bg-[#d9c8a0] text-[#2f3e46] rounded-bl-none"
                  } shadow-md border-2 border-[#2f3e46] ml-2 mr-2`}
                >
                  <p className="text-sm">{message.message}</p>
                </div>
              )}
            </div>
          );
        })}
      </ScrollArea>
      <form
        onSubmit={handleSendMessage}
        className="p-4 border-t border-[#2f3e46] flex"
      >
        <Input
          type="text"
          placeholder="Type a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 mr-2 bg-[#f2e8cf] border-2 border-[#2f3e46] text-[#2f3e46] placeholder-[#2f3e46] focus:ring-[#2f3e46] focus:border-[#2f3e46]"
        />
        <Button
          type="submit"
          className="bg-[#2f3e46] text-[#f2e8cf] hover:bg-[#3a4f5a] transition-colors"
          disabled={!newMessage.trim()}
        >
          <Send className="h-5 w-5" />
        </Button>
      </form>
    </div>
  );
}
