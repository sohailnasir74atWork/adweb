import { config } from '@/lib/constants/config';
import { getLocalizedAlternates } from '@/lib/utils/seoHelpers';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const { canonical, languages } = getLocalizedAlternates('/privacy', locale);
    return {
        title: 'Privacy Policy',
        description: `Privacy Policy for ${config.appName}. Learn how we collect, use, and protect your data.`,
        alternates: { canonical, languages },
    };
}

export default function PrivacyPolicyPage() {
    const lastUpdated = 'February 21, 2026';

    return (
        <div className="mx-auto max-w-3xl w-full">
            <article className="prose dark:prose-invert max-w-none prose-headings:scroll-mt-20">
                <h1>Privacy Policy</h1>
                <p className="text-muted-foreground text-sm">Last updated: {lastUpdated}</p>

                <p>
                    Welcome to <strong>{config.appName}</strong> (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed
                    to protecting your privacy and ensuring a safe experience for all users, including children. This Privacy Policy
                    explains how we collect, use, disclose, and safeguard your information when you visit our website{' '}
                    <a href={config.domain}>{config.domain}</a> and use our mobile applications (collectively, the &quot;Service&quot;).
                </p>

                <h2>1. Information We Collect</h2>

                <h3>a) Information You Provide</h3>
                <ul>
                    <li>
                        <strong>Account Information:</strong> When you sign in with Google, we receive your display name, email address,
                        and profile picture from Google.
                    </li>
                    <li>
                        <strong>User Content:</strong> Trades you post, feed posts, comments, chat messages, and other content you
                        voluntarily submit.
                    </li>
                </ul>

                <h3>b) Automatically Collected Information</h3>
                <ul>
                    <li>
                        <strong>Usage Data:</strong> Pages visited, features used, time spent, and interaction patterns via Firebase
                        Analytics and Google Analytics.
                    </li>
                    <li>
                        <strong>Device Information:</strong> Browser type, operating system, screen resolution, and device identifiers.
                    </li>
                    <li>
                        <strong>Cookies:</strong> We use cookies and similar technologies for analytics, preferences, and advertising. See
                        our Cookie section below.
                    </li>
                </ul>

                <h2>2. How We Use Your Information</h2>
                <ul>
                    <li>Provide, maintain, and improve the Service</li>
                    <li>Display pet values, trade calculations, and community content</li>
                    <li>Enable user accounts, chat, and community features</li>
                    <li>Send important service-related notifications</li>
                    <li>Analyze usage patterns to improve user experience</li>
                    <li>Display advertisements through Google AdSense</li>
                    <li>Detect and prevent fraud, abuse, or violations of our Terms</li>
                </ul>

                <h2>3. Cookies and Tracking Technologies</h2>
                <p>We use the following types of cookies:</p>
                <ul>
                    <li>
                        <strong>Essential Cookies:</strong> Required for the Service to function (authentication, session management).
                    </li>
                    <li>
                        <strong>Analytics Cookies:</strong> Google Analytics and Firebase Analytics to understand how users interact with
                        the Service.
                    </li>
                    <li>
                        <strong>Advertising Cookies:</strong> Google AdSense uses cookies to display personalized advertisements. You can
                        manage ad personalization at{' '}
                        <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
                            Google Ads Settings
                        </a>.
                    </li>
                </ul>
                <p>
                    You can control cookies through your browser settings. Disabling cookies may affect some features of the Service.
                </p>

                <h2>4. Third-Party Services</h2>
                <p>We use the following third-party services that may collect data:</p>
                <ul>
                    <li>
                        <strong>Google Firebase:</strong> Authentication, database, analytics, and hosting.{' '}
                        <a href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener noreferrer">
                            Firebase Privacy Policy
                        </a>
                    </li>
                    <li>
                        <strong>Google AdSense:</strong> Advertising.{' '}
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                            Google Privacy Policy
                        </a>
                    </li>
                    <li>
                        <strong>Vercel:</strong> Website hosting and edge delivery.{' '}
                        <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
                            Vercel Privacy Policy
                        </a>
                    </li>
                    <li>
                        <strong>BunnyCDN:</strong> Image and content delivery.{' '}
                        <a href="https://bunny.net/privacy" target="_blank" rel="noopener noreferrer">
                            BunnyCDN Privacy Policy
                        </a>
                    </li>
                    <li>
                        <strong>RevenueCat:</strong> Subscription management for mobile apps.{' '}
                        <a href="https://www.revenuecat.com/privacy" target="_blank" rel="noopener noreferrer">
                            RevenueCat Privacy Policy
                        </a>
                    </li>
                </ul>

                <h2>5. Children&apos;s Privacy (COPPA)</h2>
                <p>
                    Our Service is used by a young audience. We are committed to complying with the Children&apos;s Online Privacy
                    Protection Act (COPPA) and similar regulations:
                </p>
                <ul>
                    <li>We do not knowingly collect personal information from children under 13 without parental consent.</li>
                    <li>
                        Children under 13 should not use account features (sign in, chat, posting) without parental supervision.
                    </li>
                    <li>
                        If you are a parent and believe your child has provided us personal information, contact us at{' '}
                        <a href={`mailto:${config.supportEmail}`}>{config.supportEmail}</a> and we will delete it promptly.
                    </li>
                </ul>

                <h2>6. Data Sharing and Disclosure</h2>
                <p>We do not sell your personal information. We may share data in these limited circumstances:</p>
                <ul>
                    <li>With service providers who operate on our behalf (Firebase, Vercel, BunnyCDN)</li>
                    <li>To comply with legal obligations or respond to lawful requests</li>
                    <li>To protect the rights, safety, or property of our users or the public</li>
                    <li>In connection with a business transfer (merger, acquisition)</li>
                </ul>

                <h2>7. Data Retention</h2>
                <p>
                    We retain your data for as long as your account is active or as needed to provide the Service. You can request
                    deletion of your account and associated data by contacting us.
                </p>

                <h2>8. Your Rights</h2>
                <p>Depending on your location, you may have the right to:</p>
                <ul>
                    <li>Access, correct, or delete your personal information</li>
                    <li>Object to or restrict processing of your data</li>
                    <li>Data portability</li>
                    <li>Withdraw consent at any time</li>
                    <li>Lodge a complaint with a data protection authority</li>
                </ul>
                <p>
                    To exercise these rights, contact us at{' '}
                    <a href={`mailto:${config.supportEmail}`}>{config.supportEmail}</a>.
                </p>

                <h2>9. Data Security</h2>
                <p>
                    We implement appropriate technical and organizational measures to protect your data, including encryption in transit
                    (HTTPS) and at rest. However, no method of transmission over the Internet is 100% secure.
                </p>

                <h2>10. International Data Transfers</h2>
                <p>
                    Your information may be transferred to and processed in countries other than your own. We ensure appropriate
                    safeguards are in place for such transfers.
                </p>

                <h2>11. Changes to This Policy</h2>
                <p>
                    We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the
                    updated policy on this page with a new &quot;Last updated&quot; date.
                </p>

                <h2>12. Contact Us</h2>
                <p>
                    If you have questions or concerns about this Privacy Policy, please contact us at:
                </p>
                <ul>
                    <li>
                        Email: <a href={`mailto:${config.supportEmail}`}>{config.supportEmail}</a>
                    </li>
                    <li>
                        Website: <a href={config.domain}>{config.domain}</a>
                    </li>
                </ul>
            </article>
        </div>
    );
}
