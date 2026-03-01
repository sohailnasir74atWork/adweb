import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Clock, Star, Sparkles, ShoppingBag, TrendingUp, Shield, ArrowRight, Timer, Package, AlertTriangle, Palette, Store, Box } from 'lucide-react';
import { getLocalizedAlternates } from '@/lib/utils/seoHelpers';
import { JsonLd } from '@/components/seo/JsonLd';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const { canonical, languages } = getLocalizedAlternates('/blog/chocolate-chip-bat-dragon-backpack-guide', locale);
    return {
        title: '🎒 Chocolate Chip Bat Dragon Backpack — Complete Guide: Value, How to Get & Trading Tips (2026)',
        description: 'Full fun guide to the Legendary animated Chocolate Chip Bat Dragon Backpack in Adopt Me 2026! 🍫🐉 Shop rotation, chest drop rates (0.1% Regal, 0.03% Standard), 25K Bucks price, and the smartest trading tips for kids!',
        alternates: { canonical, languages },
        openGraph: {
            title: '🎒 Chocolate Chip Bat Dragon Backpack Guide — Adopt Me Values 2026',
            description: 'Complete guide to the Legendary Chocolate Chip Bat Dragon Backpack accessory! Shop price, drop rates, and trading value.',
            images: ['/blog-bat-dragon-backpack.webp'],
        },
    };
}

export const revalidate = 86400;

