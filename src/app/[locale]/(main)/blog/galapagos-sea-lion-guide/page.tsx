import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Clock, Sparkles, TrendingUp, Shield, ArrowRight, Crown } from 'lucide-react';
import { getLocalizedAlternates } from '@/lib/utils/seoHelpers';
import { JsonLd } from '@/components/seo/JsonLd';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const { canonical, languages } = getLocalizedAlternates('/blog/galapagos-sea-lion-guide', locale);
    return {
        title: '🦭 Galapagos Sea Lion in Adopt Me — Complete Guide: Value, How to Get, Neon & Mega Neon (2026)',
        description: 'Full guide to the Common Galapagos Sea Lion in Adopt Me 2026! 17.5% hatch rate, orange Neon glow on flippers/nose/belly/whiskers, tricks, and trading tips! 🎮',
        alternates: { canonical, languages },
        openGraph: {
            title: '🦭 Galapagos Sea Lion Guide — Adopt Me Values 2026',
            description: 'Complete guide to the Common Galapagos Sea Lion! 17.5% hatch rate, orange Neon glow, and tips.',
            images: ['/blog-galapagos-sea-lion.webp'],
        },
    };
}

export const revalidate = 86400;

export default async function GalapagosSeaLionArticle({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);

    const articleJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Galapagos Sea Lion in Adopt Me — Complete Guide: Value, How to Get, Neon & Mega Neon (2026)',
        description: 'Everything about the Common Galapagos Sea Lion in Adopt Me 2026.',
        datePublished: '2026-03-02',
        dateModified: '2026-03-02',
        author: { '@type': 'Organization', name: 'Adopt Me Values', url: 'https://www.adoptmevalues.app' },
        publisher: { '@type': 'Organization', name: 'Adopt Me Values', logo: { '@type': 'ImageObject', url: 'https://www.adoptmevalues.app/logo.webp' } },
        mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://www.adoptmevalues.app/blog/galapagos-sea-lion-guide' },
        image: 'https://www.adoptmevalues.app/blog-galapagos-sea-lion.webp',
        keywords: ['Galapagos Sea Lion', 'Adopt Me', 'Common Pet', 'Roblox', 'Endangered Egg', 'Neon', 'Mega Neon', 'Trading Value', '2026'],
    };

    const faqJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
            { '@type': 'Question', name: 'How do you get the Galapagos Sea Lion in Adopt Me?', acceptedAnswer: { '@type': 'Answer', text: 'The Galapagos Sea Lion can be hatched from the Endangered Egg (17.5% chance, 750 Bucks) or Basic Egg (400 Bucks). You can also trade for one.' } },
            { '@type': 'Question', name: 'What does a Neon Galapagos Sea Lion look like?', acceptedAnswer: { '@type': 'Answer', text: 'The Neon Galapagos Sea Lion glows orange on its front and back flippers, nose, belly, and whiskers.' } },
            { '@type': 'Question', name: 'What is the hatch rate?', acceptedAnswer: { '@type': 'Answer', text: 'The Galapagos Sea Lion has a 17.5% hatch chance from the Endangered Egg. The total Common hatch rate is 35%.' } },
            { '@type': 'Question', name: 'How many Galapagos Sea Lions for Mega Neon?', acceptedAnswer: { '@type': 'Answer', text: 'You need 16 Full-Grown Galapagos Sea Lions — 4 for each Neon, and 4 Neons for the Mega Neon.' } },
            { '@type': 'Question', name: 'Are Galapagos Sea Lions endangered?', acceptedAnswer: { '@type': 'Answer', text: 'Yes! Galapagos Sea Lions are classified as endangered by the IUCN, with a declining population of around 20,000-40,000. They are found only in the Galapagos Islands.' } },
            { '@type': 'Question', name: 'What tricks does the Galapagos Sea Lion learn?', acceptedAnswer: { '@type': 'Answer', text: 'Newborn: Sit, Junior: Joyful, Pre-Teen: Beg, Teen: Jump, Post-Teen: Trick 1, Full Grown: Trick 2.' } },
        ],
    };

    const breadcrumbJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.adoptmevalues.app' },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.adoptmevalues.app/blog' },
            { '@type': 'ListItem', position: 3, name: 'Galapagos Sea Lion Guide' },
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
                <span className="text-foreground font-medium">🦭 Galapagos Sea Lion</span>
            </nav>

            {/* ===== HERO ===== */}
            <div className="rounded-3xl overflow-hidden relative" style={{ background: 'linear-gradient(135deg, #78350f, #92400e, #b45309)' }}>
                <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at 80% 20%, #fdba74 0%, transparent 60%), radial-gradient(circle at 20% 80%, #fb923c 0%, transparent 60%)' }} />
                <div className="relative p-6 sm:p-8 lg:p-10 flex flex-col gap-5">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-400/20 text-orange-300 backdrop-blur-sm border border-orange-400/20">🦭 New Pet</span>
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-400/20 text-gray-300 backdrop-blur-sm border border-gray-400/20">⬜ Common</span>
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-400/20 text-orange-300 backdrop-blur-sm border border-orange-400/20">🧡 Orange Neon</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
                        Galapagos Sea Lion
                        <span className="block text-orange-300 text-xl sm:text-2xl lg:text-3xl font-bold mt-1">Complete Guide 2026</span>
                    </h1>
                    <p className="text-orange-100/80 text-sm max-w-xl">This adorable sea pup has a gorgeous orange Neon glow! Full breakdown — 17.5% hatch rate, tricks, Neon details, and trading tips.</p>
                    <div className="flex items-center gap-4 text-orange-200/60 text-xs">
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> 5 min read</span>
                        <span>Feb 28, 2026</span>
                        <span>By Adopt Me Values Team</span>
                    </div>
                </div>
            </div>

            {/* ===== FEATURED IMAGE ===== */}
            <div className="blog-hero-overlay border">
                <div className="relative w-full aspect-video">
                    <Image src="/blog-galapagos-sea-lion.webp" alt="Galapagos Sea Lion Common Pet in Adopt Me 2026" fill className="object-cover" sizes="(max-width: 768px) 100vw, 896px" priority />
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
                    { label: 'Neon Color', value: 'Orange', icon: '🧡', bg: 'from-orange-500/10 to-orange-500/5', border: 'border-orange-500/20', valueColor: 'text-orange-500' },
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
                    <span className="h-8 w-8 rounded-xl bg-orange-500/10 flex items-center justify-center text-lg">🦭</span>
                    What Is the Galapagos Sea Lion?
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    The Galapagos Sea Lion is a <strong>Common pet</strong> released on February 28, 2026 with the Endangered Egg update! In real life, Galapagos Sea Lions are endangered — found only on the Galapagos Islands with a population of about 20,000-40,000. They&apos;re known for being playful and curious! 🌊
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    With a <strong>17.5% hatch rate</strong> from the Endangered Egg (750 Bucks), it shares Common rarity with the California Condor. The total Common hatch chance is 35%, making it the easiest rarity to get! Don&apos;t skip this one though — its <strong>orange Neon glow</strong> on flippers, nose, belly, and whiskers is absolutely adorable! 🧡
                </p>
            </div>

            {/* ===== HOW TO GET ===== */}
            <div>
                <h2 className="text-xl font-extrabold mb-4 flex items-center gap-2">
                    <span className="h-8 w-8 rounded-xl bg-violet-500/10 flex items-center justify-center text-lg">🥚</span>
                    How to Get It
                </h2>
                <div className="grid sm:grid-cols-3 gap-3">
                    <div className="rounded-2xl border-2 border-orange-500/20 bg-gradient-to-br from-orange-500/5 to-transparent p-5 relative overflow-hidden">
                        <div className="absolute top-3 right-3 text-3xl opacity-20">🥚</div>
                        <div className="text-2xl mb-2">🥚</div>
                        <h3 className="font-extrabold text-sm mb-1">Endangered Egg</h3>
                        <div className="text-2xl font-black text-orange-500 mb-1">17.5%</div>
                        <p className="text-xs text-muted-foreground">Costs 750 Bucks. About 1 in 6 eggs — super easy!</p>
                        <div className="mt-3 px-2 py-1 rounded-lg bg-orange-500/10 text-[10px] font-bold text-orange-600 dark:text-orange-400 inline-block">BEST ODDS</div>
                    </div>
                    <div className="rounded-2xl border-2 border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-transparent p-5 relative overflow-hidden">
                        <div className="absolute top-3 right-3 text-3xl opacity-20">🥚</div>
                        <div className="text-2xl mb-2">🥚</div>
                        <h3 className="font-extrabold text-sm mb-1">Basic Egg</h3>
                        <div className="text-2xl font-black text-purple-500 mb-1">400 Bucks</div>
                        <p className="text-xs text-muted-foreground">Even cheaper! Great budget option to hatch Commons.</p>
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
            <div className="rounded-2xl p-5 flex items-start gap-4" style={{ background: 'linear-gradient(135deg, rgba(253,186,116,0.1), rgba(251,146,60,0.08))' }}>
                <div className="h-10 w-10 rounded-xl bg-orange-500/20 flex items-center justify-center text-xl flex-shrink-0">💡</div>
                <div>
                    <p className="font-bold text-sm mb-1">Fun Fact!</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">Real Galapagos Sea Lions are some of the friendliest wild animals on Earth! They&apos;ll swim right up to snorkelers and play like puppies! Charles Darwin observed them during his famous trip to the Galapagos in 1835. The Adopt Me version has an adorable waddling animation! 🌊🦭</p>
                </div>
            </div>

            {/* ===== TRADING VALUE ===== */}
            <div className="rounded-2xl border bg-card p-6">
                <h2 className="text-xl font-extrabold mb-4 flex items-center gap-2">
                    <span className="h-8 w-8 rounded-xl bg-rose-500/10 flex items-center justify-center text-lg">💰</span>
                    Trading Value
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    Currently <strong className="text-gray-500">VERY LOW</strong> — Common tier with 17.5% hatch rate. But the Neon is where the value really shines!
                </p>
                <div className="grid grid-cols-2 gap-3">
                    {[
                        { icon: '🦭', title: 'Cute Design', desc: 'Adorable sea pup everyone loves', color: 'border-orange-500/20 bg-orange-500/5' },
                        { icon: '🧡', title: 'Orange Neon', desc: 'Glowing flippers, nose, belly & whiskers!', color: 'border-amber-500/20 bg-amber-500/5' },
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
                <div className="mt-4 rounded-xl bg-orange-500/5 border border-orange-500/15 p-3 text-xs text-muted-foreground">
                    <strong>💡 Our tip:</strong> Make Neon! The orange glow on 5 areas (flippers, nose, belly, whiskers) makes it one of the best-looking Common Neons. Grind it fast with Auto-Age! Check our <Link href="/values" className="font-bold underline">live value list</Link> for pricing.
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
                <div className="rounded-2xl p-6 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(253,186,116,0.1), rgba(251,146,60,0.08))' }}>
                    <div className="absolute -bottom-4 -right-4 text-[80px] opacity-10">🌟</div>
                    <h2 className="text-lg font-extrabold mb-3 flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-orange-500" /> Neon Form
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">The Galapagos Sea Lion <strong>glows orange on its front and back flippers, nose, belly, and whiskers</strong>! That&apos;s 5 glow areas — seriously impressive for a Common pet! It looks like a warm sunset on a sea pup! 🧡✨</p>
                    <div className="space-y-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-2"><span className="h-5 w-5 rounded bg-orange-500/20 flex items-center justify-center text-[10px]">1</span> Raise <strong>4 Sea Lions</strong> to Full Grown</div>
                        <div className="flex items-center gap-2"><span className="h-5 w-5 rounded bg-orange-500/20 flex items-center justify-center text-[10px]">2</span> Go to the <strong>Neon Cave</strong></div>
                        <div className="flex items-center gap-2"><span className="h-5 w-5 rounded bg-orange-500/20 flex items-center justify-center text-[10px]">3</span> Place on circles & combine!</div>
                    </div>
                </div>
                <div className="rounded-2xl p-6 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(155,89,182,0.1), rgba(255,107,107,0.08))' }}>
                    <div className="absolute -bottom-4 -right-4 text-[80px] opacity-10">🌈</div>
                    <h2 className="text-lg font-extrabold mb-3 flex items-center gap-2">
                        <Crown className="h-5 w-5 text-violet-500" /> Mega Neon Form
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">All 5 glow areas — flippers, nose, belly, and whiskers — <strong>cycle through the full rainbow</strong>! A rainbow sea lion waddling around is pure joy! 🌈🦭</p>
                    <div className="space-y-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-2"><span className="h-5 w-5 rounded bg-violet-500/20 flex items-center justify-center text-[10px]">1</span> Raise <strong>4 Neon Sea Lions</strong> to Luminous</div>
                        <div className="flex items-center gap-2"><span className="h-5 w-5 rounded bg-violet-500/20 flex items-center justify-center text-[10px]">2</span> Combine in Neon Cave</div>
                        <div className="flex items-center gap-2"><span className="h-5 w-5 rounded bg-violet-500/20 flex items-center justify-center text-[10px]">3</span> Need <strong>16 total</strong> Sea Lions!</div>
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
                    <p className="text-xs text-muted-foreground leading-relaxed">Make Neon ASAP! The orange glow on 5 areas is the real prize. With 17.5% hatch rate, collecting 4 is a breeze. Neon Sea Lion trades for WAY more than normal! 📈</p>
                </div>
                <div className="rounded-2xl border-2 border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-transparent p-5">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="h-9 w-9 rounded-xl bg-blue-500/15 flex items-center justify-center"><Shield className="h-4 w-4 text-blue-500" /></div>
                        <span className="font-extrabold text-sm">🛒 If You Want One</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">Easiest pet to get! 17.5% from Endangered Egg or use the Basic Egg at 400 Bucks. You&apos;ll hatch multiples before getting Rares! 🛡️</p>
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
                        { q: 'How do you get the Galapagos Sea Lion?', a: 'Hatch from the Endangered Egg (17.5% chance, 750 Bucks) or Basic Egg (400 Bucks). Almost free in trades too!', color: '#b45309' },
                        { q: 'What does the Neon look like?', a: 'Glows ORANGE on front/back flippers, nose, belly, and whiskers! 5 glow areas is incredible for a Common pet! Mega Neon does rainbow on the same spots! 🧡✨', color: '#fb923c' },
                        { q: 'What is the hatch rate?', a: '17.5% from the Endangered Egg! The total Common rate is 35%, split between Galapagos Sea Lion and California Condor. Very easy! 📊', color: '#92400e' },
                        { q: 'Are Galapagos Sea Lions endangered?', a: 'Yes! Classified as endangered by the IUCN with 20,000-40,000 remaining. Found only on the Galapagos Islands off the coast of Ecuador! 🌊🇪🇨', color: '#78350f' },
                        { q: 'How many for a Mega Neon?', a: '16 Full-Grown Galapagos Sea Lions total — 4 for each Neon, and 4 Neons for the Mega! Very doable at 17.5% hatch rate! 🌈🏆', color: '#9b59b6' },
                        { q: 'Best strategy for this pet?', a: 'Make Neon! The orange glow is gorgeous and the grind is easy. Commons are underrated — Neon versions punch way above their weight in trades! 🎯', color: '#4d96ff' },
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
            <div className="rounded-3xl p-8 text-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #78350f, #92400e, #b45309)' }}>
                <div className="absolute inset-0 opacity-15" style={{ background: 'radial-gradient(circle at 30% 50%, #fdba74 0%, transparent 60%), radial-gradient(circle at 70% 50%, #fb923c 0%, transparent 60%)' }} />
                <div className="relative">
                    <p className="text-3xl mb-2">🦭</p>
                    <h3 className="font-black text-xl text-white mb-2">Check the Latest Value!</h3>
                    <p className="text-sm text-orange-200/70 mb-5">Use our free tools to stay ahead of every trade</p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link href="/values" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white whitespace-nowrap" style={{ background: 'linear-gradient(135deg, #9b59b6, #6c3483)', minWidth: 150 }}>
                            <TrendingUp className="h-4 w-4" /> Value List
                        </Link>
                        <Link href="/calculator" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white whitespace-nowrap" style={{ background: 'linear-gradient(135deg, #fb923c, #b45309)', minWidth: 150 }}>
                            Calculator <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    );
}
