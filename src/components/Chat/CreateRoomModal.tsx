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
        className="rounded-none border-2 border-[#1c3f39] bg-[#1c3f39] text-[#f5f1e4] shadow-[2px_2px_0_0_#0a1f1c] transition-all hover:bg-[#2c4f49] hover:shadow-none"
      >
        <PlusCircle size={20} className="mr-2" />
        Create Room
      </Button>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="border-2 border-[#1c3f39] bg-[#f5f1e4]">
          <DialogHeader className="border-b-4 border-double border-[#1c3f39] p-6">
            <DialogTitle className="flex items-center justify-between text-2xl font-bold uppercase tracking-wider text-[#1c3f39]">
              Create New Room
              <Button
                onClick={() => setIsModalOpen(false)}
                className="rounded-none border-2 border-[#1c3f39] bg-transparent p-1 text-[#1c3f39] shadow-[2px_2px_0_0_#1c3f39] transition-all hover:bg-[#e8e0c5] hover:shadow-none"
              >
                <XSquare size={20} />
              </Button>
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateRoom} className="p-6">
            <div className="mb-6">
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-bold uppercase tracking-wider text-[#1c3f39]"
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
                className="rounded-none border-2 border-[#1c3f39] bg-[#f9f6ed] text-[#1c3f39] placeholder-[#5d5a4c] shadow-[inset_2px_2px_0_0_#1c3f39] transition-all focus:shadow-[inset_-2px_-2px_0_0_#1c3f39]"
              />
            </div>
            <DialogFooter className="flex justify-end space-x-4">
              <Button
                type="submit"
                disabled={!roomInfo.title || isCreating}
                className="rounded-none border-2 border-[#1c3f39] bg-[#1c3f39] font-bold uppercase tracking-wider text-[#f5f1e4] shadow-[4px_4px_0_0_#0a1f1c] transition-all hover:bg-[#2c4f49] hover:shadow-none disabled:cursor-not-allowed disabled:opacity-50"
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
