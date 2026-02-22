'use client';

import Link from 'next/link';
import { config } from '@/lib/constants/config';
import { Heart, Smartphone } from 'lucide-react';

const LINKS = [
  { href: '/values', label: 'Values' },
  { href: '/calculator', label: 'Calculator' },
  { href: '/trades', label: 'Trades' },
  { href: '/chat', label: 'Chat' },
  { href: '/analytics', label: 'Trending' },
  { href: '/news', label: 'News' },
];

export function Footer() {
  return (
    <footer className="hidden lg:block mt-auto">
      <div className="h-0.5 bg-gradient-to-r from-rose-500 via-violet-500 to-emerald-500" />
      <div className="bg-slate-950 text-white">
        <div className="mx-auto max-w-5xl px-6 py-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Brand */}
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-rose-500 to-orange-400 text-white font-extrabold text-xs">
                AM
              </div>
              <span className="font-extrabold text-sm tracking-tight">Adopt Me Values</span>
            </div>

            {/* Links */}
            <nav className="flex flex-wrap items-center gap-3">
              {LINKS.map((link) => (
                <Link key={link.href} href={link.href} className="text-xs text-slate-400 hover:text-white transition-colors">
                  {link.label}
                </Link>
              ))}
              <span className="text-slate-700">|</span>
              <a href={config.androidLink} target="_blank" rel="noopener noreferrer" className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1">
                <Smartphone className="h-3 w-3" /> Android
              </a>
              <a href={config.iosLink} target="_blank" rel="noopener noreferrer" className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1">
                <Smartphone className="h-3 w-3" /> iOS
              </a>
            </nav>

            {/* Copyright */}
            <p className="text-[10px] text-slate-600 flex items-center gap-1">
              © {new Date().getFullYear()} {config.appName} <Heart className="h-2.5 w-2.5 text-rose-500 fill-rose-500" /> Not affiliated with Roblox.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
