import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/";

export const getChatRooms = async () => {
  const response = await axios.get(`${BASE_URL}chat/rooms/`);
  return response.data;
};

export const createWebSocket = (roomName: string, token:string) => {
    const realProtocol = "chat-protocol" 
    return new WebSocket(`ws://127.0.0.1:8000/ws/chat/${roomName}/`, [realProtocol, token]);
};