'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cookie, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CONSENT_KEY = 'cookie-consent';

export function CookieConsent() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Only show if user hasn't already accepted/declined
        const consent = localStorage.getItem(CONSENT_KEY);
        if (!consent) {
            // Small delay so it doesn't flash on initial load
            const timer = setTimeout(() => setVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const accept = () => {
        localStorage.setItem(CONSENT_KEY, 'accepted');
        setVisible(false);
    };

    const decline = () => {
        localStorage.setItem(CONSENT_KEY, 'declined');
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div className="fixed bottom-0 inset-x-0 z-[100] p-4 md:p-6 animate-in slide-in-from-bottom-5 duration-500">
            <div className="mx-auto max-w-2xl rounded-2xl border bg-card shadow-2xl p-5 sm:p-6">
                <div className="flex items-start gap-3">
                    <div className="rounded-xl bg-amber-100 dark:bg-amber-900/30 p-2.5 shrink-0">
                        <Cookie className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-sm sm:text-base">We use cookies 🍪</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed">
                            We use cookies for analytics, personalized ads, and to improve your experience. By clicking
                            &quot;Accept,&quot; you consent to our use of cookies. See our{' '}
                            <Link href="/privacy" className="text-app-primary hover:underline font-medium">
                                Privacy Policy
                            </Link>{' '}
                            for more details.
                        </p>
                        <div className="flex items-center gap-2 mt-3">
                            <Button
                                onClick={accept}
                                size="sm"
                                className="bg-app-primary hover:bg-app-primary/90 text-white text-xs font-bold px-5"
                            >
                                Accept All
                            </Button>
                            <Button
                                onClick={decline}
                                variant="outline"
                                size="sm"
                                className="text-xs font-medium"
                            >
                                Decline
                            </Button>
                        </div>
                    </div>
                    <button
                        onClick={decline}
                        className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
                        aria-label="Close cookie consent"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
