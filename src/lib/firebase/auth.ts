import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  OAuthProvider,
  sendPasswordResetEmail,
  sendEmailVerification,
  signOut,
  onAuthStateChanged,
  type User as FirebaseUser,
} from 'firebase/auth';
import { ref, get, set, update } from 'firebase/database';
import { auth, database } from './config';
import { config } from '@/lib/constants/config';
import type { User } from '@/lib/types/user';

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

const appleProvider = new OAuthProvider('apple.com');
appleProvider.addScope('email');
appleProvider.addScope('name');

// --- Auth Methods ---

export async function signInWithGoogle() {
  return signInWithPopup(auth, googleProvider);
}

export async function signInWithApple() {
  return signInWithPopup(auth, appleProvider);
}

export async function signInWithEmail(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function registerWithEmail(email: string, password: string) {
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  if (credential.user) {
    await sendEmailVerification(credential.user);
  }
  return credential;
}

export async function resetPassword(email: string) {
  return sendPasswordResetEmail(auth, email);
}

export async function logout() {
  return signOut(auth);
}

// --- User Management ---

export function createNewUser(firebaseUser: FirebaseUser, robloxUsername?: string): User {
  const email = firebaseUser.email || '';
  return {
    id: firebaseUser.uid,
    displayName: robloxUsername || firebaseUser.displayName || email.split('@')[0],
    avatar: firebaseUser.photoURL || '',
    isBlock: false,
    fcmToken: null,
    lastactivity: null,
    online: false,
    isPro: false,
    email: email.replace(/\./g, ','),
    decodedEmail: email,
    flage: null,
    createdAt: Date.now(),
  };
}

export async function getUserFromRTDB(uid: string): Promise<User | null> {
  const snapshot = await get(ref(database, `users/${uid}`));
  if (snapshot.exists()) {
    return snapshot.val() as User;
  }
  return null;
}

export async function createUserInRTDB(user: User): Promise<void> {
  await set(ref(database, `users/${user.id}`), user);
}

export async function updateUserInRTDB(uid: string, updates: Partial<User>): Promise<void> {
  await update(ref(database, `users/${uid}`), updates);
}

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return (config.adminEmails as readonly string[]).includes(email);
}

// --- Auth State Listener ---

export function onAuthChange(callback: (user: FirebaseUser | null) => void) {
  return onAuthStateChanged(auth, callback);
}
