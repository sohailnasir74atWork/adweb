'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { SignInModal } from '@/components/auth/SignInModal';
import { useEffect } from 'react';

export default function LoginPage() {
  const [open, setOpen] = useState(true);
  const router = useRouter();
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <SignInModal
        open={open}
        onOpenChange={(v) => {
          setOpen(v);
          if (!v) router.push('/');
        }}
      />
    </div>
  );
}
