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

const CONFIG_CACHE_KEY = 'fb_config_cache';
const CONFIG_CACHE_TTL = 60 * 60 * 1000; // 1 hour

interface CachedConfig {
  apiKey: string | null;
  freeTranslation: boolean;
  tradingServerLink: string | null;
  timestamp: number;
}

function getCachedConfig(): CachedConfig | null {
  try {
    const raw = localStorage.getItem(CONFIG_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CachedConfig;
    if (Date.now() - parsed.timestamp > CONFIG_CACHE_TTL) return null;
    return parsed;
  } catch {
    return null;
  }
}

function setCachedConfig(config: Omit<CachedConfig, 'timestamp'>) {
  try {
    localStorage.setItem(CONFIG_CACHE_KEY, JSON.stringify({ ...config, timestamp: Date.now() }));
  } catch {
    // localStorage might be full or disabled
  }
}

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

          // Use cached config if fresh, otherwise fetch from RTDB
          const cached = getCachedConfig();
          if (cached) {
            setApi(cached.apiKey);
            setFreeTranslation(cached.freeTranslation);
            setTradingServerLink(cached.tradingServerLink);
          } else {
            const [apiKey, freeTrans, serverLink] = await Promise.all([
              getApiKey(),
              getFreeTranslation(),
              getTradingServerLink(),
            ]);

            setApi(apiKey);
            setFreeTranslation(freeTrans);
            setTradingServerLink(serverLink);

            setCachedConfig({
              apiKey,
              freeTranslation: freeTrans,
              tradingServerLink: serverLink,
            });
          }
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
