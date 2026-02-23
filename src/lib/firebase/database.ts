import {
  ref,
  get,
  set,
  update,
  remove,
  onValue,
  onChildAdded,
  onDisconnect,
  query as dbQuery,
  orderByKey,
  endAt,
  limitToLast,
  push,
  increment,
  serverTimestamp,
  type Unsubscribe,
} from 'firebase/database';
import { database } from './config';
import type { User } from '@/lib/types/user';
import type { Message, ChatMetaData, GroupMetaData } from '@/lib/types/chat';
import {
  doc,
  getDoc,
} from 'firebase/firestore';
import { firestore } from './config';

// --- Users ---

export async function getUser(uid: string): Promise<User | null> {
  const snapshot = await get(ref(database, `users/${uid}`));
  return snapshot.exists() ? (snapshot.val() as User) : null;
}

export async function updateUser(uid: string, updates: Partial<User>): Promise<void> {
  await update(ref(database, `users/${uid}`), updates);
}

// --- Presence ---

export function setupPresence(uid: string): () => void {
  const presenceRef = ref(database, `presence/${uid}`);
  const connectedRef = ref(database, '.info/connected');

  const unsubscribe = onValue(connectedRef, (snapshot) => {
    if (snapshot.val() === true) {
      set(presenceRef, true);
      onDisconnect(presenceRef).set(false);
    }
  });

  const handleVisibility = () => {
    if (document.visibilityState === 'visible') {
      set(presenceRef, true);
    } else {
      set(presenceRef, false);
    }
  };

  document.addEventListener('visibilitychange', handleVisibility);

  return () => {
    unsubscribe();
    document.removeEventListener('visibilitychange', handleVisibility);
    set(presenceRef, false);
  };
}

export function onPresenceChange(
  uid: string,
  callback: (isOnline: boolean) => void,
): Unsubscribe {
  return onValue(ref(database, `presence/${uid}`), (snapshot) => {
    callback(snapshot.val() === true);
  });
}

export function onAllPresenceChange(
  callback: (users: Record<string, boolean>) => void,
): Unsubscribe {
  return onValue(ref(database, 'presence'), (snapshot) => {
    callback(snapshot.exists() ? snapshot.val() : {});
  });
}

/**
 * One-time fetch of online user IDs (no listener — avoids constant re-renders).
 */
export async function getOnlineUsersOnce(limit = 50): Promise<string[]> {
  const snapshot = await get(ref(database, 'presence'));
  if (!snapshot.exists()) return [];
  const data = snapshot.val() as Record<string, boolean>;
  return Object.entries(data)
    .filter(([, isOnline]) => isOnline)
    .map(([uid]) => uid)
    .slice(0, limit);
}

/**
 * Fetch online users WITH their profile data in 2 reads total
 * (instead of N+1 sequential reads).
 */
export async function getOnlineUsersWithData(limit = 50): Promise<User[]> {
  const presenceSnap = await get(ref(database, 'presence'));
  if (!presenceSnap.exists()) return [];

  const presenceData = presenceSnap.val() as Record<string, boolean>;
  const onlineIds = Object.entries(presenceData)
    .filter(([, isOnline]) => isOnline)
    .map(([uid]) => uid)
    .slice(0, limit);

  if (onlineIds.length === 0) return [];

  // Batch: fetch all user data in a single read
  const usersSnap = await get(ref(database, 'users'));
  if (!usersSnap.exists()) return [];

  const allUsers = usersSnap.val() as Record<string, User>;
  const results: User[] = [];

  for (const uid of onlineIds) {
    const userData = allUsers[uid];
    if (userData && !userData.isBlock) {
      results.push({ ...userData, id: uid });
    }
  }

  return results;
}

// ============================================
// GROUP CHAT — matches sibling RN project
// Community chat path: chat_new/{timestamp}
// Group chat path: group_messages/{groupId}/messages/{timestamp}
// ============================================

const COMMUNITY_ROOM_ID = 'community';
const GROUP_INITIAL_PAGE = 20;
const GROUP_PAGE_SIZE = 20;

function getGroupMessagesPath(groupId: string): string {
  return groupId === COMMUNITY_ROOM_ID
    ? 'chat_new'
    : `group_messages/${groupId}/messages`;
}

