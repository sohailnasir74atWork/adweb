'use client';

import { useState, useEffect, useCallback } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '@/lib/firebase/config';

/* ── Types ── */
export interface BanDetails {
    strikeCount: number;
    bannedUntil: number | 'permanent';
    reason: string;
    bannedAt?: number;
    bannedBy?: string;
}

/* ── Helpers ── */
const encodeEmailForBan = (email: string) =>
    (email || '').toLowerCase().trim().replace(/\./g, '(dot)');

function formatTimeRemaining(ms: number): string {
    if (ms <= 0) return '';
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));

    const parts: string[] = [];
    if (days > 0) parts.push(`${days}d`);
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    return parts.join(' ') || '< 1m';
}

/**
 * Real-time hook that listens to `banned_users_by_email/{encoded_email}`
 * in Firebase Realtime Database. Returns ban status and details.
 *
 * Matches the RN project's `useBanStatus` in utils.js exactly.
 */
export function useBanStatus(email: string | null | undefined) {
    const [isBanned, setIsBanned] = useState(false);
    const [banDetails, setBanDetails] = useState<BanDetails | null>(null);
    const [banMessage, setBanMessage] = useState<string | null>(null);

    const buildMessage = useCallback((data: BanDetails): string => {
        if (data.bannedUntil === 'permanent') {
            return `You are permanently banned (Strike ${data.strikeCount}).`;
        }
        const remaining = (data.bannedUntil as number) - Date.now();
        if (remaining > 0) {
            return `You are banned for ${formatTimeRemaining(remaining)} (Strike ${data.strikeCount}).`;
        }
        return '';
    }, []);

    useEffect(() => {
        if (!email) {
            setIsBanned(false);
            setBanDetails(null);
            setBanMessage(null);
            return;
        }

        const banRef = ref(database, `banned_users_by_email/${encodeEmailForBan(email)}`);

        const unsubscribe = onValue(
            banRef,
            (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val() as BanDetails;
                    const now = Date.now();

                    let active = false;
                    if (data.bannedUntil === 'permanent') {
                        active = true;
                    } else if (typeof data.bannedUntil === 'number' && data.bannedUntil > now) {
                        active = true;
                    }

                    setIsBanned(active);
                    setBanDetails(active ? data : null);
                    setBanMessage(active ? buildMessage(data) : null);
                } else {
                    setIsBanned(false);
                    setBanDetails(null);
                    setBanMessage(null);
                }
            },
            (error) => {
                console.error('[BanStatus] Listener error:', error);
                setIsBanned(false);
                setBanDetails(null);
                setBanMessage(null);
            },
        );

        return () => unsubscribe();
    }, [email, buildMessage]);

    // Auto-refresh message every minute for countdown timer
    useEffect(() => {
        if (!isBanned || !banDetails || banDetails.bannedUntil === 'permanent') return;

        const interval = setInterval(() => {
            const remaining = (banDetails.bannedUntil as number) - Date.now();
            if (remaining <= 0) {
                setIsBanned(false);
                setBanDetails(null);
                setBanMessage(null);
            } else {
                setBanMessage(buildMessage(banDetails));
            }
        }, 60_000); // update every minute

        return () => clearInterval(interval);
    }, [isBanned, banDetails, buildMessage]);

    return { isBanned, banDetails, banMessage };
}
