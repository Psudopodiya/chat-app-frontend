"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { createRoom } from "@/service/chatApi";

interface CreateRoomButtonProps {
  onRoomCreated: (newRoom: { id: string; title: string }) => void;
}

export default function CreateRoomButton({
  onRoomCreated,
}: CreateRoomButtonProps) {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);

    try {
      setRoomName(roomName.replace(" ", "_"));
      const response = await createRoom({
        createRoomInfo: { title: roomName },
      });
      onRoomCreated(response);
      setIsModalOpen(false);
      setRoomName("");
      toast({
        title: "Success",
        description: "Room created successfully!",
      });
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
        className="bg-[#2f3e46] text-[#f2e8cf] hover:bg-[#354f52] transition-colors"
      >
        <PlusCircle size={20} className="mr-2" />
        Create Room
      </Button>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-[#f2e8cf] border border-[#2f3e46]">
          <DialogHeader>
            <DialogTitle className="text-[#2f3e46]">
              Create New Room
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateRoom}>
            <div className="grid gap-4 py-4">
              <Input
                id="roomName"
                placeholder="Enter room name"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                className="bg-white border-[#2f3e46] text-[#2f3e46]"
              />
            </div>
            <DialogFooter>
              <Button
                type="submit"
                disabled={!roomName || isCreating}
                className="bg-[#2f3e46] text-[#f2e8cf] hover:bg-[#354f52] transition-colors"
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
