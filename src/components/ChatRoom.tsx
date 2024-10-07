import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Users } from "lucide-react";

interface ChatRoom {
  id: string;
  title: string;
}

interface ChatRoomProps {
  selectedRoom: string;
  setSelectedRoom: (roomId: string) => void;
  chatRooms: ChatRoom[];
}

export default function ChatRoom({
  selectedRoom,
  setSelectedRoom,
  chatRooms,
}: ChatRoomProps) {
  return (
    <div className="w-full md:w-1/3 bg-[#f2e8cf] border-r border-[#2f3e46]">
      <div className="p-4 border-b border-[#2f3e46] flex justify-between items-center">
        <h2 className="text-xl font-semibold text-[#2f3e46] flex items-center">
          <Users size={24} className="mr-2" />
          Chat Rooms
        </h2>
      </div>
      <ScrollArea className="h-[calc(100vh-73px)]">
        {chatRooms.map((room) => (
          <div
            key={room.id}
            className={`p-4 border-b border-[#2f3e46] cursor-pointer hover:bg-[#e6d7b8] transition-colors ${
              selectedRoom === room.id ? "bg-[#d9c8a0]" : ""
            }`}
            onClick={() => setSelectedRoom(room.id)}
          >
            <div className="flex items-center">
              <MessageSquare size={20} className="mr-3 text-[#2f3e46]" />
              <h3 className="text-sm font-medium text-[#2f3e46]">
                {room.title.replace("_", " ")}
              </h3>
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}
