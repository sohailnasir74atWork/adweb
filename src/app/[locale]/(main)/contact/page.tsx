import { config } from '@/lib/constants/config';
import { getLocalizedAlternates } from '@/lib/utils/seoHelpers';
import { Mail, MessageCircle, Smartphone, Clock, Shield } from 'lucide-react';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const { canonical, languages } = getLocalizedAlternates('/contact', locale);
    return {
        title: 'Contact Us',
        description: `Contact the ${config.appName} team. Get support, report issues, or share feedback.`,
        alternates: { canonical, languages },
    };
}

const CONTACT_CARDS = [
    {
        icon: Mail,
        title: 'Email Support',
        description: 'For general inquiries, account issues, or feedback.',
        action: config.supportEmail,
        actionLabel: config.supportEmail,
        href: `mailto:${config.supportEmail}`,
    },
    {
        icon: Shield,
        title: 'Report Abuse',
        description: 'Report inappropriate content, scams, or user safety concerns.',
        action: config.supportEmail,
        actionLabel: 'Report via Email',
        href: `mailto:${config.supportEmail}?subject=Abuse%20Report`,
    },
    {
        icon: MessageCircle,
        title: 'Community Chat',
        description: 'Talk to other players and get help from the community.',
        action: '/chat',
        actionLabel: 'Open Chat',
        href: '/chat',
    },
];

export default function ContactPage() {
    return (
        <div className="mx-auto max-w-3xl w-full">
            <article className="prose dark:prose-invert max-w-none">
                <h1>Contact Us</h1>
                <p>
                    Have a question, found a bug, or need help with your account? We&apos;re here to help! Choose the best way to
                    reach us below.
                </p>
            </article>

            {/* Contact cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
                {CONTACT_CARDS.map((card) => {
                    const Icon = card.icon;
                    const isExternal = card.href.startsWith('mailto:');
                    return (
                        <a
                            key={card.title}
                            href={card.href}
                            {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
                            className="rounded-2xl border bg-card p-5 flex flex-col gap-3 hover:border-app-primary/50 transition-colors group no-underline"
                        >
                            <div className="rounded-xl bg-app-primary/10 w-10 h-10 flex items-center justify-center">
                                <Icon className="h-5 w-5 text-app-primary" />
                            </div>
                            <h3 className="font-bold text-base text-foreground">{card.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{card.description}</p>
                            <span className="text-sm font-semibold text-app-primary group-hover:underline mt-auto">
                                {card.actionLabel}
                            </span>
                        </a>
                    );
                })}
            </div>

            <article className="prose dark:prose-invert max-w-none">
                <h2>Response Times</h2>
                <div className="not-prose flex items-start gap-3 rounded-2xl border bg-card p-4 my-4">
                    <Clock className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                    <div>
                        <p className="font-semibold text-sm">We typically respond within 24–48 hours.</p>
                        <p className="text-sm text-muted-foreground mt-1">
                            Please include as much detail as possible in your message — your username, device, and a description of the
                            issue will help us resolve it faster.
                        </p>
                    </div>
                </div>

                <h2>App Support</h2>
                <div className="not-prose flex items-start gap-3 rounded-2xl border bg-card p-4 my-4">
                    <Smartphone className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                    <div>
                        <p className="font-semibold text-sm">Using our mobile app?</p>
                        <p className="text-sm text-muted-foreground mt-1">
                            For subscription or billing issues on iOS, contact{' '}
                            <a href="https://support.apple.com" target="_blank" rel="noopener noreferrer" className="text-app-primary hover:underline">
                                Apple Support
                            </a>
                            . For Android, contact{' '}
                            <a href="https://support.google.com/googleplay" target="_blank" rel="noopener noreferrer" className="text-app-primary hover:underline">
                                Google Play Support
                            </a>
                            . For app-specific issues, email us directly.
                        </p>
                    </div>
                </div>

                <h2>Legal Inquiries</h2>
                <p>
                    For DMCA takedown requests, data deletion requests, or other legal matters, please email{' '}
                    <a href={`mailto:${config.supportEmail}`}>{config.supportEmail}</a> with the subject line
                    &quot;Legal Inquiry.&quot;
                </p>
            </article>
        </div>
    );
}
