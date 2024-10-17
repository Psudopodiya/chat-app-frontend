import { AsteriskIcon, PlusCircle } from "lucide-react";
import React, { useEffect, useState } from "react";

import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
  VintageMultiSelect,
} from "@/components/ui";
import { useToast } from "@/hooks/use-toast";
import { createRoom } from "@/service/chatApi";
import { getUserList } from "@/service/userApi";

interface CreateRoomModalProps {
  chatRooms: { title: string }[];
}

export default function CreateRoomModal({ chatRooms }: CreateRoomModalProps) {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roomInfo, setRoomInfo] = useState({
    title: "",
    description: "",
    room_type: "public",
    participants: [] as string[],
  });
  const [isCreating, setIsCreating] = useState(false);
  const [usersList, setUsersList] = useState<string[]>([]);

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);

    const updatedRoomInfo = {
      ...roomInfo,
      title: roomInfo.title.replaceAll(" ", "_"),
    };

    if (chatRooms.some((room) => room.title === updatedRoomInfo.title)) {
      toast({
        title: "Creation Error",
        description: "The Room Already exists. Choose a different Name",
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
      setRoomInfo({
        title: "",
        description: "",
        room_type: "public",
        participants: [],
      });
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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getUserList();
        setUsersList(users);
      } catch {
        toast({
          title: "Error",
          description: "Failed to fetch available users",
          variant: "destructive",
        });
      }
    };

    fetchUsers();
  }, [toast]);

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
        <DialogContent className="rounded-none border-4 border-double border-[#1c3f39] bg-[#f5f1e4] shadow-[4px_4px_0_0_#1c3f39]">
          <DialogHeader className="border-b-4 border-double border-[#1c3f39] p-6">
            <DialogTitle className="flex items-center justify-between text-2xl font-bold uppercase tracking-wider text-[#1c3f39]">
              Create New Room
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateRoom} className="space-y-6 p-6">
            <div>
              <label
                htmlFor="title"
                className="mb-2 flex gap-1 text-sm font-bold uppercase tracking-wider text-[#1c3f39]"
              >
                Room Name
                <AsteriskIcon className="size-3 text-red-700" />
              </label>

              <Input
                id="title"
                name="title"
                type="text"
                placeholder="Enter room name"
                value={roomInfo.title}
                onChange={(e) =>
                  setRoomInfo({ ...roomInfo, title: e.target.value })
                }
                className="rounded-none border-2 border-[#1c3f39] bg-[#f9f6ed] text-[#1c3f39] placeholder-[#5d5a4c] shadow-[inset_2px_2px_0_0_#1c3f39] transition-all focus:shadow-[inset_-2px_-2px_0_0_#1c3f39]"
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-bold uppercase tracking-wider text-[#1c3f39]"
              >
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                placeholder="Enter room description"
                value={roomInfo.description}
                onChange={(e) =>
                  setRoomInfo({ ...roomInfo, description: e.target.value })
                }
                className="rounded-none border-2 border-[#1c3f39] bg-[#f9f6ed] text-[#1c3f39] placeholder-[#5d5a4c] shadow-[inset_2px_2px_0_0_#1c3f39] transition-all focus:shadow-[inset_-2px_-2px_0_0_#1c3f39]"
              />
            </div>
            <div>
              <label
                htmlFor="room_type"
                className="mb-2 block text-sm font-bold uppercase tracking-wider text-[#1c3f39]"
              >
                Room Type
              </label>
              <Select
                onValueChange={(value) =>
                  setRoomInfo({ ...roomInfo, room_type: value })
                }
                defaultValue={roomInfo.room_type}
              >
                <SelectTrigger className="rounded-none border-2 border-[#1c3f39] bg-[#e1c87b] text-[#1c3f39] shadow-[2px_2px_0_0_#1c3f39] transition-all hover:shadow-none">
                  <SelectValue placeholder="Select room type" />
                </SelectTrigger>
                <SelectContent className="rounded-none border-2 border-[#1c3f39] bg-[#e1c87b] text-[#1c3f39]">
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label
                htmlFor="participants"
                className="mb-2 block text-sm font-bold uppercase tracking-wider text-[#1c3f39]"
              >
                Add Participants
              </label>
              <VintageMultiSelect
                users={usersList}
                selectedUsers={roomInfo.participants}
                onSelectionChange={(selectedUsers) =>
                  setRoomInfo({ ...roomInfo, participants: selectedUsers })
                }
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
