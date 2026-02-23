import type { Metadata } from 'next';
import { config } from '@/lib/constants/config';

export const metadata: Metadata = {
    title: 'Terms of Service',
    description: `Terms of Service for ${config.appName}. Read the rules and guidelines for using our platform.`,
};

export default function TermsOfServicePage() {
    const lastUpdated = 'February 21, 2026';

    return (
        <div className="mx-auto max-w-3xl w-full">
            <article className="prose dark:prose-invert max-w-none prose-headings:scroll-mt-20">
                <h1>Terms of Service</h1>
                <p className="text-muted-foreground text-sm">Last updated: {lastUpdated}</p>

                <p>
                    Welcome to <strong>{config.appName}</strong>. By accessing or using our website at{' '}
                    <a href={config.domain}>{config.domain}</a> and our mobile applications (collectively, the &quot;Service&quot;),
                    you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree, please do not use the
                    Service.
                </p>

                <h2>1. Eligibility</h2>
                <p>
                    You must be at least 13 years old to create an account and use interactive features (chat, posting, trading).
                    Users under 13 may browse public content but should not create accounts without parental consent. By using the
                    Service, you represent that you meet these requirements.
                </p>

                <h2>2. Accounts</h2>
                <ul>
                    <li>You are responsible for maintaining the security of your account credentials.</li>
                    <li>You are responsible for all activity that occurs under your account.</li>
                    <li>
                        You must not share your account, impersonate others, or create multiple accounts to circumvent bans or
                        restrictions.
                    </li>
                    <li>We reserve the right to suspend or terminate accounts that violate these Terms.</li>
                </ul>

                <h2>3. Acceptable Use</h2>
                <p>When using the Service, you agree not to:</p>
                <ul>
                    <li>Post harmful, abusive, threatening, vulgar, or hateful content</li>
                    <li>Harass, bully, or intimidate other users</li>
                    <li>Spam, advertise, or solicit without permission</li>
                    <li>Post content that is illegal or promotes illegal activities</li>
                    <li>Attempt to exploit, hack, or compromise the Service</li>
                    <li>Scrape, crawl, or automatically collect data from the Service without permission</li>
                    <li>Circumvent bans, mutes, or other moderation actions</li>
                    <li>Share personal information of others without their consent</li>
                </ul>

                <h2>4. User Content</h2>
                <ul>
                    <li>
                        You retain ownership of content you post (trades, feed posts, comments). By posting, you grant us a
                        non-exclusive, worldwide, royalty-free license to use, display, and distribute your content within the Service.
                    </li>
                    <li>
                        We may remove any content that violates these Terms or that we deem inappropriate at our sole discretion.
                    </li>
                    <li>
                        You are solely responsible for the content you post and any consequences that arise from it.
                    </li>
                </ul>

                <h2>5. Pet Values and Trade Calculations</h2>
                <ul>
                    <li>
                        Pet values displayed on the Service are community-driven estimates and are <strong>not official</strong> Roblox
                        or Adopt Me values.
                    </li>
                    <li>Values are updated regularly but may not reflect real-time market conditions.</li>
                    <li>
                        Trade fairness calculations are tools to assist decision-making; we do not guarantee the accuracy or outcome of
                        any trade.
                    </li>
                    <li>Use values and trade recommendations at your own risk.</li>
                </ul>

                <h2>6. Intellectual Property</h2>
                <ul>
                    <li>
                        The Service, including its design, code, features, and branding, is owned by us and protected by intellectual
                        property laws.
                    </li>
                    <li>
                        &quot;Adopt Me&quot; and &quot;Roblox&quot; are trademarks of their respective owners. We are not affiliated
                        with, endorsed by, or sponsored by Roblox Corporation or Uplift Games.
                    </li>
                    <li>Pet images and game assets belong to their respective copyright holders and are used for informational purposes.</li>
                </ul>

                <h2>7. Subscriptions and Payments</h2>
                <ul>
                    <li>
                        Some features may require a paid subscription (&quot;Pro&quot;). Subscription pricing, billing cycles, and
                        features are displayed at the time of purchase.
                    </li>
                    <li>
                        Mobile subscriptions are processed through Apple App Store or Google Play Store and are subject to their respective
                        terms.
                    </li>
                    <li>
                        Web subscriptions are processed through our payment processor (Stripe). Refunds are handled according to our
                        refund policy.
                    </li>
                    <li>
                        We reserve the right to change subscription pricing with reasonable notice.
                    </li>
                </ul>

                <h2>8. Moderation and Enforcement</h2>
                <ul>
                    <li>
                        We use a strike-based system for violations. Repeated violations may result in temporary or permanent bans.
                    </li>
                    <li>Moderators may issue warnings, mutes, or bans at their discretion.</li>
                    <li>
                        If you believe a moderation action was taken in error, contact us at{' '}
                        <a href={`mailto:${config.supportEmail}`}>{config.supportEmail}</a>.
                    </li>
                </ul>

                <h2>9. Disclaimers</h2>
                <p>
                    THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER
                    EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF HARMFUL
                    COMPONENTS.
                </p>

                <h2>10. Limitation of Liability</h2>
                <p>
                    TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
                    CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICE, INCLUDING BUT NOT LIMITED
                    TO LOSS OF IN-GAME ITEMS, UNFAIR TRADES, OR DATA LOSS.
                </p>

                <h2>11. Indemnification</h2>
                <p>
                    You agree to indemnify and hold us harmless from any claims, damages, or expenses arising from your use of the
                    Service or violation of these Terms.
                </p>

                <h2>12. Changes to These Terms</h2>
                <p>
                    We may update these Terms from time to time. Continued use of the Service after changes constitutes acceptance of
                    the new Terms. We will make reasonable efforts to notify users of significant changes.
                </p>

                <h2>13. Governing Law</h2>
                <p>
                    These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of
                    law principles.
                </p>

                <h2>14. Contact Us</h2>
                <p>
                    If you have questions about these Terms, please contact us at{' '}
                    <a href={`mailto:${config.supportEmail}`}>{config.supportEmail}</a>.
                </p>
            </article>
        </div>
    );
}
