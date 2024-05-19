import { User } from './User';

export interface Message {
  messageId: number;
  senderId: string;
  receiverId: string;
  room: string;
  content: string;
  createdAt: Date;
}
