import axios from "axios";
import { CreateRoom } from "@/types/types";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getChatRooms = async () => {
  const response = await axios.get(`${BASE_URL}chat/rooms/`);
  return response.data;
};

export const createWebSocket = (roomID: number, token: string) => {
  const realProtocol = "chat-protocol";
  return new WebSocket(`ws://127.0.0.1:8001/ws/chat/${roomID}/`, [
    realProtocol,
    token,
  ]);
};

// Work under Progress
export const createRoom = async (createRoomInfo: CreateRoom) => {
  const accessToken = localStorage.getItem("access_token");
  const response = await axios.post(
    `${BASE_URL}chat/rooms/create/`,
    createRoomInfo,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data;
};

// New function to create WebSocket for room updates
export const createRoomsWebSocket = () => {
  return new WebSocket(`ws://127.0.0.1:8001/ws/rooms/`);
};
