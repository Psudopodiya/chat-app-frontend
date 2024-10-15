import { useEffect, useRef, useState } from "react";

import { ChatRoom, ChatWindow } from "@/components/Chat";
import { getChatRooms } from "@/service/chatApi";
import { Room } from "@/types/types";

export default function Home() {
  const [selectedRoom, setSelectedRoom] = useState(0);
  const [chatRooms, setChatRooms] = useState<Room[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

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
          if (data.type === "room_created") {
            setChatRooms((prevRooms) => {
              const roomExists = prevRooms.some(
                (room) => room.id === data.message.id
              );
              if (!roomExists) {
                return [...prevRooms, data.message];
              }
              return prevRooms;
            });
          } else if (data.type === "room_deleted") {
            setChatRooms((prevRooms) =>
              prevRooms.filter((room) => room.id !== data.message.id)
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
              "Connection was closed unexpectedly, attempting to reconnect..."
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
      <ChatRoom
        selectedRoom={selectedRoom}
        setSelectedRoom={setSelectedRoom}
        chatRooms={chatRooms}
      />
      <ChatWindow selectedRoom={selectedRoom} />
    </div>
  );
}
