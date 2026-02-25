'use client';

import { useEffect } from 'react';
import type { Metric } from 'web-vitals';

function sendToGA4(metric: Metric) {
    // gtag is loaded lazily via GA4 script in layout
    if (typeof window.gtag !== 'function') return;

    window.gtag('event', metric.name, {
        event_category: 'Web Vitals',
        value: Math.round(metric.name === 'CLS' ? metric.delta * 1000 : metric.delta),
        event_label: metric.id,
        non_interaction: true,
    });
}

export function WebVitalsReporter() {
    useEffect(() => {
        // Dynamic import — loads only after page is idle
        import('web-vitals').then(({ onCLS, onINP, onLCP, onFCP, onTTFB }) => {
            onCLS(sendToGA4);
            onINP(sendToGA4);
            onLCP(sendToGA4);
            onFCP(sendToGA4);
            onTTFB(sendToGA4);
        });
    }, []);

    return null;
}
