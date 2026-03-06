import Link from 'next/link';
import { ChevronRight, Clock, Sparkles, TrendingUp, Shield, ArrowRight, Crown, Palette } from 'lucide-react';
import { getLocalizedAlternates } from '@/lib/utils/seoHelpers';
import { JsonLd } from '@/components/seo/JsonLd';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const { canonical, languages } = getLocalizedAlternates('/blog/black-footed-ferret-guide', locale);
    return {
        title: '🦡 Black-Footed Ferret in Adopt Me — Complete Guide: Value, How to Get, Neon & Mega Neon (2026)',
        description: 'Full guide to the new Ultra Rare Black-Footed Ferret in Adopt Me 2026! Trading value, how to get it, tricks, Neon & Mega Neon forms, and expert tips! 🎮',
        alternates: { canonical, languages },
        openGraph: {
            title: '🦡 Black-Footed Ferret Guide — Adopt Me Values 2026',
            description: 'Complete guide to the Ultra Rare Black-Footed Ferret in Adopt Me! Value, tricks, and Neon/Mega Neon info.',
        },
    };
}

export const revalidate = 86400;

export default async function BlackFootedFerretArticle({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);

    const articleJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Black-Footed Ferret in Adopt Me — Complete Guide: Value, How to Get, Neon & Mega Neon (2026)',
        description: 'Everything about the Ultra Rare Black-Footed Ferret in Adopt Me 2026.',
        datePublished: '2026-03-02',
        dateModified: '2026-03-02',
        author: { '@type': 'Organization', name: 'Adopt Me Values', url: 'https://www.adoptmevalues.app' },
        publisher: { '@type': 'Organization', name: 'Adopt Me Values', logo: { '@type': 'ImageObject', url: 'https://www.adoptmevalues.app/logo.webp' } },
        mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://www.adoptmevalues.app/blog/black-footed-ferret-guide' },
    };

    const faqJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
            { '@type': 'Question', name: 'How do you get the Black-Footed Ferret in Adopt Me?', acceptedAnswer: { '@type': 'Answer', text: 'The Black-Footed Ferret comes from the new Endangered Egg or through trading.' } },
            { '@type': 'Question', name: 'What is the Black-Footed Ferret worth?', acceptedAnswer: { '@type': 'Answer', text: 'It is an Ultra Rare pet with solid trading value. Check our live value list for the latest prices.' } },
            { '@type': 'Question', name: 'What does a Neon Black-Footed Ferret look like?', acceptedAnswer: { '@type': 'Answer', text: 'The Neon version glows on its mask, paws, and tail tip. The Mega Neon cycles through rainbow colors.' } },
        ],
    };

    const breadcrumbJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.adoptmevalues.app' },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.adoptmevalues.app/blog' },
            { '@type': 'ListItem', position: 3, name: 'Black-Footed Ferret Guide' },
        ],
    };

    return (
        <article className="flex flex-col gap-8">
            <JsonLd data={articleJsonLd} />
            <JsonLd data={faqJsonLd} />
            <JsonLd data={breadcrumbJsonLd} />

            <nav className="flex items-center gap-1 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
                <ChevronRight className="h-3.5 w-3.5" />
                <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
                <ChevronRight className="h-3.5 w-3.5" />
                <span className="text-foreground font-medium">🦡 Black-Footed Ferret</span>
            </nav>

            {/* HERO */}
            <div className="rounded-3xl overflow-hidden relative" style={{ background: 'linear-gradient(135deg, #2c1810, #4a3228, #6b4c3b)' }}>
                <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at 80% 20%, #c9a96e 0%, transparent 60%), radial-gradient(circle at 20% 80%, #8b5e3c 0%, transparent 60%)' }} />
                <div className="relative p-6 sm:p-8 lg:p-10 flex flex-col gap-5">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 backdrop-blur-sm border border-amber-400/20">🦡 New Pet</span>
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-400/20 text-purple-300 backdrop-blur-sm border border-purple-400/20">💜 Ultra Rare</span>
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-400/20 text-emerald-300 backdrop-blur-sm border border-emerald-400/20">🌍 Endangered</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
                        Black-Footed Ferret
                        <span className="block text-amber-300 text-xl sm:text-2xl lg:text-3xl font-bold mt-1">Complete Guide 2026</span>
                    </h1>
                    <p className="text-amber-100/80 text-sm max-w-xl">This sneaky little ferret is here! Get the full scoop on value, tricks, Neon & Mega Neon, and the smartest way to trade for one.</p>
                    <div className="flex items-center gap-4 text-amber-200/60 text-xs">
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> 6 min read</span>
                        <span>Mar 2, 2026</span>
                        <span>By Adopt Me Values Team</span>
                    </div>
                </div>
            </div>

            {/* QUICK STATS */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {[
                    { label: 'Type', value: 'Pet', icon: '🐾', bg: 'from-violet-500/10 to-violet-500/5', border: 'border-violet-500/20' },
                    { label: 'Rarity', value: 'Ultra Rare', icon: '💜', bg: 'from-purple-500/10 to-purple-500/5', border: 'border-purple-500/20', valueColor: 'text-purple-500' },
                    { label: 'Released', value: 'Mar 2, 2026', icon: '📅', bg: 'from-blue-500/10 to-blue-500/5', border: 'border-blue-500/20' },
                    { label: 'From', value: 'Endangered Egg', icon: '🥚', bg: 'from-emerald-500/10 to-emerald-500/5', border: 'border-emerald-500/20' },
                    { label: 'Fly & Ride', value: 'No', icon: '🚫', bg: 'from-rose-500/10 to-rose-500/5', border: 'border-rose-500/20' },
                ].map((stat) => (
                    <div key={stat.label} className={`rounded-2xl p-4 bg-gradient-to-br ${stat.bg} border ${stat.border} text-center`}>
                        <div className="text-2xl mb-1">{stat.icon}</div>
                        <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">{stat.label}</div>
                        <div className={`text-sm font-extrabold mt-0.5 ${stat.valueColor || ''}`}>{stat.value}</div>
                    </div>
                ))}
            </div>

            {/* INTRO */}
            <div className="rounded-2xl border bg-card p-6">
                <h2 className="text-xl font-extrabold mb-3 flex items-center gap-2">
                    <span className="h-8 w-8 rounded-xl bg-amber-500/10 flex items-center justify-center text-lg">🦡</span>
                    What Is the Black-Footed Ferret?
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    The Black-Footed Ferret is an <strong>Ultra Rare pet</strong> from the Endangered Animals update! In real life, these little guys were once thought to be extinct — only about 300 exist in the wild today! 🌍
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    It&apos;s got a super cute &quot;bandit mask&quot; on its face and a long slinky body. Think of it like a little ninja weasel! It&apos;s part of the same egg as the Pangolin and Blue Whale.
                </p>
            </div>

            {/* HOW TO GET */}
            <div>
                <h2 className="text-xl font-extrabold mb-4 flex items-center gap-2">
                    <span className="h-8 w-8 rounded-xl bg-violet-500/10 flex items-center justify-center text-lg">🥚</span>
                    How to Get It
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                    <div className="rounded-2xl border-2 border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-transparent p-5 relative overflow-hidden">
                        <div className="absolute top-3 right-3 text-3xl opacity-20">🥚</div>
                        <div className="text-2xl mb-2">🥚</div>
                        <h3 className="font-extrabold text-sm mb-1">Endangered Egg</h3>
                        <div className="text-2xl font-black text-amber-500 mb-1">Hatch</div>
                        <p className="text-xs text-muted-foreground">Available as an Ultra Rare hatch! Keep opening those eggs and this sneaky ferret will pop up.</p>
                        <div className="mt-3 px-2 py-1 rounded-lg bg-amber-500/10 text-[10px] font-bold text-amber-600 dark:text-amber-400 inline-block">BEST WAY</div>
                    </div>
                    <div className="rounded-2xl border-2 border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-transparent p-5 relative overflow-hidden">
                        <div className="absolute top-3 right-3 text-3xl opacity-20">🤝</div>
                        <div className="text-2xl mb-2">🤝</div>
                        <h3 className="font-extrabold text-sm mb-1">Trading</h3>
                        <div className="text-2xl font-black text-blue-500 mb-1">Trade</div>
                        <p className="text-xs text-muted-foreground">Grab one from other players! Check the value list first so you don&apos;t overpay.</p>
                        <div className="mt-3 px-2 py-1 rounded-lg bg-blue-500/10 text-[10px] font-bold text-blue-600 dark:text-blue-400 inline-block">FASTEST WAY</div>
                    </div>
                </div>
            </div>

            {/* TRADING VALUE */}
            <div className="rounded-2xl border bg-card p-6">
                <h2 className="text-xl font-extrabold mb-4 flex items-center gap-2">
                    <span className="h-8 w-8 rounded-xl bg-rose-500/10 flex items-center justify-center text-lg">💰</span>
                    Trading Value
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    Sitting at a <strong className="text-amber-500">MODERATE</strong> level — slightly higher than the Pangolin thanks to its unique look and cool mask design!
                </p>
                <div className="grid grid-cols-2 gap-3">
                    {[
                        { icon: '🦡', title: 'Unique Design', desc: 'The bandit mask face is super popular', color: 'border-amber-500/20 bg-amber-500/5' },
                        { icon: '✨', title: 'New Release', desc: 'Fresh from the update = extra hype', color: 'border-rose-500/20 bg-rose-500/5' },
                        { icon: '🌍', title: 'Endangered Theme', desc: 'Players love the real-world connection', color: 'border-emerald-500/20 bg-emerald-500/5' },
                        { icon: '🌈', title: 'Neon Appeal', desc: 'The glowing mask looks incredible', color: 'border-violet-500/20 bg-violet-500/5' },
                    ].map((item) => (
                        <div key={item.title} className={`rounded-xl border p-3 ${item.color}`}>
                            <div className="text-xl mb-1">{item.icon}</div>
                            <div className="font-bold text-xs">{item.title}</div>
                            <div className="text-[11px] text-muted-foreground mt-0.5">{item.desc}</div>
                        </div>
                    ))}
                </div>
                <div className="mt-4 rounded-xl bg-emerald-500/5 border border-emerald-500/15 p-3 text-xs text-muted-foreground">
                    <strong>💡 Our tip:</strong> Great value for Ultra Rare tier! Bundle it with other Endangered pets for bigger trades. Check <Link href="/values" className="font-bold underline">live values</Link> before any deals.
                </div>
            </div>

            {/* TRICKS */}
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
            </div>

            {/* NEON & MEGA NEON */}
            <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-2xl p-6 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(201,169,110,0.1), rgba(139,94,60,0.08))' }}>
                    <div className="absolute -bottom-4 -right-4 text-[80px] opacity-10">🌟</div>
                    <h2 className="text-lg font-extrabold mb-3 flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-amber-500" /> Neon Form
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">The ferret&apos;s <strong>mask, paw tips, and tail glow</strong> with a soft warm light! The glowing bandit mask is honestly the coolest part — looks like a little superhero! 🦸</p>
                    <div className="space-y-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-2"><span className="h-5 w-5 rounded bg-amber-500/20 flex items-center justify-center text-[10px]">1</span> Raise <strong>4 Ferrets</strong> to Full Grown</div>
                        <div className="flex items-center gap-2"><span className="h-5 w-5 rounded bg-amber-500/20 flex items-center justify-center text-[10px]">2</span> Head to the <strong>Neon Cave</strong></div>
                        <div className="flex items-center gap-2"><span className="h-5 w-5 rounded bg-amber-500/20 flex items-center justify-center text-[10px]">3</span> Place on circles & fuse!</div>
                    </div>
                </div>
                <div className="rounded-2xl p-6 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(155,89,182,0.1), rgba(255,107,107,0.08))' }}>
                    <div className="absolute -bottom-4 -right-4 text-[80px] opacity-10">🌈</div>
                    <h2 className="text-lg font-extrabold mb-3 flex items-center gap-2">
                        <Crown className="h-5 w-5 text-violet-500" /> Mega Neon Form
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">The mask and highlights <strong>cycle through rainbow colors</strong> — imagine a little ninja weasel with a constantly shifting glowing disguise! 🌈</p>
                    <div className="space-y-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-2"><span className="h-5 w-5 rounded bg-violet-500/20 flex items-center justify-center text-[10px]">1</span> Raise <strong>4 Neon Ferrets</strong> to Luminous</div>
                        <div className="flex items-center gap-2"><span className="h-5 w-5 rounded bg-violet-500/20 flex items-center justify-center text-[10px]">2</span> Combine in Neon Cave</div>
                        <div className="flex items-center gap-2"><span className="h-5 w-5 rounded bg-violet-500/20 flex items-center justify-center text-[10px]">3</span> Need <strong>16 total</strong> Ferrets!</div>
                    </div>
                </div>
            </div>

            {/* FAQ */}
            <div>
                <h2 className="text-xl font-extrabold mb-4 flex items-center gap-2">
                    <span className="h-8 w-8 rounded-xl bg-cyan-500/10 flex items-center justify-center text-lg">❓</span>
                    Frequently Asked Questions
                </h2>
                <div className="grid gap-3">
                    {[
                        { q: 'How do you get the Black-Footed Ferret?', a: 'Hatch from the Endangered Egg or trade with other players!', color: '#c9a96e' },
                        { q: 'What is it worth?', a: 'Solid Ultra Rare value! A tiny bit above the Pangolin. Check our value tracker for exact numbers! 📊', color: '#8b5e3c' },
                        { q: 'What does the Neon look like?', a: 'The bandit mask, paws, and tail tip glow! Mega Neon cycles rainbow — looks absolutely sick! ✨', color: '#9b59b6' },
                        { q: 'Is it a good pet to collect?', a: 'Definitely! Unique design and endangered theme make it popular. Great for your collection! 🎯', color: '#4d96ff' },
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

            {/* CTA */}
            <div className="rounded-3xl p-8 text-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #2c1810, #4a3228, #6b4c3b)' }}>
                <div className="absolute inset-0 opacity-15" style={{ background: 'radial-gradient(circle at 30% 50%, #c9a96e 0%, transparent 60%), radial-gradient(circle at 70% 50%, #8b5e3c 0%, transparent 60%)' }} />
                <div className="relative">
                    <p className="text-3xl mb-2">🦡</p>
                    <h3 className="font-black text-xl text-white mb-2">Check the Latest Value!</h3>
                    <p className="text-sm text-amber-200/70 mb-5">Use our free tools to stay ahead of every trade</p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link href="/values" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white whitespace-nowrap" style={{ background: 'linear-gradient(135deg, #9b59b6, #6c3483)', minWidth: 150 }}>
                            <TrendingUp className="h-4 w-4" /> Value List
                        </Link>
                        <Link href="/calculator" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white whitespace-nowrap" style={{ background: 'linear-gradient(135deg, #c9a96e, #8b5e3c)', minWidth: 150 }}>
                            Calculator <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    );
}
