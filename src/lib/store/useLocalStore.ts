import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Pet } from '@/lib/types/pet';

interface LocalState {
  isPro: boolean;
  data: Record<string, Pet[]>;
  favorites: string[];
  bannedUsers: string[];
  theme: 'light' | 'dark' | 'system';
  fetchDataTime: string | null;
  translationUsage: { count: number; date: string };
  postsCache: unknown[];
  tradingServerLink: string | null;
  lastServerFetch: string | null;
  // Actions
  setIsPro: (isPro: boolean) => void;
  setData: (data: Record<string, Pet[]>) => void;
  setFetchDataTime: (time: string) => void;
  addFavorite: (petName: string) => void;
  removeFavorite: (petName: string) => void;
  toggleFavorite: (petName: string) => void;
  addBannedUser: (userId: string) => void;
  removeBannedUser: (userId: string) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setTradingServerLink: (link: string | null) => void;
  setLastServerFetch: (time: string | null) => void;
  setTranslationUsage: (usage: { count: number; date: string }) => void;
  clearAll: () => void;
}

const initialState = {
  isPro: false,
  data: {},
  favorites: [],
  bannedUsers: [],
  theme: 'system' as const,
  fetchDataTime: null,
  translationUsage: { count: 0, date: '' },
  postsCache: [],
  tradingServerLink: null,
  lastServerFetch: null,
};

export const useLocalStore = create<LocalState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setIsPro: (isPro) => set({ isPro }),
      setData: (data) => set({ data }),
      setFetchDataTime: (fetchDataTime) => set({ fetchDataTime }),

      addFavorite: (petName) =>
        set((state) => ({
          favorites: state.favorites.includes(petName)
            ? state.favorites
            : [...state.favorites, petName],
        })),

      removeFavorite: (petName) =>
        set((state) => ({
          favorites: state.favorites.filter((f) => f !== petName),
        })),

      toggleFavorite: (petName) => {
        const { favorites } = get();
        if (favorites.includes(petName)) {
          set({ favorites: favorites.filter((f) => f !== petName) });
        } else {
          set({ favorites: [...favorites, petName] });
        }
      },

      addBannedUser: (userId) =>
        set((state) => ({
          bannedUsers: state.bannedUsers.includes(userId)
            ? state.bannedUsers
            : [...state.bannedUsers, userId],
        })),

      removeBannedUser: (userId) =>
        set((state) => ({
          bannedUsers: state.bannedUsers.filter((u) => u !== userId),
        })),

      setTheme: (theme) => set({ theme }),
      setTradingServerLink: (tradingServerLink) => set({ tradingServerLink }),
      setLastServerFetch: (lastServerFetch) => set({ lastServerFetch }),
      setTranslationUsage: (translationUsage) => set({ translationUsage }),

      clearAll: () => set(initialState),
    }),
    {
      name: 'adoptme-local-storage',
      partialize: (state) => ({
        isPro: state.isPro,
        favorites: state.favorites,
        bannedUsers: state.bannedUsers,
        theme: state.theme,
        translationUsage: state.translationUsage,
        tradingServerLink: state.tradingServerLink,
        lastServerFetch: state.lastServerFetch,
      }),
    },
  ),
);