export async function loadGroupMessages(
  groupId: string,
  lastKey?: string | null,
): Promise<{ messages: Message[]; oldestKey: string | null }> {
  const messagesRef = ref(database, getGroupMessagesPath(groupId));
  let q = dbQuery(messagesRef, orderByKey());

  if (lastKey) {
    q = dbQuery(messagesRef, orderByKey(), endAt(lastKey), limitToLast(GROUP_PAGE_SIZE));
  } else {
    q = dbQuery(messagesRef, orderByKey(), limitToLast(GROUP_INITIAL_PAGE));
  }

  const snapshot = await get(q);
  const data = snapshot.val() || {};

  let messages: Message[] = Object.entries(data)
    .map(([key, value]) => ({ id: key, ...(value as Omit<Message, 'id'>) }))
    .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

  // Filter out the lastKey itself to avoid duplicates
  if (lastKey) {
    messages = messages.filter((m) => String(m.id) !== String(lastKey));
  }

  const oldestKey = messages.length > 0 ? messages[messages.length - 1].id : null;
  return { messages, oldestKey };
}

export function onNewGroupMessage(
  groupId: string,
  callback: (message: Message) => void,
): Unsubscribe {
  const messagesRef = ref(database, getGroupMessagesPath(groupId));
  const limitedRef = dbQuery(messagesRef, limitToLast(1));


  // Use onValue instead of onChildAdded — more reliable in Firebase Web SDK
  // onValue fires every time the last message changes, ensuring real-time updates
  const unsub = onValue(limitedRef, (snapshot) => {
    if (!snapshot.exists()) return;
    snapshot.forEach((child) => {
      const data = child.val();
      if (!data || typeof data !== 'object') return;
      const msg: Message = { id: child.key!, ...data };
      if (!msg.timestamp) msg.timestamp = Date.now();
      callback(msg);
    });
  });

  return unsub;
}

export async function sendGroupChatMessage(
  groupId: string,
  messageData: Omit<Message, 'id'>,
  senderData: { id: string; displayName: string; avatar?: string | null },
): Promise<void> {
  const msgPath = getGroupMessagesPath(groupId);

  if (groupId === COMMUNITY_ROOM_ID) {
    // Community chat: use push() for key (matches RN app's chatRef.push())
    // and serverTimestamp() for timestamp (matches RN app's database.ServerValue.TIMESTAMP)
    const messagesRef = ref(database, msgPath);
    const newMsgRef = push(messagesRef);


    await set(newMsgRef, {
      ...messageData,
      timestamp: serverTimestamp(),
      source: 'web',
    });
    return;
  }

  // Group chat: use timestamp as key (matches RN app's groupUtils.sendGroupMessage)
  const timestamp = Date.now();
  const messageRef = ref(database, `${msgPath}/${timestamp}`);


  await set(messageRef, {
    ...messageData,
    timestamp,
    source: 'web',
  });

  // 2. Get group members from Firestore
  const groupDoc = await getDoc(doc(firestore, 'groups', groupId));
  if (!groupDoc.exists()) return;

  const groupData = groupDoc.data();
  const memberIds: string[] = groupData?.memberIds || [];

  const lastMessagePreview =
    messageData.text?.trim() ||
    (messageData.imageUrl ? '📷 Photo' : messageData.fruits?.length ? `🐾 ${messageData.fruits.length} pet(s)` : '');

  // 3. Batch check active members
  const activeGroupRef = ref(database, `activeGroupChats/${groupId}`);
  const activeMembersSnap = await get(activeGroupRef);
  const activeMemberIds = activeMembersSnap.exists()
    ? Object.keys(activeMembersSnap.val() || {})
    : [];

  // 4. Prepare batch updates
  const updates: Record<string, unknown> = {};

  for (const memberId of memberIds) {
    const isActive = activeMemberIds.includes(memberId);
    const isSender = memberId === senderData.id;

    updates[`group_meta_data/${memberId}/${groupId}/lastMessage`] = lastMessagePreview;
    updates[`group_meta_data/${memberId}/${groupId}/lastMessageTimestamp`] = timestamp;
    updates[`group_meta_data/${memberId}/${groupId}/lastMessageSenderId`] = senderData.id;
    updates[`group_meta_data/${memberId}/${groupId}/lastMessageSenderName`] = senderData.displayName || 'Anonymous';
    updates[`group_meta_data/${memberId}/${groupId}/groupName`] = groupData?.name || 'Group Chat';

    if (isSender || isActive) {
      updates[`group_meta_data/${memberId}/${groupId}/unreadCount`] = 0;
    }
  }

  // 5. Batch update metadata (non-increment fields)
  await update(ref(database, '/'), updates);

  // 6. Increment unread for inactive members (avoids N reads)
  const incrementPromises = memberIds
    .filter((id) => !activeMemberIds.includes(id) && id !== senderData.id)
    .map((memberId) => {
      const unreadRef = ref(database, `group_meta_data/${memberId}/${groupId}/unreadCount`);
      return set(unreadRef, increment(1));
    });
  if (incrementPromises.length > 0) await Promise.all(incrementPromises);
}

