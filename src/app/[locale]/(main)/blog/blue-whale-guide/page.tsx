import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Clock, Sparkles, TrendingUp, Shield, ArrowRight, Crown, Palette } from 'lucide-react';
import { getLocalizedAlternates } from '@/lib/utils/seoHelpers';
import { JsonLd } from '@/components/seo/JsonLd';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const { canonical, languages } = getLocalizedAlternates('/blog/blue-whale-guide', locale);
    return {
        title: '🐋 Blue Whale in Adopt Me — Complete Guide: Value, How to Get, Neon & Mega Neon (2026)',
        description: 'Full guide to the Legendary Blue Whale in Adopt Me 2026! 1.5% hatch rate from the Endangered Egg, trading value, tricks, light blue Neon glow on spots & underbelly, and trading tips! 🎮',
        alternates: { canonical, languages },
        openGraph: {
            title: '🐋 Blue Whale Guide — Adopt Me Values 2026',
            description: 'Complete guide to the Legendary Blue Whale pet in Adopt Me! 1.5% hatch rate, value, Neon glow, and tips.',
            images: ['/blog-blue-whale.webp'],
        },
    };
}

export const revalidate = 86400;

export default async function BlueWhaleArticle({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);

    const articleJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Blue Whale in Adopt Me — Complete Guide: Value, How to Get, Neon & Mega Neon (2026)',
        description: 'Everything about the Legendary Blue Whale in Adopt Me 2026.',
        datePublished: '2026-03-02',
        dateModified: '2026-03-02',
        author: { '@type': 'Organization', name: 'Adopt Me Values', url: 'https://www.adoptmevalues.app' },
        publisher: { '@type': 'Organization', name: 'Adopt Me Values', logo: { '@type': 'ImageObject', url: 'https://www.adoptmevalues.app/logo.webp' } },
        mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://www.adoptmevalues.app/blog/blue-whale-guide' },
        image: 'https://www.adoptmevalues.app/blog-blue-whale.webp',
        keywords: ['Blue Whale', 'Adopt Me', 'Legendary Pet', 'Roblox', 'Endangered Egg', 'Neon', 'Mega Neon', 'Trading Value', '2026'],
    };

    const faqJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
            { '@type': 'Question', name: 'How do you get the Blue Whale in Adopt Me?', acceptedAnswer: { '@type': 'Answer', text: 'The Blue Whale can be hatched from the Endangered Egg (1.5% chance, 750 Bucks), Basic Egg (400 Bucks), or Crystal Egg (4,000 Bucks). You can also trade for one.' } },
            { '@type': 'Question', name: 'What is the Blue Whale worth in Adopt Me?', acceptedAnswer: { '@type': 'Answer', text: 'The Blue Whale is a Legendary pet with high trading value. Check our live value tracker for the latest price.' } },
            { '@type': 'Question', name: 'What does a Neon Blue Whale look like?', acceptedAnswer: { '@type': 'Answer', text: 'The Neon Blue Whale glows light blue on its spots and underbelly. The Mega Neon version cycles through rainbow colors on the same areas.' } },
            { '@type': 'Question', name: 'What is the hatch rate for the Blue Whale?', acceptedAnswer: { '@type': 'Answer', text: 'The Blue Whale has a 1.5% hatch chance from the Endangered Egg. The total Legendary rate is 3%, split between Blue Whale and Sea Turtle.' } },
            { '@type': 'Question', name: 'How many Blue Whales for Mega Neon?', acceptedAnswer: { '@type': 'Answer', text: 'You need 16 Full-Grown Blue Whales — 4 for each Neon, and 4 Neons for the Mega Neon.' } },
            { '@type': 'Question', name: 'Is the Blue Whale better than the Sea Turtle?', acceptedAnswer: { '@type': 'Answer', text: 'Both are Legendary with the same 1.5% hatch rate. The Blue Whale has light blue Neon glow while the Sea Turtle has red. Value-wise they are very similar.' } },
        ],
    };

    const breadcrumbJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.adoptmevalues.app' },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.adoptmevalues.app/blog' },
            { '@type': 'ListItem', position: 3, name: 'Blue Whale Guide' },
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
                <span className="text-foreground font-medium">🐋 Blue Whale</span>
            </nav>

            {/* ===== HERO ===== */}
            <div className="rounded-3xl overflow-hidden relative" style={{ background: 'linear-gradient(135deg, #0c4a6e, #0369a1, #0284c7)' }}>
                <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at 80% 20%, #7dd3fc 0%, transparent 60%), radial-gradient(circle at 20% 80%, #38bdf8 0%, transparent 60%)' }} />
                <div className="relative p-6 sm:p-8 lg:p-10 flex flex-col gap-5">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-400/20 text-sky-300 backdrop-blur-sm border border-sky-400/20">🐋 New Pet</span>
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 backdrop-blur-sm border border-amber-400/20">⭐ Legendary</span>
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-400/20 text-rose-300 backdrop-blur-sm border border-rose-400/20">🔥 1.5% Hatch Rate</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
                        Blue Whale
                        <span className="block text-sky-300 text-xl sm:text-2xl lg:text-3xl font-bold mt-1">Complete Guide 2026</span>
                    </h1>
                    <p className="text-sky-100/80 text-sm max-w-xl">The biggest animal on Earth is now a pet! Everything you need — 1.5% hatch rate, trading value, tricks, light blue Neon glow, and expert tips!</p>
                    <div className="flex items-center gap-4 text-sky-200/60 text-xs">
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> 7 min read</span>
                        <span>Feb 28, 2026</span>
                        <span>By Adopt Me Values Team</span>
                    </div>
                </div>
            </div>

            {/* ===== FEATURED IMAGE ===== */}
            <div className="blog-hero-overlay border">
                <div className="relative w-full aspect-video">
                    <Image src="/blog-blue-whale.webp" alt="Blue Whale Legendary Pet in Adopt Me 2026" fill className="object-cover" sizes="(max-width: 768px) 100vw, 896px" priority />
                </div>
            </div>

            {/* ===== QUICK STATS ===== */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                    { label: 'Type', value: 'Pet', icon: '🐾', bg: 'from-violet-500/10 to-violet-500/5', border: 'border-violet-500/20' },
                    { label: 'Rarity', value: 'Legendary', icon: '⭐', bg: 'from-amber-500/10 to-amber-500/5', border: 'border-amber-500/20', valueColor: 'text-amber-500' },
                    { label: 'Released', value: 'Feb 28, 2026', icon: '📅', bg: 'from-blue-500/10 to-blue-500/5', border: 'border-blue-500/20' },
                    { label: 'Endangered Egg', value: '1.5%', icon: '🥚', bg: 'from-emerald-500/10 to-emerald-500/5', border: 'border-emerald-500/20', valueColor: 'text-emerald-500' },
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
                    <span className="h-8 w-8 rounded-xl bg-sky-500/10 flex items-center justify-center text-lg">🐋</span>
                    What Is the Blue Whale?
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    The Blue Whale is a <strong>Legendary pet</strong> released on February 28, 2026 as part of the Endangered Animals update! It&apos;s one of two Legendary pets in the <strong>Endangered Egg</strong>, alongside the Sea Turtle. The biggest animal on Earth is now the biggest pet in your inventory! 🌊
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    With a <strong>1.5% hatch rate</strong> from the Endangered Egg, it shares the same rarity as the Sea Turtle. Both Legendaries have a combined 3% hatch chance, making either one a lucky pull! Real blue whales can grow up to 100 feet long and weigh 200 tons — the Adopt Me version is slightly more pocket-sized! 😄
                </p>
            </div>

            {/* ===== HOW TO GET ===== */}
            <div>
                <h2 className="text-xl font-extrabold mb-4 flex items-center gap-2">
                    <span className="h-8 w-8 rounded-xl bg-violet-500/10 flex items-center justify-center text-lg">🥚</span>
                    How to Get It
                </h2>
                <div className="grid sm:grid-cols-3 gap-3">
                    <div className="rounded-2xl border-2 border-sky-500/20 bg-gradient-to-br from-sky-500/5 to-transparent p-5 relative overflow-hidden">
                        <div className="absolute top-3 right-3 text-3xl opacity-20">🥚</div>
                        <div className="text-2xl mb-2">🥚</div>
                        <h3 className="font-extrabold text-sm mb-1">Endangered Egg</h3>
                        <div className="text-2xl font-black text-sky-500 mb-1">1.5%</div>
                        <p className="text-xs text-muted-foreground">Costs 750 Bucks. Best dedicated option — roughly 1 in 67 eggs!</p>
                        <div className="mt-3 px-2 py-1 rounded-lg bg-sky-500/10 text-[10px] font-bold text-sky-600 dark:text-sky-400 inline-block">RECOMMENDED</div>
                    </div>
                    <div className="rounded-2xl border-2 border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-transparent p-5 relative overflow-hidden">
                        <div className="absolute top-3 right-3 text-3xl opacity-20">💎</div>
                        <div className="text-2xl mb-2">💎</div>
                        <h3 className="font-extrabold text-sm mb-1">Crystal Egg / Basic Egg</h3>
                        <div className="text-2xl font-black text-purple-500 mb-1">Also Available</div>
                        <p className="text-xs text-muted-foreground">Crystal Egg costs 4,000 Bucks, Basic Egg 400 Bucks. Lower odds but possible!</p>
                        <div className="mt-3 px-2 py-1 rounded-lg bg-purple-500/10 text-[10px] font-bold text-purple-600 dark:text-purple-400 inline-block">ALTERNATIVE</div>
                    </div>
                    <div className="rounded-2xl border-2 border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-transparent p-5 relative overflow-hidden">
                        <div className="absolute top-3 right-3 text-3xl opacity-20">🤝</div>
                        <div className="text-2xl mb-2">🤝</div>
                        <h3 className="font-extrabold text-sm mb-1">Trading</h3>
                        <div className="text-2xl font-black text-blue-500 mb-1">Trade</div>
                        <p className="text-xs text-muted-foreground">Get it directly from other players. Prices are high after launch!</p>
                        <div className="mt-3 px-2 py-1 rounded-lg bg-blue-500/10 text-[10px] font-bold text-blue-600 dark:text-blue-400 inline-block">FASTEST WAY</div>
                    </div>
                </div>
            </div>

            {/* ===== PRO TIP ===== */}
            <div className="rounded-2xl p-5 flex items-start gap-4" style={{ background: 'linear-gradient(135deg, rgba(125,211,252,0.1), rgba(56,189,248,0.08))' }}>
                <div className="h-10 w-10 rounded-xl bg-sky-500/20 flex items-center justify-center text-xl flex-shrink-0">💡</div>
                <div>
                    <p className="font-bold text-sm mb-1">Pro Tip!</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">The Endangered Egg at 750 Bucks gives you a 3% total Legendary chance (1.5% Blue Whale + 1.5% Sea Turtle). That means on average you&apos;ll hit a Legendary every ~33 eggs, costing roughly 24,750 Bucks. Compare that to the Crystal Egg at 4,000 each — the Endangered Egg is WAY more efficient! 📊</p>
                </div>
            </div>

            {/* ===== TRADING VALUE ===== */}
            <div className="rounded-2xl border bg-card p-6">
                <h2 className="text-xl font-extrabold mb-4 flex items-center gap-2">
                    <span className="h-8 w-8 rounded-xl bg-rose-500/10 flex items-center justify-center text-lg">💰</span>
                    Trading Value
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    Currently <strong className="text-sky-500">HIGH</strong> 📈 — Legendary from the newest egg with only a 1.5% hatch rate!
                </p>
                <div className="grid grid-cols-2 gap-3">
                    {[
                        { icon: '🔥', title: '1.5% Hatch Rate', desc: 'Very low odds = high trade value', color: 'border-rose-500/20 bg-rose-500/5' },
                        { icon: '🐋', title: 'Iconic Animal', desc: 'Biggest animal ever! Everyone wants one', color: 'border-sky-500/20 bg-sky-500/5' },
                        { icon: '✨', title: 'Newness Premium', desc: 'Brand new release = maximum demand', color: 'border-amber-500/20 bg-amber-500/5' },
                        { icon: '💙', title: 'Light Blue Neon', desc: 'Beautiful blue glow on spots & underbelly', color: 'border-violet-500/20 bg-violet-500/5' },
                    ].map((item) => (
                        <div key={item.title} className={`rounded-xl border p-3 ${item.color}`}>
                            <div className="text-xl mb-1">{item.icon}</div>
                            <div className="font-bold text-xs">{item.title}</div>
                            <div className="text-[11px] text-muted-foreground mt-0.5">{item.desc}</div>
                        </div>
                    ))}
                </div>
                <div className="mt-4 rounded-xl bg-sky-500/5 border border-sky-500/15 p-3 text-xs text-muted-foreground">
                    <strong>💡 Our tip:</strong> Similar value to the Sea Turtle since they share the same 1.5% rate. Buying? Wait 2-3 weeks for hype to settle. Selling? Now is peak value! Check our <Link href="/values" className="font-bold underline">live value list</Link> for up-to-date data.
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
                <div className="rounded-2xl p-6 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(125,211,252,0.1), rgba(56,189,248,0.08))' }}>
                    <div className="absolute -bottom-4 -right-4 text-[80px] opacity-10">🌟</div>
                    <h2 className="text-lg font-extrabold mb-3 flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-sky-500" /> Neon Form
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">The Blue Whale&apos;s <strong>spots and underbelly glow light blue</strong>! It looks absolutely stunning — like a bioluminescent whale swimming through deep ocean waters! 💙✨</p>
                    <div className="space-y-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-2"><span className="h-5 w-5 rounded bg-sky-500/20 flex items-center justify-center text-[10px]">1</span> Raise <strong>4 Blue Whales</strong> to Full Grown</div>
                        <div className="flex items-center gap-2"><span className="h-5 w-5 rounded bg-sky-500/20 flex items-center justify-center text-[10px]">2</span> Go to the <strong>Neon Cave</strong></div>
                        <div className="flex items-center gap-2"><span className="h-5 w-5 rounded bg-sky-500/20 flex items-center justify-center text-[10px]">3</span> Place on circles & combine!</div>
                    </div>
                </div>
                <div className="rounded-2xl p-6 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(155,89,182,0.1), rgba(255,107,107,0.08))' }}>
                    <div className="absolute -bottom-4 -right-4 text-[80px] opacity-10">🌈</div>
                    <h2 className="text-lg font-extrabold mb-3 flex items-center gap-2">
                        <Crown className="h-5 w-5 text-violet-500" /> Mega Neon Form
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">The spots and underbelly <strong>cycle through the entire rainbow</strong> instead of staying blue — a massive rainbow whale cruising through your server! Mind-blowing! 🌈🐋</p>
                    <div className="space-y-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-2"><span className="h-5 w-5 rounded bg-violet-500/20 flex items-center justify-center text-[10px]">1</span> Raise <strong>4 Neon Whales</strong> to Luminous</div>
                        <div className="flex items-center gap-2"><span className="h-5 w-5 rounded bg-violet-500/20 flex items-center justify-center text-[10px]">2</span> Combine in Neon Cave</div>
                        <div className="flex items-center gap-2"><span className="h-5 w-5 rounded bg-violet-500/20 flex items-center justify-center text-[10px]">3</span> Need <strong>16 total</strong> Blue Whales!</div>
                    </div>
                </div>
            </div>

            {/* ===== TRADING TIPS ===== */}
            <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-2xl border-2 border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-transparent p-5">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="h-9 w-9 rounded-xl bg-emerald-500/15 flex items-center justify-center"><TrendingUp className="h-4 w-4 text-emerald-500" /></div>
                        <span className="font-extrabold text-sm">🎉 If You Hatched One</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">Trade in the first 1-2 weeks for peak value! Or consider trading for multiple proven legendaries instead of one big trade. Neon Blue Whale will be insanely valuable if you can make one! 📈</p>
                </div>
                <div className="rounded-2xl border-2 border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-transparent p-5">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="h-9 w-9 rounded-xl bg-blue-500/15 flex items-center justify-center"><Shield className="h-4 w-4 text-blue-500" /></div>
                        <span className="font-extrabold text-sm">🛒 If You&apos;re Buying</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">Be patient! Wait 2-3 weeks for prices to settle. At 1.5% hatch rate, supply will increase over time. Always use our Trade Calculator before big trades! 🛡️</p>
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
                        { q: 'How do you get the Blue Whale?', a: 'Hatch from the Endangered Egg (1.5% chance, 750 Bucks), Basic Egg (400 Bucks), or Crystal Egg (4,000 Bucks). Or trade for it!', color: '#38bdf8' },
                        { q: 'What is the hatch rate?', a: '1.5% from the Endangered Egg. The total Legendary rate is 3%, split equally between Blue Whale and Sea Turtle (1.5% each). 📊', color: '#0284c7' },
                        { q: 'What does the Neon look like?', a: 'Spots and underbelly glow light blue! Looks like a bioluminescent deep-sea creature. Mega Neon does rainbow cycling on the same areas! ✨', color: '#7dd3fc' },
                        { q: 'Blue Whale vs Sea Turtle — which is better?', a: 'Both are Legendary with identical 1.5% hatch rates. Blue Whale glows light blue, Sea Turtle glows red. Value-wise they are very similar — pick the one you like more! 🐢🐋', color: '#059669' },
                        { q: 'How many for a Mega Neon?', a: '16 Full-Grown Blue Whales total — 4 for each Neon, and 4 Neons for the Mega! That is a LOT of whales! 🌈🏆', color: '#9b59b6' },
                        { q: 'Best egg to hatch it from?', a: 'Endangered Egg is most efficient per Buck! 750 Bucks vs 4,000 for Crystal. Both work, but you get way more tries per Buck with Endangered! 🎯', color: '#4d96ff' },
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
            <div className="rounded-3xl p-8 text-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0c4a6e, #0369a1, #0284c7)' }}>
                <div className="absolute inset-0 opacity-15" style={{ background: 'radial-gradient(circle at 30% 50%, #7dd3fc 0%, transparent 60%), radial-gradient(circle at 70% 50%, #38bdf8 0%, transparent 60%)' }} />
                <div className="relative">
                    <p className="text-3xl mb-2">🐋</p>
                    <h3 className="font-black text-xl text-white mb-2">Check the Latest Value!</h3>
                    <p className="text-sm text-sky-200/70 mb-5">Use our free tools to stay ahead of every trade</p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link href="/values" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white whitespace-nowrap" style={{ background: 'linear-gradient(135deg, #9b59b6, #6c3483)', minWidth: 150 }}>
                            <TrendingUp className="h-4 w-4" /> Value List
                        </Link>
                        <Link href="/calculator" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white whitespace-nowrap" style={{ background: 'linear-gradient(135deg, #38bdf8, #0369a1)', minWidth: 150 }}>
                            Calculator <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    );
}
