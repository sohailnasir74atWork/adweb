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
];

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);

    const blogJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'Adopt Me Values Blog',
        description: 'Fun guides, pet reviews, and trading tips for Roblox Adopt Me — made for kids!',
        url: 'https://adoptmevalues.app/blog',
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
