import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Clock, Sparkles, TrendingUp, Shield, ArrowRight, Crown, Palette } from 'lucide-react';
import { getLocalizedAlternates } from '@/lib/utils/seoHelpers';
import { JsonLd } from '@/components/seo/JsonLd';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const { canonical, languages } = getLocalizedAlternates('/blog/mexican-wolf-guide', locale);
    return {
        title: '🐺 Mexican Wolf in Adopt Me — Complete Guide: Value, How to Get, Neon & Mega Neon (2026)',
        description: 'Full guide to the Rare Mexican Wolf in Adopt Me 2026! 10% hatch rate from Endangered Egg, tricks, pink Neon glow on ears/nose/feet, and trading tips! 🎮',
        alternates: { canonical, languages },
        openGraph: {
            title: '🐺 Mexican Wolf Guide — Adopt Me Values 2026',
            description: 'Complete guide to the Rare Mexican Wolf in Adopt Me! 10% hatch rate, pink Neon glow, and tips.',
            images: ['/blog-mexican-wolf.webp'],
        },
    };
}

export const revalidate = 86400;

export default async function MexicanWolfArticle({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);

    const articleJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Mexican Wolf in Adopt Me — Complete Guide: Value, How to Get, Neon & Mega Neon (2026)',
        description: 'Everything about the Rare Mexican Wolf in Adopt Me 2026.',
        datePublished: '2026-03-02',
        dateModified: '2026-03-02',
        author: { '@type': 'Organization', name: 'Adopt Me Values', url: 'https://www.adoptmevalues.app' },
        publisher: { '@type': 'Organization', name: 'Adopt Me Values', logo: { '@type': 'ImageObject', url: 'https://www.adoptmevalues.app/logo.webp' } },
        mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://www.adoptmevalues.app/blog/mexican-wolf-guide' },
        image: 'https://www.adoptmevalues.app/blog-mexican-wolf.webp',
        keywords: ['Mexican Wolf', 'Adopt Me', 'Rare Pet', 'Roblox', 'Endangered Egg', 'Neon', 'Mega Neon', 'Trading Value', '2026'],
    };

    const faqJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
            { '@type': 'Question', name: 'How do you get the Mexican Wolf in Adopt Me?', acceptedAnswer: { '@type': 'Answer', text: 'The Mexican Wolf can be hatched from the Endangered Egg (10% chance, 750 Bucks), Basic Egg, or Crystal Egg. You can also trade for one.' } },
            { '@type': 'Question', name: 'What does a Neon Mexican Wolf look like?', acceptedAnswer: { '@type': 'Answer', text: 'The Neon Mexican Wolf glows pink on the insides and tips of its ears, the fur above its nose, the tips of its cheek fluff, its tail tip, and its feet.' } },
            { '@type': 'Question', name: 'What is the Mexican Wolf hatch rate?', acceptedAnswer: { '@type': 'Answer', text: 'The Mexican Wolf has a 10% hatch chance from the Endangered Egg. The total Rare hatch rate is 27%, split between Mexican Wolf and Black Rhino.' } },
            { '@type': 'Question', name: 'How many Mexican Wolves for Mega Neon?', acceptedAnswer: { '@type': 'Answer', text: 'You need 16 Full-Grown Mexican Wolves — 4 for each Neon, and 4 Neons for the Mega Neon.' } },
            { '@type': 'Question', name: 'Is the Mexican Wolf endangered in real life?', acceptedAnswer: { '@type': 'Answer', text: 'Yes! The Mexican Wolf (Canis lupus baileyi) is recognized as endangered by the U.S. Fish and Wildlife Service. They nearly went extinct by the mid-1980s but were saved through captive breeding programs.' } },
            { '@type': 'Question', name: 'What tricks does the Mexican Wolf learn?', acceptedAnswer: { '@type': 'Answer', text: 'Newborn: Sit, Junior: Joyful, Pre-Teen: Beg, Teen: Jump, Post-Teen: Trick 1, Full Grown: Trick 2.' } },
        ],
    };

    const breadcrumbJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.adoptmevalues.app' },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.adoptmevalues.app/blog' },
            { '@type': 'ListItem', position: 3, name: 'Mexican Wolf Guide' },
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
                <span className="text-foreground font-medium">🐺 Mexican Wolf</span>
            </nav>

            {/* ===== HERO ===== */}
            <div className="rounded-3xl overflow-hidden relative" style={{ background: 'linear-gradient(135deg, #374151, #4b5563, #6b7280)' }}>
                <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at 80% 20%, #f9a8d4 0%, transparent 60%), radial-gradient(circle at 20% 80%, #9ca3af 0%, transparent 60%)' }} />
                <div className="relative p-6 sm:p-8 lg:p-10 flex flex-col gap-5">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-400/20 text-gray-300 backdrop-blur-sm border border-gray-400/20">🐺 New Pet</span>
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-400/20 text-blue-300 backdrop-blur-sm border border-blue-400/20">💙 Rare</span>
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-pink-400/20 text-pink-300 backdrop-blur-sm border border-pink-400/20">🩷 Pink Neon Glow</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
                        Mexican Wolf
                        <span className="block text-gray-300 text-xl sm:text-2xl lg:text-3xl font-bold mt-1">Complete Guide 2026</span>
                    </h1>
                    <p className="text-gray-200/80 text-sm max-w-xl">This fierce little wolf has a beautiful pink Neon glow! Full breakdown — 10% hatch rate, trading value, tricks, and expert tips.</p>
                    <div className="flex items-center gap-4 text-gray-300/60 text-xs">
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> 6 min read</span>
                        <span>Feb 28, 2026</span>
                        <span>By Adopt Me Values Team</span>
                    </div>
                </div>
            </div>

            {/* ===== FEATURED IMAGE ===== */}
            <div className="blog-hero-overlay border">
                <div className="relative w-full aspect-video">
                    <Image src="/blog-mexican-wolf.webp" alt="Mexican Wolf Rare Pet in Adopt Me 2026" fill className="object-cover" sizes="(max-width: 768px) 100vw, 896px" priority />
                </div>
            </div>

            {/* ===== QUICK STATS ===== */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                    { label: 'Type', value: 'Pet', icon: '🐾', bg: 'from-violet-500/10 to-violet-500/5', border: 'border-violet-500/20' },
                    { label: 'Rarity', value: 'Rare', icon: '💙', bg: 'from-blue-500/10 to-blue-500/5', border: 'border-blue-500/20', valueColor: 'text-blue-500' },
                    { label: 'Released', value: 'Feb 28, 2026', icon: '📅', bg: 'from-cyan-500/10 to-cyan-500/5', border: 'border-cyan-500/20' },
                    { label: 'Endangered Egg', value: '10%', icon: '🥚', bg: 'from-emerald-500/10 to-emerald-500/5', border: 'border-emerald-500/20', valueColor: 'text-emerald-500' },
                    { label: 'Egg Cost', value: '750 Bucks', icon: '💰', bg: 'from-rose-500/10 to-rose-500/5', border: 'border-rose-500/20' },
                    { label: 'Neon Color', value: 'Pink', icon: '🩷', bg: 'from-pink-500/10 to-pink-500/5', border: 'border-pink-500/20', valueColor: 'text-pink-500' },
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
                    <span className="h-8 w-8 rounded-xl bg-gray-500/10 flex items-center justify-center text-lg">🐺</span>
                    What Is the Mexican Wolf?
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    The Mexican Wolf is a <strong>Rare pet</strong> released on February 28, 2026 with the Endangered Egg update! Also known as &quot;El Lobo,&quot; the Mexican Wolf (<em>Canis lupus baileyi</em>) is the rarest subspecies of gray wolf in North America. They nearly went extinct by the mid-1980s but were saved through captive breeding programs! 🌎
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    With a <strong>10% hatch rate</strong> from the Endangered Egg (750 Bucks), it&apos;s one of two Rare pets alongside the Black Rhino. The total Rare hatch chance is 27%, so you&apos;ve got good odds! Perfect for building a wolf pack in your inventory. 🐺
                </p>
            </div>

            {/* ===== HOW TO GET ===== */}
            <div>
                <h2 className="text-xl font-extrabold mb-4 flex items-center gap-2">
                    <span className="h-8 w-8 rounded-xl bg-violet-500/10 flex items-center justify-center text-lg">🥚</span>
                    How to Get It
                </h2>
                <div className="grid sm:grid-cols-3 gap-3">
                    <div className="rounded-2xl border-2 border-gray-500/20 bg-gradient-to-br from-gray-500/5 to-transparent p-5 relative overflow-hidden">
                        <div className="absolute top-3 right-3 text-3xl opacity-20">🥚</div>
                        <div className="text-2xl mb-2">🥚</div>
                        <h3 className="font-extrabold text-sm mb-1">Endangered Egg</h3>
                        <div className="text-2xl font-black text-gray-500 mb-1">10%</div>
                        <p className="text-xs text-muted-foreground">Costs 750 Bucks. Roughly 1 in 10 eggs — very achievable!</p>
                        <div className="mt-3 px-2 py-1 rounded-lg bg-gray-500/10 text-[10px] font-bold text-gray-600 dark:text-gray-400 inline-block">GOOD ODDS</div>
                    </div>
                    <div className="rounded-2xl border-2 border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-transparent p-5 relative overflow-hidden">
                        <div className="absolute top-3 right-3 text-3xl opacity-20">💎</div>
                        <div className="text-2xl mb-2">💎</div>
                        <h3 className="font-extrabold text-sm mb-1">Basic Egg / Crystal Egg</h3>
                        <div className="text-2xl font-black text-purple-500 mb-1">Also Available</div>
                        <p className="text-xs text-muted-foreground">Basic Egg (400 Bucks) or Crystal Egg (4,000 Bucks) can also hatch it!</p>
                        <div className="mt-3 px-2 py-1 rounded-lg bg-purple-500/10 text-[10px] font-bold text-purple-600 dark:text-purple-400 inline-block">ALTERNATIVE</div>
                    </div>
                    <div className="rounded-2xl border-2 border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-transparent p-5 relative overflow-hidden">
                        <div className="absolute top-3 right-3 text-3xl opacity-20">🤝</div>
                        <div className="text-2xl mb-2">🤝</div>
                        <h3 className="font-extrabold text-sm mb-1">Trading</h3>
                        <div className="text-2xl font-black text-blue-500 mb-1">Trade</div>
                        <p className="text-xs text-muted-foreground">Easy to find in trades since it&apos;s Rare! Very affordable.</p>
                        <div className="mt-3 px-2 py-1 rounded-lg bg-blue-500/10 text-[10px] font-bold text-blue-600 dark:text-blue-400 inline-block">AFFORDABLE</div>
                    </div>
                </div>
            </div>

            {/* ===== PRO TIP ===== */}
            <div className="rounded-2xl p-5 flex items-start gap-4" style={{ background: 'linear-gradient(135deg, rgba(249,168,212,0.1), rgba(244,114,182,0.08))' }}>
                <div className="h-10 w-10 rounded-xl bg-pink-500/20 flex items-center justify-center text-xl flex-shrink-0">�</div>
                <div>
                    <p className="font-bold text-sm mb-1">Pro Tip!</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">The Mexican Wolf has one of the most detailed Neon glow patterns for a Rare pet — <strong>pink glow</strong> on ear insides and tips, nose fur, cheek fluff tips, tail tip, and feet! That&apos;s 5+ glow areas, which is unusual for Rare rarity. Making it Neon really bumps the value! 🩷✨</p>
                </div>
            </div>

            {/* ===== TRADING VALUE ===== */}
            <div className="rounded-2xl border bg-card p-6">
                <h2 className="text-xl font-extrabold mb-4 flex items-center gap-2">
                    <span className="h-8 w-8 rounded-xl bg-rose-500/10 flex items-center justify-center text-lg">💰</span>
                    Trading Value
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    Currently <strong className="text-blue-500">LOW-MODERATE</strong> — Rare tier with a 10% hatch rate, so supply is decent. Great for bundling!
                </p>
                <div className="grid grid-cols-2 gap-3">
                    {[
                        { icon: '🐺', title: 'Wolf Appeal', desc: 'Wolf lovers always want one for their pack', color: 'border-gray-500/20 bg-gray-500/5' },
                        { icon: '🩷', title: 'Pink Neon Glow', desc: '5+ glow areas is impressive for a Rare!', color: 'border-pink-500/20 bg-pink-500/5' },
                        { icon: '🌍', title: 'Real-World Story', desc: 'Endangered species adds collector appeal', color: 'border-emerald-500/20 bg-emerald-500/5' },
                        { icon: '📦', title: 'Bundle Power', desc: 'Great for combining in multi-pet trades', color: 'border-violet-500/20 bg-violet-500/5' },
                    ].map((item) => (
                        <div key={item.title} className={`rounded-xl border p-3 ${item.color}`}>
                            <div className="text-xl mb-1">{item.icon}</div>
                            <div className="font-bold text-xs">{item.title}</div>
                            <div className="text-[11px] text-muted-foreground mt-0.5">{item.desc}</div>
                        </div>
                    ))}
                </div>
                <div className="mt-4 rounded-xl bg-blue-500/5 border border-blue-500/15 p-3 text-xs text-muted-foreground">
                    <strong>💡 Our tip:</strong> Bundle with other Rares or make Neon — Neon Mexican Wolf is worth significantly more than 4x the regular value because of that pink glow! Check our <Link href="/values" className="font-bold underline">live value list</Link> for real-time pricing.
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

            {/* ===== NEON & MEGA NEON ===== */}
            <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-2xl p-6 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(249,168,212,0.1), rgba(244,114,182,0.08))' }}>
                    <div className="absolute -bottom-4 -right-4 text-[80px] opacity-10">🌟</div>
                    <h2 className="text-lg font-extrabold mb-3 flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-pink-500" /> Neon Form
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">The Mexican Wolf <strong>glows pink</strong> on the insides and tips of its ears, the fur above its nose, the tips of its cheek fluff, its tail tip, and its feet! That&apos;s an incredible amount of glow detail for a Rare pet! 🩷✨</p>
                    <div className="space-y-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-2"><span className="h-5 w-5 rounded bg-pink-500/20 flex items-center justify-center text-[10px]">1</span> Raise <strong>4 Wolves</strong> to Full Grown</div>
                        <div className="flex items-center gap-2"><span className="h-5 w-5 rounded bg-pink-500/20 flex items-center justify-center text-[10px]">2</span> Go to the <strong>Neon Cave</strong></div>
                        <div className="flex items-center gap-2"><span className="h-5 w-5 rounded bg-pink-500/20 flex items-center justify-center text-[10px]">3</span> Place on circles & combine!</div>
                    </div>
                </div>
                <div className="rounded-2xl p-6 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(155,89,182,0.1), rgba(255,107,107,0.08))' }}>
                    <div className="absolute -bottom-4 -right-4 text-[80px] opacity-10">🌈</div>
                    <h2 className="text-lg font-extrabold mb-3 flex items-center gap-2">
                        <Crown className="h-5 w-5 text-violet-500" /> Mega Neon Form
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">All the pink glow areas <strong>cycle through the entire rainbow</strong> — ears, nose, cheeks, tail, and feet all shifting colors! A rainbow wolf is next-level cool! 🌈🐺</p>
                    <div className="space-y-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-2"><span className="h-5 w-5 rounded bg-violet-500/20 flex items-center justify-center text-[10px]">1</span> Raise <strong>4 Neon Wolves</strong> to Luminous</div>
                        <div className="flex items-center gap-2"><span className="h-5 w-5 rounded bg-violet-500/20 flex items-center justify-center text-[10px]">2</span> Combine in Neon Cave</div>
                        <div className="flex items-center gap-2"><span className="h-5 w-5 rounded bg-violet-500/20 flex items-center justify-center text-[10px]">3</span> Need <strong>16 total</strong> Wolves!</div>
                    </div>
                </div>
            </div>

            {/* ===== TRADING TIPS ===== */}
            <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-2xl border-2 border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-transparent p-5">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="h-9 w-9 rounded-xl bg-emerald-500/15 flex items-center justify-center"><TrendingUp className="h-4 w-4 text-emerald-500" /></div>
                        <span className="font-extrabold text-sm">🎉 If You Have One</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">Bundle with other Rares for bigger trades! The pink Neon is worth making — 5+ glow areas is rare for a Rare pet. Stack 4 and make it Neon to multiply value! 📈</p>
                </div>
                <div className="rounded-2xl border-2 border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-transparent p-5">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="h-9 w-9 rounded-xl bg-blue-500/15 flex items-center justify-center"><Shield className="h-4 w-4 text-blue-500" /></div>
                        <span className="font-extrabold text-sm">🛒 If You Want One</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">At 10% hatch rate, just buy a few Endangered Eggs (750 Bucks each) and you&apos;ll get one! No need to overpay in trades — save your Bucks and hatch! 🛡️</p>
                </div>
            </div>

            {/* ===== FAQ ===== */}
            <div>
                <h2 className="text-xl font-extrabold mb-4 flex items-center gap-2">
                    <span className="h-8 w-8 rounded-xl bg-cyan-500/10 flex items-center justify-center text-lg">❓</span>
                    Frequently Asked Questions
                </h2>
                <div className="grid gap-3">
                    {[
                        { q: 'How do you get the Mexican Wolf?', a: 'Hatch from the Endangered Egg (10% chance, 750 Bucks), Basic Egg, or Crystal Egg. Also easy to trade for!', color: '#6b7280' },
                        { q: 'What does the Neon look like?', a: 'Glows PINK on ear insides/tips, fur above nose, cheek fluff tips, tail tip, and feet! One of the most detailed Neon patterns for a Rare! 🩷✨', color: '#f472b6' },
                        { q: 'What is the hatch rate?', a: '10% from the Endangered Egg. The total Rare chance is 27%, split between Mexican Wolf and Black Rhino. Good odds! 📊', color: '#4b5563' },
                        { q: 'Is the Mexican Wolf endangered in real life?', a: 'Yes! Recognized as endangered by the U.S. Fish and Wildlife Service. They nearly went extinct in the mid-1980s but were saved through captive breeding! 🐺', color: '#374151' },
                        { q: 'How many for a Mega Neon?', a: '16 Full-Grown Mexican Wolves total — 4 for each Neon, and 4 Neons for the Mega! Rainbow wolf incoming! 🌈🏆', color: '#9b59b6' },
                        { q: 'Good for wolf pack collections?', a: 'Absolutely! Pairs amazingly with Arctic Wolf and other canine pets. Build your dream wolf pack! 🎯', color: '#4d96ff' },
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
            <div className="rounded-3xl p-8 text-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #374151, #4b5563, #6b7280)' }}>
                <div className="absolute inset-0 opacity-15" style={{ background: 'radial-gradient(circle at 30% 50%, #f9a8d4 0%, transparent 60%), radial-gradient(circle at 70% 50%, #9ca3af 0%, transparent 60%)' }} />
                <div className="relative">
                    <p className="text-3xl mb-2">🐺</p>
                    <h3 className="font-black text-xl text-white mb-2">Check the Latest Value!</h3>
                    <p className="text-sm text-gray-300/70 mb-5">Use our free tools to stay ahead of every trade</p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link href="/values" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white whitespace-nowrap" style={{ background: 'linear-gradient(135deg, #9b59b6, #6c3483)', minWidth: 150 }}>
                            <TrendingUp className="h-4 w-4" /> Value List
                        </Link>
                        <Link href="/calculator" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white whitespace-nowrap" style={{ background: 'linear-gradient(135deg, #6b7280, #374151)', minWidth: 150 }}>
                            Calculator <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    );
}
