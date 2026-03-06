'use client';

import { config } from '@/lib/constants/config';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { database } from '@/lib/firebase/config';
import { ref, push, set } from 'firebase/database';
import { useState } from 'react';

const DELETION_REASONS = [
    'I no longer play Adopt Me',
    'I found a better alternative',
    'Privacy concerns',
    'Too many notifications',
    'I want to create a new account',
    'Other',
];

export default function DeleteAccountPage() {
    const user = useAuthStore((s) => s.user);
    const [email, setEmail] = useState('');
    const [reason, setReason] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!confirmed) return;
        setError('');
        setSubmitting(true);

        try {
            if (user) {
                // Signed-in user → write to RTDB
                const requestRef = push(ref(database, 'deletionRequests'));
                await set(requestRef, {
                    uid: user.id,
                    email: user.decodedEmail || email,
                    displayName: user.displayName || '',
                    reason: reason || 'Not specified',
                    status: 'pending',
                    platform: 'web',
                    createdAt: Date.now(),
                });
                setSubmitted(true);
            } else {
                // Not signed in → fallback to mailto
                if (!email) {
                    setError('Please enter the email address associated with your account.');
                    setSubmitting(false);
                    return;
                }
                const subject = encodeURIComponent('Account Deletion Request');
                const body = encodeURIComponent(
                    `Hi,\n\nI would like to request the deletion of my account.\n\nEmail associated with account: ${email}\nReason: ${reason || 'Not specified'}\n\nI understand that this action is irreversible and all my data will be permanently deleted.\n\nThank you.`
                );
                window.location.href = `mailto:${config.supportEmail}?subject=${subject}&body=${body}`;
                setSubmitted(true);
            }
        } catch (err) {
            console.error('Deletion request failed:', err);
            setError('Something went wrong. Please try again or email us directly.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="mx-auto max-w-3xl w-full">
            <article className="prose dark:prose-invert max-w-none prose-headings:scroll-mt-20">
                <h1>Delete Your Account</h1>
                <p className="text-muted-foreground text-sm">
                    Request permanent deletion of your {config.appName} account and all associated data.
                </p>

                <div className="not-prose my-8 rounded-xl border border-red-500/20 bg-red-500/5 p-6">
                    <h2 className="text-lg font-bold text-red-500 mb-3 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>
                        Warning: This action is irreversible
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        When you request account deletion, the following data will be <strong>permanently removed</strong>:
                    </p>
                    <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                            <span className="text-red-500 mt-0.5">•</span>
                            Your profile information (name, email, profile picture)
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-red-500 mt-0.5">•</span>
                            All trades, feed posts, comments, and chat messages
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-red-500 mt-0.5">•</span>
                            Your favorites, settings, and preferences
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-red-500 mt-0.5">•</span>
                            Subscription data (cancel active subscriptions via Google Play / App Store first)
                        </li>
                    </ul>
                </div>

                {submitted ? (
                    <div className="not-prose my-8 rounded-xl border border-green-500/20 bg-green-500/5 p-6 text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-green-500 mb-4"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                        <h3 className="text-lg font-bold mb-2">
                            {user ? 'Request Submitted Successfully' : 'Request Initiated'}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            {user ? (
                                <>
                                    Your account deletion request has been submitted. We will process your request within{' '}
                                    <strong>72 hours</strong> and send you a confirmation email once your account has been deleted.
                                </>
                            ) : (
                                <>
                                    Your email client should open with a pre-filled deletion request. If it didn&apos;t open automatically,
                                    please send an email to{' '}
                                    <a href={`mailto:${config.supportEmail}`} className="text-blue-500 underline">
                                        {config.supportEmail}
                                    </a>{' '}
                                    with the subject &quot;Account Deletion Request&quot; and include the email address associated with
                                    your account.
                                </>
                            )}
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="not-prose my-8 space-y-6">
                        {user ? (
                            <div className="rounded-lg border border-border bg-muted/30 p-4 flex items-center gap-3">
                                {user.avatar && (
                                    <img src={user.avatar} alt="" className="h-10 w-10 rounded-full" />
                                )}
                                <div>
                                    <p className="text-sm font-semibold">{user.displayName}</p>
                                    <p className="text-xs text-muted-foreground">{user.decodedEmail}</p>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold mb-2">
                                    Email Address <span className="text-red-500">*</span>
                                </label>
                                <p className="text-xs text-muted-foreground mb-2">
                                    Enter the email address associated with your account (the one you used to sign in with Google).
                                </p>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="your@email.com"
                                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
                                />
                                <p className="text-xs text-muted-foreground mt-2">
                                    💡 <strong>Tip:</strong> Sign in first for faster processing — we can verify your identity automatically.
                                </p>
                            </div>
                        )}

                        <div>
                            <label htmlFor="reason" className="block text-sm font-semibold mb-2">
                                Reason for Deletion <span className="text-muted-foreground font-normal">(optional)</span>
                            </label>
                            <select
                                id="reason"
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
                            >
                                <option value="">Select a reason...</option>
                                {DELETION_REASONS.map((r) => (
                                    <option key={r} value={r}>{r}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex items-start gap-3">
                            <input
                                type="checkbox"
                                id="confirm"
                                checked={confirmed}
                                onChange={(e) => setConfirmed(e.target.checked)}
                                required
                                className="mt-1 h-4 w-4 rounded border-border accent-red-500"
                            />
                            <label htmlFor="confirm" className="text-sm text-muted-foreground">
                                I understand that deleting my account is <strong>permanent and irreversible</strong>. All my data,
                                including trades, posts, messages, and profile information will be permanently removed.
                            </label>
                        </div>

                        {error && (
                            <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-500">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={!confirmed || submitting || (!user && !email)}
                            className="w-full rounded-lg bg-red-600 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-red-600"
                        >
                            {submitting ? 'Submitting...' : 'Request Account Deletion'}
                        </button>

                        <p className="text-xs text-muted-foreground text-center">
                            Alternatively, you can email us directly at{' '}
                            <a href={`mailto:${config.supportEmail}`} className="underline">
                                {config.supportEmail}
                            </a>
                        </p>
                    </form>
                )}

                <h2>Frequently Asked Questions</h2>

                <h3>How long does account deletion take?</h3>
                <p>
                    We process deletion requests within <strong>72 hours</strong>. You will receive a confirmation email once your
                    account and data have been permanently deleted.
                </p>

                <h3>Can I recover my account after deletion?</h3>
                <p>
                    No. Account deletion is <strong>permanent and irreversible</strong>. If you wish to use {config.appName} again
                    after deletion, you will need to create a new account.
                </p>

                <h3>What about my active subscription?</h3>
                <p>
                    Please cancel any active subscriptions through the <strong>Google Play Store</strong> or{' '}
                    <strong>Apple App Store</strong> before requesting account deletion. Deleting your account does not automatically
                    cancel subscriptions managed by these platforms.
                </p>

                <h3>Will my public content be removed?</h3>
                <p>
                    Yes. All your trades, feed posts, comments, and chat messages will be permanently removed from the Service across
                    all platforms (website and mobile apps).
                </p>
            </article>
        </div>
    );
}
