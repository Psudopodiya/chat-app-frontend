import { Info, MessageSquare, Users2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  ScrollArea,
} from "@/components/ui";
import { Room } from "@/types/types";

interface RoomDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomInfo: Room;
}

export function RoomDetailModal({
  isOpen,
  onClose,
  roomInfo,
}: RoomDetailModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-none border-4 border-double border-[#1c3f39] bg-[#f5f1e4] p-0 shadow-[4px_4px_0_0_#1c3f39]">
        <DialogHeader className="border-b-4 border-double border-[#1c3f39] p-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-[#1c3f39]">
              Room Details
            </DialogTitle>
          </div>
        </DialogHeader>
        <ScrollArea className="max-h-[70vh]">
          <div className="space-y-6 p-6">
            <div className="space-y-2">
              <h3 className="flex items-center text-lg font-bold text-[#1c3f39]">
                <MessageSquare size={20} className="mr-2" />
                Room Name
              </h3>
              <p className="border-2 border-[#1c3f39] bg-[#e8e0c5] p-2 text-[#1c3f39] shadow-[2px_2px_0_0_#1c3f39]">
                {roomInfo.title}
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="flex items-center text-lg font-bold text-[#1c3f39]">
                <Info size={20} className="mr-2" />
                Description
              </h3>
              <p className="border-2 border-[#1c3f39] bg-[#e8e0c5] p-2 text-[#1c3f39] shadow-[2px_2px_0_0_#1c3f39]">
                {roomInfo.description}
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="flex items-center text-lg font-bold text-[#1c3f39]">
                <Users2 size={20} className="mr-2" />
                Participants ({roomInfo?.participants?.length})
              </h3>
              <ul className="list-none border-2 border-[#1c3f39] bg-[#e8e0c5] p-2 text-[#1c3f39] shadow-[2px_2px_0_0_#1c3f39]">
                {roomInfo?.participants?.map((participant) => (
                  <li
                    key={participant}
                    className="mb-1 flex items-center last:mb-0"
                  >
                    <span className="mr-2 h-2 w-2 rounded-full bg-[#1c3f39]"></span>
                    {participant}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
