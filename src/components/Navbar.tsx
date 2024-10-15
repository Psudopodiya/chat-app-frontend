import { LogOut, Menu, MessageCircle, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <nav className="bg-[#1c3f39] text-[#f2e8cf] p-4 flex justify-between items-center shadow-md font-inconsolata">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="mr-2 text-[#f2e8cf] hover:text-[#d9c8a0] md:hidden"
        >
          <Menu className="h-6 w-6" />
        </Button>
        <MessageCircle className="h-6 w-6 mr-2 hidden md:block" />
        <button className="text-xl font-bold" onClick={() => navigate("/")}>
          Retro Chat
        </button>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-[#f2e8cf] hover:border-[#d9c8a0] transition-colors"
          >
            <Avatar>
              <AvatarImage
                src={`http://127.0.0.1:8001${user?.profile_image}`}
                alt={user?.username}
                className="object-cover"
              />
              <AvatarFallback className="bg-[#d9c8a0] text-[#1c3f39]">
                {user?.username?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56 bg-[#f2e8cf] text-[#1c3f39] border-2 border-[#1c3f39]"
          align="end"
          forceMount
        >
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {user?.username}
              </p>
              <p className="text-xs leading-none opacity-70">{user?.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-[#1c3f39]" />
          <DropdownMenuItem
            className="hover:bg-[#d9c8a0] cursor-pointer"
            onClick={() => navigate("/profile")} // Navigate to /profile on click
          >
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-[#1c3f39]" />
          <DropdownMenuItem
            onClick={logout}
            className="hover:bg-[#d9c8a0] cursor-pointer"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
