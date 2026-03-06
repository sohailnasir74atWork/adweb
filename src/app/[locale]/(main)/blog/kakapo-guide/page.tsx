import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Clock, Sparkles, TrendingUp, Shield, ArrowRight, Crown } from 'lucide-react';
import { getLocalizedAlternates } from '@/lib/utils/seoHelpers';
import { JsonLd } from '@/components/seo/JsonLd';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const { canonical, languages } = getLocalizedAlternates('/blog/kakapo-guide', locale);
    return {
        title: '🦜 Kakapo in Adopt Me — Complete Guide: Value, How to Get, Neon & Mega Neon (2026)',
        description: 'Full guide to the Uncommon Kakapo in Adopt Me 2026! 15% hatch rate from Endangered Egg, trading value, tricks, and Neon info! 🎮',
        alternates: { canonical, languages },
        openGraph: {
            title: '🦜 Kakapo Guide — Adopt Me Values 2026',
            description: 'Complete guide to the Uncommon Kakapo in Adopt Me! 15% hatch rate, value, and trading tips.',
            images: ['/blog-kakapo.webp'],
        },
    };
}

export const revalidate = 86400;

export default async function KakapoArticle({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);

    const articleJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Kakapo in Adopt Me — Complete Guide: Value, How to Get, Neon & Mega Neon (2026)',
        description: 'Everything about the Uncommon Kakapo in Adopt Me 2026.',
        datePublished: '2026-03-02',
        dateModified: '2026-03-02',
        author: { '@type': 'Organization', name: 'Adopt Me Values', url: 'https://www.adoptmevalues.app' },
        publisher: { '@type': 'Organization', name: 'Adopt Me Values', logo: { '@type': 'ImageObject', url: 'https://www.adoptmevalues.app/logo.webp' } },
        mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://www.adoptmevalues.app/blog/kakapo-guide' },
        image: 'https://www.adoptmevalues.app/blog-kakapo.webp',
        keywords: ['Kakapo', 'Adopt Me', 'Uncommon Pet', 'Roblox', 'Endangered Egg', 'Neon', 'Mega Neon', 'Trading Value', '2026'],
    };

    const faqJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
            { '@type': 'Question', name: 'How do you get the Kakapo in Adopt Me?', acceptedAnswer: { '@type': 'Answer', text: 'The Kakapo can be hatched from the Endangered Egg (15% chance, 750 Bucks), Basic Egg (400 Bucks), or obtained through trading.' } },
            { '@type': 'Question', name: 'What is the Kakapo hatch rate?', acceptedAnswer: { '@type': 'Answer', text: 'The Kakapo has a 15% hatch chance from the Endangered Egg. The total Uncommon hatch rate is 35%.' } },
            { '@type': 'Question', name: 'What does a Neon Kakapo look like?', acceptedAnswer: { '@type': 'Answer', text: 'Specific Neon glow areas have not been confirmed yet. Check back for updates when the first Neon Kakapo is created!' } },
            { '@type': 'Question', name: 'How many Kakapos for Mega Neon?', acceptedAnswer: { '@type': 'Answer', text: 'You need 16 Full-Grown Kakapos — 4 for each Neon, and 4 Neons for the Mega Neon.' } },
            { '@type': 'Question', name: 'What is a Kakapo in real life?', acceptedAnswer: { '@type': 'Answer', text: 'The Kakapo is a critically endangered flightless parrot from New Zealand. It is the heaviest parrot in the world and can live over 90 years. Only about 250 exist.' } },
            { '@type': 'Question', name: 'What tricks does the Kakapo learn?', acceptedAnswer: { '@type': 'Answer', text: 'Newborn: Sit, Junior: Joyful, Pre-Teen: Beg, Teen: Jump, Post-Teen: Trick 1, Full Grown: Trick 2.' } },
        ],
    };

    const breadcrumbJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.adoptmevalues.app' },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.adoptmevalues.app/blog' },
            { '@type': 'ListItem', position: 3, name: 'Kakapo Guide' },
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
                <span className="text-foreground font-medium">🦜 Kakapo</span>
            </nav>

            {/* ===== HERO ===== */}
            <div className="rounded-3xl overflow-hidden relative" style={{ background: 'linear-gradient(135deg, #365314, #4d7c0f, #65a30d)' }}>
                <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at 80% 20%, #bef264 0%, transparent 60%), radial-gradient(circle at 20% 80%, #a3e635 0%, transparent 60%)' }} />
                <div className="relative p-6 sm:p-8 lg:p-10 flex flex-col gap-5">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-lime-400/20 text-lime-300 backdrop-blur-sm border border-lime-400/20">🦜 New Pet</span>
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-400/20 text-green-300 backdrop-blur-sm border border-green-400/20">💚 Uncommon</span>
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-400/20 text-emerald-300 backdrop-blur-sm border border-emerald-400/20">🇳🇿 New Zealand</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
                        Kakapo
                        <span className="block text-lime-300 text-xl sm:text-2xl lg:text-3xl font-bold mt-1">Complete Guide 2026</span>
                    </h1>
                    <p className="text-lime-100/80 text-sm max-w-xl">The world&apos;s heaviest parrot is now in Adopt Me! Full breakdown — 15% hatch rate, trading value, tricks, and Neon info.</p>
                    <div className="flex items-center gap-4 text-lime-200/60 text-xs">
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> 5 min read</span>
                        <span>Feb 28, 2026</span>
                        <span>By Adopt Me Values Team</span>
                    </div>
                </div>
            </div>

            {/* ===== FEATURED IMAGE ===== */}
            <div className="blog-hero-overlay border">
                <div className="relative w-full aspect-video">
                    <Image src="/blog-kakapo.webp" alt="Kakapo Uncommon Pet in Adopt Me 2026" fill className="object-cover" sizes="(max-width: 768px) 100vw, 896px" priority />
                </div>
            </div>

            {/* ===== QUICK STATS ===== */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                    { label: 'Type', value: 'Pet', icon: '🐾', bg: 'from-violet-500/10 to-violet-500/5', border: 'border-violet-500/20' },
                    { label: 'Rarity', value: 'Uncommon', icon: '💚', bg: 'from-green-500/10 to-green-500/5', border: 'border-green-500/20', valueColor: 'text-green-500' },
                    { label: 'Released', value: 'Feb 28, 2026', icon: '📅', bg: 'from-blue-500/10 to-blue-500/5', border: 'border-blue-500/20' },
                    { label: 'Endangered Egg', value: '15%', icon: '🥚', bg: 'from-emerald-500/10 to-emerald-500/5', border: 'border-emerald-500/20', valueColor: 'text-emerald-500' },
                    { label: 'Egg Cost', value: '750 Bucks', icon: '💰', bg: 'from-rose-500/10 to-rose-500/5', border: 'border-rose-500/20' },
                    { label: 'Also In', value: 'Basic Egg', icon: '🥚', bg: 'from-purple-500/10 to-purple-500/5', border: 'border-purple-500/20' },
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
                    <span className="h-8 w-8 rounded-xl bg-lime-500/10 flex items-center justify-center text-lg">🦜</span>
                    What Is the Kakapo?
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    The Kakapo is an <strong>Uncommon pet</strong> released on February 28, 2026 with the Endangered Egg update! In real life, the Kakapo is a critically endangered <strong>flightless parrot from New Zealand</strong> — it&apos;s the heaviest parrot in the world, weighing up to 4 kg (9 lbs)! 🇳🇿
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    With a <strong>15% hatch rate</strong> from the Endangered Egg (750 Bucks), it shares Uncommon rarity with the Black Tiger. Only about 250 Kakapos exist in the wild, each one with a name! They can live over 90 years, making them one of the longest-lived birds on Earth! 🦜
                </p>
            </div>

            {/* ===== HOW TO GET ===== */}
            <div>
                <h2 className="text-xl font-extrabold mb-4 flex items-center gap-2">
                    <span className="h-8 w-8 rounded-xl bg-violet-500/10 flex items-center justify-center text-lg">🥚</span>
                    How to Get It
                </h2>
                <div className="grid sm:grid-cols-3 gap-3">
                    <div className="rounded-2xl border-2 border-lime-500/20 bg-gradient-to-br from-lime-500/5 to-transparent p-5 relative overflow-hidden">
                        <div className="absolute top-3 right-3 text-3xl opacity-20">🥚</div>
                        <div className="text-2xl mb-2">🥚</div>
                        <h3 className="font-extrabold text-sm mb-1">Endangered Egg</h3>
                        <div className="text-2xl font-black text-lime-500 mb-1">15%</div>
                        <p className="text-xs text-muted-foreground">Costs 750 Bucks. About 1 in 7 eggs — easy to get!</p>
                        <div className="mt-3 px-2 py-1 rounded-lg bg-lime-500/10 text-[10px] font-bold text-lime-600 dark:text-lime-400 inline-block">GREAT ODDS</div>
                    </div>
                    <div className="rounded-2xl border-2 border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-transparent p-5 relative overflow-hidden">
                        <div className="absolute top-3 right-3 text-3xl opacity-20">🥚</div>
                        <div className="text-2xl mb-2">🥚</div>
                        <h3 className="font-extrabold text-sm mb-1">Basic Egg</h3>
                        <div className="text-2xl font-black text-purple-500 mb-1">400 Bucks</div>
                        <p className="text-xs text-muted-foreground">Cheaper option! Lower odds but still works.</p>
                        <div className="mt-3 px-2 py-1 rounded-lg bg-purple-500/10 text-[10px] font-bold text-purple-600 dark:text-purple-400 inline-block">BUDGET OPTION</div>
                    </div>
                    <div className="rounded-2xl border-2 border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-transparent p-5 relative overflow-hidden">
                        <div className="absolute top-3 right-3 text-3xl opacity-20">🤝</div>
                        <div className="text-2xl mb-2">🤝</div>
                        <h3 className="font-extrabold text-sm mb-1">Trading</h3>
                        <div className="text-2xl font-black text-blue-500 mb-1">Trade</div>
                        <p className="text-xs text-muted-foreground">Super cheap in trades! Uncommons are very affordable.</p>
                        <div className="mt-3 px-2 py-1 rounded-lg bg-blue-500/10 text-[10px] font-bold text-blue-600 dark:text-blue-400 inline-block">CHEAPEST</div>
                    </div>
                </div>
            </div>

            {/* ===== PRO TIP ===== */}
            <div className="rounded-2xl p-5 flex items-start gap-4" style={{ background: 'linear-gradient(135deg, rgba(190,242,100,0.1), rgba(163,230,53,0.08))' }}>
                <div className="h-10 w-10 rounded-xl bg-lime-500/20 flex items-center justify-center text-xl flex-shrink-0">💡</div>
                <div>
                    <p className="font-bold text-sm mb-1">Fun Fact!</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">Real Kakapos are flightless and nocturnal! They freeze when scared instead of running away, which sadly made them easy targets for predators. Today, every single Kakapo has a name and a tracker — scientists know each one personally! There are only about 250 alive. The Adopt Me version brings attention to this amazing bird! 🌙🦜</p>
                </div>
            </div>

            {/* ===== TRADING VALUE ===== */}
            <div className="rounded-2xl border bg-card p-6">
                <h2 className="text-xl font-extrabold mb-4 flex items-center gap-2">
                    <span className="h-8 w-8 rounded-xl bg-rose-500/10 flex items-center justify-center text-lg">💰</span>
                    Trading Value
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    Currently <strong className="text-green-500">LOW</strong> — Uncommon tier with a 15% hatch rate. Best for bundling and making Neon!
                </p>
                <div className="grid grid-cols-2 gap-3">
                    {[
                        { icon: '🦜', title: 'Unique Bird', desc: 'Only flightless parrot in Adopt Me!', color: 'border-lime-500/20 bg-lime-500/5' },
                        { icon: '🌿', title: 'Green Aesthetic', desc: 'Natural mossy green color looks great', color: 'border-emerald-500/20 bg-emerald-500/5' },
                        { icon: '✨', title: 'New Release', desc: 'Fresh from the update = slight value boost', color: 'border-amber-500/20 bg-amber-500/5' },
                        { icon: '📦', title: 'Bundle Power', desc: 'Stack multiples for better trades', color: 'border-violet-500/20 bg-violet-500/5' },
                    ].map((item) => (
                        <div key={item.title} className={`rounded-xl border p-3 ${item.color}`}>
                            <div className="text-xl mb-1">{item.icon}</div>
                            <div className="font-bold text-xs">{item.title}</div>
                            <div className="text-[11px] text-muted-foreground mt-0.5">{item.desc}</div>
                        </div>
                    ))}
                </div>
                <div className="mt-4 rounded-xl bg-lime-500/5 border border-lime-500/15 p-3 text-xs text-muted-foreground">
                    <strong>💡 Our tip:</strong> Make Neon! 4 Uncommons is very achievable and significantly boosts trade value. Be one of the first to make a Neon Kakapo! Check our <Link href="/values" className="font-bold underline">live value list</Link> for real-time pricing.
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
                <div className="rounded-2xl p-6 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(190,242,100,0.1), rgba(163,230,53,0.08))' }}>
                    <div className="absolute -bottom-4 -right-4 text-[80px] opacity-10">🌟</div>
                    <h2 className="text-lg font-extrabold mb-3 flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-lime-500" /> Neon Form
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3"><strong>Specific glow areas not yet confirmed!</strong> The Kakapo is brand new, so the Neon form still needs to be discovered. Be the first to make one and find out! We&apos;ll update this guide with the glow details! 🏁✨</p>
                    <div className="space-y-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-2"><span className="h-5 w-5 rounded bg-lime-500/20 flex items-center justify-center text-[10px]">1</span> Raise <strong>4 Kakapos</strong> to Full Grown</div>
                        <div className="flex items-center gap-2"><span className="h-5 w-5 rounded bg-lime-500/20 flex items-center justify-center text-[10px]">2</span> Go to the <strong>Neon Cave</strong></div>
                        <div className="flex items-center gap-2"><span className="h-5 w-5 rounded bg-lime-500/20 flex items-center justify-center text-[10px]">3</span> Place on circles & combine!</div>
                    </div>
                </div>
                <div className="rounded-2xl p-6 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(155,89,182,0.1), rgba(255,107,107,0.08))' }}>
                    <div className="absolute -bottom-4 -right-4 text-[80px] opacity-10">🌈</div>
                    <h2 className="text-lg font-extrabold mb-3 flex items-center gap-2">
                        <Crown className="h-5 w-5 text-violet-500" /> Mega Neon Form
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3"><strong>No Mega Neon exists yet!</strong> Mega Neons cycle through rainbow colors on the Neon glow areas. A rainbow Kakapo will be something special — imagine this fluffy green parrot with rainbow glow! 🌈🦜</p>
                    <div className="space-y-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-2"><span className="h-5 w-5 rounded bg-violet-500/20 flex items-center justify-center text-[10px]">1</span> Raise <strong>4 Neon Kakapos</strong> to Luminous</div>
                        <div className="flex items-center gap-2"><span className="h-5 w-5 rounded bg-violet-500/20 flex items-center justify-center text-[10px]">2</span> Combine in Neon Cave</div>
                        <div className="flex items-center gap-2"><span className="h-5 w-5 rounded bg-violet-500/20 flex items-center justify-center text-[10px]">3</span> Need <strong>16 total</strong> Kakapos!</div>
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
                    <p className="text-xs text-muted-foreground leading-relaxed">Race to make Neon! At 15% hatch rate, collecting 4 is quick. The first Neon Kakapo will generate buzz! Or bundle with other Uncommons for bigger deals. 📈</p>
                </div>
                <div className="rounded-2xl border-2 border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-transparent p-5">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="h-9 w-9 rounded-xl bg-blue-500/15 flex items-center justify-center"><Shield className="h-4 w-4 text-blue-500" /></div>
                        <span className="font-extrabold text-sm">🛒 If You Want One</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">Easiest pet to get! 15% hatch rate from Endangered Egg (750 Bucks) or Basic Egg (400 Bucks). Just hatch a few eggs — no need to trade! 🛡️</p>
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
                        { q: 'How do you get the Kakapo?', a: 'Hatch from the Endangered Egg (15% chance, 750 Bucks) or Basic Egg (400 Bucks). Also super cheap in trades!', color: '#65a30d' },
                        { q: 'What is the hatch rate?', a: '15% from the Endangered Egg. The total Uncommon rate is 35%, split between Kakapo and Black Tiger. Very easy! 📊', color: '#4d7c0f' },
                        { q: 'What does the Neon look like?', a: 'Specific glow areas haven\'t been confirmed yet — the pet is brand new! Be the first to make one and discover the glow pattern! ✨', color: '#bef264' },
                        { q: 'What is a Kakapo in real life?', a: 'A critically endangered flightless parrot from New Zealand! The heaviest parrot in the world — up to 4 kg. Only about 250 exist, each with a unique name! 🦜🇳🇿', color: '#365314' },
                        { q: 'How many for a Mega Neon?', a: '16 Full-Grown Kakapos total — 4 for each Neon, and 4 Neons for the Mega! Very doable at 15% hatch rate! 🌈🏆', color: '#9b59b6' },
                        { q: 'Can Kakapos fly in the game?', a: 'In real life, Kakapos can\'t fly — they\'re flightless! But in Adopt Me, you can add a Fly potion to let them soar. A flying flightless-parrot — how ironic! 😂✈️', color: '#4d96ff' },
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
            <div className="rounded-3xl p-8 text-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #365314, #4d7c0f, #65a30d)' }}>
                <div className="absolute inset-0 opacity-15" style={{ background: 'radial-gradient(circle at 30% 50%, #bef264 0%, transparent 60%), radial-gradient(circle at 70% 50%, #a3e635 0%, transparent 60%)' }} />
                <div className="relative">
                    <p className="text-3xl mb-2">🦜</p>
                    <h3 className="font-black text-xl text-white mb-2">Check the Latest Value!</h3>
                    <p className="text-sm text-lime-200/70 mb-5">Use our free tools to stay ahead of every trade</p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link href="/values" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white whitespace-nowrap" style={{ background: 'linear-gradient(135deg, #9b59b6, #6c3483)', minWidth: 150 }}>
                            <TrendingUp className="h-4 w-4" /> Value List
                        </Link>
                        <Link href="/calculator" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white whitespace-nowrap" style={{ background: 'linear-gradient(135deg, #a3e635, #65a30d)', minWidth: 150 }}>
                            Calculator <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    );
}
