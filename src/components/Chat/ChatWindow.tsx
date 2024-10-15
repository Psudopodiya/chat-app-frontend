import { Clock, MessageCircle, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Input,
  ScrollArea,
} from "@/components/ui";
import { useAuth } from "@/context/AuthContext";
import { createWebSocket } from "@/service/chatApi";
import { Message } from "@/types/types";
import { formatTime, groupMessagesByDate } from "@/utils/utils";

interface ChatWindowProps {
  selectedRoom: number;
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
        if (data.type === "chat_history") {
          setMessages(data.messages);
        } else {
          setMessages((prev) => [
            ...prev,
            {
              message: data.message,
              user: data.username,
              profile_image_url: data.profile_image_url,
              timestamp: data.timestamp,
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
        }),
      );
      setNewMessage("");
    }
  };

  if (!selectedRoom) {
    return (
      <div className="flex flex-1 items-center justify-center bg-[#f2e8cf]">
        <div className="text-center">
          <MessageCircle className="mx-auto mb-4 h-16 w-16 text-[#1c3f39]" />
          <h2 className="text-xl font-semibold text-[#1c3f39]">
            Select a chat to start messaging
          </h2>
        </div>
      </div>
    );
  }

  const groupedMessages = groupMessagesByDate(messages);

  return (
    <div className="flex max-h-full flex-1 flex-col overflow-hidden bg-[#f2e8cf]">
      <div className="border-b border-[#1c3f39] p-4">
        <h2 className="text-xl font-semibold text-[#1c3f39]">
          Room: {selectedRoom}
        </h2>
      </div>
      <ScrollArea className="flex-1 overflow-y-auto p-4">
        <div className="pb-16">
          {Object.entries(groupedMessages).map(([date, dateMessages]) => (
            <div key={date}>
              <div className="my-4 flex justify-center">
                <span className="rounded-full border border-[#1c3f39] px-4 text-sm tracking-wider text-[#1c3f39]">
                  {date}
                </span>
              </div>
              {dateMessages.map((message, index) => {
                const isCurrentUser = message.user === user?.username;
                return (
                  <div
                    key={index}
                    className={`mb-4 flex items-end gap-2 ${
                      isCurrentUser ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    {!isCurrentUser && (
                      <Avatar className="h-10 w-10 border-2 border-[#1c3f39]">
                        <AvatarImage
                          src={message.profile_image_url}
                          alt={`${message.user}'s avatar`}
                          className="object-cover"
                        />
                        <AvatarFallback className="rounded-none bg-[#c2b280] uppercase tracking-wider text-[#1c3f39]">
                          {message.user.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    )}

                    <div
                      className={`max-w-[70%] rounded-none px-4 py-2 ${
                        isCurrentUser
                          ? "ml-2 bg-[#e8e0c5] text-[#1c3f39]"
                          : "mr-2 bg-[#c2b280] text-[#1c3f39]"
                      } border-2 border-[#1c3f39] shadow-[4px_4px_0_0_#1c3f39]`}
                    >
                      {!isCurrentUser ? (
                        <div className="flex items-center justify-between">
                          <p className="mb-1 text-sm font-bold uppercase tracking-wider text-[#1c3f39]">
                            {message.user.toUpperCase()}
                          </p>

                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-[#1c3f39]" />
                            <p className="text-xs text-[#5d5a4c]">
                              {formatTime(message.timestamp)}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-end gap-1">
                          <Clock className="h-3 w-3 text-[#1c3f39]" />
                          <p className="text-xs text-[#5d5a4c]">
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      )}

                      <p className="text-sm">{message.message}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </ScrollArea>
      <form
        onSubmit={handleSendMessage}
        className="flex border-t border-[#1c3f39] p-4"
      >
        <Input
          type="text"
          placeholder="Type a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="mr-2 flex-1 border-2 border-[#1c3f39] bg-[#f2e8cf] text-[#1c3f39] placeholder-[#1c3f39] focus:border-[#1c3f39] focus:ring-[#1c3f39]"
        />
        <Button
          type="submit"
          className="bg-[#1c3f39] text-[#f2e8cf] transition-colors hover:bg-[#3a4f5a]"
          disabled={!newMessage.trim()}
        >
          <Send className="h-5 w-5" />
        </Button>
      </form>
    </div>
  );
}
