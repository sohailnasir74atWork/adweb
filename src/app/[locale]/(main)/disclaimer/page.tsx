import { config } from '@/lib/constants/config';
import { getLocalizedAlternates } from '@/lib/utils/seoHelpers';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const { canonical, languages } = getLocalizedAlternates('/disclaimer', locale);
    return {
        title: 'Disclaimer',
        description: `Disclaimer for ${config.appName}. Important information about pet values, trade calculations, and our relationship with Roblox.`,
        alternates: { canonical, languages },
    };
}

export default function DisclaimerPage() {
    const lastUpdated = 'February 21, 2026';

    return (
        <div className="mx-auto max-w-3xl w-full">
            <article className="prose dark:prose-invert max-w-none prose-headings:scroll-mt-20">
                <h1>Disclaimer</h1>
                <p className="text-muted-foreground text-sm">Last updated: {lastUpdated}</p>

                <h2>Not Affiliated with Roblox</h2>
                <p>
                    <strong>{config.appName}</strong> is an independent, community-driven project. We are{' '}
                    <strong>not affiliated with, endorsed by, sponsored by, or associated with</strong>{' '}
                    <strong>Roblox Corporation</strong>, <strong>Uplift Games</strong>, or the <strong>Adopt Me!</strong> game in
                    any way.
                </p>
                <p>
                    &quot;Roblox&quot; and &quot;Adopt Me!&quot; are trademarks of their respective owners. All pet images, game
                    assets, and related content are the property of their respective copyright holders and are used on this site
                    for informational and educational purposes only.
                </p>

                <h2>Accuracy of Pet Values</h2>
                <p>
                    The pet values displayed on this website and our mobile applications are <strong>community-driven estimates</strong>{' '}
                    based on observed trading patterns and community consensus. They are:
                </p>
                <ul>
                    <li><strong>Not official values</strong> from Roblox or Adopt Me developers</li>
                    <li><strong>Not guarantees</strong> of what any pet is worth in an actual trade</li>
                    <li><strong>Subject to change</strong> at any time as the in-game economy fluctuates</li>
                    <li><strong>Approximations</strong> that may differ from individual trading experiences</li>
                </ul>

                <h2>Trade Calculator</h2>
                <p>
                    Our trade calculator provides <strong>guidance only</strong>. A trade marked as &quot;Fair&quot; or &quot;Win&quot;
                    on our platform does not guarantee satisfaction with the trade outcome. Actual trade values depend on many factors
                    including demand, pet age, pet abilities, and personal preference.
                </p>
                <p>
                    <strong>We are not responsible</strong> for any in-game losses, unfair trades, or dissatisfaction resulting from
                    reliance on our values or calculator.
                </p>

                <h2>User-Generated Content</h2>
                <p>
                    Content posted by users on our platform (trades, feed posts, comments, chat messages) reflects the views and
                    opinions of individual users, not of {config.appName}. We do not endorse or guarantee the accuracy of
                    user-generated content.
                </p>

                <h2>External Links</h2>
                <p>
                    Our Service may contain links to third-party websites or services. We are not responsible for the content,
                    privacy practices, or policies of any third-party sites.
                </p>

                <h2>No Professional Advice</h2>
                <p>
                    Nothing on this website constitutes professional, financial, or legal advice. The Service is provided for
                    entertainment and informational purposes only. Use the information at your own discretion and risk.
                </p>

                <h2>Limitation of Liability</h2>
                <p>
                    To the fullest extent permitted by applicable law, {config.appName} and its operators shall not be liable for
                    any damages arising from:
                </p>
                <ul>
                    <li>Use of or inability to use the Service</li>
                    <li>Inaccurate pet values or trade calculations</li>
                    <li>Loss of in-game items due to trades made using our tools</li>
                    <li>Actions of other users on the platform</li>
                    <li>Service interruptions or data loss</li>
                </ul>

                <h2>Contact</h2>
                <p>
                    If you have questions about this Disclaimer, please contact us at{' '}
                    <a href={`mailto:${config.supportEmail}`}>{config.supportEmail}</a>.
                </p>
            </article>
        </div>
    );
}
