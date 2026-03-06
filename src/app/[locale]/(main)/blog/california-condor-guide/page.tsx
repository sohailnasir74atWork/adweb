import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Clock, Sparkles, TrendingUp, Shield, ArrowRight, Crown } from 'lucide-react';
import { getLocalizedAlternates } from '@/lib/utils/seoHelpers';
import { JsonLd } from '@/components/seo/JsonLd';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const { canonical, languages } = getLocalizedAlternates('/blog/california-condor-guide', locale);
    return {
        title: '🦅 California Condor in Adopt Me — Complete Guide: Value, How to Get, Neon & Mega Neon (2026)',
        description: 'Full guide to the Common California Condor in Adopt Me 2026! 17.5% hatch rate, golden yellow Neon glow on chest/wings/head, tricks, and trading tips! 🎮',
        alternates: { canonical, languages },
        openGraph: {
            title: '🦅 California Condor Guide — Adopt Me Values 2026',
            description: 'Complete guide to the Common California Condor! 17.5% hatch rate, golden Neon glow, and tips.',
            images: ['/blog-california-condor.webp'],
        },
    };
}

export const revalidate = 86400;

export default async function CaliforniaCondorArticle({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);

    const articleJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'California Condor in Adopt Me — Complete Guide: Value, How to Get, Neon & Mega Neon (2026)',
        description: 'Everything about the Common California Condor in Adopt Me 2026.',
        datePublished: '2026-03-02',
        dateModified: '2026-03-02',
        author: { '@type': 'Organization', name: 'Adopt Me Values', url: 'https://www.adoptmevalues.app' },
        publisher: { '@type': 'Organization', name: 'Adopt Me Values', logo: { '@type': 'ImageObject', url: 'https://www.adoptmevalues.app/logo.webp' } },
        mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://www.adoptmevalues.app/blog/california-condor-guide' },
        image: 'https://www.adoptmevalues.app/blog-california-condor.webp',
        keywords: ['California Condor', 'Adopt Me', 'Common Pet', 'Roblox', 'Endangered Egg', 'Neon', 'Mega Neon', 'Trading Value', '2026'],
    };

    const faqJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
            { '@type': 'Question', name: 'How do you get the California Condor in Adopt Me?', acceptedAnswer: { '@type': 'Answer', text: 'The California Condor can be hatched from the Endangered Egg (17.5% chance, 750 Bucks) or Basic Egg (400 Bucks). You can also trade for one.' } },
            { '@type': 'Question', name: 'What does a Neon California Condor look like?', acceptedAnswer: { '@type': 'Answer', text: 'The Neon California Condor glows golden yellow on its chest, tail, feet, and certain parts of its wings, head, and beak.' } },
            { '@type': 'Question', name: 'What is the hatch rate?', acceptedAnswer: { '@type': 'Answer', text: 'The California Condor has a 17.5% hatch chance from the Endangered Egg. The total Common hatch rate is 35%.' } },
            { '@type': 'Question', name: 'How many California Condors for Mega Neon?', acceptedAnswer: { '@type': 'Answer', text: 'You need 16 Full-Grown California Condors — 4 for each Neon, and 4 Neons for the Mega Neon.' } },
            { '@type': 'Question', name: 'Are California Condors endangered in real life?', acceptedAnswer: { '@type': 'Answer', text: 'Yes! California Condors are critically endangered, the largest flying land bird in North America with a 9.5-foot wingspan. They nearly went extinct in 1987 with only 27 left, but conservation brought them back to over 500 today.' } },
            { '@type': 'Question', name: 'What tricks does the California Condor learn?', acceptedAnswer: { '@type': 'Answer', text: 'Newborn: Sit, Junior: Joyful, Pre-Teen: Beg, Teen: Jump, Post-Teen: Trick 1, Full Grown: Trick 2.' } },
        ],
    };

    const breadcrumbJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.adoptmevalues.app' },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.adoptmevalues.app/blog' },
            { '@type': 'ListItem', position: 3, name: 'California Condor Guide' },
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
                <span className="text-foreground font-medium">🦅 California Condor</span>
            </nav>

            {/* ===== HERO ===== */}
            <div className="rounded-3xl overflow-hidden relative" style={{ background: 'linear-gradient(135deg, #451a03, #78350f, #92400e)' }}>
                <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at 80% 20%, #fbbf24 0%, transparent 60%), radial-gradient(circle at 20% 80%, #f59e0b 0%, transparent 60%)' }} />
                <div className="relative p-6 sm:p-8 lg:p-10 flex flex-col gap-5">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 backdrop-blur-sm border border-amber-400/20">🦅 New Pet</span>
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-400/20 text-gray-300 backdrop-blur-sm border border-gray-400/20">⬜ Common</span>
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-400/20 text-yellow-300 backdrop-blur-sm border border-yellow-400/20">💛 Golden Neon</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
                        California Condor
                        <span className="block text-amber-300 text-xl sm:text-2xl lg:text-3xl font-bold mt-1">Complete Guide 2026</span>
                    </h1>
                    <p className="text-amber-100/80 text-sm max-w-xl">North America&apos;s largest flying bird, now a pet! Full breakdown — 17.5% hatch rate, golden Neon glow, tricks, and trading tips.</p>
                    <div className="flex items-center gap-4 text-amber-200/60 text-xs">
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> 5 min read</span>
                        <span>Feb 28, 2026</span>
                        <span>By Adopt Me Values Team</span>
                    </div>
                </div>
            </div>

            {/* ===== FEATURED IMAGE ===== */}
            <div className="blog-hero-overlay border">
                <div className="relative w-full aspect-video">
                    <Image src="/blog-california-condor.webp" alt="California Condor Common Pet in Adopt Me 2026" fill className="object-cover" sizes="(max-width: 768px) 100vw, 896px" priority />
                </div>
            </div>

            {/* ===== QUICK STATS ===== */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                    { label: 'Type', value: 'Pet', icon: '🐾', bg: 'from-violet-500/10 to-violet-500/5', border: 'border-violet-500/20' },
                    { label: 'Rarity', value: 'Common', icon: '⬜', bg: 'from-gray-500/10 to-gray-500/5', border: 'border-gray-500/20' },
                    { label: 'Released', value: 'Feb 28, 2026', icon: '📅', bg: 'from-blue-500/10 to-blue-500/5', border: 'border-blue-500/20' },
                    { label: 'Endangered Egg', value: '17.5%', icon: '🥚', bg: 'from-emerald-500/10 to-emerald-500/5', border: 'border-emerald-500/20', valueColor: 'text-emerald-500' },
                    { label: 'Egg Cost', value: '750 Bucks', icon: '💰', bg: 'from-rose-500/10 to-rose-500/5', border: 'border-rose-500/20' },
                    { label: 'Neon Color', value: 'Golden Yellow', icon: '💛', bg: 'from-yellow-500/10 to-yellow-500/5', border: 'border-yellow-500/20', valueColor: 'text-yellow-500' },
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
                    <span className="h-8 w-8 rounded-xl bg-amber-500/10 flex items-center justify-center text-lg">🦅</span>
                    What Is the California Condor?
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    The California Condor is a <strong>Common pet</strong> released on February 28, 2026 with the Endangered Egg update! In real life, the California Condor is the <strong>largest flying land bird in North America</strong> with an insane 9.5-foot (2.9 m) wingspan! They nearly went extinct in 1987 with only 27 birds left, but conservation efforts have brought them back to over 500 today! 🦅
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    With a <strong>17.5% hatch rate</strong> from the Endangered Egg (750 Bucks), it shares Common rarity with the Galapagos Sea Lion. The total Common hatch chance is 35%, making it super easy to get. But don&apos;t sleep on this bird — the <strong>golden yellow Neon glow</strong> on its chest, wings, head, and beak is absolutely stunning! ✨
                </p>
            </div>

            {/* ===== HOW TO GET ===== */}
            <div>
                <h2 className="text-xl font-extrabold mb-4 flex items-center gap-2">
                    <span className="h-8 w-8 rounded-xl bg-violet-500/10 flex items-center justify-center text-lg">🥚</span>
                    How to Get It
                </h2>
                <div className="grid sm:grid-cols-3 gap-3">
                    <div className="rounded-2xl border-2 border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-transparent p-5 relative overflow-hidden">
                        <div className="absolute top-3 right-3 text-3xl opacity-20">🥚</div>
                        <div className="text-2xl mb-2">🥚</div>
                        <h3 className="font-extrabold text-sm mb-1">Endangered Egg</h3>
                        <div className="text-2xl font-black text-amber-500 mb-1">17.5%</div>
                        <p className="text-xs text-muted-foreground">Costs 750 Bucks. About 1 in 6 eggs — very easy!</p>
                        <div className="mt-3 px-2 py-1 rounded-lg bg-amber-500/10 text-[10px] font-bold text-amber-600 dark:text-amber-400 inline-block">BEST ODDS</div>
                    </div>
                    <div className="rounded-2xl border-2 border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-transparent p-5 relative overflow-hidden">
                        <div className="absolute top-3 right-3 text-3xl opacity-20">🥚</div>
                        <div className="text-2xl mb-2">🥚</div>
                        <h3 className="font-extrabold text-sm mb-1">Basic Egg</h3>
                        <div className="text-2xl font-black text-purple-500 mb-1">400 Bucks</div>
                        <p className="text-xs text-muted-foreground">Even cheaper! Great budget option for Commons.</p>
                        <div className="mt-3 px-2 py-1 rounded-lg bg-purple-500/10 text-[10px] font-bold text-purple-600 dark:text-purple-400 inline-block">BUDGET OPTION</div>
                    </div>
                    <div className="rounded-2xl border-2 border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-transparent p-5 relative overflow-hidden">
                        <div className="absolute top-3 right-3 text-3xl opacity-20">🤝</div>
                        <div className="text-2xl mb-2">🤝</div>
                        <h3 className="font-extrabold text-sm mb-1">Trading</h3>
                        <div className="text-2xl font-black text-blue-500 mb-1">Trade</div>
                        <p className="text-xs text-muted-foreground">Almost free in trades! Commons are everywhere.</p>
                        <div className="mt-3 px-2 py-1 rounded-lg bg-blue-500/10 text-[10px] font-bold text-blue-600 dark:text-blue-400 inline-block">CHEAPEST</div>
                    </div>
                </div>
            </div>

            {/* ===== PRO TIP ===== */}
            <div className="rounded-2xl p-5 flex items-start gap-4" style={{ background: 'linear-gradient(135deg, rgba(251,191,36,0.1), rgba(245,158,11,0.08))' }}>
                <div className="h-10 w-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-xl flex-shrink-0">💡</div>
                <div>
                    <p className="font-bold text-sm mb-1">Fun Fact!</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">The California Condor&apos;s comeback is one of the greatest conservation stories ever! In 1987, ALL remaining wild condors (just 27 birds!) were captured for a breeding program. Through decades of careful work, there are now over 500 condors — with more than 300 living in the wild again! A real success story 🎉</p>
                </div>
            </div>

            {/* ===== TRADING VALUE ===== */}
            <div className="rounded-2xl border bg-card p-6">
                <h2 className="text-xl font-extrabold mb-4 flex items-center gap-2">
                    <span className="h-8 w-8 rounded-xl bg-rose-500/10 flex items-center justify-center text-lg">💰</span>
                    Trading Value
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    Currently <strong className="text-gray-500">VERY LOW</strong> — Common tier with 17.5% hatch rate. But the golden Neon glow is where the real value is!
                </p>
                <div className="grid grid-cols-2 gap-3">
                    {[
                        { icon: '🦅', title: 'Majestic Bird', desc: 'Largest flying bird in North America!', color: 'border-amber-500/20 bg-amber-500/5' },
                        { icon: '💛', title: 'Golden Neon', desc: 'Glows on chest, wings, head, beak & tail!', color: 'border-yellow-500/20 bg-yellow-500/5' },
                        { icon: '✨', title: 'Easy to Neon', desc: 'High hatch rate = fast Neon grind', color: 'border-emerald-500/20 bg-emerald-500/5' },
                        { icon: '📦', title: 'Bundle Filler', desc: 'Great for rounding out trade offers', color: 'border-violet-500/20 bg-violet-500/5' },
                    ].map((item) => (
                        <div key={item.title} className={`rounded-xl border p-3 ${item.color}`}>
                            <div className="text-xl mb-1">{item.icon}</div>
                            <div className="font-bold text-xs">{item.title}</div>
                            <div className="text-[11px] text-muted-foreground mt-0.5">{item.desc}</div>
                        </div>
                    ))}
                </div>
                <div className="mt-4 rounded-xl bg-yellow-500/5 border border-yellow-500/15 p-3 text-xs text-muted-foreground">
                    <strong>💡 Our tip:</strong> The golden yellow glow on 6+ areas (chest, tail, feet, wings, head, beak) makes this one of the most impressive Neon Commons EVER! Grind it fast! Check our <Link href="/values" className="font-bold underline">live value list</Link> for pricing.
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
                <div className="rounded-2xl p-6 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(251,191,36,0.1), rgba(245,158,11,0.08))' }}>
                    <div className="absolute -bottom-4 -right-4 text-[80px] opacity-10">🌟</div>
                    <h2 className="text-lg font-extrabold mb-3 flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-yellow-500" /> Neon Form
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">The California Condor <strong>glows golden yellow on its chest, tail, feet, and parts of its wings, head, and beak</strong>! That&apos;s 6+ glow areas — absolutely incredible for a Common! It looks like a golden phoenix! 💛✨</p>
                    <div className="space-y-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-2"><span className="h-5 w-5 rounded bg-yellow-500/20 flex items-center justify-center text-[10px]">1</span> Raise <strong>4 Condors</strong> to Full Grown</div>
                        <div className="flex items-center gap-2"><span className="h-5 w-5 rounded bg-yellow-500/20 flex items-center justify-center text-[10px]">2</span> Go to the <strong>Neon Cave</strong></div>
                        <div className="flex items-center gap-2"><span className="h-5 w-5 rounded bg-yellow-500/20 flex items-center justify-center text-[10px]">3</span> Place on circles & combine!</div>
                    </div>
                </div>
                <div className="rounded-2xl p-6 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(155,89,182,0.1), rgba(255,107,107,0.08))' }}>
                    <div className="absolute -bottom-4 -right-4 text-[80px] opacity-10">🌈</div>
                    <h2 className="text-lg font-extrabold mb-3 flex items-center gap-2">
                        <Crown className="h-5 w-5 text-violet-500" /> Mega Neon Form
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">All the golden glow areas — chest, tail, feet, wings, head, beak — <strong>cycle through the entire rainbow</strong>! A rainbow condor soaring through your server is absolutely majestic! 🌈🦅</p>
                    <div className="space-y-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-2"><span className="h-5 w-5 rounded bg-violet-500/20 flex items-center justify-center text-[10px]">1</span> Raise <strong>4 Neon Condors</strong> to Luminous</div>
                        <div className="flex items-center gap-2"><span className="h-5 w-5 rounded bg-violet-500/20 flex items-center justify-center text-[10px]">2</span> Combine in Neon Cave</div>
                        <div className="flex items-center gap-2"><span className="h-5 w-5 rounded bg-violet-500/20 flex items-center justify-center text-[10px]">3</span> Need <strong>16 total</strong> Condors!</div>
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
                    <p className="text-xs text-muted-foreground leading-relaxed">Make Neon immediately! The golden glow on 6+ areas is the best Common Neon in the egg. With 17.5% hatch rate, collecting 4 is a breeze! 📈</p>
                </div>
                <div className="rounded-2xl border-2 border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-transparent p-5">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="h-9 w-9 rounded-xl bg-blue-500/15 flex items-center justify-center"><Shield className="h-4 w-4 text-blue-500" /></div>
                        <span className="font-extrabold text-sm">🛒 If You Want One</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">Easiest pet to get! 17.5% from Endangered Egg or use the Basic Egg at just 400 Bucks. You&apos;ll hatch multiples naturally! 🛡️</p>
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
                        { q: 'How do you get the California Condor?', a: 'Hatch from the Endangered Egg (17.5% chance, 750 Bucks) or Basic Egg (400 Bucks). Also almost free in trades!', color: '#92400e' },
                        { q: 'What does the Neon look like?', a: 'Glows GOLDEN YELLOW on chest, tail, feet, and parts of wings, head, and beak! 6+ glow areas — easily the best Common Neon in the egg! 💛✨', color: '#fbbf24' },
                        { q: 'What is the hatch rate?', a: '17.5% from the Endangered Egg. The total Common rate is 35%, split between California Condor and Galapagos Sea Lion. Super easy! 📊', color: '#78350f' },
                        { q: 'How endangered is it in real life?', a: 'One of conservation\'s greatest success stories! Down to just 27 birds in 1987, now over 500 alive with 300+ in the wild. 9.5-foot wingspan — the largest flying bird in North America! 🦅', color: '#451a03' },
                        { q: 'How many for a Mega Neon?', a: '16 Full-Grown California Condors total — 4 for each Neon, and 4 Neons for the Mega! Very easy at 17.5% hatch rate! 🌈🏆', color: '#9b59b6' },
                        { q: 'Condor vs Galapagos Sea Lion — which is better?', a: 'Both Common with 17.5% hatch rate! Condor has golden Neon on 6+ areas, Sea Lion has orange on 5 areas. Both are amazing Neons — collect both! 🎯', color: '#4d96ff' },
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
            <div className="rounded-3xl p-8 text-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #451a03, #78350f, #92400e)' }}>
                <div className="absolute inset-0 opacity-15" style={{ background: 'radial-gradient(circle at 30% 50%, #fbbf24 0%, transparent 60%), radial-gradient(circle at 70% 50%, #f59e0b 0%, transparent 60%)' }} />
                <div className="relative">
                    <p className="text-3xl mb-2">🦅</p>
                    <h3 className="font-black text-xl text-white mb-2">Check the Latest Value!</h3>
                    <p className="text-sm text-amber-200/70 mb-5">Use our free tools to stay ahead of every trade</p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link href="/values" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white whitespace-nowrap" style={{ background: 'linear-gradient(135deg, #9b59b6, #6c3483)', minWidth: 150 }}>
                            <TrendingUp className="h-4 w-4" /> Value List
                        </Link>
                        <Link href="/calculator" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white whitespace-nowrap" style={{ background: 'linear-gradient(135deg, #fbbf24, #92400e)', minWidth: 150 }}>
                            Calculator <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    );
}
