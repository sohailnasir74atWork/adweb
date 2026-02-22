'use client';

import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useFirebaseAuth } from '@/lib/hooks/useFirebaseAuth';
import { usePresence } from '@/lib/hooks/usePresence';

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
          {children}
          <Toaster richColors position="top-right" />
        </AuthInitializer>
      </TooltipProvider>
    </ThemeProvider>
  );
}
