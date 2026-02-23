'use client';

import Image from 'next/image';
import { config } from '@/lib/constants/config';
import { Star, Download } from 'lucide-react';

export function AppDownloadBanner() {
    return (
        <section className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-3 relative overflow-hidden">
            {/* Glow */}
            <div className="absolute -top-10 -right-10 w-28 h-28 bg-rose-500/20 rounded-full blur-2xl pointer-events-none" />

            {/* Logo + name row */}
            <div className="flex items-center gap-2 mb-2">
                <Image src="/logo.webp" alt="Adopt Me Values" width={32} height={32} className="h-8 w-8 rounded-xl" />
                <div>
                    <p className="text-sm font-extrabold text-white leading-none">Get the App!</p>
                    <div className="flex items-center gap-0.5 mt-0.5">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />
                        ))}
                        <span className="text-[9px] text-slate-400 ml-1">100K+</span>
                    </div>
                </div>
            </div>

            {/* Two store buttons — compact */}
            <div className="flex gap-1.5">
                <a
                    href={config.iosLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 bg-white text-slate-900 rounded-lg py-1.5 px-2 text-[11px] font-bold hover:scale-[1.03] active:scale-[0.97] transition-transform"
                >
                    <svg className="h-3.5 w-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                    iOS
                </a>
                <a
                    href={config.androidLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 bg-white/10 text-white rounded-lg py-1.5 px-2 text-[11px] font-bold border border-white/10 hover:scale-[1.03] active:scale-[0.97] transition-transform"
                >
                    <svg className="h-3.5 w-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302a1 1 0 0 1 0 1.38l-1.907 1.098-2.548-2.547 2.153-2.233zM5.864 2.658L16.8 8.99l-2.302 2.302-8.635-8.635z" />
                    </svg>
                    Android
                </a>
            </div>
        </section>
    );
}
