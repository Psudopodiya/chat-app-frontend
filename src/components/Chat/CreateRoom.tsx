import { PlusCircle } from "lucide-react";
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

export default function CreateRoom() {
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
    try {
      await createRoom(updatedRoomInfo);
      toast({
        title: "Success",
        description: "Room created successfully!",
      });
      setIsCreating(false);
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
        className="bg-[#1c3f39] text-[#f2e8cf] hover:bg-[#354f52] transition-colors"
      >
        <PlusCircle size={20} className="mr-2" />
        Create Room
      </Button>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-[#f2e8cf] border border-[#1c3f39]">
          <DialogHeader>
            <DialogTitle className="text-[#1c3f39]">
              Create New Room
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateRoom}>
            <div className="grid gap-4 py-4">
              <Input
                id="title"
                name="title"
                type="text"
                placeholder="Enter room name"
                value={roomInfo.title}
                onChange={(e) => setRoomInfo({ title: e.target.value })}
                className="bg-white border-[#1c3f39] text-[#1c3f39]"
              />
            </div>
            <DialogFooter>
              <Button
                type="submit"
                disabled={!roomInfo.title || isCreating}
                className="bg-[#1c3f39] text-[#f2e8cf] hover:bg-[#354f52] transition-colors"
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
