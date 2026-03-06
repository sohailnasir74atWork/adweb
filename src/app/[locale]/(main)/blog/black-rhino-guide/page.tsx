import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Clock, Sparkles, TrendingUp, Shield, ArrowRight, Crown, Palette } from 'lucide-react';
import { getLocalizedAlternates } from '@/lib/utils/seoHelpers';
import { JsonLd } from '@/components/seo/JsonLd';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const { canonical, languages } = getLocalizedAlternates('/blog/black-rhino-guide', locale);
    return {
        title: '🦏 Black Rhino in Adopt Me — Complete Guide: Value, How to Get, Neon & Mega Neon (2026)',
        description: 'Full guide to the Rare Black Rhino in Adopt Me 2026! 10% hatch rate from Endangered Egg, trading value, tricks, and Neon info! 🎮',
        alternates: { canonical, languages },
        openGraph: {
            title: '🦏 Black Rhino Guide — Adopt Me Values 2026',
            description: 'Complete guide to the Rare Black Rhino in Adopt Me! 10% hatch rate, value, and trading tips.',
            images: ['/blog-black-rhino.webp'],
        },
    };
}

export const revalidate = 86400;

export default async function BlackRhinoArticle({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);

    const articleJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Black Rhino in Adopt Me — Complete Guide: Value, How to Get, Neon & Mega Neon (2026)',
        description: 'Everything about the Rare Black Rhino in Adopt Me 2026.',
        datePublished: '2026-03-02',
        dateModified: '2026-03-02',
        author: { '@type': 'Organization', name: 'Adopt Me Values', url: 'https://www.adoptmevalues.app' },
        publisher: { '@type': 'Organization', name: 'Adopt Me Values', logo: { '@type': 'ImageObject', url: 'https://www.adoptmevalues.app/logo.webp' } },
        mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://www.adoptmevalues.app/blog/black-rhino-guide' },
        image: 'https://www.adoptmevalues.app/blog-black-rhino.webp',
        keywords: ['Black Rhino', 'Adopt Me', 'Rare Pet', 'Roblox', 'Endangered Egg', 'Neon', 'Mega Neon', 'Trading Value', '2026'],
    };

    const faqJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
            { '@type': 'Question', name: 'How do you get the Black Rhino in Adopt Me?', acceptedAnswer: { '@type': 'Answer', text: 'The Black Rhino can be hatched from the Endangered Egg (10% chance, 750 Bucks), Basic Egg (400 Bucks), or Crystal Egg (4,000 Bucks). You can also trade for one.' } },
            { '@type': 'Question', name: 'What is the Black Rhino hatch rate?', acceptedAnswer: { '@type': 'Answer', text: 'The Black Rhino has a 10% hatch chance from the Endangered Egg. The total Rare hatch rate is 27%, split between Black Rhino and Mexican Wolf.' } },
            { '@type': 'Question', name: 'What does a Neon Black Rhino look like?', acceptedAnswer: { '@type': 'Answer', text: 'As of March 2026, no Neon Black Rhino has been made yet. Check back for updates when the first one is created!' } },
            { '@type': 'Question', name: 'How many Black Rhinos for Mega Neon?', acceptedAnswer: { '@type': 'Answer', text: 'You need 16 Full-Grown Black Rhinos — 4 for each Neon, and 4 Neons for the Mega Neon.' } },
            { '@type': 'Question', name: 'How endangered is the Black Rhino in real life?', acceptedAnswer: { '@type': 'Answer', text: 'Black Rhinos are critically endangered with about 6,000 remaining in the wild, mostly in eastern and southern Africa.' } },
            { '@type': 'Question', name: 'What tricks does the Black Rhino learn?', acceptedAnswer: { '@type': 'Answer', text: 'Newborn: Sit, Junior: Joyful, Pre-Teen: Beg, Teen: Jump, Post-Teen: Trick 1, Full Grown: Trick 2.' } },
        ],
    };

    const breadcrumbJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.adoptmevalues.app' },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.adoptmevalues.app/blog' },
            { '@type': 'ListItem', position: 3, name: 'Black Rhino Guide' },
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
                <span className="text-foreground font-medium">🦏 Black Rhino</span>
            </nav>

            {/* ===== HERO ===== */}
            <div className="rounded-3xl overflow-hidden relative" style={{ background: 'linear-gradient(135deg, #1f2937, #374151, #4b5563)' }}>
                <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at 80% 20%, #d1d5db 0%, transparent 60%), radial-gradient(circle at 20% 80%, #9ca3af 0%, transparent 60%)' }} />
                <div className="relative p-6 sm:p-8 lg:p-10 flex flex-col gap-5">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-400/20 text-gray-300 backdrop-blur-sm border border-gray-400/20">🦏 New Pet</span>
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-400/20 text-blue-300 backdrop-blur-sm border border-blue-400/20">💙 Rare</span>
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-400/20 text-emerald-300 backdrop-blur-sm border border-emerald-400/20">🌍 Critically Endangered</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
                        Black Rhino
                        <span className="block text-gray-300 text-xl sm:text-2xl lg:text-3xl font-bold mt-1">Complete Guide 2026</span>
                    </h1>
                    <p className="text-gray-200/80 text-sm max-w-xl">This armored tank of a pet is here! Full breakdown — 10% hatch rate, trading value, tricks, and everything about this chunky legend.</p>
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
                    <Image src="/blog-black-rhino.webp" alt="Black Rhino Rare Pet in Adopt Me 2026" fill className="object-cover" sizes="(max-width: 768px) 100vw, 896px" priority />
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
                    { label: 'Also In', value: 'Basic & Crystal', icon: '💎', bg: 'from-purple-500/10 to-purple-500/5', border: 'border-purple-500/20' },
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
                    <span className="h-8 w-8 rounded-xl bg-gray-500/10 flex items-center justify-center text-lg">🦏</span>
                    What Is the Black Rhino?
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    The Black Rhino is a <strong>Rare pet</strong> released on February 28, 2026 with the Endangered Egg update! In real life, black rhinos are <strong>critically endangered</strong> with only about 6,000 remaining in eastern and southern Africa. They&apos;re known for their hooked upper lip used for grabbing branches! 🌿
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    With a <strong>10% hatch rate</strong> from the Endangered Egg (750 Bucks), it&apos;s one of two Rare pets alongside the Mexican Wolf. The total Rare hatch chance is 27%, giving you decent odds of hatching one!
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
                        <p className="text-xs text-muted-foreground">Basic Egg (400 Bucks) or Crystal Egg (4,000 Bucks) can hatch it too!</p>
                        <div className="mt-3 px-2 py-1 rounded-lg bg-purple-500/10 text-[10px] font-bold text-purple-600 dark:text-purple-400 inline-block">ALTERNATIVE</div>
                    </div>
                    <div className="rounded-2xl border-2 border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-transparent p-5 relative overflow-hidden">
                        <div className="absolute top-3 right-3 text-3xl opacity-20">🤝</div>
                        <div className="text-2xl mb-2">🤝</div>
                        <h3 className="font-extrabold text-sm mb-1">Trading</h3>
                        <div className="text-2xl font-black text-blue-500 mb-1">Trade</div>
                        <p className="text-xs text-muted-foreground">Easy to find in trades at affordable prices!</p>
                        <div className="mt-3 px-2 py-1 rounded-lg bg-blue-500/10 text-[10px] font-bold text-blue-600 dark:text-blue-400 inline-block">AFFORDABLE</div>
                    </div>
                </div>
            </div>

            {/* ===== PRO TIP ===== */}
            <div className="rounded-2xl p-5 flex items-start gap-4" style={{ background: 'linear-gradient(135deg, rgba(156,163,175,0.1), rgba(75,85,99,0.08))' }}>
                <div className="h-10 w-10 rounded-xl bg-gray-500/20 flex items-center justify-center text-xl flex-shrink-0">💡</div>
                <div>
                    <p className="font-bold text-sm mb-1">Fun Fact!</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">Despite being called &quot;black&quot; rhinos, they&apos;re actually gray! The name came to distinguish them from &quot;white&quot; rhinos — which are ALSO gray. The &quot;white&quot; comes from a mistranslation of the Dutch word &quot;wijd&quot; meaning &quot;wide&quot; (referring to their lips). Real black rhinos can run up to 35 mph despite weighing over 3,000 lbs! 💨</p>
                </div>
            </div>

            {/* ===== TRADING VALUE ===== */}
            <div className="rounded-2xl border bg-card p-6">
                <h2 className="text-xl font-extrabold mb-4 flex items-center gap-2">
                    <span className="h-8 w-8 rounded-xl bg-rose-500/10 flex items-center justify-center text-lg">💰</span>
                    Trading Value
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    Currently <strong className="text-blue-500">LOW-MODERATE</strong> — Rare tier with a 10% hatch rate. Great for bundling and collection building!
                </p>
                <div className="grid grid-cols-2 gap-3">
                    {[
                        { icon: '🦏', title: 'Unique Design', desc: 'Big horn + chunky body = popular look', color: 'border-gray-500/20 bg-gray-500/5' },
                        { icon: '✨', title: 'New Release', desc: 'Fresh from the update = small value bump', color: 'border-amber-500/20 bg-amber-500/5' },
                        { icon: '🌍', title: 'Critically Endangered', desc: 'Only 6,000 left IRL — adds collector appeal', color: 'border-emerald-500/20 bg-emerald-500/5' },
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
                    <strong>💡 Our tip:</strong> Great for bundling with Mexican Wolf and other Rares! Be one of the first to make Neon — nobody has yet! Check our <Link href="/values" className="font-bold underline">live value list</Link> for real-time pricing.
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
                <div className="rounded-2xl p-6 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(156,163,175,0.1), rgba(75,85,99,0.08))' }}>
                    <div className="absolute -bottom-4 -right-4 text-[80px] opacity-10">🌟</div>
                    <h2 className="text-lg font-extrabold mb-3 flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-gray-400" /> Neon Form
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3"><strong>No Neon Black Rhino has been made yet!</strong> This pet is brand new (Feb 28, 2026), so nobody has raised 4 to Full Grown yet. Be one of the first to discover the glow pattern! The race is on! 🏁✨</p>
                    <div className="space-y-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-2"><span className="h-5 w-5 rounded bg-gray-500/20 flex items-center justify-center text-[10px]">1</span> Raise <strong>4 Rhinos</strong> to Full Grown</div>
                        <div className="flex items-center gap-2"><span className="h-5 w-5 rounded bg-gray-500/20 flex items-center justify-center text-[10px]">2</span> Go to the <strong>Neon Cave</strong></div>
                        <div className="flex items-center gap-2"><span className="h-5 w-5 rounded bg-gray-500/20 flex items-center justify-center text-[10px]">3</span> Place on circles & combine!</div>
                    </div>
                </div>
                <div className="rounded-2xl p-6 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(155,89,182,0.1), rgba(255,107,107,0.08))' }}>
                    <div className="absolute -bottom-4 -right-4 text-[80px] opacity-10">🌈</div>
                    <h2 className="text-lg font-extrabold mb-3 flex items-center gap-2">
                        <Crown className="h-5 w-5 text-violet-500" /> Mega Neon Form
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3"><strong>No Mega Neon exists yet either!</strong> Mega Neons cycle through rainbow colors on the same glow areas. The first person to make a Mega Neon Black Rhino will be a legend! 🌈🦏</p>
                    <div className="space-y-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-2"><span className="h-5 w-5 rounded bg-violet-500/20 flex items-center justify-center text-[10px]">1</span> Raise <strong>4 Neon Rhinos</strong> to Luminous</div>
                        <div className="flex items-center gap-2"><span className="h-5 w-5 rounded bg-violet-500/20 flex items-center justify-center text-[10px]">2</span> Combine in Neon Cave</div>
                        <div className="flex items-center gap-2"><span className="h-5 w-5 rounded bg-violet-500/20 flex items-center justify-center text-[10px]">3</span> Need <strong>16 total</strong> Rhinos!</div>
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
                    <p className="text-xs text-muted-foreground leading-relaxed">Bundle with other Rares for bigger trades! Or race to be the first to make Neon — the first Neon Black Rhino will generate massive hype and trade offers! 📈</p>
                </div>
                <div className="rounded-2xl border-2 border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-transparent p-5">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="h-9 w-9 rounded-xl bg-blue-500/15 flex items-center justify-center"><Shield className="h-4 w-4 text-blue-500" /></div>
                        <span className="font-extrabold text-sm">🛒 If You Want One</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">At 10% hatch rate, just buy a few Endangered Eggs (750 Bucks each)! No need to overpay in trades. Rares are easy to get by hatching! 🛡️</p>
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
                        { q: 'How do you get the Black Rhino?', a: 'Hatch from the Endangered Egg (10% chance, 750 Bucks), Basic Egg (400 Bucks), or Crystal Egg (4,000 Bucks). Also available through trading!', color: '#4b5563' },
                        { q: 'What is the hatch rate?', a: '10% from the Endangered Egg. The total Rare rate is 27%, split between Black Rhino and Mexican Wolf. Good odds! 📊', color: '#6b7280' },
                        { q: 'What does the Neon look like?', a: 'Nobody has made one yet! The Black Rhino is brand new. Be the first to discover the glow pattern! We\'ll update this guide when the first Neon is created. ✨', color: '#9b59b6' },
                        { q: 'Why is it called "black" rhino?', a: 'Despite the name, real black rhinos are actually gray! The name came to distinguish them from "white" rhinos (which are also gray — "white" came from a Dutch word meaning "wide"). 🦏', color: '#374151' },
                        { q: 'How many for a Mega Neon?', a: '16 Full-Grown Black Rhinos total — 4 for each Neon, and 4 Neons for the Mega! 🌈🏆', color: '#4d96ff' },
                        { q: 'How endangered is it in real life?', a: 'Critically endangered! Only about 6,000 black rhinos remain in the wild, mostly in eastern and southern Africa. Conservation efforts have been helping numbers slowly grow! 🌍', color: '#059669' },
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
            <div className="rounded-3xl p-8 text-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1f2937, #374151, #4b5563)' }}>
                <div className="absolute inset-0 opacity-15" style={{ background: 'radial-gradient(circle at 30% 50%, #d1d5db 0%, transparent 60%), radial-gradient(circle at 70% 50%, #9ca3af 0%, transparent 60%)' }} />
                <div className="relative">
                    <p className="text-3xl mb-2">🦏</p>
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
