'use client';

import { useAuthStore } from '@/lib/store/useAuthStore';
import { useBanStatus } from '@/lib/hooks/useBanStatus';
import { ShieldX, Clock, AlertOctagon } from 'lucide-react';

/**
 * BanGuard wraps the app and shows a full-screen overlay when the
 * logged-in user is banned. Admins ban from the mobile app — this
 * component only enforces.
 *
 * Read-only browsing (values, analytics) is still possible via the
 * nav links at the bottom. The overlay prevents interaction with
 * the main content area.
 */
export function BanGuard({ children }: { children: React.ReactNode }) {
    const user = useAuthStore((s) => s.user);
    const email = user?.email || user?.decodedEmail || null;
    const { isBanned, banDetails, banMessage } = useBanStatus(email);

    // Not logged in or not banned → render children normally
    if (!isBanned || !banDetails) {
        return <>{children}</>;
    }

    const isPermanent = banDetails.bannedUntil === 'permanent';

    return (
        <>
            {/* Ban overlay — covers the main content */}
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-sm p-4">
                <div className="w-full max-w-md text-center space-y-6">
                    {/* Icon */}
                    <div className="mx-auto w-20 h-20 rounded-full bg-red-500/15 flex items-center justify-center">
                        {isPermanent ? (
                            <ShieldX className="h-10 w-10 text-red-500" />
                        ) : (
                            <Clock className="h-10 w-10 text-orange-500" />
                        )}
                    </div>

                    {/* Title */}
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">
                            {isPermanent ? 'Account Permanently Banned' : 'Account Temporarily Suspended'}
                        </h1>
                        <p className="text-muted-foreground text-sm mt-2">
                            {banMessage}
                        </p>
                    </div>

                    {/* Strike info */}
                    <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4 text-left space-y-2">
                        <div className="flex items-start gap-2">
                            <AlertOctagon className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-sm font-semibold text-red-600 dark:text-red-400">
                                    Strike {banDetails.strikeCount}
                                </p>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                    {banDetails.reason || `Strike ${banDetails.strikeCount} applied`}
                                </p>
                            </div>
                        </div>
                        {banDetails.bannedBy && (
                            <p className="text-xs text-muted-foreground">
                                Action by: <span className="font-medium">{banDetails.bannedBy}</span>
                            </p>
                        )}
                    </div>

                    {/* What's blocked */}
                    <div className="text-left space-y-1.5 px-2">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            While banned you cannot:
                        </p>
                        {[
                            'Create or respond to trades',
                            'Post to the community feed',
                            'Send messages in chat rooms',
                            'Send private messages',
                            'Report scammers',
                            'Upload content',
                        ].map((item) => (
                            <p key={item} className="text-sm text-muted-foreground flex items-center gap-2">
                                <span className="text-red-500">✕</span> {item}
                            </p>
                        ))}
                    </div>

                    {/* Disclaimer */}
                    <p className="text-[11px] text-muted-foreground">
                        If you believe this is a mistake, please contact support via the mobile app.
                        {!isPermanent && ' Your access will be automatically restored once the ban expires.'}
                    </p>
                </div>
            </div>

            {/* Children still render but are inaccessible behind the overlay */}
            <div className="pointer-events-none opacity-20 select-none" aria-hidden="true">
                {children}
            </div>
        </>
    );
}
