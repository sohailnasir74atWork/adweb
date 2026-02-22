'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { useIsMobile } from '@/lib/hooks/useMediaQuery';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Calculator,
  Menu,
  Moon,
  Sun,
  TrendingUp,
  Handshake,
  Image as ImageIcon,
  MessageCircle,
  BarChart3,
  Newspaper,
  LogIn,
  Home,
} from 'lucide-react';
import { UserMenu } from '@/components/auth/UserMenu';
import { useState } from 'react';

const NAV_LINKS = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/values', label: 'Values', icon: TrendingUp },
  { href: '/calculator', label: 'Calculator', icon: Calculator },
  { href: '/trades', label: 'Trades', icon: Handshake },
  { href: '/feed', label: 'Feed', icon: ImageIcon },
  { href: '/chat', label: 'Chat', icon: MessageCircle },
  { href: '/analytics', label: 'Trending', icon: BarChart3 },
  { href: '/news', label: 'News', icon: Newspaper },
];

export function Header() {
  const { theme, setTheme } = useTheme();
  const user = useAuthStore((s) => s.user);
  const isMobile = useIsMobile();
  const [sheetOpen, setSheetOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Left: Logo + Nav */}
        <div className="flex items-center gap-3">
          {isMobile && (
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="tap-target lg:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 pt-10">
                <nav className="flex flex-col gap-1">
                  {NAV_LINKS.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setSheetOpen(false)}
                        className="tap-target flex items-center gap-3 rounded-2xl px-4 py-3 text-base font-semibold hover:bg-accent transition-colors"
                      >
                        <Icon className="h-5 w-5 text-muted-foreground" />
                        {link.label}
                      </Link>
                    );
                  })}
                </nav>
              </SheetContent>
            </Sheet>
          )}

          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-app-primary text-white font-extrabold text-sm shadow-sm">
              AM
            </div>
            <span className="hidden font-extrabold sm:inline-block text-lg tracking-tight">
              Adopt Me Values
            </span>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden lg:flex items-center gap-0.5 ml-6">
            {NAV_LINKS.filter((l) => l.href !== '/').map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="tap-target px-3.5 py-2 text-sm font-semibold rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right: Theme toggle + User */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="tap-target h-10 w-10 rounded-xl"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {user ? (
            <UserMenu />
          ) : (
            <Link href="/login">
              <Button className="tap-target rounded-xl bg-app-primary hover:bg-app-primary/90 text-white font-bold px-5">
                <LogIn className="h-4 w-4 mr-1.5" />
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
