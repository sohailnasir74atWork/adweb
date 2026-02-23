import Link from 'next/link';
import { Calculator, TrendingUp, Handshake, MessageCircle, BarChart3, Newspaper, Search, ArrowLeftRight, Sparkles, HelpCircle } from 'lucide-react';
import { JsonLd } from '@/components/seo/JsonLd';

const FEATURES = [
  {
    href: '/values',
    title: 'Pet Values',
    description: 'See what every pet is worth!',
    icon: TrendingUp,
    bg: 'bg-emerald-100 dark:bg-emerald-900/30',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    ring: 'ring-emerald-200 dark:ring-emerald-800',
  },
  {
    href: '/calculator',
    title: 'Trade Checker',
    description: 'Is your trade fair? Find out!',
    icon: Calculator,
    bg: 'bg-rose-100 dark:bg-rose-900/30',
    iconColor: 'text-rose-600 dark:text-rose-400',
    ring: 'ring-rose-200 dark:ring-rose-800',
  },
  {
    href: '/trades',
    title: 'Trade Hub',
    description: 'Find trades from other players!',
    icon: Handshake,
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    iconColor: 'text-blue-600 dark:text-blue-400',
    ring: 'ring-blue-200 dark:ring-blue-800',
  },
  {
    href: '/chat',
    title: 'Chat Room',
    description: 'Talk with other traders!',
    icon: MessageCircle,
    bg: 'bg-violet-100 dark:bg-violet-900/30',
    iconColor: 'text-violet-600 dark:text-violet-400',
    ring: 'ring-violet-200 dark:ring-violet-800',
  },
  {
    href: '/analytics',
    title: 'Trending Pets',
    description: 'See which pets are going up!',
    icon: BarChart3,
    bg: 'bg-amber-100 dark:bg-amber-900/30',
    iconColor: 'text-amber-600 dark:text-amber-400',
    ring: 'ring-amber-200 dark:ring-amber-800',
  },
  {
    href: '/news',
    title: 'News',
    description: 'Latest value changes!',
    icon: Newspaper,
    bg: 'bg-cyan-100 dark:bg-cyan-900/30',
    iconColor: 'text-cyan-600 dark:text-cyan-400',
    ring: 'ring-cyan-200 dark:ring-cyan-800',
  },
];

const homeJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Adopt Me Values',
  url: 'https://adoptmevalues.app',
  description: 'Free Adopt Me trading values and trade calculator for Roblox. Check every pet value, neon, and mega neon price updated daily in 2026.',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://adoptmevalues.app/values?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

