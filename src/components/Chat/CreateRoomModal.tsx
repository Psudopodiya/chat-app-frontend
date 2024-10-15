import { PlusCircle, XSquare } from "lucide-react";
import { useState } from "react";

import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
} from "@/components/ui";
import { useToast } from "@/hooks/use-toast";
import { createRoom } from "@/service/chatApi";
import { Room } from "@/types/types";

interface CreateRoomModalProps {
  chatRooms: Room[];
}

export default function CreateRoomModal({ chatRooms }: CreateRoomModalProps) {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roomInfo, setRoomInfo] = useState({ title: "" });
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);

    const updatedRoomInfo = {
      ...roomInfo,
      title: roomInfo.title.replaceAll(" ", "_"),
    };

    console.log(updatedRoomInfo);

    if (chatRooms.some((room) => room.title === updatedRoomInfo.title)) {
      toast({
        title: "Creation Error",
        description: "The Room Already exist. Choose a different Name",
        variant: "destructive",
      });
      setIsCreating(false);
      return;
    }

    try {
      await createRoom(updatedRoomInfo);
      toast({
        title: "Success",
        description: "Room created successfully!",
      });
      setIsCreating(false);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating room:", error);
      toast({
        title: "Error",
        description: "Failed to create room. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        className="bg-[#1c3f39] hover:bg-[#2c4f49] text-[#f5f1e4] rounded-none border-2 border-[#1c3f39] shadow-[2px_2px_0_0_#0a1f1c] hover:shadow-none transition-all"
      >
        <PlusCircle size={20} className="mr-2" />
        Create Room
      </Button>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-[#f5f1e4] border-2 border-[#1c3f39]">
          <DialogHeader className="border-b-4 border-double border-[#1c3f39] p-6">
            <DialogTitle className="text-[#1c3f39] text-2xl font-bold uppercase tracking-wider flex items-center justify-between">
              Create New Room
              <Button
                onClick={() => setIsModalOpen(false)}
                className="bg-transparent hover:bg-[#e8e0c5] text-[#1c3f39] rounded-none border-2 border-[#1c3f39] shadow-[2px_2px_0_0_#1c3f39] hover:shadow-none transition-all p-1"
              >
                <XSquare size={20} />
              </Button>
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateRoom} className="p-6">
            <div className="mb-6">
              <label
                htmlFor="title"
                className="block text-[#1c3f39] text-sm font-bold uppercase tracking-wider mb-2"
              >
                Room Name
              </label>
              <Input
                id="title"
                name="title"
                type="text"
                placeholder="Enter room name"
                value={roomInfo.title}
                onChange={(e) => setRoomInfo({ title: e.target.value })}
                className="bg-[#f9f6ed] border-2 border-[#1c3f39] text-[#1c3f39] rounded-none shadow-[inset_2px_2px_0_0_#1c3f39] focus:shadow-[inset_-2px_-2px_0_0_#1c3f39] transition-all placeholder-[#5d5a4c]"
              />
            </div>
            <DialogFooter className="flex justify-end space-x-4">
              <Button
                type="submit"
                disabled={!roomInfo.title || isCreating}
                className="bg-[#1c3f39] hover:bg-[#2c4f49] text-[#f5f1e4] rounded-none border-2 border-[#1c3f39] shadow-[4px_4px_0_0_#0a1f1c] hover:shadow-none transition-all uppercase tracking-wider font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCreating ? "Creating..." : "Create Room"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
