import { MessageSquare, Users } from "lucide-react";

import CreateRoom from "./CreateRoom";

import { ScrollArea } from "@/components/ui";
import { Room } from "@/types/types";

interface ChatRoomProps {
  selectedRoom: number;
  setSelectedRoom: (roomId: number) => void;
  chatRooms: Room[];
}

export default function ChatRoom({
  selectedRoom,
  setSelectedRoom,
  chatRooms,
}: ChatRoomProps) {
  return (
    <div className="w-full md:w-1/3 bg-[#f2e8cf] border-r border-[#1c3f39]">
      <div className="p-4 border-b border-[#1c3f39] flex justify-between items-center">
        <h2 className="text-xl font-semibold text-[#1c3f39] flex items-center">
          <Users size={24} className="mr-2" />
          Chat Rooms
        </h2>
        <CreateRoom />
      </div>
      <ScrollArea className="h-[calc(100vh-73px)]">
        {chatRooms.map((room) => (
          <div
            key={room.id}
            className={`p-4 border-b border-[#1c3f39] cursor-pointer hover:bg-[#e6d7b8] transition-colors ${
              selectedRoom === room.id ? "bg-[#d9c8a0]" : ""
            }`}
            onClick={() => setSelectedRoom(room.id)}
          >
            <div className="flex items-center">
              <MessageSquare size={20} className="mr-3 text-[#1c3f39]" />
              <h3 className="text-sm font-medium text-[#1c3f39]">
                {room.title.replaceAll("_", " ")}
              </h3>
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}
