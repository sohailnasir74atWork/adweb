import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Clock, Star, Sparkles, Egg, TrendingUp, Shield, ArrowRight, Zap, Crown, Palette, BarChart3, Gift, Gamepad2 } from 'lucide-react';
import { getLocalizedAlternates } from '@/lib/utils/seoHelpers';
import { JsonLd } from '@/components/seo/JsonLd';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const { canonical, languages } = getLocalizedAlternates('/blog/silverback-gorilla-guide', locale);
    return {
        title: '🦍 Silverback Gorilla in Adopt Me — Complete Guide: Value, How to Get, Neon & Mega Neon (2026)',
        description: 'Everything kids need to know about the BRAND NEW Legendary Silverback Gorilla in Adopt Me 2026! Hatch rates (0.1% Crystal Egg, 0.01% Basic Egg), trading value, tricks, Neon & Mega Neon forms, and super smart trading tips! 🎮',
        alternates: { canonical, languages },
        openGraph: {
            title: '🦍 Silverback Gorilla Guide — Adopt Me Values 2026',
            description: 'Complete guide to the new Legendary Silverback Gorilla pet in Adopt Me! Value, hatch rates, tricks, and awesome Neon/Mega Neon info.',
            images: ['/blog-silverback-gorilla.webp'],
        },
    };
}

export const revalidate = 86400;

