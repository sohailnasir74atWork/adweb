'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/lib/store/useAuthStore';
import {
  onAuthChange,
  getUserFromRTDB,
  createNewUser,
  createUserInRTDB,
  isAdminEmail,
} from '@/lib/firebase/auth';
import { getApiKey, getFreeTranslation, getTradingServerLink } from '@/lib/firebase/database';

export function useFirebaseAuth() {
  const {
    setUser,
    setIsAdmin,
    setIsLoading,
    setApi,
    setFreeTranslation,
    setTradingServerLink,
  } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthChange(async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Check if user exists in RTDB
          let user = await getUserFromRTDB(firebaseUser.uid);

          if (!user) {
            // New user — create in RTDB
            user = createNewUser(firebaseUser);
            await createUserInRTDB(user);
          }

          setUser(user);
          setIsAdmin(isAdminEmail(firebaseUser.email));

          // Fetch server config in parallel
          const [apiKey, freeTrans, serverLink] = await Promise.all([
            getApiKey(),
            getFreeTranslation(),
            getTradingServerLink(),
          ]);

          setApi(apiKey);
          setFreeTranslation(freeTrans);
          setTradingServerLink(serverLink);
        } catch (error) {
          console.error('Error loading user data:', error);
        }
      } else {
        setUser(null);
        setIsAdmin(false);
      }

      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, setIsAdmin, setIsLoading, setApi, setFreeTranslation, setTradingServerLink]);
}