// Set/clear active group chat (for unread count optimization)
export async function setActiveGroupChat(userId: string, groupId: string): Promise<void> {
  await set(ref(database, `activeGroupChats/${groupId}/${userId}`), true);
}

export async function clearActiveGroupChat(userId: string, groupId: string): Promise<void> {
  await set(ref(database, `activeGroupChats/${groupId}/${userId}`), null);
}

// Get user's group list from RTDB metadata
export function onGroupMetaData(
  userId: string,
  callback: (groups: GroupMetaData[]) => void,
): Unsubscribe {
  return onValue(ref(database, `group_meta_data/${userId}`), (snapshot) => {
    if (!snapshot.exists()) {
      callback([]);
      return;
    }
    const data = snapshot.val();
    const groups: GroupMetaData[] = Object.entries(data).map(([groupId, val]) => ({
      groupId,
      ...(val as Omit<GroupMetaData, 'groupId'>),
    }));
    groups.sort((a, b) => (b.lastMessageTimestamp || 0) - (a.lastMessageTimestamp || 0));
    callback(groups);
  });
}

// ============================================
// PRIVATE CHAT — matches sibling RN project
// Path: private_messages/{chatKey}/messages/{timestamp}
// chatKey = sorted `${id1}_${id2}`
// ============================================

const PRIVATE_INITIAL_PAGE = 20;
const PRIVATE_PAGE_SIZE = 20;

export function getPrivateChatKey(userId1: string, userId2: string): string {
  return userId1 < userId2 ? `${userId1}_${userId2}` : `${userId2}_${userId1}`;
}

export async function loadPrivateMessages(
  chatKey: string,
  lastKey?: string | null,
): Promise<{ messages: Message[]; oldestKey: string | null }> {
  const messagesRef = ref(database, `private_messages/${chatKey}/messages`);
  let q = dbQuery(messagesRef, orderByKey());

  if (lastKey) {
    q = dbQuery(messagesRef, orderByKey(), endAt(lastKey), limitToLast(PRIVATE_PAGE_SIZE));
  } else {
    q = dbQuery(messagesRef, orderByKey(), limitToLast(PRIVATE_INITIAL_PAGE));
  }

  const snapshot = await get(q);
  const data = snapshot.val() || {};

  let messages: Message[] = Object.entries(data)
    .map(([key, value]) => ({ id: key, ...(value as Omit<Message, 'id'>) }))
    .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

  if (lastKey) {
    messages = messages.filter((m) => String(m.id) !== String(lastKey));
  }

  const oldestKey = messages.length > 0 ? messages[messages.length - 1].id : null;
  return { messages, oldestKey };
}

export function onNewPrivateMessage(
  chatKey: string,
  callback: (message: Message) => void,
): Unsubscribe {
  const messagesRef = ref(database, `private_messages/${chatKey}/messages`);
  const limitedRef = dbQuery(messagesRef, limitToLast(1));

  // Use onValue instead of onChildAdded — more reliable in Firebase Web SDK
  const unsub = onValue(limitedRef, (snapshot) => {
    if (!snapshot.exists()) return;
    snapshot.forEach((child) => {
      const data = child.val();
      if (!data || typeof data !== 'object') return;
      const msg: Message = { id: child.key!, ...data };
      if (!msg.timestamp) msg.timestamp = Date.now();
      callback(msg);
    });
  });

  return unsub;
}

export async function sendPrivateChatMessage(
  myUserId: string,
  otherUserId: string,
  messageData: {
    text: string;
    imageUrl?: string;
    imageUrls?: string[];
    fruits?: unknown[];
  },
  myDisplayName: string,
  myAvatar: string,
  otherDisplayName: string,
  otherAvatar: string,
): Promise<void> {
  const chatKey = getPrivateChatKey(myUserId, otherUserId);
  const timestamp = Date.now();

  // Message ref (timestamp as key, same as sibling)
  const messageRef = ref(database, `private_messages/${chatKey}/messages/${timestamp}`);
  const senderChatRef = ref(database, `chat_meta_data/${myUserId}/${otherUserId}`);
  const receiverChatRef = ref(database, `chat_meta_data/${otherUserId}/${myUserId}`);
  const receiverStatusRef = ref(database, `users/${otherUserId}/activeChat`);

  // Build message payload (matches sibling)
  const payload: Record<string, unknown> = {
    text: messageData.text,
    senderId: myUserId,
    timestamp,
  };

  if (messageData.imageUrl) payload.imageUrl = messageData.imageUrl;
  if (messageData.imageUrls?.length) {
    payload.imageUrls = messageData.imageUrls;
    if (!messageData.imageUrl) payload.imageUrl = messageData.imageUrls[0];
  }
  if (messageData.fruits?.length) payload.fruits = messageData.fruits;

  const lastMessagePreview =
    messageData.text?.trim() ||
    (messageData.imageUrl ? '📷 Photo' : messageData.fruits?.length ? `🐾 ${messageData.fruits.length} pet(s)` : '');

  // Save message
  await set(messageRef, payload);

  // Check if receiver is in this chat
  const receiverSnap = await get(receiverStatusRef);
  const isReceiverInChat = receiverSnap.val() === chatKey;

  // Update sender metadata
  await update(senderChatRef, {
    chatId: chatKey,
    receiverId: otherUserId,
    receiverName: otherDisplayName || 'Anonymous',
    receiverAvatar: otherAvatar || 'https://bloxfruitscalc.com/wp-content/uploads/2025/display-pic.png',
    lastMessage: lastMessagePreview,
    timestamp,
    unreadCount: 0,
  });

  // Update receiver metadata
  await update(receiverChatRef, {
    chatId: chatKey,
    receiverId: myUserId,
    receiverName: myDisplayName || 'Anonymous',
    receiverAvatar: myAvatar || 'https://bloxfruitscalc.com/wp-content/uploads/2025/display-pic.png',
    lastMessage: lastMessagePreview,
    timestamp,
    unreadCount: isReceiverInChat ? 0 : increment(1),
  });
}