export default async function SilverbackGorillaArticle({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);

    const articleJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Silverback Gorilla in Adopt Me — Complete Guide: Value, How to Get, Neon & Mega Neon (2026)',
        description: 'Everything you need to know about the Legendary Silverback Gorilla in Adopt Me 2026.',
        image: 'https://www.adoptmevalues.app/blog-silverback-gorilla.webp',
        datePublished: '2026-02-28',
        dateModified: '2026-02-28',
        author: { '@type': 'Organization', name: 'Adopt Me Values', url: 'https://www.adoptmevalues.app' },
        publisher: {
            '@type': 'Organization',
            name: 'Adopt Me Values',
            logo: { '@type': 'ImageObject', url: 'https://www.adoptmevalues.app/logo.webp' },
        },
        mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://www.adoptmevalues.app/blog/silverback-gorilla-guide' },
        keywords: ['Silverback Gorilla', 'Adopt Me', 'Legendary Pet', 'Roblox', 'Crystal Egg', 'Basic Egg', 'Neon', 'Mega Neon', 'Trading Value', '2026'],
    };

    const faqJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
            { '@type': 'Question', name: 'How do you get the Silverback Gorilla in Adopt Me?', acceptedAnswer: { '@type': 'Answer', text: 'The Silverback Gorilla can be hatched from a Crystal Egg (0.1% chance) or a Basic Egg (0.01% chance). During launch week, it was also available for purchase using tickets.' } },
            { '@type': 'Question', name: 'What is the Silverback Gorilla worth in Adopt Me?', acceptedAnswer: { '@type': 'Answer', text: 'The Silverback Gorilla is a Legendary pet with a high trading value. Check our live value tracker for the latest price.' } },
            { '@type': 'Question', name: 'What does a Neon Silverback Gorilla look like?', acceptedAnswer: { '@type': 'Answer', text: 'The Neon Silverback Gorilla glows across its entire body, face, and ears with a bright neon light effect. The Mega Neon version cycles through rainbow colors.' } },
            { '@type': 'Question', name: 'What pet did the Silverback Gorilla replace?', acceptedAnswer: { '@type': 'Answer', text: 'The Silverback Gorilla replaced the Giant Panda as the Legendary pet in both the Crystal Egg and the Basic Egg.' } },
            { '@type': 'Question', name: 'How many Silverback Gorillas do you need for Mega Neon?', acceptedAnswer: { '@type': 'Answer', text: 'You need 16 Full-Grown Silverback Gorillas to create one Mega Neon.' } },
            { '@type': 'Question', name: 'Is the Silverback Gorilla worth trading for right now?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, but prices are highest right after release. If buying, consider waiting 2-3 weeks for prices to stabilize.' } },
        ],
    };

    const breadcrumbJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.adoptmevalues.app' },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.adoptmevalues.app/blog' },
            { '@type': 'ListItem', position: 3, name: 'Silverback Gorilla Guide' },
        ],
    };

    return (
        <article className="flex flex-col gap-8">
            <JsonLd data={articleJsonLd} />
            <JsonLd data={faqJsonLd} />
            <JsonLd data={breadcrumbJsonLd} />

            {/* Breadcrumbs */}
            <nav className="flex items-center gap-1 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
                <ChevronRight className="h-3.5 w-3.5" />
                <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
                <ChevronRight className="h-3.5 w-3.5" />
                <span className="text-foreground font-medium">🦍 Silverback Gorilla</span>
            </nav>

            {/* ===== HERO SECTION ===== */}
            <div className="rounded-3xl overflow-hidden relative" style={{ background: 'linear-gradient(135deg, #0f4c3a, #1a6b4f, #237a5b)' }}>
                <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at 80% 20%, #6bcb77 0%, transparent 60%), radial-gradient(circle at 20% 80%, #4d96ff 0%, transparent 60%)' }} />
                <div className="relative p-6 sm:p-8 lg:p-10 flex flex-col gap-5">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-400/20 text-emerald-300 backdrop-blur-sm border border-emerald-400/20">🦍 New Pet</span>
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 backdrop-blur-sm border border-amber-400/20">⭐ Legendary</span>
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-400/20 text-rose-300 backdrop-blur-sm border border-rose-400/20">🔥 Super Rare</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
                        Silverback Gorilla
                        <span className="block text-emerald-300 text-xl sm:text-2xl lg:text-3xl font-bold mt-1">Complete Guide 2026</span>
                    </h1>
                    <p className="text-emerald-100/80 text-sm max-w-xl">Everything you need to know — value, hatch rates, tricks, Neon & Mega Neon forms, and expert trading tips!</p>
                    <div className="flex items-center gap-4 text-emerald-200/60 text-xs">
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> 8 min read</span>
                        <span>Feb 28, 2026</span>
                        <span>By Adopt Me Values Team</span>
                    </div>
                </div>
            </div>

            {/* ===== FEATURED IMAGE ===== */}
            <div className="blog-hero-overlay border">
                <div className="relative w-full aspect-video">
                    <Image src="/blog-silverback-gorilla.webp" alt="Silverback Gorilla Legendary Pet in Adopt Me 2026" fill className="object-cover" sizes="(max-width: 768px) 100vw, 896px" priority />
                </div>
            </div>

            {/* ===== QUICK STATS — Visual Grid ===== */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                    { label: 'Type', value: 'Pet', icon: '🐾', bg: 'from-violet-500/10 to-violet-500/5', border: 'border-violet-500/20' },
                    { label: 'Rarity', value: 'Legendary', icon: '⭐', bg: 'from-amber-500/10 to-amber-500/5', border: 'border-amber-500/20', valueColor: 'text-amber-500' },
                    { label: 'Released', value: 'Feb 27, 2026', icon: '📅', bg: 'from-blue-500/10 to-blue-500/5', border: 'border-blue-500/20' },
                    { label: 'Replaces', value: 'Giant Panda', icon: '🐼', bg: 'from-emerald-500/10 to-emerald-500/5', border: 'border-emerald-500/20' },
                    { label: 'Crystal Egg', value: '0.1%', icon: '💎', bg: 'from-purple-500/10 to-purple-500/5', border: 'border-purple-500/20', valueColor: 'text-purple-500' },
                    { label: 'Basic Egg', value: '0.01%', icon: '🥚', bg: 'from-rose-500/10 to-rose-500/5', border: 'border-rose-500/20', valueColor: 'text-rose-500' },
                ].map((stat) => (
                    <div key={stat.label} className={`rounded-2xl p-4 bg-gradient-to-br ${stat.bg} border ${stat.border} text-center`}>
                        <div className="text-2xl mb-1">{stat.icon}</div>
                        <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">{stat.label}</div>
                        <div className={`text-sm font-extrabold mt-0.5 ${stat.valueColor || ''}`}>{stat.value}</div>
                    </div>
                ))}
            </div>

            {/* ===== INTRO ===== */}
            <div className="rounded-2xl border bg-card p-6">
                <h2 className="text-xl font-extrabold mb-3 flex items-center gap-2">
                    <span className="h-8 w-8 rounded-xl bg-emerald-500/10 flex items-center justify-center text-lg">🦍</span>
                    What Is the Silverback Gorilla?
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    The Silverback Gorilla is a <strong>Legendary pet</strong> added on February 27, 2026. Named after real-world silverback gorillas — the powerful leaders with a silver-white patch on their backs! 🦍
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    It <strong>replaces the Giant Panda</strong> in both the Crystal Egg and Basic Egg, making the Panda a limited trade-only pet now! 🎯
                </p>
            </div>

            {/* ===== HOW TO GET — Visual Cards ===== */}
            <div>
                <h2 className="text-xl font-extrabold mb-4 flex items-center gap-2">
                    <span className="h-8 w-8 rounded-xl bg-violet-500/10 flex items-center justify-center text-lg">🥚</span>
                    How to Get It
                </h2>
                <div className="grid sm:grid-cols-3 gap-3">
                    <div className="rounded-2xl border-2 border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-transparent p-5 relative overflow-hidden">
                        <div className="absolute top-3 right-3 text-3xl opacity-20">💎</div>
                        <div className="text-2xl mb-2">💎</div>
                        <h3 className="font-extrabold text-sm mb-1">Crystal Egg</h3>
                        <div className="text-2xl font-black text-purple-500 mb-1">0.1%</div>
                        <p className="text-xs text-muted-foreground">Costs 4,000 Bucks. Best odds — roughly 1 in 1,000 eggs!</p>
                        <div className="mt-3 px-2 py-1 rounded-lg bg-purple-500/10 text-[10px] font-bold text-purple-600 dark:text-purple-400 inline-block">RECOMMENDED</div>
                    </div>
                    <div className="rounded-2xl border-2 border-rose-500/20 bg-gradient-to-br from-rose-500/5 to-transparent p-5 relative overflow-hidden">
                        <div className="absolute top-3 right-3 text-3xl opacity-20">🥚</div>
                        <div className="text-2xl mb-2">🥚</div>
                        <h3 className="font-extrabold text-sm mb-1">Basic Egg</h3>
                        <div className="text-2xl font-black text-rose-500 mb-1">0.01%</div>
                        <p className="text-xs text-muted-foreground">Only 400 Bucks but 1 in 10,000 chance. Extremely lucky!</p>
                        <div className="mt-3 px-2 py-1 rounded-lg bg-rose-500/10 text-[10px] font-bold text-rose-600 dark:text-rose-400 inline-block">ULTRA RARE</div>
                    </div>
                    <div className="rounded-2xl border-2 border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-transparent p-5 relative overflow-hidden">
                        <div className="absolute top-3 right-3 text-3xl opacity-20">🤝</div>
                        <div className="text-2xl mb-2">🤝</div>
                        <h3 className="font-extrabold text-sm mb-1">Trading</h3>
                        <div className="text-2xl font-black text-blue-500 mb-1">Trade</div>
                        <p className="text-xs text-muted-foreground">Get it directly from other players. Prices are high at launch!</p>
                        <div className="mt-3 px-2 py-1 rounded-lg bg-blue-500/10 text-[10px] font-bold text-blue-600 dark:text-blue-400 inline-block">FASTEST WAY</div>
                    </div>
                </div>
            </div>

            {/* ===== PRO TIP BANNER ===== */}
            <div className="rounded-2xl p-5 flex items-start gap-4" style={{ background: 'linear-gradient(135deg, rgba(255,217,61,0.1), rgba(255,163,107,0.08))' }}>
                <div className="h-10 w-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-xl flex-shrink-0">💡</div>
                <div>
                    <p className="font-bold text-sm mb-1">Pro Tip!</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">During launch week, the Silverback Gorilla was also available using <strong>Tickets</strong> — but that window has closed! From here on, hatching and trading are your only options. Start saving those Bucks!</p>
                </div>
            </div>

            {/* ===== TRADING VALUE ===== */}
            <div className="rounded-2xl border bg-card p-6">
                <h2 className="text-xl font-extrabold mb-4 flex items-center gap-2">
                    <span className="h-8 w-8 rounded-xl bg-rose-500/10 flex items-center justify-center text-lg">💰</span>
                    Trading Value
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    Currently <strong className="text-emerald-500">VERY HIGH</strong> 📈 — one of the most valuable Crystal Egg legendaries!
                </p>
                <div className="grid grid-cols-2 gap-3">
                    {[
                        { icon: '🔥', title: 'Extreme Rarity', desc: '0.1% Crystal / 0.01% Basic hatch rate', color: 'border-rose-500/20 bg-rose-500/5' },
                        { icon: '✨', title: 'Newness Premium', desc: 'Brand new = high demand, low supply', color: 'border-amber-500/20 bg-amber-500/5' },
                        { icon: '😍', title: 'Design Appeal', desc: 'Community loves the unique gorilla look', color: 'border-emerald-500/20 bg-emerald-500/5' },
                        { icon: '🌈', title: 'Neon Potential', desc: 'Stunning full-body glow forms', color: 'border-violet-500/20 bg-violet-500/5' },
                    ].map((item) => (
                        <div key={item.title} className={`rounded-xl border p-3 ${item.color}`}>
                            <div className="text-xl mb-1">{item.icon}</div>
                            <div className="font-bold text-xs">{item.title}</div>
                            <div className="text-[11px] text-muted-foreground mt-0.5">{item.desc}</div>
                        </div>
                    ))}
                </div>
                <div className="mt-4 rounded-xl bg-emerald-500/5 border border-emerald-500/15 p-3 text-xs text-muted-foreground">
                    <strong>💡 Our tip:</strong> Buying? Wait 2-3 weeks for prices to chill. Selling? NOW is the time to get max value! Check our <Link href="/values" className="font-bold underline">live value list</Link> for up-to-date data.
                </div>
            </div>

            {/* ===== TRICKS TABLE ===== */}
            <div>
                <h2 className="text-xl font-extrabold mb-4 flex items-center gap-2">
                    <span className="h-8 w-8 rounded-xl bg-cyan-500/10 flex items-center justify-center text-lg">🎪</span>
                    Tricks by Growth Stage
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                    {[
                        { stage: 'Newborn', trick: 'Sit', emoji: '🥚', color: 'from-rose-500/10 to-rose-500/5 border-rose-500/20' },
                        { stage: 'Junior', trick: 'Joyful', emoji: '👶', color: 'from-orange-500/10 to-orange-500/5 border-orange-500/20' },
                        { stage: 'Pre-Teen', trick: 'Beg', emoji: '📚', color: 'from-amber-500/10 to-amber-500/5 border-amber-500/20' },
                        { stage: 'Teen', trick: 'Jump', emoji: '🎒', color: 'from-emerald-500/10 to-emerald-500/5 border-emerald-500/20' },
                        { stage: 'Post-Teen', trick: 'Trick 1', emoji: '🌟', color: 'from-blue-500/10 to-blue-500/5 border-blue-500/20' },
                        { stage: 'Full Grown', trick: 'Trick 2', emoji: '👑', color: 'from-purple-500/10 to-purple-500/5 border-purple-500/20' },
                    ].map((item) => (
                        <div key={item.stage} className={`rounded-xl border bg-gradient-to-br ${item.color} p-3 text-center`}>
                            <div className="text-2xl mb-1">{item.emoji}</div>
                            <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">{item.stage}</div>
                            <div className="text-sm font-extrabold mt-0.5">{item.trick}</div>
                        </div>
                    ))}
                </div>
                <p className="text-xs text-muted-foreground mt-3 pl-1">⚡ Most players reach Full Grown in 6-8 hours. Use Auto-Age gadgets from Sky Castle to speed it up!</p>
            </div>

            {/* ===== NEON & MEGA NEON — Side by Side ===== */}
            <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-2xl p-6 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(107,203,119,0.1), rgba(77,150,255,0.08))' }}>
                    <div className="absolute -bottom-4 -right-4 text-[80px] opacity-10">🌟</div>
                    <h2 className="text-lg font-extrabold mb-3 flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-emerald-500" /> Neon Form
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">The gorilla&apos;s <strong>entire body, face, and ears GLOW</strong> with bright neon light! Unlike many pets where only feet/ears light up — this one glows ALL OVER! 🤩</p>
                    <div className="space-y-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-2"><span className="h-5 w-5 rounded bg-emerald-500/20 flex items-center justify-center text-[10px]">1</span> Raise <strong>4 Gorillas</strong> to Full Grown</div>
                        <div className="flex items-center gap-2"><span className="h-5 w-5 rounded bg-emerald-500/20 flex items-center justify-center text-[10px]">2</span> Go to the <strong>Neon Cave</strong></div>
                        <div className="flex items-center gap-2"><span className="h-5 w-5 rounded bg-emerald-500/20 flex items-center justify-center text-[10px]">3</span> Place on circles & combine!</div>
                    </div>
                </div>
                <div className="rounded-2xl p-6 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(155,89,182,0.1), rgba(255,107,107,0.08))' }}>
                    <div className="absolute -bottom-4 -right-4 text-[80px] opacity-10">🌈</div>
                    <h2 className="text-lg font-extrabold mb-3 flex items-center gap-2">
                        <Crown className="h-5 w-5 text-violet-500" /> Mega Neon Form
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">Full-body glow that <strong>cycles through the entire RAINBOW</strong> — red, orange, yellow, green, blue, purple! Absolutely mind-blowing! 🌈</p>
                    <div className="space-y-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-2"><span className="h-5 w-5 rounded bg-violet-500/20 flex items-center justify-center text-[10px]">1</span> Raise <strong>4 Neon Gorillas</strong> to Luminous</div>
                        <div className="flex items-center gap-2"><span className="h-5 w-5 rounded bg-violet-500/20 flex items-center justify-center text-[10px]">2</span> Combine in Neon Cave</div>
                        <div className="flex items-center gap-2"><span className="h-5 w-5 rounded bg-violet-500/20 flex items-center justify-center text-[10px]">3</span> Need <strong>16 total</strong> Gorillas!</div>
                    </div>
                </div>
            </div>

            {/* ===== DESIGN FEATURES ===== */}
            <div className="rounded-2xl border bg-card p-6">
                <h2 className="text-xl font-extrabold mb-4 flex items-center gap-2">
                    <span className="h-8 w-8 rounded-xl bg-pink-500/10 flex items-center justify-center"><Palette className="h-4 w-4 text-pink-500" /></span>
                    Design & Appearance
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                        { icon: '💪', feature: 'Body', desc: 'Sturdy muscular build, adorable rounded proportions' },
                        { icon: '🦍', feature: 'Fur', desc: 'Dark gray with signature silver-white back patch' },
                        { icon: '👀', feature: 'Face', desc: 'Big friendly brown eyes, slightly smirky expression' },
                        { icon: '✋', feature: 'Hands', desc: 'Oversized & stubby in classic Adopt Me style' },
                        { icon: '🎬', feature: 'Animations', desc: 'Chest-beating & head-tilting idle animations!' },
                        { icon: '⭐', feature: 'Overall', desc: 'One of the most detailed pet designs ever!' },
                    ].map((item) => (
                        <div key={item.feature} className="flex items-start gap-2.5 p-2">
                            <span className="text-xl flex-shrink-0 mt-0.5">{item.icon}</span>
                            <div>
                                <div className="font-bold text-xs">{item.feature}</div>
                                <div className="text-[11px] text-muted-foreground">{item.desc}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ===== TRADING TIPS ===== */}
            <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-2xl border-2 border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-transparent p-5">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="h-9 w-9 rounded-xl bg-emerald-500/15 flex items-center justify-center"><TrendingUp className="h-4 w-4 text-emerald-500" /></div>
                        <span className="font-extrabold text-sm">🎉 If You Hatched One</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">Trade within the first 1-2 weeks for BEST value! Demand is highest right now. Consider trading for multiple proven legendaries instead of one single pet! 📈</p>
                </div>
                <div className="rounded-2xl border-2 border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-transparent p-5">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="h-9 w-9 rounded-xl bg-blue-500/15 flex items-center justify-center"><Shield className="h-4 w-4 text-blue-500" /></div>
                        <span className="font-extrabold text-sm">🛒 If You&apos;re Buying</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">Be patient! Wait 2-3 weeks for the hype to settle. Always use our Trade Calculator and check the Scammer Database before big trades! 🛡️</p>
                </div>
            </div>

            {/* ===== FAQ — Modern Cards ===== */}
            <div>
                <h2 className="text-xl font-extrabold mb-4 flex items-center gap-2">
                    <span className="h-8 w-8 rounded-xl bg-cyan-500/10 flex items-center justify-center text-lg">❓</span>
                    Frequently Asked Questions
                </h2>
                <div className="grid gap-3">
                    {[
                        { q: 'How do you get the Silverback Gorilla?', a: 'Hatch from Crystal Egg (0.1%) or Basic Egg (0.01%), or trade for it! Launch-week Tickets are no longer available.', color: '#ff6b6b' },
                        { q: 'What is the Silverback Gorilla worth?', a: 'One of the most valuable Crystal Egg pets right now! Check our live value tracker for real-time pricing. 📊', color: '#ffa36b' },
                        { q: 'What does a Neon Silverback Gorilla look like?', a: 'Glows across entire body, face, and ears! Mega Neon cycles through ALL rainbow colors continuously! ✨', color: '#ffd93d' },
                        { q: 'What pet did it replace?', a: 'Replaced the Giant Panda in Crystal and Basic Eggs on Feb 27, 2026. Giant Panda is now trade-only!', color: '#6bcb77' },
                        { q: 'Is it worth trading for?', a: 'Absolutely! Wait 2-3 weeks for best deals. Crystal Egg legendaries always appreciate after being replaced! 🎯', color: '#4d96ff' },
                        { q: 'How many for Mega Neon?', a: '16 Full-Grown Silverback Gorillas total — 4 per Neon, and 4 Neons for the Mega! 🌈🏆', color: '#9b59b6' },
                    ].map((faq, i) => (
                        <div key={i} className="rounded-xl border p-4 hover:shadow-md transition-all" style={{ borderLeftWidth: 4, borderLeftColor: faq.color, background: `linear-gradient(135deg, ${faq.color}08, transparent)` }}>
                            <div className="flex items-start gap-3">
                                <span className="h-6 w-6 rounded-lg flex items-center justify-center text-white text-[11px] font-black flex-shrink-0 mt-0.5" style={{ background: faq.color }}>{i + 1}</span>
                                <div>
                                    <p className="font-bold text-sm mb-1">{faq.q}</p>
                                    <p className="text-xs text-muted-foreground leading-relaxed">{faq.a}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ===== CTA ===== */}
            <div className="rounded-3xl p-8 text-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f4c3a, #1a6b4f, #2d8a6b)' }}>
                <div className="absolute inset-0 opacity-15" style={{ background: 'radial-gradient(circle at 30% 50%, #6bcb77 0%, transparent 60%), radial-gradient(circle at 70% 50%, #4d96ff 0%, transparent 60%)' }} />
                <div className="relative">
                    <p className="text-3xl mb-2">🦍</p>
                    <h3 className="font-black text-xl text-white mb-2">Check the Latest Value!</h3>
                    <p className="text-sm text-emerald-200/70 mb-5">Use our free tools to stay ahead of every trade</p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link href="/values" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white whitespace-nowrap" style={{ background: 'linear-gradient(135deg, #9b59b6, #6c3483)', minWidth: 150 }}>
                            <TrendingUp className="h-4 w-4" /> Value List
                        </Link>
                        <Link href="/calculator" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white whitespace-nowrap" style={{ background: 'linear-gradient(135deg, #6bcb77, #27ae60)', minWidth: 150 }}>
                            Calculator <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    );
}
