import { Message } from "@/types/types";

export const groupMessagesByDate = (messages: Message[]) => {
  const groups: { [key: string]: Message[] } = {};
  messages.forEach((message) => {
    const date = new Date(message.timestamp).toLocaleDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
  });
  return groups;
};

export const formatTime = (timestamp: string) => {
  return new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};
