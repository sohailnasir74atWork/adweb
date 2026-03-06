import Link from 'next/link';
import { ChevronRight, Clock, Sparkles, TrendingUp, Shield, ArrowRight, Crown, Palette } from 'lucide-react';
import { getLocalizedAlternates } from '@/lib/utils/seoHelpers';
import { JsonLd } from '@/components/seo/JsonLd';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const { canonical, languages } = getLocalizedAlternates('/blog/pangolin-guide', locale);
    return {
        title: '🦎 Pangolin in Adopt Me — Complete Guide: Value, How to Get, Neon & Mega Neon (2026)',
        description: 'Everything about the new Ultra Rare Pangolin in Adopt Me 2026! Learn how to get it, its trading value, Neon & Mega Neon glow, tricks, and the best trading tips! 🎮',
        alternates: { canonical, languages },
        openGraph: {
            title: '🦎 Pangolin Guide — Adopt Me Values 2026',
            description: 'Full guide to the Ultra Rare Pangolin in Adopt Me! Value, tricks, and Neon/Mega Neon info.',
        },
    };
}

export const revalidate = 86400;

export default async function PangolinArticle({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);

    const articleJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Pangolin in Adopt Me — Complete Guide: Value, How to Get, Neon & Mega Neon (2026)',
        description: 'Everything you need to know about the Ultra Rare Pangolin in Adopt Me 2026.',
        datePublished: '2026-03-02',
        dateModified: '2026-03-02',
        author: { '@type': 'Organization', name: 'Adopt Me Values', url: 'https://www.adoptmevalues.app' },
        publisher: { '@type': 'Organization', name: 'Adopt Me Values', logo: { '@type': 'ImageObject', url: 'https://www.adoptmevalues.app/logo.webp' } },
        mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://www.adoptmevalues.app/blog/pangolin-guide' },
        keywords: ['Pangolin', 'Adopt Me', 'Ultra Rare Pet', 'Roblox', 'Neon', 'Mega Neon', 'Trading Value', '2026'],
    };

    const faqJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
            { '@type': 'Question', name: 'How do you get the Pangolin in Adopt Me?', acceptedAnswer: { '@type': 'Answer', text: 'The Pangolin is part of the new Endangered Animals update. You can get it from the Endangered Egg or through trading with other players.' } },
            { '@type': 'Question', name: 'What is the Pangolin worth in Adopt Me?', acceptedAnswer: { '@type': 'Answer', text: 'The Pangolin is an Ultra Rare pet with moderate trading value. Check our live value tracker for the latest prices.' } },
            { '@type': 'Question', name: 'What does a Neon Pangolin look like?', acceptedAnswer: { '@type': 'Answer', text: 'The Neon Pangolin glows along its scales, giving it a gorgeous armored glow effect. The Mega Neon cycles through rainbow colors.' } },
            { '@type': 'Question', name: 'How many Pangolins do you need for Mega Neon?', acceptedAnswer: { '@type': 'Answer', text: 'You need 16 Full-Grown Pangolins — 4 for each Neon, and 4 Neons for the Mega Neon.' } },
        ],
    };

    const breadcrumbJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.adoptmevalues.app' },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.adoptmevalues.app/blog' },
            { '@type': 'ListItem', position: 3, name: 'Pangolin Guide' },
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
                <span className="text-foreground font-medium">🦎 Pangolin</span>
            </nav>

            {/* HERO */}
            <div className="rounded-3xl overflow-hidden relative" style={{ background: 'linear-gradient(135deg, #5d4e37, #8b7355, #a68b5b)' }}>
                <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at 80% 20%, #d4a574 0%, transparent 60%), radial-gradient(circle at 20% 80%, #8b6914 0%, transparent 60%)' }} />
                <div className="relative p-6 sm:p-8 lg:p-10 flex flex-col gap-5">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 backdrop-blur-sm border border-amber-400/20">🦎 New Pet</span>
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-400/20 text-purple-300 backdrop-blur-sm border border-purple-400/20">💜 Ultra Rare</span>
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-400/20 text-emerald-300 backdrop-blur-sm border border-emerald-400/20">🌍 Endangered</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
                        Pangolin
                        <span className="block text-amber-300 text-xl sm:text-2xl lg:text-3xl font-bold mt-1">Complete Guide 2026</span>
                    </h1>
                    <p className="text-amber-100/80 text-sm max-w-xl">The scaly little buddy everyone wants! Here&apos;s everything about its value, tricks, Neon & Mega Neon forms, and smart trade tips.</p>
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
                    <span className="h-8 w-8 rounded-xl bg-amber-500/10 flex items-center justify-center text-lg">🦎</span>
                    What Is the Pangolin?
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    The Pangolin is an <strong>Ultra Rare pet</strong> that just dropped with the brand new Endangered Animals update! Pangolins are the world&apos;s most trafficked mammals in real life — and now you can adopt one in Roblox! 🌍
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    It&apos;s got the cutest little scales and rolls into a ball when it&apos;s happy. Seriously adorable stuff! This pet is part of the <strong>Endangered Animals Egg</strong> lineup alongside other cool animals like the Black-Footed Ferret and Blue Whale.
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
                        <p className="text-xs text-muted-foreground">Available as an Ultra Rare from the new Endangered Egg! Keep hatching and you&apos;ll get one.</p>
                        <div className="mt-3 px-2 py-1 rounded-lg bg-amber-500/10 text-[10px] font-bold text-amber-600 dark:text-amber-400 inline-block">BEST WAY</div>
                    </div>
                    <div className="rounded-2xl border-2 border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-transparent p-5 relative overflow-hidden">
                        <div className="absolute top-3 right-3 text-3xl opacity-20">🤝</div>
                        <div className="text-2xl mb-2">🤝</div>
                        <h3 className="font-extrabold text-sm mb-1">Trading</h3>
                        <div className="text-2xl font-black text-blue-500 mb-1">Trade</div>
                        <p className="text-xs text-muted-foreground">Trade with other players! Prices are a bit high right after release but should settle soon.</p>
                        <div className="mt-3 px-2 py-1 rounded-lg bg-blue-500/10 text-[10px] font-bold text-blue-600 dark:text-blue-400 inline-block">FASTEST WAY</div>
                    </div>
                </div>
            </div>

            {/* PRO TIP */}
            <div className="rounded-2xl p-5 flex items-start gap-4" style={{ background: 'linear-gradient(135deg, rgba(255,217,61,0.1), rgba(255,163,107,0.08))' }}>
                <div className="h-10 w-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-xl flex-shrink-0">💡</div>
                <div>
                    <p className="font-bold text-sm mb-1">Fun Fact!</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">Real pangolins are covered in tough keratin scales — the same stuff your fingernails are made of! When scared, they curl into a tight ball. The Adopt Me version does this too during its idle animation! 🥰</p>
                </div>
            </div>

            {/* TRADING VALUE */}
            <div className="rounded-2xl border bg-card p-6">
                <h2 className="text-xl font-extrabold mb-4 flex items-center gap-2">
                    <span className="h-8 w-8 rounded-xl bg-rose-500/10 flex items-center justify-center text-lg">💰</span>
                    Trading Value
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    Currently sitting at a <strong className="text-amber-500">MODERATE</strong> level — it&apos;s an Ultra Rare so it&apos;s not as pricey as the legendaries, but still pretty solid!
                </p>
                <div className="grid grid-cols-2 gap-3">
                    {[
                        { icon: '💜', title: 'Ultra Rare', desc: 'Higher than Rare but below Legendary', color: 'border-purple-500/20 bg-purple-500/5' },
                        { icon: '✨', title: 'Newness Hype', desc: 'Brand new = extra demand right now', color: 'border-amber-500/20 bg-amber-500/5' },
                        { icon: '🌍', title: 'Cool Theme', desc: 'Endangered animals are super popular', color: 'border-emerald-500/20 bg-emerald-500/5' },
                        { icon: '🌈', title: 'Neon Glow', desc: 'Scales light up amazingly in Neon form', color: 'border-violet-500/20 bg-violet-500/5' },
                    ].map((item) => (
                        <div key={item.title} className={`rounded-xl border p-3 ${item.color}`}>
                            <div className="text-xl mb-1">{item.icon}</div>
                            <div className="font-bold text-xs">{item.title}</div>
                            <div className="text-[11px] text-muted-foreground mt-0.5">{item.desc}</div>
                        </div>
                    ))}
                </div>
                <div className="mt-4 rounded-xl bg-emerald-500/5 border border-emerald-500/15 p-3 text-xs text-muted-foreground">
                    <strong>💡 Our tip:</strong> Since it&apos;s Ultra Rare, don&apos;t overpay! Wait a week or two for people to hatch more of them. Check our <Link href="/values" className="font-bold underline">live value list</Link> for real-time pricing.
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
                <div className="rounded-2xl p-6 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(212,165,116,0.1), rgba(139,105,20,0.08))' }}>
                    <div className="absolute -bottom-4 -right-4 text-[80px] opacity-10">🌟</div>
                    <h2 className="text-lg font-extrabold mb-3 flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-amber-500" /> Neon Form
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">The Pangolin&apos;s <strong>scales light up with a warm golden glow</strong>! It looks like a little glowing armored knight — honestly one of the prettiest Ultra Rare Neons out there! ✨</p>
                    <div className="space-y-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-2"><span className="h-5 w-5 rounded bg-amber-500/20 flex items-center justify-center text-[10px]">1</span> Raise <strong>4 Pangolins</strong> to Full Grown</div>
                        <div className="flex items-center gap-2"><span className="h-5 w-5 rounded bg-amber-500/20 flex items-center justify-center text-[10px]">2</span> Head to the <strong>Neon Cave</strong></div>
                        <div className="flex items-center gap-2"><span className="h-5 w-5 rounded bg-amber-500/20 flex items-center justify-center text-[10px]">3</span> Place on circles & combine!</div>
                    </div>
                </div>
                <div className="rounded-2xl p-6 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(155,89,182,0.1), rgba(255,107,107,0.08))' }}>
                    <div className="absolute -bottom-4 -right-4 text-[80px] opacity-10">🌈</div>
                    <h2 className="text-lg font-extrabold mb-3 flex items-center gap-2">
                        <Crown className="h-5 w-5 text-violet-500" /> Mega Neon Form
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">Every single scale <strong>cycles through rainbow colors</strong> — it&apos;s like a walking disco ball made of armor! Absolutely stunning and super rare to see in servers! 🌈</p>
                    <div className="space-y-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-2"><span className="h-5 w-5 rounded bg-violet-500/20 flex items-center justify-center text-[10px]">1</span> Raise <strong>4 Neon Pangolins</strong> to Luminous</div>
                        <div className="flex items-center gap-2"><span className="h-5 w-5 rounded bg-violet-500/20 flex items-center justify-center text-[10px]">2</span> Combine in Neon Cave</div>
                        <div className="flex items-center gap-2"><span className="h-5 w-5 rounded bg-violet-500/20 flex items-center justify-center text-[10px]">3</span> Need <strong>16 total</strong> Pangolins!</div>
                    </div>
                </div>
            </div>

            {/* DESIGN */}
            <div className="rounded-2xl border bg-card p-6">
                <h2 className="text-xl font-extrabold mb-4 flex items-center gap-2">
                    <span className="h-8 w-8 rounded-xl bg-pink-500/10 flex items-center justify-center"><Palette className="h-4 w-4 text-pink-500" /></span>
                    Design & Appearance
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                        { icon: '🦎', feature: 'Body', desc: 'Covered in adorable overlapping scales' },
                        { icon: '🤎', feature: 'Color', desc: 'Warm brown and tan tones' },
                        { icon: '👀', feature: 'Face', desc: 'Tiny cute eyes peeking out from the scales' },
                        { icon: '🐾', feature: 'Paws', desc: 'Little clawed feet, perfect for digging' },
                        { icon: '🎬', feature: 'Animations', desc: 'Curls into a ball during idle!' },
                        { icon: '⭐', feature: 'Overall', desc: 'Unique armored look, unlike any other pet' },
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

            {/* TRADING TIPS */}
            <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-2xl border-2 border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-transparent p-5">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="h-9 w-9 rounded-xl bg-emerald-500/15 flex items-center justify-center"><TrendingUp className="h-4 w-4 text-emerald-500" /></div>
                        <span className="font-extrabold text-sm">🎉 If You Have One</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">Ultra Rares are great for building up your collection! Hold onto it or trade early while the hype is still high. You can bundle with other new pets for bigger trades! 📈</p>
                </div>
                <div className="rounded-2xl border-2 border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-transparent p-5">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="h-9 w-9 rounded-xl bg-blue-500/15 flex items-center justify-center"><Shield className="h-4 w-4 text-blue-500" /></div>
                        <span className="font-extrabold text-sm">🛒 If You Want One</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">Don&apos;t rush! As more people hatch the Endangered Egg, Pangolins will become easier to find. Always check our value list before trading! 🛡️</p>
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
                        { q: 'How do you get the Pangolin?', a: 'Hatch it from the new Endangered Egg, or trade for it with other players!', color: '#d4a574' },
                        { q: 'What is the Pangolin worth?', a: 'It\'s an Ultra Rare so it sits in the mid-range. Check our live value tracker for the exact current price! 📊', color: '#8b6914' },
                        { q: 'What does Neon Pangolin look like?', a: 'Its scales glow with a beautiful warm light! Mega Neon version cycles through all rainbow colors on every scale! ✨', color: '#9b59b6' },
                        { q: 'Is the Pangolin good for trading?', a: 'Yep! Ultra Rares are perfect for bundling in trades. Grab a few and combine them for bigger deals! 🎯', color: '#4d96ff' },
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
            <div className="rounded-3xl p-8 text-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #5d4e37, #8b7355, #a68b5b)' }}>
                <div className="absolute inset-0 opacity-15" style={{ background: 'radial-gradient(circle at 30% 50%, #d4a574 0%, transparent 60%), radial-gradient(circle at 70% 50%, #8b6914 0%, transparent 60%)' }} />
                <div className="relative">
                    <p className="text-3xl mb-2">🦎</p>
                    <h3 className="font-black text-xl text-white mb-2">Check the Latest Value!</h3>
                    <p className="text-sm text-amber-200/70 mb-5">Use our free tools to stay ahead of every trade</p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link href="/values" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white whitespace-nowrap" style={{ background: 'linear-gradient(135deg, #9b59b6, #6c3483)', minWidth: 150 }}>
                            <TrendingUp className="h-4 w-4" /> Value List
                        </Link>
                        <Link href="/calculator" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white whitespace-nowrap" style={{ background: 'linear-gradient(135deg, #d4a574, #8b6914)', minWidth: 150 }}>
                            Calculator <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    );
}
