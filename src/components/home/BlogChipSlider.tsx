'use client';

import Link from 'next/link';

const CHIPS = [
    { slug: 'sea-turtle-guide', label: '🐢 Sea Turtle', color: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/25' },
    { slug: 'blue-whale-guide', label: '🐋 Blue Whale', color: 'bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/25' },
    { slug: 'silverback-gorilla-guide', label: '🦍 Silverback Gorilla', color: 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/25' },
    { slug: 'mexican-wolf-guide', label: '🐺 Mexican Wolf', color: 'bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-500/25' },
    { slug: 'black-rhino-guide', label: '🦏 Black Rhino', color: 'bg-stone-500/15 text-stone-700 dark:text-stone-300 border-stone-500/25' },
    { slug: 'black-tiger-guide', label: '🐅 Black Tiger', color: 'bg-orange-500/15 text-orange-700 dark:text-orange-300 border-orange-500/25' },
    { slug: 'kakapo-guide', label: '🦜 Kakapo', color: 'bg-lime-500/15 text-lime-700 dark:text-lime-300 border-lime-500/25' },
    { slug: 'galapagos-sea-lion-guide', label: '🦭 Sea Lion', color: 'bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border-cyan-500/25' },
    { slug: 'california-condor-guide', label: '🦅 California Condor', color: 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/25' },
    { slug: 'chocolate-chip-bat-dragon-backpack-guide', label: '🎒 Bat Dragon Backpack', color: 'bg-violet-500/15 text-violet-700 dark:text-violet-300 border-violet-500/25' },
];

export default function BlogChipSlider() {
    // Duplicate chips for seamless infinite loop
    const allChips = [...CHIPS, ...CHIPS];

    return (
        <div className="w-full overflow-hidden py-1">
            {/* Label */}
            <div className="flex items-center gap-2 mb-2 px-1">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">🔥 New Guides</span>
                <div className="h-px flex-1 bg-border" />
                <Link href="/blog" className="text-[10px] font-bold text-violet-500 hover:text-violet-400 transition-colors">
                    View All →
                </Link>
            </div>

            {/* Marquee track */}
            <div className="chip-slider-track">
                <div className="chip-slider-content">
                    {allChips.map((chip, i) => (
                        <Link
                            key={`${chip.slug}-${i}`}
                            href={`/blog/${chip.slug}`}
                            className={`inline-flex items-center gap-1 sm:gap-1.5 whitespace-nowrap rounded-full border px-2 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-bold transition-all hover:scale-105 hover:shadow-md active:scale-95 ${chip.color}`}
                        >
                            {chip.label}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