export default async function ChocolateChipBatDragonBackpackArticle({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);

    const articleJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Chocolate Chip Bat Dragon Backpack — Complete Guide: Value, How to Get & Trading Tips (2026)',
        description: 'Full guide to the Legendary animated Chocolate Chip Bat Dragon Backpack in Adopt Me 2026.',
        image: 'https://adoptmevalues.app/blog-bat-dragon-backpack.webp',
        datePublished: '2026-02-28',
        dateModified: '2026-02-28',
        author: { '@type': 'Organization', name: 'Adopt Me Values', url: 'https://adoptmevalues.app' },
        publisher: { '@type': 'Organization', name: 'Adopt Me Values', logo: { '@type': 'ImageObject', url: 'https://adoptmevalues.app/logo.webp' } },
        mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://adoptmevalues.app/blog/chocolate-chip-bat-dragon-backpack-guide' },
        keywords: ['Chocolate Chip Bat Dragon Backpack', 'Adopt Me', 'Legendary Accessory', 'Roblox', 'Pet Wear', 'Accessory Shop', '2026'],
    };

    const faqJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
            { '@type': 'Question', name: 'How do you get the Chocolate Chip Bat Dragon Backpack in Adopt Me?', acceptedAnswer: { '@type': 'Answer', text: 'Buy from Accessory Shop for 25,000 Bucks, get from chests (0.1% Regal, 0.03% Standard), or trade for it.' } },
            { '@type': 'Question', name: 'How much does the Chocolate Chip Bat Dragon Backpack cost?', acceptedAnswer: { '@type': 'Answer', text: '25,000 in-game Bucks when it appears in the Accessory Shop rotation.' } },
            { '@type': 'Question', name: 'Is the Chocolate Chip Bat Dragon Backpack animated?', acceptedAnswer: { '@type': 'Answer', text: 'Yes! It features moving wings and a subtle breathing animation.' } },
            { '@type': 'Question', name: 'What is the difference between the pet and the backpack?', acceptedAnswer: { '@type': 'Answer', text: 'The pet was a limited Legendary from Nov 2023, trade-only. The backpack is an accessory from Jan 2026.' } },
            { '@type': 'Question', name: 'Can you equip it on any pet?', acceptedAnswer: { '@type': 'Answer', text: 'Yes! It scales to fit any pet and looks best on medium-sized pets.' } },
            { '@type': 'Question', name: 'How often does it appear in the shop?', acceptedAnswer: { '@type': 'Answer', text: 'Shop rotation changes every 10 minutes. Legendary items appear less frequently.' } },
        ],
    };

    const breadcrumbJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://adoptmevalues.app' },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://adoptmevalues.app/blog' },
            { '@type': 'ListItem', position: 3, name: 'Chocolate Chip Bat Dragon Backpack Guide' },
        ],
    };

    return (
        <article className="flex flex-col gap-8">
            <JsonLd data={articleJsonLd} />
            <JsonLd data={faqJsonLd} />
            <JsonLd data={breadcrumbJsonLd} />

            {/* Breadcrumbs */}
            <nav className="flex items-center flex-wrap gap-1 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
                <ChevronRight className="h-3.5 w-3.5" />
                <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
                <ChevronRight className="h-3.5 w-3.5" />
                <span className="text-foreground font-medium">🎒 Bat Dragon Backpack</span>
            </nav>

            {/* ===== HERO SECTION ===== */}
            <div className="rounded-3xl overflow-hidden relative" style={{ background: 'linear-gradient(135deg, #3d1f0e, #5c2d14, #7a3b1a)' }}>
                <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at 80% 20%, #ff6b6b 0%, transparent 60%), radial-gradient(circle at 20% 80%, #9b59b6 0%, transparent 60%)' }} />
                <div className="relative p-6 sm:p-8 lg:p-10 flex flex-col gap-5">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-violet-400/20 text-violet-300 backdrop-blur-sm border border-violet-400/20">🎒 Accessory</span>
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 backdrop-blur-sm border border-amber-400/20">⭐ Legendary</span>
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-400/20 text-rose-300 backdrop-blur-sm border border-rose-400/20">✨ Animated</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
                        Chocolate Chip Bat Dragon Backpack
                        <span className="block text-amber-300 text-xl sm:text-2xl lg:text-3xl font-bold mt-1">Complete Guide 2026</span>
                    </h1>
                    <p className="text-amber-100/80 text-sm max-w-xl">Everything about this adorable animated accessory — price, drop rates, trading value & expert tips!</p>
                    <div className="flex items-center gap-4 text-amber-200/60 text-xs">
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> 7 min read</span>
                        <span>Feb 28, 2026</span>
                        <span>By Adopt Me Values Team</span>
                    </div>
                </div>
            </div>

            {/* ===== FEATURED IMAGE ===== */}
            <div className="blog-hero-overlay border">
                <div className="relative w-full aspect-video">
                    <Image src="/blog-bat-dragon-backpack.webp" alt="Chocolate Chip Bat Dragon Backpack Legendary Animated Accessory in Adopt Me 2026" fill className="object-cover" sizes="(max-width: 768px) 100vw, 896px" priority />
                </div>
            </div>

            {/* ===== QUICK STATS — Visual Grid ===== */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                    { label: 'Type', value: 'Backpack', icon: '🎒', bg: 'from-violet-500/10 to-violet-500/5', border: 'border-violet-500/20' },
                    { label: 'Rarity', value: 'Legendary', icon: '⭐', bg: 'from-amber-500/10 to-amber-500/5', border: 'border-amber-500/20', valueColor: 'text-amber-500' },
                    { label: 'Released', value: 'Jan 30, 2026', icon: '📅', bg: 'from-blue-500/10 to-blue-500/5', border: 'border-blue-500/20' },
                    { label: 'Shop Price', value: '25K Bucks', icon: '💰', bg: 'from-emerald-500/10 to-emerald-500/5', border: 'border-emerald-500/20', valueColor: 'text-emerald-500' },
                    { label: 'Regal Chest', value: '0.10%', icon: '👑', bg: 'from-purple-500/10 to-purple-500/5', border: 'border-purple-500/20', valueColor: 'text-purple-500' },
                    { label: 'Standard', value: '0.03%', icon: '📦', bg: 'from-rose-500/10 to-rose-500/5', border: 'border-rose-500/20', valueColor: 'text-rose-500' },
                ].map((stat) => (
                    <div key={stat.label} className={`rounded-2xl p-4 bg-gradient-to-br ${stat.bg} border ${stat.border} text-center`}>
                        <div className="text-2xl mb-1">{stat.icon}</div>
                        <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">{stat.label}</div>
                        <div className={`text-sm font-extrabold mt-0.5 ${stat.valueColor || ''}`}>{stat.value}</div>
                    </div>
                ))}
            </div>

            {/* ===== WHAT IS IT ===== */}
            <div className="rounded-2xl border bg-card p-6">
                <h2 className="text-xl font-extrabold mb-3 flex items-center gap-2">
                    <span className="h-8 w-8 rounded-xl bg-violet-500/10 flex items-center justify-center text-lg">🍫</span>
                    What Is It?
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    A <strong>Legendary animated pet accessory</strong> — unlike static accessories, this one has <strong>real-time animations!</strong> 🤩 The tiny bat dragon has wings that gently flap and a breathing animation, making it look alive on your pet&apos;s back!
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    Inspired by the iconic <strong>Bat Dragon pet</strong> with a yummy twist — chocolate-brown body covered in darker chocolate chip spots, bat wings, curled tail, and glowing amber eyes! 🍫🐉
                </p>
            </div>

            {/* ===== IMPORTANT WARNING ===== */}
            <div className="rounded-2xl p-5 flex items-start gap-4 border-2 border-rose-500/20" style={{ background: 'linear-gradient(135deg, rgba(255,107,107,0.06), rgba(255,107,107,0.02))' }}>
                <div className="h-10 w-10 rounded-xl bg-rose-500/15 flex items-center justify-center flex-shrink-0"><AlertTriangle className="h-5 w-5 text-rose-500" /></div>
                <div>
                    <p className="font-bold text-sm mb-1 text-rose-600 dark:text-rose-400">⚠️ Don&apos;t Get Confused!</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">The <strong>Backpack</strong> (accessory) is COMPLETELY different from the <strong>Bat Dragon Pet</strong> (limited Legendary from Nov 2023). The pet is MUCH more valuable. Don&apos;t mix them up in trades!</p>
                </div>
            </div>

            {/* ===== HOW TO GET — Visual Cards ===== */}
            <div>
                <h2 className="text-xl font-extrabold mb-4 flex items-center gap-2">
                    <span className="h-8 w-8 rounded-xl bg-emerald-500/10 flex items-center justify-center text-lg">🎯</span>
                    How to Get It
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <div className="rounded-2xl border-2 border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-transparent p-5 relative overflow-hidden">
                        <div className="absolute top-3 right-3 text-3xl opacity-15">🏪</div>
                        <div className="text-2xl mb-2">🏪</div>
                        <h3 className="font-extrabold text-sm mb-1">Accessory Shop</h3>
                        <div className="text-xl font-black text-amber-500 mb-1">25K Bucks</div>
                        <p className="text-[11px] text-muted-foreground">Wait for it in the shop rotation (changes every 10 min)</p>
                        <div className="mt-3 px-2 py-1 rounded-lg bg-amber-500/10 text-[10px] font-bold text-amber-600 dark:text-amber-400 inline-block">MOST RELIABLE</div>
                    </div>
                    <div className="rounded-2xl border-2 border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-transparent p-5 relative overflow-hidden">
                        <div className="absolute top-3 right-3 text-3xl opacity-15">👑</div>
                        <div className="text-2xl mb-2">👑</div>
                        <h3 className="font-extrabold text-sm mb-1">Regal Chest</h3>
                        <div className="text-xl font-black text-purple-500 mb-1">0.10%</div>
                        <p className="text-[11px] text-muted-foreground">~1 in 1,000 chests. Premium tier, better odds!</p>
                        <div className="mt-3 px-2 py-1 rounded-lg bg-purple-500/10 text-[10px] font-bold text-purple-600 dark:text-purple-400 inline-block">BEST CHEST</div>
                    </div>
                    <div className="rounded-2xl border-2 border-rose-500/20 bg-gradient-to-br from-rose-500/5 to-transparent p-5 relative overflow-hidden">
                        <div className="absolute top-3 right-3 text-3xl opacity-15">📦</div>
                        <div className="text-2xl mb-2">📦</div>
                        <h3 className="font-extrabold text-sm mb-1">Standard Chest</h3>
                        <div className="text-xl font-black text-rose-500 mb-1">0.03%</div>
                        <p className="text-[11px] text-muted-foreground">~1 in 3,333 chests. Very low, but possible!</p>
                        <div className="mt-3 px-2 py-1 rounded-lg bg-rose-500/10 text-[10px] font-bold text-rose-600 dark:text-rose-400 inline-block">ULTRA RARE</div>
                    </div>
                    <div className="rounded-2xl border-2 border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-transparent p-5 relative overflow-hidden">
                        <div className="absolute top-3 right-3 text-3xl opacity-15">🤝</div>
                        <div className="text-2xl mb-2">🤝</div>
                        <h3 className="font-extrabold text-sm mb-1">Trading</h3>
                        <div className="text-xl font-black text-blue-500 mb-1">Trade</div>
                        <p className="text-[11px] text-muted-foreground">Get it directly from other players!</p>
                        <div className="mt-3 px-2 py-1 rounded-lg bg-blue-500/10 text-[10px] font-bold text-blue-600 dark:text-blue-400 inline-block">FASTEST WAY</div>
                    </div>
                </div>
            </div>

            {/* ===== SHOP TIPS BANNER ===== */}
            <div className="rounded-2xl p-5 flex items-start gap-4" style={{ background: 'linear-gradient(135deg, rgba(255,217,61,0.1), rgba(255,163,107,0.08))' }}>
                <div className="h-10 w-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-xl flex-shrink-0">💡</div>
                <div>
                    <p className="font-bold text-sm mb-2">Shop-Watching Tips!</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1.5">⏰ Rotation changes every 10 min</div>
                        <div className="flex items-center gap-1.5">⭐ Legendaries appear less often</div>
                        <div className="flex items-center gap-1.5">1️⃣ One purchase per rotation</div>
                        <div className="flex items-center gap-1.5">🌐 Server-hop for faster checking</div>
                    </div>
                </div>
            </div>

            {/* ===== TRADING VALUE ===== */}
            <div className="rounded-2xl border bg-card p-6">
                <h2 className="text-xl font-extrabold mb-4 flex items-center gap-2">
                    <span className="h-8 w-8 rounded-xl bg-amber-500/10 flex items-center justify-center text-lg">💰</span>
                    Trading Value
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                        { icon: '⭐', title: 'Legendary Rarity', desc: 'Highest accessory tier', color: 'border-amber-500/20 bg-amber-500/5' },
                        { icon: '✨', title: 'Animated', desc: 'Rarer than static accessories', color: 'border-violet-500/20 bg-violet-500/5' },
                        { icon: '🐉', title: 'Bat Dragon Hype', desc: 'Iconic pet connection = extra demand', color: 'border-rose-500/20 bg-rose-500/5' },
                        { icon: '🔄', title: 'Rotation Scarcity', desc: 'Hard to find in shop', color: 'border-blue-500/20 bg-blue-500/5' },
                        { icon: '💰', title: '25K Floor', desc: 'High cost = natural value floor', color: 'border-emerald-500/20 bg-emerald-500/5' },
                        { icon: '😍', title: 'Collector Demand', desc: 'Animated legendaries hold value well', color: 'border-pink-500/20 bg-pink-500/5' },
                    ].map((item) => (
                        <div key={item.title} className={`rounded-xl border p-3 ${item.color}`}>
                            <div className="text-xl mb-1">{item.icon}</div>
                            <div className="font-bold text-xs">{item.title}</div>
                            <div className="text-[11px] text-muted-foreground mt-0.5">{item.desc}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ===== DESIGN DETAILS ===== */}
            <div className="rounded-2xl border bg-card p-6">
                <h2 className="text-xl font-extrabold mb-4 flex items-center gap-2">
                    <span className="h-8 w-8 rounded-xl bg-pink-500/10 flex items-center justify-center"><Palette className="h-4 w-4 text-pink-500" /></span>
                    Design & Animation Details
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                        { icon: '🍫', feature: 'Body', desc: 'Chubby chocolate dragon with darker chip dots' },
                        { icon: '🦇', feature: 'Wings', desc: 'Bat wings that gently flap rhythmically' },
                        { icon: '✨', feature: 'Eyes', desc: 'Glowing amber eyes, warm & friendly' },
                        { icon: '🎀', feature: 'Tail', desc: 'Curled chocolate tail that wraps around' },
                        { icon: '💨', feature: 'Breathing', desc: 'Body expands & contracts like breathing' },
                        { icon: '🎒', feature: 'Straps', desc: 'Matching chocolate-themed backpack straps' },
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

            {/* ===== PET vs BACKPACK COMPARISON ===== */}
            <div>
                <h2 className="text-xl font-extrabold mb-4 flex items-center gap-2">
                    <span className="h-8 w-8 rounded-xl bg-red-500/10 flex items-center justify-center text-lg">⚖️</span>
                    Pet vs. Backpack
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="rounded-2xl border-2 border-amber-500/20 p-5 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(255,163,107,0.06), transparent)' }}>
                        <div className="absolute top-3 right-3 text-4xl opacity-10">🐉</div>
                        <div className="text-3xl mb-3">🐉</div>
                        <h3 className="font-black text-sm mb-3">The Pet</h3>
                        <div className="space-y-2 text-xs text-muted-foreground">
                            <div className="flex items-center gap-2"><span className="h-5 w-5 rounded bg-amber-500/20 flex items-center justify-center text-[10px]">📅</span> Released Nov 2023</div>
                            <div className="flex items-center gap-2"><span className="h-5 w-5 rounded bg-amber-500/20 flex items-center justify-center text-[10px]">🔒</span> Trade only (limited!)</div>
                            <div className="flex items-center gap-2"><span className="h-5 w-5 rounded bg-amber-500/20 flex items-center justify-center text-[10px]">✅</span> Can make Neon/Mega Neon</div>
                            <div className="flex items-center gap-2"><span className="h-5 w-5 rounded bg-amber-500/20 flex items-center justify-center text-[10px]">📈</span> <strong>Extremely high</strong> value</div>
                        </div>
                    </div>
                    <div className="rounded-2xl border-2 border-violet-500/20 p-5 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(155,89,182,0.06), transparent)' }}>
                        <div className="absolute top-3 right-3 text-4xl opacity-10">🎒</div>
                        <div className="text-3xl mb-3">🎒</div>
                        <h3 className="font-black text-sm mb-3">The Backpack</h3>
                        <div className="space-y-2 text-xs text-muted-foreground">
                            <div className="flex items-center gap-2"><span className="h-5 w-5 rounded bg-violet-500/20 flex items-center justify-center text-[10px]">📅</span> Released Jan 30, 2026</div>
                            <div className="flex items-center gap-2"><span className="h-5 w-5 rounded bg-violet-500/20 flex items-center justify-center text-[10px]">🏪</span> Shop / Chests / Trade</div>
                            <div className="flex items-center gap-2"><span className="h-5 w-5 rounded bg-violet-500/20 flex items-center justify-center text-[10px]">❌</span> Cannot make Neon</div>
                            <div className="flex items-center gap-2"><span className="h-5 w-5 rounded bg-violet-500/20 flex items-center justify-center text-[10px]">📊</span> High (but lower than pet)</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ===== SCAM WARNING ===== */}
            <div className="rounded-2xl p-5 flex items-start gap-4 border-2 border-red-500/25" style={{ background: 'linear-gradient(135deg, rgba(255,59,59,0.08), rgba(255,59,59,0.02))' }}>
                <div className="h-10 w-10 rounded-xl bg-red-500/15 flex items-center justify-center flex-shrink-0"><Shield className="h-5 w-5 text-red-500" /></div>
                <div>
                    <p className="font-bold text-sm mb-1 text-red-600 dark:text-red-400">🚨 Scam Warning!</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">Some traders try to pass off the <strong>backpack</strong> as the <strong>pet</strong> in trades! ALWAYS verify exactly what you&apos;re receiving. Check our <Link href="/scammer-database" className="font-bold underline">Scammer Database</Link> and use the official trade window!</p>
                </div>
            </div>

            {/* ===== TRADING TIPS ===== */}
            <div className="grid sm:grid-cols-3 gap-3">
                <div className="rounded-2xl border-2 border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-transparent p-5">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="h-9 w-9 rounded-xl bg-emerald-500/15 flex items-center justify-center"><ShoppingBag className="h-4 w-4 text-emerald-500" /></div>
                        <span className="font-extrabold text-sm">🛒 Buying</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">Trade for it instead of waiting at the shop! Many sell for less than 25K value — especially from chest drops!</p>
                </div>
                <div className="rounded-2xl border-2 border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-transparent p-5">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="h-9 w-9 rounded-xl bg-blue-500/15 flex items-center justify-center"><TrendingUp className="h-4 w-4 text-blue-500" /></div>
                        <span className="font-extrabold text-sm">📈 Selling</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">Got a duplicate? Sell NOW while demand is high! The longer it&apos;s in rotation, the more supply enters the market.</p>
                </div>
                <div className="rounded-2xl border-2 border-rose-500/20 bg-gradient-to-br from-rose-500/5 to-transparent p-5">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="h-9 w-9 rounded-xl bg-rose-500/15 flex items-center justify-center"><Shield className="h-4 w-4 text-rose-500" /></div>
                        <span className="font-extrabold text-sm">🛡️ Safety</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">Double-check you&apos;re trading for the BACKPACK not the pet! Verify icon and name before accepting!</p>
                </div>
            </div>

            {/* ===== FAQ — Modern Cards ===== */}
            <div>
                <h2 className="text-xl font-extrabold mb-4 flex items-center gap-2">
                    <span className="h-8 w-8 rounded-xl bg-blue-500/10 flex items-center justify-center text-lg">❓</span>
                    Frequently Asked Questions
                </h2>
                <div className="grid gap-3">
                    {[
                        { q: 'How do you get the backpack?', a: 'Buy from Accessory Shop (25K Bucks), open Regal Chests (0.10%) or Standard Chests (0.03%), or trade!', color: '#ff6b6b' },
                        { q: 'How much does it cost?', a: '25,000 in-game Bucks from the shop — highest accessory price! Trading value varies by demand. 📊', color: '#ffa36b' },
                        { q: 'Is the backpack animated?', a: 'YES! Legendary animated — flapping wings + breathing animation. Looks alive on your pet! 🐉✨', color: '#ffd93d' },
                        { q: 'Pet vs backpack difference?', a: 'Pet = limited Legendary from 2023, can go Neon, MUCH more valuable. Backpack = cosmetic accessory from 2026.', color: '#6bcb77' },
                        { q: 'Works on any pet?', a: 'Yep! Scales to fit any pet, looks best on medium-sized ones. Equip/unequip anytime! 🎮', color: '#4d96ff' },
                        { q: 'How often in shop?', a: 'Rotation changes every 10 min, but Legendaries show up way less often. Server-hop to check faster! 🌐', color: '#9b59b6' },
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
            <div className="rounded-3xl p-8 text-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #3d1f0e, #5c2d14, #7a3b1a)' }}>
                <div className="absolute inset-0 opacity-15" style={{ background: 'radial-gradient(circle at 30% 50%, #ff6b6b 0%, transparent 60%), radial-gradient(circle at 70% 50%, #9b59b6 0%, transparent 60%)' }} />
                <div className="relative">
                    <p className="text-3xl mb-2">🎒</p>
                    <h3 className="font-black text-xl text-white mb-2">Check the Latest Value!</h3>
                    <p className="text-sm text-amber-200/70 mb-5">Use our free tools to trade smart & stay ahead</p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link href="/values" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white whitespace-nowrap" style={{ background: 'linear-gradient(135deg, #9b59b6, #6c3483)', minWidth: 150 }}>
                            <TrendingUp className="h-4 w-4" /> Value List
                        </Link>
                        <Link href="/calculator" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white whitespace-nowrap" style={{ background: 'linear-gradient(135deg, #ff6b6b, #c0392b)', minWidth: 150 }}>
                            Calculator <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    );
}
