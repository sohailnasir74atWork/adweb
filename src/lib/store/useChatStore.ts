import { create } from 'zustand';
import type { Message, ChatRoom } from '@/lib/types/chat';

interface ChatState {
  activeRoom: string | null;
  rooms: ChatRoom[];
  messages: Message[];
  onlineUsers: Record<string, boolean>;
  isLoadingMessages: boolean;
  // Actions
  setActiveRoom: (roomId: string | null) => void;
  setRooms: (rooms: ChatRoom[]) => void;
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  setOnlineUsers: (users: Record<string, boolean>) => void;
  setIsLoadingMessages: (loading: boolean) => void;
  clearChat: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  activeRoom: null,
  rooms: [],
  messages: [],
  onlineUsers: {},
  isLoadingMessages: false,

  setActiveRoom: (activeRoom) => set({ activeRoom }),
  setRooms: (rooms) => set({ rooms }),
  setMessages: (messages) => set({ messages }),
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  setOnlineUsers: (onlineUsers) => set({ onlineUsers }),
  setIsLoadingMessages: (isLoadingMessages) => set({ isLoadingMessages }),
  clearChat: () => set({ activeRoom: null, messages: [], isLoadingMessages: false }),
}));
