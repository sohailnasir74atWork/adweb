// Matches sibling React Native project's message structure
export interface Message {
  id: string;
  // Group chat fields (senderId/sender pattern)
  senderId: string;
  sender: string; // displayName
  avatar?: string | null;
  text: string;
  imageUrl?: string;
  imageUrls?: string[];
  fruits?: FruitItem[];
  timestamp: number;
  isPro?: boolean;
  isCreator?: boolean;
  robloxUsernameVerified?: boolean;
  hasRecentGameWin?: boolean;
  lastGameWinAt?: number | null;
  replyTo?: {
    id: string;
    text: string;
    sender: string;
    imageUrl?: string | null;
    imageUrls?: string[] | null;
    hasFruits?: boolean;
    fruitsCount?: number;
  };
  // Legacy web fields (for backward compat)
  userId?: string;
  userName?: string;
  userAvatar?: string;
  isReported?: boolean;
}

export interface FruitItem {
  id?: string;
  name: string;
  Name?: string; // legacy fallback
  image: string;
  imageUrl?: string;
  type?: string;
  value?: number;
  valueType?: string; // 'd' | 'n' | 'm'
  isFly?: boolean;
  isRide?: boolean;
}

// Group from Firestore (matches sibling)
export interface GroupChat {
  id: string;
  name: string;
  groupName?: string;
  description?: string;
  createdBy: string;
  creatorDisplayName?: string;
  avatar?: string | null;
  memberCount: number;
  memberIds: string[];
  members: Record<string, GroupMember>;
  isPrivate: boolean;
  allowDirectJoin?: boolean;
  allowMemberInvites?: boolean;
  maxMembers?: number;
  lastMessage?: string | null;
  lastMessageTimestamp?: number | null;
  lastMessageSenderId?: string | null;
  isActive: boolean;
}

export interface GroupMember {
  id: string;
  displayName: string;
  avatar?: string | null;
  joinedAt?: unknown;
}

// Group metadata from RTDB
export interface GroupMetaData {
  groupId: string;
  groupName: string;
  groupAvatar?: string | null;
  lastMessage?: string | null;
  lastMessageTimestamp: number;
  lastMessageSenderId?: string | null;
  lastMessageSenderName?: string | null;
  unreadCount: number;
  muted?: boolean;
  joinedAt?: number;
  createdBy?: string;
}

// Chat metadata for private chats (RTDB)
export interface ChatMetaData {
  chatId: string;
  receiverId: string;
  receiverName: string;
  receiverAvatar: string;
  lastMessage: string;
  timestamp: number;
  unreadCount: number;
}

// Legacy ChatRoom type (kept for backward compat)
export interface ChatRoom {
  id: string;
  name: string;
  description?: string;
  createdBy: string;
  memberCount: number;
  lastMessage?: string;
  lastMessageTime?: number;
  isPrivate: boolean;
}

export interface PrivateConversation {
  id: string;
  participants: string[];
  lastMessage?: string;
  lastMessageTime?: number;
}
