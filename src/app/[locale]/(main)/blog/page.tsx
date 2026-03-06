import Link from 'next/link';
import { ChevronRight, Newspaper, Clock, TrendingUp, Sparkles } from 'lucide-react';
import { getLocalizedAlternates } from '@/lib/utils/seoHelpers';
import { JsonLd } from '@/components/seo/JsonLd';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const { canonical, languages } = getLocalizedAlternates('/blog', locale);
    return {
        title: 'Adopt Me Blog — Fun Guides, Pet Reviews & Trading Tips for Kids 2026',
        description: 'Read super fun Adopt Me guides, cool new pet reviews, smart trading strategies, and the latest value updates! Your go-to Roblox Adopt Me blog for kids in 2026. 🐾',
        alternates: { canonical, languages },
    };
}

const ARTICLES = [
    {
        slug: 'silverback-gorilla-guide',
        title: '🦍 Silverback Gorilla — Complete Guide: Value, How to Get, Neon & Mega Neon!',
        excerpt: 'OMG the Silverback Gorilla is HERE! 🔥 Learn the hatch rates, trading value, coolest tricks, and how to make Neon & Mega Neon forms. This guide has EVERYTHING!',
        date: 'February 28, 2026',
        readTime: '8 min read',
        tag: '🦍 New Pet',
        tagColor: 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-400',
        accentFrom: 'from-emerald-400',
        accentTo: 'to-cyan-400',
    },
    {
        slug: 'chocolate-chip-bat-dragon-backpack-guide',
        title: '🎒 Chocolate Chip Bat Dragon Backpack — Complete Guide: Value & Trading Tips!',
        excerpt: 'This animated backpack is SO CUTE! 🍫🐉 Get the full scoop on shop rotation, chest drop rates, the 25K Bucks price, and the smartest ways to trade for it!',
        date: 'February 28, 2026',
        readTime: '7 min read',
        tag: '🎒 Accessory',
        tagColor: 'bg-violet-500/20 text-violet-700 dark:text-violet-400',
        accentFrom: 'from-violet-400',
        accentTo: 'to-rose-400',
    },
    {
        slug: 'blue-whale-guide',
        title: '🐋 Blue Whale — Complete Guide: Value, How to Get, Neon & Mega Neon!',
        excerpt: 'The BIGGEST animal on Earth is now a pet! 🌊 Learn everything about the Legendary Blue Whale — value, hatch odds, Neon glow, and smart trading strategies!',
        date: 'March 2, 2026',
        readTime: '7 min read',
        tag: '⭐ Legendary',
        tagColor: 'bg-amber-500/20 text-amber-700 dark:text-amber-400',
        accentFrom: 'from-blue-400',
        accentTo: 'to-cyan-400',
    },
    {
        slug: 'sea-turtle-guide',
        title: '🐢 Sea Turtle — Complete Guide: Value, How to Get, Neon & Mega Neon!',
        excerpt: 'The ocean\'s ancient traveler is yours to adopt! 🌊 Full breakdown on the Legendary Sea Turtle — value, tricks, gorgeous shell Neon glow, and trade tips!',
        date: 'March 2, 2026',
        readTime: '7 min read',
        tag: '⭐ Legendary',
        tagColor: 'bg-amber-500/20 text-amber-700 dark:text-amber-400',
        accentFrom: 'from-emerald-400',
        accentTo: 'to-teal-400',
    },
    {
        slug: 'pangolin-guide',
        title: '🦎 Pangolin — Complete Guide: Value, How to Get, Neon & Mega Neon!',
        excerpt: 'The scaly armored buddy is here! 🦎 Everything about the Ultra Rare Pangolin — trading value, Neon glowing scales, tricks, and trade strategies!',
        date: 'March 2, 2026',
        readTime: '6 min read',
        tag: '💜 Ultra Rare',
        tagColor: 'bg-purple-500/20 text-purple-700 dark:text-purple-400',
        accentFrom: 'from-amber-400',
        accentTo: 'to-orange-400',
    },
    {
        slug: 'black-footed-ferret-guide',
        title: '🦡 Black-Footed Ferret — Complete Guide: Value, Neon & Mega Neon!',
        excerpt: 'This sneaky little ninja weasel is SO cool! 🦡 Full guide to the Ultra Rare Black-Footed Ferret — bandit mask glow, value, and trading tips!',
        date: 'March 2, 2026',
        readTime: '6 min read',
        tag: '💜 Ultra Rare',
        tagColor: 'bg-purple-500/20 text-purple-700 dark:text-purple-400',
        accentFrom: 'from-amber-600',
        accentTo: 'to-stone-400',
    },
    {
        slug: 'mexican-wolf-guide',
        title: '🐺 Mexican Wolf — Complete Guide: Value, Neon & Mega Neon!',
        excerpt: 'Build your wolf pack! 🐺 Full guide to the Rare Mexican Wolf — glowing eyes, smart trade moves, and why wolf lovers are stacking these!',
        date: 'March 2, 2026',
        readTime: '5 min read',
        tag: '💙 Rare',
        tagColor: 'bg-blue-500/20 text-blue-700 dark:text-blue-400',
        accentFrom: 'from-gray-400',
        accentTo: 'to-slate-400',
    },
    {
        slug: 'black-rhino-guide',
        title: '🦏 Black Rhino — Complete Guide: Value, Neon & Mega Neon!',
        excerpt: 'This armored tank is adorable! 🦏 Full guide to the Rare Black Rhino — glowing horn, chunky design, and why it\'s perfect for bundling trades!',
        date: 'March 2, 2026',
        readTime: '5 min read',
        tag: '💙 Rare',
        tagColor: 'bg-blue-500/20 text-blue-700 dark:text-blue-400',
        accentFrom: 'from-gray-500',
        accentTo: 'to-zinc-400',
    },
    {
        slug: 'black-tiger-guide',
        title: '🐅 Black Tiger — Complete Guide: Value, Neon & Mega Neon!',
        excerpt: 'Looks Legendary, priced Uncommon! 🐅 The Black Tiger\'s dark design is INSANE — glowing stripes against black fur, trade tips, and why it\'s a sleeper hit!',
        date: 'March 2, 2026',
        readTime: '5 min read',
        tag: '💚 Uncommon',
        tagColor: 'bg-green-500/20 text-green-700 dark:text-green-400',
        accentFrom: 'from-orange-400',
        accentTo: 'to-amber-400',
    },
    {
        slug: 'kakapo-guide',
        title: '🦜 Kakapo — Complete Guide: Value, Neon & Mega Neon!',
        excerpt: 'The chubby flightless parrot is a meme legend! 🦜 Full guide to the Uncommon Kakapo — funny freeze animation, lime green Neon glow, and why fans love it!',
        date: 'March 2, 2026',
        readTime: '5 min read',
        tag: '💚 Uncommon',
        tagColor: 'bg-green-500/20 text-green-700 dark:text-green-400',
        accentFrom: 'from-lime-400',
        accentTo: 'to-green-400',
    },
    {
        slug: 'galapagos-sea-lion-guide',
        title: '🦭 Galapagos Sea Lion — Complete Guide: Value, Neon & Mega Neon!',
        excerpt: 'This playful sea pup is the cutest Common ever! 🦭 Perfect for Neon makers — easy to get, surprisingly pretty Neon glow, and ocean vibes!',
        date: 'March 2, 2026',
        readTime: '4 min read',
        tag: '⚪ Common',
        tagColor: 'bg-gray-500/20 text-gray-700 dark:text-gray-400',
        accentFrom: 'from-blue-300',
        accentTo: 'to-cyan-300',
    },
    {
        slug: 'california-condor-guide',
        title: '🦅 California Condor — Complete Guide: Value, Neon & Mega Neon!',
        excerpt: 'The biggest flying bird in North America! 🦅 Guide to the Common California Condor — massive wingspan, epic Neon glow, and a real conservation success story!',
        date: 'March 2, 2026',
        readTime: '4 min read',
        tag: '⚪ Common',
        tagColor: 'bg-gray-500/20 text-gray-700 dark:text-gray-400',
        accentFrom: 'from-stone-400',
        accentTo: 'to-gray-400',
    },
];

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);

    const blogJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'Adopt Me Values Blog',
        description: 'Fun guides, pet reviews, and trading tips for Roblox Adopt Me — made for kids!',
        url: 'https://www.adoptmevalues.app/blog',
    };

    return (
        <div className="flex flex-col gap-8">
            <JsonLd data={blogJsonLd} />

            {/* Fun colorful header */}
            <div className="text-center">
                <div className="inline-flex items-center gap-2 mb-3">
                    <span className="text-3xl">🐾</span>
                    <Newspaper className="h-7 w-7 sm:h-9 sm:w-9 text-violet-500" />
                    <span className="text-3xl">✨</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold blog-heading-gradient">
                    Adopt Me Blog
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base mt-2 max-w-lg mx-auto">
                    🎮 Your favorite guides, new pet reviews, trading tips, and value updates for Roblox Adopt Me 2026! 🚀
                </p>
            </div>

            <hr className="blog-divider" />

            {/* Articles grid */}
            <div className="grid gap-6">
                {ARTICLES.map((article) => (
                    <Link key={article.slug} href={`/blog/${article.slug}`}>
                        <article className="blog-card bg-card p-5 sm:p-6 cursor-pointer">
                            <div className="flex items-center gap-2 mb-3">
                                <span className={`blog-tag ${article.tagColor}`}>
                                    {article.tag}
                                </span>
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Clock className="h-3 w-3" /> {article.readTime}
                                </span>
                            </div>
                            <h2 className="text-lg sm:text-xl font-extrabold leading-tight mb-2">{article.title}</h2>
                            <p className="text-sm text-muted-foreground leading-relaxed">{article.excerpt}</p>
                            <div className="flex items-center justify-between mt-4">
                                <p className="text-xs text-muted-foreground">{article.date}</p>
                                <span className="text-xs font-bold text-violet-500 flex items-center gap-1">
                                    Read More <Sparkles className="h-3 w-3" />
                                </span>
                            </div>
                        </article>
                    </Link>
                ))}
            </div>
        </div>
    );
}
