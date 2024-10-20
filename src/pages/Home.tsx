import { useEffect, useRef, useState } from "react";

import { ChatWindow, RoomList } from "@/components/Chat";
import { getChatRooms } from "@/service/chatApi";
import { Room } from "@/types/types";

export default function Home() {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [chatRooms, setChatRooms] = useState<Room[]>([]);
  const [isMobileView, setIsMobileView] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const rooms = await getChatRooms();
        console.log("Initial Chat rooms", rooms);
        setChatRooms(rooms);
      } catch (error) {
        console.error("Failed to fetch chat rooms:", error);
      }
    };

    fetchChatRooms();

    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!wsRef.current) {
      function connectWebSocket() {
        const ws = new WebSocket("ws://127.0.0.1:8001/ws/rooms/");

        ws.onopen = () => {
          console.log("WebSocket Connected");
          wsRef.current = ws;
        };

        ws.onmessage = (event) => {
          const data = JSON.parse(event.data);
          console.log("Websocket Data:", data);
          if (data.type === "room_created") {
            setChatRooms((prevRooms) => {
              const roomExists = prevRooms.some(
                (room) => room.id === data.message.id,
              );
              if (!roomExists) {
                return [...prevRooms, data.message];
              }
              return prevRooms;
            });
          } else if (data.type === "room_deleted") {
            setChatRooms((prevRooms) =>
              prevRooms.filter((room) => room.id !== data.message.id),
            );
          }
        };

        ws.onerror = (error) => {
          console.error("WebSocket Error:", error);
        };

        ws.onclose = (event) => {
          console.log("WebSocket Disconnected:", event);
          wsRef.current = null; // Reset WebSocket reference
          if (!event.wasClean) {
            console.log(
              "Connection was closed unexpectedly, attempting to reconnect...",
            );
            setTimeout(connectWebSocket, 1000); // Attempt to reconnect after 1 second
          }
        };
      }

      connectWebSocket();
    }

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
        console.log("WebSocket closed on cleanup");
      }
    };
  }, []);

  return (
    <div className="flex h-full overflow-hidden bg-[#f2e8cf]">
      {(!isMobileView || !selectedRoom) && (
        <RoomList
          selectedRoom={selectedRoom}
          setSelectedRoom={setSelectedRoom}
          chatRooms={chatRooms}
        />
      )}
      {(!isMobileView || selectedRoom) && (
        <ChatWindow
          selectedRoom={selectedRoom}
          onBack={() => setSelectedRoom(null)}
          isMobileView={isMobileView}
        />
      )}
    </div>
  );
}
