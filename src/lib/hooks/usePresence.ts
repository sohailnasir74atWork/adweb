'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { setupPresence } from '@/lib/firebase/database';

export function usePresence() {
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    if (!user?.id) return;

    const cleanup = setupPresence(user.id);
    return cleanup;
  }, [user?.id]);
}
