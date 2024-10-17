import { MessageSquare, Users } from "lucide-react";

import CreateRoom from "./CreateRoomModal";

import { ScrollArea } from "@/components/ui";
import { useAuth } from "@/context/AuthContext";
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
  const { user } = useAuth();

  return (
    <div className="w-full border-r border-[#1c3f39] bg-[#f2e8cf] md:w-1/3">
      <div className="flex items-center justify-between border-b border-[#1c3f39] p-4">
        <h2 className="flex items-center text-xl font-semibold text-[#1c3f39]">
          <Users size={24} className="mr-2" />
          Chat Rooms
        </h2>
        <CreateRoom chatRooms={chatRooms} />
      </div>
      <ScrollArea className="flex-grow">
        {chatRooms.map((room) => {
          const canJoinRoom =
            room.participants?.length === 0 ||
            room.participants?.includes(user?.username ?? "") ||
            room.owner === user?.username;
          return (
            canJoinRoom && (
              <div
                key={room.id}
                className={`group w-full border-b border-[#1c3f39] p-4 text-left transition-colors hover:bg-[#d4c07e] ${
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
            )
          );
        })}
      </ScrollArea>
    </div>
  );
}
