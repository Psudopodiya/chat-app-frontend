import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getChatRooms = async () => {
  const response = await axios.get(`${BASE_URL}chat/rooms/`);
  return response.data;
};

export const createWebSocket = (roomName: string, token: string) => {
  const realProtocol = "chat-protocol";
  return new WebSocket(`ws://127.0.0.1:8000/ws/chat/${roomName}/`, [
    realProtocol,
    token,
  ]);
};

// Work under Progress
export const createRoom = async (createRoomInfo: any) => {
  console.log(createRoomInfo);
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
  return new WebSocket(`ws://127.0.0.1:8000/ws/rooms/`);
};