export default function HomePage() {
  return (
    <div className="flex flex-col gap-5 sm:gap-8">
      <JsonLd data={homeJsonLd} />

      {/* Hero — big, friendly, simple */}
      <section className="text-center py-5 sm:py-10 lg:py-16 px-4">
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
          Check Your{' '}
          <span className="text-app-primary">Adopt Me</span>{' '}
          Trade!
        </h1>
        <p className="mt-2 sm:mt-3 text-muted-foreground text-sm sm:text-lg max-w-xl mx-auto leading-relaxed">
          The #1 Roblox Adopt Me trading values list and value checker.
          Find out what your pets are worth — super easy to use!
        </p>
        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row justify-center gap-2.5 sm:gap-3 px-4">
          <Link
            href="/calculator"
            className="tap-target inline-flex items-center justify-center gap-2 rounded-2xl bg-app-primary px-6 py-3 sm:px-8 sm:py-3.5 text-white font-bold text-sm sm:text-base shadow-lg shadow-app-primary/25 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Calculator className="h-4 w-4 sm:h-5 sm:w-5" />
            Check My Trade
          </Link>
          <Link
            href="/values"
            className="tap-target inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-border px-6 py-3 sm:px-8 sm:py-3.5 font-bold text-sm sm:text-base hover:bg-accent active:scale-[0.98] transition-all"
          >
            <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />
            See All Values
          </Link>
        </div>
      </section>

      {/* Feature Cards — big colorful tiles kids can tap */}
      <section className="px-1">
        <h2 className="text-lg sm:text-xl font-bold text-center mb-3 sm:mb-5">What do you want to do?</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-4">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link key={feature.href} href={feature.href}>
                <div className={`flex flex-col items-center gap-1.5 sm:gap-2.5 rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 ring-1 ${feature.ring} ${feature.bg} hover:scale-[1.03] active:scale-[0.97] transition-all cursor-pointer text-center h-full`}>
                  <div className={`rounded-xl sm:rounded-2xl p-2 sm:p-3 ${feature.bg}`}>
                    <Icon className={`h-6 w-6 sm:h-9 sm:w-9 ${feature.iconColor}`} />
                  </div>
                  <p className="font-bold text-xs sm:text-base leading-tight">{feature.title}</p>
                  <p className="text-[11px] sm:text-sm text-muted-foreground leading-snug">{feature.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Info Cards — kid-friendly, dark-themed cards */}
      <section className="mt-2 sm:mt-4 px-1 space-y-3 sm:space-y-4">
        {/* What is Adopt Me Values */}
        <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-violet-100 to-fuchsia-100 dark:from-violet-950/40 dark:to-fuchsia-950/40 ring-1 ring-violet-200 dark:ring-violet-800 p-4 sm:p-6">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="rounded-2xl bg-violet-200 dark:bg-violet-800/50 p-2.5">
              <HelpCircle className="h-6 w-6 text-violet-600 dark:text-violet-400" />
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold">What is Adopt Me Values?</h2>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Adopt Me Values is the <strong>free Roblox Adopt Me value checker</strong> that shows you how much every pet is worth — from Legendary Frost Dragons and Shadow Dragons to the newest pets like Kitty Bat and Cabbit. Look up any pet&apos;s trading value and compare it with others before you trade.
          </p>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mt-2">
            Our <Link href="/calculator" className="text-violet-600 dark:text-violet-400 font-semibold hover:underline">trade calculator</Link> lets
            you add pets to both sides and instantly tells you if it&apos;s a <strong>Win</strong>, <strong>Lose</strong>, or <strong>Fair</strong> deal.
            All trading values are updated daily in 2026 so they stay accurate.
          </p>
        </div>

        {/* How to Check Trade */}
        <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-sky-100 to-cyan-100 dark:from-sky-950/40 dark:to-cyan-950/40 ring-1 ring-sky-200 dark:ring-sky-800 p-4 sm:p-6">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="rounded-2xl bg-sky-200 dark:bg-sky-800/50 p-2.5">
              <ArrowLeftRight className="h-6 w-6 text-sky-600 dark:text-sky-400" />
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold">How to Check if Your Trade is Fair</h2>
          </div>
          <div className="space-y-2">
            {[
              { num: '1', text: <>Go to the <Link href="/calculator" className="text-sky-600 dark:text-sky-400 font-semibold hover:underline">Trade Checker</Link></> },
              { num: '2', text: <>Tap <strong>&quot;Add&quot;</strong> to pick the pets you&apos;re giving</> },
              { num: '3', text: <>Tap <strong>&quot;Add&quot;</strong> on the other side for the pets you want</> },
              { num: '4', text: <>See your result — <strong>Win</strong>, <strong>Lose</strong>, or <strong>Fair</strong></> },
            ].map((step) => (
              <div key={step.num} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-sky-500 text-white text-sm font-bold flex items-center justify-center">{step.num}</span>
                <p className="text-sm sm:text-base text-muted-foreground pt-0.5">{step.text}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
            You can also switch between Normal, Neon, and Mega Neon, and set Fly, Ride, or Fly Ride to get the exact value.
          </p>
        </div>

        {/* Browse Pet Values */}
        <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-950/40 dark:to-teal-950/40 ring-1 ring-emerald-200 dark:ring-emerald-800 p-4 sm:p-6">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="rounded-2xl bg-emerald-200 dark:bg-emerald-800/50 p-2.5">
              <Search className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold">Browse All Pet Values</h2>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Check our complete <Link href="/values" className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">Adopt Me value list 2026</Link> to
            see every pet ranked by trading value. Search for any pet, filter by rarity (Legendary, Ultra Rare, Rare, Uncommon, Common), and tap on a pet to see its
            Normal, Neon, and Mega Neon values along with Fly, Ride, and No Potion variants.
          </p>
        </div>
      </section>
    </div>
  );
}
