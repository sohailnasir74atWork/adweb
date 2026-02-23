import { BarChart3 } from 'lucide-react';
import { AnalyticsDashboard } from '@/components/analytics/AnalyticsDashboard';
import { config } from '@/lib/constants/config';

export const metadata = {
  title: 'Adopt Me Trading Values 2026 — Market Trends & Pet Analytics',
  description:
    'Track Adopt Me pet trading values, trending pets, and Roblox market analytics. See which pets are rising and falling in value. Updated daily in 2026.',
};

async function getSSRData() {
  try {
    const [analyticsRes, changesRes] = await Promise.all([
      fetch(config.tradeAnalyticsUrl, { next: { revalidate: 300 } })
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null),
      fetch(config.valueChangesUrl, { next: { revalidate: 300 } })
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null),
    ]);
    return { analyticsRaw: analyticsRes, changesRaw: changesRes };
  } catch {
    return { analyticsRaw: null, changesRaw: null };
  }
}

export default async function AnalyticsPage() {
  const { analyticsRaw, changesRaw } = await getSSRData();

  return (
    <div className="flex flex-col gap-6">
      <section>
        <div className="flex items-center gap-3">
          <BarChart3 className="h-8 w-8 text-green-500" />
          <div>
            <h1 className="text-3xl font-bold">Market Analytics</h1>
            <p className="text-muted-foreground text-sm mt-0.5">
              Track pet value trends and see what&apos;s hot in the Adopt Me market.
            </p>
          </div>
        </div>
      </section>

      <AnalyticsDashboard ssrAnalyticsRaw={analyticsRaw} ssrChangesRaw={changesRaw} />

      <section className="prose dark:prose-invert max-w-none mt-4">
        <h2>Adopt Me Pet Trading Values &amp; Trends</h2>
        <p>
          Our market analytics dashboard tracks real-time Adopt Me trading data on Roblox.
          See which pets are gaining trading value, which are declining, and discover the
          most traded and demanded pets in the community. All trading values are updated daily
          from thousands of community trades in 2026.
        </p>
        <h3>How We Track Adopt Me Values</h3>
        <p>
          Pet trading values are calculated from real trade data submitted by our community.
          We analyze trade frequency, demand ratios, and value trends to give you the
          most accurate Adopt Me value list — the best alternative for checking your Roblox pet values.
        </p>
      </section>
    </div>
  );
}
