'use client';

import dynamic from 'next/dynamic';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useFirebaseAuth } from '@/lib/hooks/useFirebaseAuth';
import { usePresence } from '@/lib/hooks/usePresence';
import { BanGuard } from '@/components/auth/BanGuard';

const CookieConsent = dynamic(
  () => import('@/components/shared/CookieConsent').then(m => ({ default: m.CookieConsent })),
  { ssr: false }
);

function AuthInitializer({ children }: { children: React.ReactNode }) {
  useFirebaseAuth();
  usePresence();
  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider>
        <AuthInitializer>
          <BanGuard>
            {children}
          </BanGuard>
          <Toaster richColors position="top-right" />
          <CookieConsent />
        </AuthInitializer>
      </TooltipProvider>
    </ThemeProvider>
  );
}

