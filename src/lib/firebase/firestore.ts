import {
  collection,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  type QueryConstraint,
  type DocumentSnapshot,
  type QuerySnapshot,
  type Unsubscribe,
  serverTimestamp,
  deleteField,
} from 'firebase/firestore';
import { firestore } from './config';
import type { Trade } from '@/lib/types/trade';
import type { Post, Comment } from '@/lib/types/post';

// --- Trades ---

export async function getTrades(
  filters?: {
    status?: string;
    isFeatured?: boolean;
    isSharkMode?: boolean;
    userId?: string;
  },
  pageSize = 20,
  lastDoc?: DocumentSnapshot,
): Promise<{ trades: Trade[]; lastDoc: DocumentSnapshot | null }> {
  const constraints: QueryConstraint[] = [orderBy('timestamp', 'desc'), limit(pageSize)];

  if (filters?.status) {
    constraints.unshift(where('status', '==', filters.status));
  }
  if (filters?.isFeatured) {
    constraints.unshift(where('isFeatured', '==', true));
  }
  if (filters?.isSharkMode) {
    constraints.unshift(where('isSharkMode', '==', true));
  }
  if (filters?.userId) {
    constraints.unshift(where('userId', '==', filters.userId));
  }
  if (lastDoc) {
    constraints.push(startAfter(lastDoc));
  }

  const q = query(collection(firestore, 'trades_new'), ...constraints);
  const snapshot = await getDocs(q);

  const trades = snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  })) as Trade[];

  const newLastDoc = snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1] : null;

  return { trades, lastDoc: newLastDoc };
}

export function onTradesSnapshot(
  callback: (trades: Trade[]) => void,
  pageSize = 20,
): Unsubscribe {
  const q = query(
    collection(firestore, 'trades_new'),
    orderBy('timestamp', 'desc'),
    limit(pageSize),
  );
  return onSnapshot(q, (snapshot: QuerySnapshot) => {
    const trades = snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    })) as Trade[];
    callback(trades);
  });
}

export async function getTradeById(tradeId: string): Promise<Trade | null> {
  const docRef = doc(firestore, 'trades_new', tradeId);
  const snapshot = await getDoc(docRef);
  if (snapshot.exists()) {
    return { id: snapshot.id, ...snapshot.data() } as Trade;
  }
  return null;
}

export async function createTrade(
  trade: Omit<Trade, 'id'>,
  activityData?: { userId: string; displayName: string; avatar: string | null; description: string },
): Promise<string> {
  const docRef = await addDoc(collection(firestore, 'trades_new'), {
    ...trade,
    timestamp: serverTimestamp(),
  });

  // Track activity for followers' feed (matches RN app's user_activity tracking)
  if (activityData) {
    try {
      await addDoc(collection(firestore, 'user_activity'), {
        userId: activityData.userId,
        type: 'trade_post',
        referenceId: docRef.id,
        displayName: activityData.displayName,
        avatar: activityData.avatar,
        preview: activityData.description
          ? activityData.description.substring(0, 100)
          : 'Posted a new trade',
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      console.warn('Failed to track activity:', err);
    }
  }

  return docRef.id;
}

export async function updateTrade(tradeId: string, updates: Partial<Trade>): Promise<void> {
  await updateDoc(doc(firestore, 'trades_new', tradeId), updates);
}

export async function deleteTrade(tradeId: string): Promise<void> {
  await deleteDoc(doc(firestore, 'trades_new', tradeId));
}

/** Toggle a reaction emoji on a trade (matches sibling RN project) */
export async function toggleTradeReaction(
  tradeId: string,
  userId: string,
  emoji: string,
  isActive: boolean,
): Promise<void> {
  const tradeRef = doc(firestore, 'trades_new', tradeId);
  if (isActive) {
    await updateDoc(tradeRef, { [`reactions.${userId}`]: deleteField() });
  } else {
    await updateDoc(tradeRef, { [`reactions.${userId}`]: emoji });
  }
}

export async function deletePost(postId: string): Promise<void> {
  await deleteDoc(doc(firestore, 'designPosts', postId));
}

// --- Posts ---

export async function getPosts(
  pageSize = 20,
  lastDoc?: DocumentSnapshot,
  filters?: { tag?: string; userId?: string },
): Promise<{ posts: Post[]; lastDoc: DocumentSnapshot | null }> {
  const constraints: QueryConstraint[] = [orderBy('createdAt', 'desc'), limit(pageSize)];

  if (filters?.userId) {
    constraints.unshift(where('userId', '==', filters.userId));
  }
  if (filters?.tag) {
    constraints.unshift(where('selectedTags', 'array-contains', filters.tag));
  }
  if (lastDoc) {
    constraints.push(startAfter(lastDoc));
  }

  const q = query(collection(firestore, 'designPosts'), ...constraints);
  const snapshot = await getDocs(q);

  const posts = snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  })) as Post[];

  const newLastDoc = snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1] : null;

  return { posts, lastDoc: newLastDoc };
}

export async function getPostById(postId: string): Promise<Post | null> {
  const snapshot = await getDoc(doc(firestore, 'designPosts', postId));
  if (snapshot.exists()) {
    return { id: snapshot.id, ...snapshot.data() } as Post;
  }
  return null;
}

export async function getComments(
  postId: string,
  pageSize = 20,
): Promise<Comment[]> {
  const q = query(
    collection(firestore, 'designPosts', postId, 'comments'),
    orderBy('timestamp', 'asc'),
    limit(pageSize),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() })) as Comment[];
}

// --- Reviews (supply/demand) ---

export async function getUserReview(userId: string) {
  const snapshot = await getDoc(doc(firestore, 'reviews', userId));
  if (snapshot.exists()) {
    return snapshot.data() as { ownedPets: string[]; wishlistPets: string[] };
  }
  return null;
}
