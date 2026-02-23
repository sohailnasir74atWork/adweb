'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
    collection,
    query,
    where,
    orderBy,
    limit,
    startAfter,
    getDocs,
    getDoc,
    doc,
    setDoc,
    updateDoc,
    serverTimestamp,
    runTransaction,
    Timestamp,
    type DocumentSnapshot,
} from 'firebase/firestore';
import { firestore } from '@/lib/firebase/config';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Search,
    Plus,
    ShieldAlert,
    User,
    AlertTriangle,
    Calendar,
    FileText,
    Camera,
    Loader2,
    X,
    ChevronRight,
    ImageIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

/* ── Constants ── */
const PAGE_SIZE = 15;
const SCAM_TYPES = ['Trust trade', 'Switch scam', 'Fail trade', 'Other'];
const FILTERS = ['All', 'Verified', 'Unverified'] as const;
const PERSONAL_INFO_REGEX =
    /(\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b|\b\d{7,15}\b|discord|instagram|snapchat|whatsapp|telegram|tiktok)/i;

/* ── Helpers ── */
function fmtDate(ts: unknown): string {
    if (!ts) return '';
    const d = (ts as { toDate?: () => Date })?.toDate?.() ?? new Date(ts as number);
    return dayjs(d).format('MMM D, YYYY');
}
function fmtAgo(ts: unknown): string {
    if (!ts) return '';
    const d = (ts as { toDate?: () => Date })?.toDate?.() ?? new Date(ts as number);
    return dayjs(d).fromNow();
}
function statusColor(s: string) {
    return s === 'verified' ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400';
}
function statusBg(s: string) {
    return s === 'verified' ? 'bg-green-500/15' : 'bg-amber-500/15';
}
function statusLabel(s: string) {
    return s === 'verified' ? 'Verified' : 'Unverified';
}

/* ── Types ── */
interface ScammerSummary {
    id: string;
    reportedUsername: string;
    reportedUsername_lc: string;
    status: string;
    reportCount: number;
    scamDate?: unknown;
    createdAt?: unknown;
    updatedAt?: unknown;
}
interface ScammerDetail {
    id: string;
    scamType: string;
    whatHappened: string;
    proofUrls: string[];
    reporterUid: string;
    reportedUsername_lc: string;
}

/* ════════════════════════════════════════════
   COMPONENT
   ════════════════════════════════════════════ */
