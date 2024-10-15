import { MessageSquare, Users } from "lucide-react";

import CreateRoom from "./CreateRoomModal";

import { ScrollArea } from "@/components/ui";
import { Room } from "@/types/types";

interface RoomListProps {
  selectedRoom: number;
  setSelectedRoom: (roomId: number) => void;
  chatRooms: Room[];
}

export default function RoomList({
  selectedRoom,
  setSelectedRoom,
  chatRooms,
}: RoomListProps) {
  return (
    <div className="w-full md:w-1/3 bg-[#f2e8cf] border-r border-[#1c3f39]">
      <div className="p-4 border-b border-[#1c3f39] flex justify-between items-center">
        <h2 className="text-xl font-semibold text-[#1c3f39] flex items-center">
          <Users size={24} className="mr-2" />
          Chat Rooms
        </h2>
        <CreateRoom chatRooms={chatRooms} />
      </div>
      <ScrollArea className="flex-grow">
        {chatRooms.map((room) => (
          <div
            key={room.id}
            className={`w-full p-4 text-left hover:bg-[#d4c07e] transition-colors border-b border-[#1c3f39] group ${
              selectedRoom === room.id ? "bg-[#c2b280]" : ""
            }`}
            onClick={() => setSelectedRoom(room.id)}
          >
            <div className="flex items-center">
              <MessageSquare
                size={20}
                className="mr-3 h-5 w-5 text-[#1c3f39]"
              />
              <h3 className="text-[#1c3f39] group-hover:underline group-focus:underline">
                {room.title.replaceAll("_", " ")}
              </h3>
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}