// Set/clear active private chat
export async function setActiveChat(userId: string, chatKey: string): Promise<void> {
  await set(ref(database, `users/${userId}/activeChat`), chatKey);
}

export async function clearActiveChat(userId: string): Promise<void> {
  await set(ref(database, `users/${userId}/activeChat`), null);
}

// Get user's private chat list from RTDB metadata
export function onChatMetaData(
  userId: string,
  callback: (chats: ChatMetaData[]) => void,
): Unsubscribe {
  return onValue(ref(database, `chat_meta_data/${userId}`), (snapshot) => {
    if (!snapshot.exists()) {
      callback([]);
      return;
    }
    const data = snapshot.val();
    const chats: ChatMetaData[] = Object.entries(data)
      .map(([partnerId, val]) => ({
        ...(val as ChatMetaData),
        receiverId: partnerId, // key is the partner's userId
      }))
      .filter((c) => c.lastMessage || c.timestamp > 0); // filter ghost entries
    chats.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
    callback(chats);
  });
}

// ============================================
// LEGACY: Community chat (backward compat)
// ============================================

export function onChatMessages(
  roomId: string,
  callback: (messages: Message[]) => void,
  messageLimit = 50,
): Unsubscribe {
  const messagesRef = dbQuery(
    ref(database, `group_messages/${roomId}/messages`),
    orderByKey(),
    limitToLast(messageLimit),
  );

  return onValue(messagesRef, (snapshot) => {
    const messages: Message[] = [];
    snapshot.forEach((child) => {
      messages.push({ id: child.key!, ...child.val() });
    });
    callback(messages);
  });
}

export async function sendChatMessage(
  roomId: string,
  message: Omit<Message, 'id' | 'timestamp'>,
): Promise<string> {
  const timestamp = Date.now();
  const messageRef = ref(database, `group_messages/${roomId}/messages/${timestamp}`);
  await set(messageRef, {
    ...message,
    timestamp,
  });
  return String(timestamp);
}

// --- Image URL ---

export async function getImageBaseUrl(): Promise<string> {
  const snapshot = await get(ref(database, 'image_url'));
  if (snapshot.exists()) {
    const val = snapshot.val();
    return String(val).replace(/"/g, '').replace(/\/$/, '');
  }
  return 'https://adoptme.b-cdn.net';
}

// --- Server Config ---

export async function getTradingServerLink(): Promise<string | null> {
  const snapshot = await get(ref(database, 'server'));
  if (snapshot.exists()) {
    const data = snapshot.val();
    const keys = Object.keys(data);
    if (keys.length > 0) {
      return data[keys[0]]?.link || null;
    }
  }
  return null;
}

export async function getApiKey(): Promise<string | null> {
  const snapshot = await get(ref(database, 'api'));
  return snapshot.exists() ? snapshot.val() : null;
}

export async function getFreeTranslation(): Promise<boolean> {
  const snapshot = await get(ref(database, 'free_translation'));
  return snapshot.exists() ? snapshot.val() === true : false;
}

// --- Delete Messages ---

export async function deleteGroupMessage(groupId: string, messageId: string): Promise<void> {
  const msgPath = `${getGroupMessagesPath(groupId)}/${messageId}`;
  await remove(ref(database, msgPath));
}

export async function deletePrivateMessage(chatKey: string, messageId: string): Promise<void> {
  const msgPath = `private_messages/${chatKey}/messages/${messageId}`;
  await remove(ref(database, msgPath));
}
