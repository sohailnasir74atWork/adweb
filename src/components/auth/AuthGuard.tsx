'use client';

import { useState } from 'react';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { SignInModal } from './SignInModal';
import { Skeleton } from '@/components/ui/skeleton';

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function AuthGuard({ children, fallback }: AuthGuardProps) {
  const user = useAuthStore((s) => s.user);
  const isLoading = useAuthStore((s) => s.isLoading);
  const [showSignIn, setShowSignIn] = useState(false);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 p-8">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (!user) {
    return (
      <>
        {fallback || (
          <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
            <h2 className="text-2xl font-bold">Sign in required</h2>
            <p className="text-muted-foreground max-w-md">
              You need to be signed in to access this page.
            </p>
            <button
              onClick={() => setShowSignIn(true)}
              className="rounded-lg bg-app-primary px-6 py-2.5 text-white font-medium hover:bg-app-primary/90 transition-colors"
            >
              Sign In
            </button>
          </div>
        )}
        <SignInModal open={showSignIn} onOpenChange={setShowSignIn} />
      </>
    );
  }

  return <>{children}</>;
}
