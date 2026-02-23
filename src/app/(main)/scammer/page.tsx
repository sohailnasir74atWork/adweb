import { ShieldAlert } from 'lucide-react';
import { ScammerDatabase } from '@/components/scammer/ScammerDatabase';

export const metadata = {
    title: 'Adopt Me Scammer Database 2026 — Report & Check Scammers',
    description:
        'Check if a Roblox player is a known Adopt Me scammer before trading. Report scammers to protect the community. Stay safe while trading pets in 2026.',
};

export default function ScammerPage() {
    return (
        <div className="flex flex-col gap-6">
            <section>
                <div className="flex items-center gap-3">
                    <ShieldAlert className="h-8 w-8 text-red-500" />
                    <div>
                        <h1 className="text-3xl font-bold">Scammer Database</h1>
                        <p className="text-muted-foreground text-sm mt-0.5">
                            Check usernames before trading and report scammers to keep the community safe.
                        </p>
                    </div>
                </div>
            </section>

            <ScammerDatabase />

            <section className="prose dark:prose-invert max-w-none mt-4">
                <h2>How the Scammer Database Works</h2>
                <p>
                    Our scammer database is community-driven. Players can report Roblox usernames they
                    believe scammed them during Adopt Me trades. Reports are reviewed by moderators before
                    being marked as verified. Always check a player&apos;s username here before making a big trade!
                </p>
                <h3>Trading Safety Tips</h3>
                <ul>
                    <li>Never trust &quot;trust trades&quot; — always use the trade window</li>
                    <li>Check usernames in our database before trading high-value pets</li>
                    <li>Report scammers to help protect other players</li>
                    <li>Never share personal information during trades</li>
                </ul>
            </section>
        </div>
    );
}
