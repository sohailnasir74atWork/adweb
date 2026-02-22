'use client';

import { Settings, Moon, Sun, Monitor, LogOut, Trash2, Globe } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { auth } from '@/lib/firebase/config';
import { signOut } from 'firebase/auth';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

function SettingsContent() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      logout();
      router.push('/');
      toast.success('Signed out');
    } catch (err) {
      console.error('Error signing out:', err);
      toast.error('Failed to sign out');
    }
  };

  const themeOptions = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Monitor },
  ] as const;

  return (
    <div className="flex flex-col gap-6 max-w-xl mx-auto">
      {/* Theme */}
      <Card className="p-4">
        <h2 className="font-semibold mb-3">Appearance</h2>
        <div className="flex gap-2">
          {themeOptions.map((opt) => {
            const Icon = opt.icon;
            return (
              <button
                key={opt.value}
                onClick={() => setTheme(opt.value)}
                className={cn(
                  'flex-1 flex flex-col items-center gap-1.5 rounded-xl border p-3 transition-colors',
                  theme === opt.value
                    ? 'border-app-primary bg-app-primary/10'
                    : 'border-border hover:bg-accent',
                )}
              >
                <Icon className={cn('h-5 w-5', theme === opt.value && 'text-app-primary')} />
                <span className="text-xs font-medium">{opt.label}</span>
              </button>
            );
          })}
        </div>
      </Card>

      {/* Account info */}
      <Card className="p-4">
        <h2 className="font-semibold mb-3">Account</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Email</span>
            <span className="font-medium">{user?.email || user?.decodedEmail}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Pro Status</span>
            <span className="font-medium">{user?.isPro ? 'Active' : 'Free'}</span>
          </div>
        </div>
      </Card>

      {/* Actions */}
      <Card className="p-4">
        <h2 className="font-semibold mb-3">Actions</h2>
        <div className="flex flex-col gap-2">
          <Button
            variant="outline"
            onClick={handleLogout}
            className="justify-start gap-2"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
          <Separator />
          <Button
            variant="ghost"
            className="justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => toast.info('Delete account coming soon. Contact support.')}
          >
            <Trash2 className="h-4 w-4" />
            Delete Account
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Settings className="h-8 w-8 text-muted-foreground" />
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>
      <AuthGuard>
        <SettingsContent />
      </AuthGuard>
    </div>
  );
}
