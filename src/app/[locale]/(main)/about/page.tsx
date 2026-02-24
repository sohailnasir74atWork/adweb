import Link from 'next/link';
import { config } from '@/lib/constants/config';
import { getLocalizedAlternates } from '@/lib/utils/seoHelpers';
import { Heart, TrendingUp, Calculator, Handshake, MessageCircle, Smartphone } from 'lucide-react';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const { canonical, languages } = getLocalizedAlternates('/about', locale);
    return {
        title: 'About Us',
        description: `Learn about ${config.appName} — the #1 community-driven Adopt Me pet value list, trade calculator, and trading hub.`,
        alternates: { canonical, languages },
    };
}

const FEATURES = [
    {
        icon: TrendingUp,
        title: 'Accurate Pet Values',
        description: 'Community-driven values updated daily for 600+ Adopt Me pets, including Normal, Neon, Mega, Fly, and Ride variants.',
    },
    {
        icon: Calculator,
        title: 'Trade Calculator',
        description: 'Instantly check if a trade is Fair, Win, or Lose before you commit. Never get scammed again.',
    },
    {
        icon: Handshake,
        title: 'Trade Hub',
        description: 'Post trades, browse active offers from the community, and find the perfect trade partner.',
    },
    {
        icon: MessageCircle,
        title: 'Community Chat',
        description: 'Chat with other Adopt Me players in real-time. Join group chats or start private conversations.',
    },
];

export default function AboutPage() {
    return (
        <div className="mx-auto max-w-3xl w-full">
            <article className="prose dark:prose-invert max-w-none">
                <h1>About Adopt Me Values</h1>

                <p className="lead">
                    <strong>{config.appName}</strong> is the <strong>#1 community-driven</strong> resource for Roblox Adopt Me
                    players. We help millions of players make fair trades with accurate, up-to-date pet values and powerful tools.
                </p>

                <h2>What We Offer</h2>
            </article>

            {/* Feature cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
                {FEATURES.map((feature) => {
                    const Icon = feature.icon;
                    return (
                        <div
                            key={feature.title}
                            className="rounded-2xl border bg-card p-5 flex flex-col gap-3"
                        >
                            <div className="rounded-xl bg-app-primary/10 w-10 h-10 flex items-center justify-center">
                                <Icon className="h-5 w-5 text-app-primary" />
                            </div>
                            <h3 className="font-bold text-base">{feature.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                        </div>
                    );
                })}
            </div>

            <article className="prose dark:prose-invert max-w-none">
                <h2>Our Mission</h2>
                <p>
                    Adopt Me is one of the most popular games on Roblox, with millions of daily players trading pets. But trading
                    can be confusing — values change constantly, and scams are common. We built {config.appName} to solve this.
                </p>
                <p>
                    Our mission is to make Adopt Me trading <strong>fair, transparent, and fun</strong> for everyone — especially
                    younger players who are most vulnerable to unfair trades.
                </p>

                <h2>Available Everywhere</h2>
                <p>
                    Use {config.appName} on any device:
                </p>
                <ul>
                    <li>
                        <strong>Web:</strong> <a href={config.domain}>{config.domain}</a> — works on any browser, no download needed.
                    </li>
                    <li>
                        <strong>Android:</strong>{' '}
                        <a href={config.androidLink} target="_blank" rel="noopener noreferrer">Download on Google Play</a>
                    </li>
                    <li>
                        <strong>iOS:</strong>{' '}
                        <a href={config.iosLink} target="_blank" rel="noopener noreferrer">Download on the App Store</a>
                    </li>
                </ul>

                <h2>Not Affiliated with Roblox</h2>
                <p>
                    {config.appName} is an independent, community-driven project. We are <strong>not affiliated with</strong>,
                    endorsed by, or sponsored by <strong>Roblox Corporation</strong> or <strong>Uplift Games</strong> (the developers
                    of Adopt Me). All game assets and trademarks belong to their respective owners.
                </p>

                <h2>Contact Us</h2>
                <p>
                    Have questions, feedback, or suggestions? We&apos;d love to hear from you!
                </p>
                <ul>
                    <li>
                        Email: <a href={`mailto:${config.supportEmail}`}>{config.supportEmail}</a>
                    </li>
                    <li>
                        <Link href="/contact">Contact Page</Link>
                    </li>
                </ul>

                <div className="not-prose flex items-center gap-2 mt-8 text-sm text-muted-foreground">
                    <span>Made with</span>
                    <Heart className="h-4 w-4 text-rose-500 fill-rose-500" />
                    <span>for the Adopt Me community</span>
                </div>
            </article>
        </div>
    );
}
