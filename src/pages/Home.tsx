import { useState, useEffect } from "react";
import ChatRoomList from "@/components/ChatRoom";
import ChatWindow from "@/components/ChatWindow";
import { getChatRooms } from "@/service/chatApi";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [selectedRoom, setSelectedRoom] = useState("");
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const rooms = await getChatRooms();
        setChatRooms(rooms);
      } catch (error) {
        console.error("Failed to fetch chat rooms:", error);
      }
    };

    fetchChatRooms();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 overflow-hidden h-screen">
        <ChatRoomList
          selectedRoom={selectedRoom}
          setSelectedRoom={setSelectedRoom}
          chatRooms={chatRooms}
        />
        <ChatWindow selectedRoom={selectedRoom} />
      </div>
    </div>
  );
}
