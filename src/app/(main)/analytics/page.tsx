import { BarChart3 } from 'lucide-react';
import { AnalyticsDashboard } from '@/components/analytics/AnalyticsDashboard';

export const metadata = {
  title: 'Adopt Me Market Analytics — Pet Value Trends & Trading Data',
  description:
    'Track Adopt Me pet value trends, most traded pets, and market analytics. See which pets are rising and falling in value. Updated daily.',
};

export default function AnalyticsPage() {
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

      <AnalyticsDashboard />

      <section className="prose dark:prose-invert max-w-none mt-4">
        <h2>Adopt Me Pet Value Trends</h2>
        <p>
          Our market analytics dashboard tracks real-time Adopt Me trading data.
          See which pets are gaining value, which are declining, and discover the
          most traded and demanded pets in the community. All data is updated daily
          from thousands of community trades.
        </p>
        <h3>How We Track Values</h3>
        <p>
          Pet values are calculated from real trade data submitted by our community.
          We analyze trade frequency, demand ratios, and value trends to give you the
          most accurate picture of the Adopt Me economy.
        </p>
      </section>
    </div>
  );
}