export function ScammerDatabase() {
    const user = useAuthStore((s) => s.user);

    /* ── List state ── */
    const [summaries, setSummaries] = useState<ScammerSummary[]>([]);
    const [loading, setLoading] = useState(false);
    const [lastDocSnap, setLastDocSnap] = useState<DocumentSnapshot | null>(null);
    const [hasMore, setHasMore] = useState(true);
    const [isSearchMode, setIsSearchMode] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [activeFilter, setActiveFilter] = useState<string>('All');
    const didFirstLoad = useRef(false);

    /* ── Detail modal ── */
    const [selectedReport, setSelectedReport] = useState<ScammerSummary | null>(null);
    const [detailData, setDetailData] = useState<ScammerDetail | null>(null);
    const [loadingDetail, setLoadingDetail] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [fullscreenImg, setFullscreenImg] = useState<string | null>(null);
    const detailsCache = useRef<Record<string, ScammerDetail>>({});

    /* ── Report form ── */
    const [showReport, setShowReport] = useState(false);
    const [reportUsername, setReportUsername] = useState('');
    const [reportScamType, setReportScamType] = useState(SCAM_TYPES[0]);
    const [reportWhat, setReportWhat] = useState('');
    const [reportScamDate, setReportScamDate] = useState('');
    const [reportImages, setReportImages] = useState<File[]>([]);
    const [reportPreviews, setReportPreviews] = useState<string[]>([]);
    const [submitting, setSubmitting] = useState(false);

    /* ════════════════════════════════════════
       FETCH SUMMARIES (paginated)
       ════════════════════════════════════════ */
    const fetchPage = useCallback(
        async (reset = false, filter = activeFilter) => {
            if (loading) return;
            if (!reset && !hasMore) return;
            setLoading(true);
            try {
                const ref = collection(firestore, 'scammerSummaries');
                const constraints: unknown[] = [
                    orderBy('reportCount', 'desc'),
                    orderBy('updatedAt', 'desc'),
                    limit(PAGE_SIZE),
                ];

                if (filter === 'Verified') constraints.unshift(where('status', '==', 'verified'));
                else if (filter === 'Unverified') constraints.unshift(where('status', '==', 'unverified'));

                if (!reset && lastDocSnap) constraints.push(startAfter(lastDocSnap));

                const q = query(ref, ...(constraints as ReturnType<typeof orderBy>[]));
                const snap = await getDocs(q);
                const list = snap.docs.map((d) => ({ id: d.id, ...d.data() } as ScammerSummary));

                if (reset) setSummaries(list);
                else setSummaries((prev) => [...prev, ...list]);

                setLastDocSnap(snap.docs.length > 0 ? snap.docs[snap.docs.length - 1] : null);
                setHasMore(snap.docs.length === PAGE_SIZE);
                setIsSearchMode(false);
            } catch (err) {
                console.error('[Scammer] Fetch error:', err);
            } finally {
                setLoading(false);
            }
        },
        [loading, hasMore, lastDocSnap, activeFilter],
    );

    /* ── Initial load ── */
    useEffect(() => {
        if (!didFirstLoad.current) {
            didFirstLoad.current = true;
            fetchPage(true);
        }
    }, [fetchPage]);

    /* ════════════════════════════════════════
       SEARCH
       ════════════════════════════════════════ */
    const doSearch = useCallback(
        async (text: string) => {
            const q_lc = text.trim().toLowerCase();
            if (!q_lc) {
                setIsSearchMode(false);
                fetchPage(true);
                return;
            }
            setLoading(true);
            setIsSearchMode(true);
            try {
                const ref = collection(firestore, 'scammerSummaries');
                const q = query(
                    ref,
                    where('reportedUsername_lc', '>=', q_lc),
                    where('reportedUsername_lc', '<=', q_lc + '\uf8ff'),
                    orderBy('reportedUsername_lc'),
                    limit(PAGE_SIZE),
                );
                const snap = await getDocs(q);
                const list = snap.docs.map((d) => ({ id: d.id, ...d.data() } as ScammerSummary));
                setSummaries(list);
                setHasMore(false);
            } catch (err) {
                console.error('[Scammer] Search error:', err);
            } finally {
                setLoading(false);
            }
        },
        [fetchPage],
    );

    /* ── Filter change ── */
    const onFilterChange = (f: string) => {
        setActiveFilter(f);
        setLastDocSnap(null);
        setHasMore(true);
        setSummaries([]);
        setTimeout(() => fetchPage(true, f), 50);
    };

    /* ════════════════════════════════════════
       FETCH DETAIL (on tap, cached)
       ════════════════════════════════════════ */
    const openDetail = useCallback(
        async (item: ScammerSummary) => {
            setSelectedReport(item);
            setDetailData(null);
            setShowDetail(true);

            if (detailsCache.current[item.id]) {
                setDetailData(detailsCache.current[item.id]);
                return;
            }
            setLoadingDetail(true);
            try {
                const snap = await getDoc(doc(firestore, 'scammerDetails', item.id));
                if (snap.exists()) {
                    const data = { id: snap.id, ...snap.data() } as ScammerDetail;
                    detailsCache.current[item.id] = data;
                    setDetailData(data);
                }
            } catch (err) {
                console.error('[Scammer] Detail fetch error:', err);
            } finally {
                setLoadingDetail(false);
            }
        },
        [],
    );

    /* ════════════════════════════════════════
       FILE PICK
       ════════════════════════════════════════ */
    const handlePickImages = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []).slice(0, 3 - reportImages.length);
        if (files.length === 0) return;
        setReportImages((prev) => [...prev, ...files].slice(0, 3));
        const previews = files.map((f) => URL.createObjectURL(f));
        setReportPreviews((prev) => [...prev, ...previews].slice(0, 3));
        e.target.value = '';
    };

    const removeImage = (index: number) => {
        setReportImages((prev) => prev.filter((_, i) => i !== index));
        setReportPreviews((prev) => {
            const newPrevs = prev.filter((_, i) => i !== index);
            URL.revokeObjectURL(prev[index]);
            return newPrevs;
        });
    };

    /* ════════════════════════════════════════
       SUBMIT REPORT
       ════════════════════════════════════════ */
    const submitReport = useCallback(async () => {
        if (!user?.id) {
            alert('Please sign in to submit a report.');
            return;
        }

        const username = reportUsername.trim();
        if (!username || username.length < 3 || username.length > 30) {
            alert('Username must be 3–30 characters.');
            return;
        }
        if (!reportScamDate.trim()) {
            alert('Please enter the date the scam happened.');
            return;
        }
        const whatText = reportWhat.trim();
        if (!whatText || whatText.length < 10) {
            alert('Description must be at least 10 characters.');
            return;
        }
        if (whatText.length > 200) {
            alert('Description must be under 200 characters.');
            return;
        }
        if (PERSONAL_INFO_REGEX.test(whatText)) {
            alert('Please do not include personal information (emails, phone numbers, social media handles).');
            return;
        }

        setSubmitting(true);
        try {
            // Parse scam date
            const parsed = dayjs(reportScamDate.trim());
            if (!parsed.isValid()) {
                alert('Invalid date format. Try YYYY-MM-DD.');
                setSubmitting(false);
                return;
            }
            const scamTimestamp = Timestamp.fromDate(parsed.toDate());

            // Upload images via API
            let proofUrls: string[] = [];
            if (reportImages.length > 0) {
                const uploads = reportImages.map(async (file) => {
                    const formData = new FormData();
                    formData.append('file', file);
                    const res = await fetch('/api/upload-proof', { method: 'POST', body: formData });
                    if (!res.ok) throw new Error('Upload failed');
                    const data = await res.json();
                    return data.url as string;
                });
                proofUrls = (await Promise.all(uploads)).filter(Boolean);
            }

            // Transaction: rate limit + create report
            await runTransaction(firestore, async (tx) => {
                const rateLimitRef = doc(firestore, 'userRateLimits', user.id);
                const rateLimitSnap = await tx.get(rateLimitRef);

                if (rateLimitSnap.exists()) {
                    const lastAt = rateLimitSnap.data()?.lastReportAt;
                    if (lastAt) {
                        const lastMs = lastAt?.toDate ? lastAt.toDate().getTime() : lastAt;
                        const now = Date.now();
                        if (now - lastMs < 24 * 60 * 60 * 1000) {
                            throw new Error('RATE_LIMIT');
                        }
                    }
                }

                const reportId = `${username.toLowerCase()}_${Date.now()}`;
                const summaryRef = doc(firestore, 'scammerSummaries', reportId);
                const detailRef = doc(firestore, 'scammerDetails', reportId);

                // Check existing
                const existingQ = query(
                    collection(firestore, 'scammerSummaries'),
                    where('reportedUsername_lc', '==', username.toLowerCase()),
                    limit(1),
                );
                const existingSnap = await getDocs(existingQ);

                if (existingSnap.docs.length > 0) {
                    const existingRef = existingSnap.docs[0].ref;
                    const prevCount = existingSnap.docs[0].data()?.reportCount || 1;
                    tx.update(existingRef, {
                        reportCount: prevCount + 1,
                        updatedAt: Timestamp.now(),
                    });
                } else {
                    tx.set(summaryRef, {
                        reportedUsername: username,
                        reportedUsername_lc: username.toLowerCase(),
                        status: 'unverified',
                        reportCount: 1,
                        scamDate: scamTimestamp,
                        createdAt: Timestamp.now(),
                        updatedAt: Timestamp.now(),
                    });
                }

                tx.set(detailRef, {
                    scamType: reportScamType,
                    whatHappened: whatText,
                    proofUrls,
                    reporterUid: user.id,
                    reportedUsername_lc: username.toLowerCase(),
                });

                tx.set(rateLimitRef, { lastReportAt: Timestamp.now() }, { merge: true });
            });

            alert('Report submitted! Our moderators will review it.');
            setReportUsername('');
            setReportScamType(SCAM_TYPES[0]);
            setReportWhat('');
            setReportScamDate('');
            setReportImages([]);
            setReportPreviews([]);
            setShowReport(false);
            // Refresh
            setLastDocSnap(null);
            setHasMore(true);
            fetchPage(true);
        } catch (err: unknown) {
            if ((err as Error)?.message === 'RATE_LIMIT') {
                alert('You can only submit 1 report per 24 hours. Please try again later.');
            } else {
                console.error('[Scammer] Submit error:', err);
                alert('Failed to submit report. Please try again.');
            }
        } finally {
            setSubmitting(false);
        }
    }, [user, reportUsername, reportScamType, reportWhat, reportScamDate, reportImages, fetchPage]);

    /* ════════════════════════════════════════
       RENDER
       ════════════════════════════════════════ */
    return (
        <div className="flex flex-col gap-4">
            {/* ── Safety Banner ── */}
            <div className="flex items-start gap-2 rounded-xl bg-amber-500/10 border border-amber-500/20 p-3">
                <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-amber-700 dark:text-amber-300">
                    <strong>Stay safe!</strong> Never share personal info. Only report Roblox usernames you believe scammed you in Adopt Me.
                </p>
            </div>

            {/* ── Search ── */}
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder="Search Roblox username..."
                        className="pl-9 rounded-xl"
                        onKeyDown={(e) => e.key === 'Enter' && doSearch(searchText)}
                    />
                    {searchText && (
                        <button
                            onClick={() => { setSearchText(''); setIsSearchMode(false); fetchPage(true); }}
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                            <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                        </button>
                    )}
                </div>
                <Button onClick={() => doSearch(searchText)} variant="outline" className="rounded-xl">
                    Search
                </Button>
            </div>

            {/* ── Filter + Report button ── */}
            <div className="flex items-center gap-2 flex-wrap">
                {FILTERS.map((f) => (
                    <button
                        key={f}
                        onClick={() => onFilterChange(f)}
                        className={cn(
                            'text-xs font-medium px-3 py-1.5 rounded-full border transition-colors',
                            activeFilter === f
                                ? 'bg-app-primary text-white border-app-primary'
                                : 'bg-card text-muted-foreground border-border hover:bg-accent',
                        )}
                    >
                        {f}
                    </button>
                ))}
                <Button
                    onClick={() => {
                        if (!user?.id) { alert('Please sign in to report a scammer.'); return; }
                        setShowReport(true);
                    }}
                    className="ml-auto rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs gap-1.5"
                    size="sm"
                >
                    <Plus className="h-3.5 w-3.5" />
                    Report Scammer
                </Button>
            </div>

            {/* ── List ── */}
            {loading && summaries.length === 0 ? (
                <div className="flex flex-col gap-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <Skeleton key={i} className="h-16 rounded-xl" />
                    ))}
                </div>
            ) : summaries.length === 0 ? (
                <Card className="p-8 text-center border-dashed">
                    <ShieldAlert className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">No reports found.</p>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                    {summaries.map((item) => (
                        <Card
                            key={item.id}
                            className="flex flex-row items-center gap-2 p-2 cursor-pointer hover:bg-accent/50 transition-colors"
                            onClick={() => openDetail(item)}
                        >
                            <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                                <User className="h-3.5 w-3.5 text-muted-foreground" />
                            </div>
                            <p className="text-sm font-semibold truncate flex-1 min-w-0">{item.reportedUsername}</p>
                            {(item.reportCount || 1) > 1 && (
                                <span className="text-[10px] font-bold text-red-500 flex-shrink-0">
                                    {item.reportCount}×
                                </span>
                            )}
                            <Badge
                                variant="outline"
                                className={cn('text-[9px] py-0 px-1.5', statusBg(item.status), statusColor(item.status), 'border-0 flex-shrink-0')}
                            >
                                {statusLabel(item.status)}
                            </Badge>
                            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                        </Card>
                    ))}

                    {/* Load more */}
                    {hasMore && !isSearchMode && (
                        <Button
                            variant="ghost"
                            onClick={() => fetchPage(false)}
                            disabled={loading}
                            className="text-xs"
                        >
                            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Load More'}
                        </Button>
                    )}
                </div>
            )}

            {/* ════════════════════════════════════════
          DETAIL MODAL
         ════════════════════════════════════════ */}
            <Dialog open={showDetail} onOpenChange={setShowDetail}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Report Details</DialogTitle>
                    </DialogHeader>
                    {selectedReport && (
                        <div className="space-y-4">
                            {/* Summary */}
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                                    <User className="h-5 w-5 text-muted-foreground" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-bold">{selectedReport.reportedUsername}</p>
                                    <p className="text-xs text-muted-foreground">
                                        Scam date: {selectedReport.scamDate ? fmtDate(selectedReport.scamDate) : 'N/A'}
                                    </p>
                                </div>
                                <Badge
                                    variant="outline"
                                    className={cn('text-xs', statusBg(selectedReport.status), statusColor(selectedReport.status), 'border-0')}
                                >
                                    {statusLabel(selectedReport.status)}
                                </Badge>
                            </div>

                            {/* Detail fields */}
                            {loadingDetail ? (
                                <div className="flex justify-center py-6">
                                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                                </div>
                            ) : detailData ? (
                                <div className="space-y-3">
                                    <div className="rounded-lg bg-muted/50 p-3">
                                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Scam Type</p>
                                        <p className="text-sm">{detailData.scamType || 'N/A'}</p>
                                    </div>
                                    <div className="rounded-lg bg-muted/50 p-3">
                                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">What Happened</p>
                                        <p className="text-sm">{detailData.whatHappened || 'N/A'}</p>
                                    </div>
                                    {detailData.proofUrls?.length > 0 && (
                                        <div>
                                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Proof Screenshots</p>
                                            <div className="flex gap-2 overflow-x-auto">
                                                {detailData.proofUrls.map((url, i) => (
                                                    <img
                                                        key={i}
                                                        src={url}
                                                        alt={`Proof ${i + 1}`}
                                                        className="h-24 w-24 rounded-lg object-cover cursor-pointer border hover:opacity-80 transition-opacity flex-shrink-0"
                                                        onClick={() => setFullscreenImg(url)}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground text-center py-4">No details available.</p>
                            )}
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* ════════════════════════════════════════
          FULLSCREEN IMAGE
         ════════════════════════════════════════ */}
            <Dialog open={!!fullscreenImg} onOpenChange={() => setFullscreenImg(null)}>
                <DialogContent className="max-w-2xl p-2">
                    <DialogHeader className="sr-only">
                        <DialogTitle>Proof Screenshot</DialogTitle>
                    </DialogHeader>
                    {fullscreenImg && (
                        <img src={fullscreenImg} alt="Proof" className="w-full rounded-lg" />
                    )}
                </DialogContent>
            </Dialog>

            {/* ════════════════════════════════════════
          REPORT FORM MODAL
         ════════════════════════════════════════ */}
            <Dialog open={showReport} onOpenChange={setShowReport}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <ShieldAlert className="h-5 w-5 text-red-500" />
                            Report a Scammer
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        {/* Username */}
                        <div>
                            <label className="text-xs font-semibold text-muted-foreground mb-1 block">
                                Roblox Username
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    value={reportUsername}
                                    onChange={(e) => setReportUsername(e.target.value)}
                                    placeholder="Enter their Roblox username"
                                    className="pl-9 rounded-xl"
                                    maxLength={30}
                                />
                            </div>
                        </div>

                        {/* Scam type */}
                        <div>
                            <label className="text-xs font-semibold text-muted-foreground mb-1 block">
                                Scam Type
                            </label>
                            <div className="flex flex-wrap gap-1.5">
                                {SCAM_TYPES.map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => setReportScamType(type)}
                                        className={cn(
                                            'text-xs font-medium px-3 py-1.5 rounded-full border transition-colors',
                                            reportScamType === type
                                                ? 'bg-red-600 text-white border-red-600'
                                                : 'bg-card border-border hover:bg-accent',
                                        )}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Scam date */}
                        <div>
                            <label className="text-xs font-semibold text-muted-foreground mb-1 block">
                                When did it happen?
                            </label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="date"
                                    value={reportScamDate}
                                    onChange={(e) => setReportScamDate(e.target.value)}
                                    className="pl-9 rounded-xl"
                                />
                            </div>
                        </div>

                        {/* What happened */}
                        <div>
                            <label className="text-xs font-semibold text-muted-foreground mb-1 block">
                                What happened? ({reportWhat.length}/200)
                            </label>
                            <textarea
                                value={reportWhat}
                                onChange={(e) => setReportWhat(e.target.value)}
                                placeholder="Describe what happened in the trade..."
                                maxLength={200}
                                rows={3}
                                className="w-full rounded-xl border bg-transparent px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-app-primary"
                            />
                        </div>

                        {/* Proof images */}
                        <div>
                            <label className="text-xs font-semibold text-muted-foreground mb-1 block">
                                Proof Screenshots (max 3)
                            </label>
                            <div className="flex gap-2 flex-wrap">
                                {reportPreviews.map((preview, i) => (
                                    <div key={i} className="relative">
                                        <img src={preview} alt={`Preview ${i + 1}`} className="h-16 w-16 rounded-lg object-cover border" />
                                        <button
                                            onClick={() => removeImage(i)}
                                            className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-red-500 text-white flex items-center justify-center"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </div>
                                ))}
                                {reportImages.length < 3 && (
                                    <label className="h-16 w-16 rounded-lg border-2 border-dashed flex items-center justify-center cursor-pointer hover:bg-accent transition-colors">
                                        <Camera className="h-5 w-5 text-muted-foreground" />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            onChange={handlePickImages}
                                            className="hidden"
                                        />
                                    </label>
                                )}
                            </div>
                        </div>

                        {/* Submit */}
                        <Button
                            onClick={submitReport}
                            disabled={submitting}
                            className="w-full rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold"
                        >
                            {submitting ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    <ShieldAlert className="h-4 w-4 mr-2" />
                                    Submit Report
                                </>
                            )}
                        </Button>

                        <p className="text-[10px] text-muted-foreground text-center">
                            You can submit 1 report per 24 hours. False reports may result in account restrictions.
                        </p>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
