'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { useIsMobile } from '@/lib/hooks/useMediaQuery';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';
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
  ShieldAlert,
  Newspaper,
  LogIn,
  Home,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { UserMenu } from '@/components/auth/UserMenu';
import { useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';

export function Header() {
  const { theme, setTheme } = useTheme();
  const user = useAuthStore((s) => s.user);
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const [sheetOpen, setSheetOpen] = useState(false);
  const t = useTranslations();

  // Scroll state for YouTube-style arrows
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const NAV_LINKS = [
    { href: '/', label: t('nav.home'), icon: Home },
    { href: '/values', label: t('nav.values'), icon: TrendingUp },
    { href: '/calculator', label: t('nav.calculator'), icon: Calculator },
    { href: '/trades', label: t('nav.trades'), icon: Handshake },
    { href: '/feed', label: t('nav.feed'), icon: ImageIcon },
    { href: '/chat', label: t('nav.chat'), icon: MessageCircle },
    { href: '/analytics', label: t('analytics.title'), icon: BarChart3 },
    { href: '/scammer', label: t('scammer.title'), icon: ShieldAlert },
    { href: '/news', label: t('news.title'), icon: Newspaper },
  ];

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' || (pathname.split('/').length === 2 && pathname !== '/') : pathname.includes(href);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    const ro = new ResizeObserver(checkScroll);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      ro.disconnect();
    };
  }, [checkScroll]);

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === 'left' ? -200 : 200, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top row: Logo + Actions */}
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-3">
          {isMobile && (
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="tap-target lg:hidden" aria-label="Open menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 pt-10">
                <nav className="flex flex-col gap-1" aria-label="Main navigation">
                  {NAV_LINKS.map((link) => {
                    const Icon = link.icon;
                    const active = isActive(link.href);
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setSheetOpen(false)}
                        aria-current={active ? 'page' : undefined}
                        className={cn(
                          'tap-target flex items-center gap-3 rounded-2xl px-4 py-3 text-base font-semibold transition-colors',
                          active
                            ? 'bg-app-tab-active text-app-primary'
                            : 'hover:bg-accent',
                        )}
                      >
                        <Icon className={cn('h-5 w-5', active ? 'text-app-primary' : 'text-muted-foreground')} />
                        {link.label}
                      </Link>
                    );
                  })}
                </nav>
              </SheetContent>
            </Sheet>
          )}

          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/logo.webp"
              alt="Adopt Me Values"
              width={36}
              height={36}
              className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl shadow-sm"
              priority
            />
            <span className="hidden font-extrabold sm:inline-block text-lg tracking-tight">
              Adopt Me Values
            </span>
          </Link>
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

          <LanguageSwitcher />

          {user ? (
            <UserMenu />
          ) : (
            <Link href="/login">
              <Button className="tap-target rounded-xl bg-app-primary hover:bg-app-primary/90 text-white font-bold px-5">
                <LogIn className="h-4 w-4 mr-1.5" />
                {t('common.signIn')}
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Bottom row: YouTube-style scrollable chip bar (desktop) */}
      <div className="hidden lg:block border-t border-border/40">
        <div className="mx-auto max-w-7xl relative">
          {/* Left arrow */}
          {canScrollLeft && (
            <div className="absolute left-0 top-0 bottom-0 z-10 flex items-center">
              <div className="h-full w-16 bg-gradient-to-r from-background via-background/80 to-transparent flex items-center pl-1">
                <button
                  onClick={() => scroll('left')}
                  className="h-8 w-8 rounded-full bg-background border shadow-sm flex items-center justify-center hover:bg-accent transition-colors"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* Right arrow */}
          {canScrollRight && (
            <div className="absolute right-0 top-0 bottom-0 z-10 flex items-center">
              <div className="h-full w-16 bg-gradient-to-l from-background via-background/80 to-transparent flex items-center justify-end pr-1">
                <button
                  onClick={() => scroll('right')}
                  className="h-8 w-8 rounded-full bg-background border shadow-sm flex items-center justify-center hover:bg-accent transition-colors"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* Scrollable chips */}
          <div
            ref={scrollRef}
            className="flex items-center gap-1.5 overflow-x-auto no-scrollbar px-4 py-2"
          >
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'flex items-center gap-1.5 whitespace-nowrap px-4 py-1.5 text-sm font-semibold rounded-lg transition-all border',
                    active
                      ? 'bg-foreground text-background border-foreground'
                      : 'bg-transparent text-foreground border-border hover:bg-accent',
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
