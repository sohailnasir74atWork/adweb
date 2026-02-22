import { create } from 'zustand';
import type { User } from '@/lib/types/user';

interface AuthState {
  user: User | null;
  isAdmin: boolean;
  isLoading: boolean;
  api: string | null;
  freeTranslation: boolean;
  tradingServerLink: string | null;
  // Actions
  setUser: (user: User | null) => void;
  setIsAdmin: (isAdmin: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  setApi: (api: string | null) => void;
  setFreeTranslation: (free: boolean) => void;
  setTradingServerLink: (link: string | null) => void;
  updateUser: (updates: Partial<User>) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAdmin: false,
  isLoading: true,
  api: null,
  freeTranslation: false,
  tradingServerLink: null,

  setUser: (user) => set({ user }),
  setIsAdmin: (isAdmin) => set({ isAdmin }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setApi: (api) => set({ api }),
  setFreeTranslation: (freeTranslation) => set({ freeTranslation }),
  setTradingServerLink: (tradingServerLink) => set({ tradingServerLink }),

  updateUser: (updates) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...updates } : null,
    })),

  logout: () =>
    set({
      user: null,
      isAdmin: false,
      api: null,
      freeTranslation: false,
      tradingServerLink: null,
    }),
}));
