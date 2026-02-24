'use client';

import Link from 'next/link';
import Image from 'next/image';
import { config } from '@/lib/constants/config';
import { Heart, Smartphone } from 'lucide-react';
import { useTranslations } from 'next-intl';

const LEGAL_LINKS = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/disclaimer', label: 'Disclaimer' },
];

export function Footer() {
  const t = useTranslations();

  const SITE_LINKS = [
    { href: '/values', label: t('nav.values') },
    { href: '/calculator', label: t('nav.calculator') },
    { href: '/trades', label: t('nav.trades') },
    { href: '/chat', label: t('nav.chat') },
    { href: '/analytics', label: t('analytics.title') },
    { href: '/news', label: t('news.title') },
  ];

  return (
    <footer className="hidden lg:block mt-auto">
      <div className="h-0.5 bg-gradient-to-r from-rose-500 via-violet-500 to-emerald-500" />
      <div className="bg-slate-950 text-white">
        <div className="mx-auto max-w-5xl px-6 py-6">
          <div className="grid grid-cols-4 gap-8">
            {/* Brand + copyright */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Image src="/logo.webp" alt="Adopt Me Values" width={28} height={28} className="h-7 w-7 rounded-lg" />
                <span className="font-extrabold text-sm tracking-tight">Adopt Me Values</span>
              </div>
              <p className="text-[10px] text-slate-600 flex items-center gap-1">
                © {new Date().getFullYear()} {config.appName} <Heart className="h-2.5 w-2.5 text-rose-500 fill-rose-500" /> Not affiliated with Roblox.
              </p>
            </div>

            {/* Site links */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Explore</span>
              <nav className="flex flex-col gap-1" aria-label="Explore pages">
                {SITE_LINKS.map((link) => (
                  <Link key={link.href} href={link.href} className="text-xs text-slate-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Legal links */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Legal</span>
              <nav className="flex flex-col gap-1" aria-label="Legal pages">
                {LEGAL_LINKS.map((link) => (
                  <Link key={link.href} href={link.href} className="text-xs text-slate-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Apps */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Apps</span>
              <nav className="flex flex-col gap-1" aria-label="Download apps">
                <a href={config.androidLink} target="_blank" rel="noopener noreferrer" className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1">
                  <Smartphone className="h-3 w-3" /> Android
                </a>
                <a href={config.iosLink} target="_blank" rel="noopener noreferrer" className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1">
                  <Smartphone className="h-3 w-3" /> iOS
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
