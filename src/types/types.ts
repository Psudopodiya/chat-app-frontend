export interface Room {
  id: number;
  title: string;
  description?: string;
  created_at?: string;
  owner: string;
  participants?: string[];
}

export interface Message {
  message: string;
  user: string;
  profile_image_url: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  profile_image: string;
  bio: string;
}
export interface CreateRoom {
  title: string;
}

interface RoomCreatedMessage {
  type: "room_created";
  room: Room;
}

interface RoomDeletedMessage {
  type: "room_deleted";
  room: { id: number };
}

interface RoomUpdatedMessage {
  type: "room_updated";
  room: Room;
}

// Union type for all WebSocket message types
export type WebSocketMessage =
  | RoomCreatedMessage
  | RoomDeletedMessage
  | RoomUpdatedMessage;
