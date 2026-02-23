'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Calculator, Handshake, Home, Image as ImageIcon, MessageCircle, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const TABS = [
  { href: '/', key: 'home', icon: Home },
  { href: '/values', key: 'values', icon: TrendingUp },
  { href: '/calculator', key: 'calculator', icon: Calculator },
  { href: '/trades', key: 'trades', icon: Handshake },
  { href: '/feed', key: 'feed', icon: ImageIcon },
  { href: '/chat', key: 'chat', icon: MessageCircle },
];

export function MobileNav() {
  const pathname = usePathname();
  const t = useTranslations('nav');

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 lg:hidden safe-area-bottom" aria-label="Bottom navigation">
      <div className="mx-auto flex h-[56px] max-w-md items-center justify-around px-1 pb-0.5">
        {TABS.map((tab) => {
          const isActive =
            tab.href === '/'
              ? pathname === '/' || pathname === `/${pathname.split('/')[1]}` && pathname.split('/').length === 2
              : pathname.includes(tab.href);
          const Icon = tab.icon;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                'tap-target flex flex-col items-center justify-center gap-0.5 rounded-2xl px-3 py-1.5 text-[10px] font-bold transition-all min-w-[56px]',
                isActive
                  ? 'bg-app-tab-active text-app-primary scale-105'
                  : 'text-muted-foreground hover:text-foreground active:scale-95',
              )}
            >
              <Icon className={cn('h-5 w-5', isActive && 'text-app-primary')} />
              <span>{t(tab.key)}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
