'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calculator, Handshake, Home, MessageCircle, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const TABS = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/values', label: 'Values', icon: TrendingUp },
  { href: '/calculator', label: 'Check', icon: Calculator },
  { href: '/trades', label: 'Trade', icon: Handshake },
  { href: '/chat', label: 'Chat', icon: MessageCircle },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 lg:hidden safe-area-bottom">
      <div className="mx-auto flex h-[68px] max-w-md items-center justify-around px-1 pb-1">
        {TABS.map((tab) => {
          const isActive =
            tab.href === '/'
              ? pathname === '/'
              : pathname.startsWith(tab.href);
          const Icon = tab.icon;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                'tap-target flex flex-col items-center justify-center gap-1 rounded-2xl px-4 py-2 text-[11px] font-bold transition-all min-w-[60px]',
                isActive
                  ? 'bg-app-tab-active text-app-primary scale-105'
                  : 'text-muted-foreground hover:text-foreground active:scale-95',
              )}
            >
              <Icon className={cn('h-6 w-6', isActive && 'text-app-primary')} />
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
