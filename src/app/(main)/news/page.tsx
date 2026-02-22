import { Newspaper } from 'lucide-react';
import { ValueChangesFeed } from '@/components/news/ValueChangesFeed';

export const metadata = {
  title: 'Adopt Me News & Updates — Latest Value Changes',
  description:
    'Stay up to date with the latest Adopt Me news, value changes, and updates. See which pets are rising and falling in value.',
};

export default function NewsPage() {
  return (
    <div className="flex flex-col gap-6">
      <section>
        <div className="flex items-center gap-3">
          <Newspaper className="h-8 w-8 text-cyan-500" />
          <div>
            <h1 className="text-3xl font-bold">News & Updates</h1>
            <p className="text-muted-foreground text-sm mt-0.5">
              Latest Adopt Me value changes and community news.
            </p>
          </div>
        </div>
      </section>

      <ValueChangesFeed />

      <section className="prose dark:prose-invert max-w-none mt-4">
        <h2>Adopt Me Value Updates</h2>
        <p>
          Stay informed about the latest changes in Adopt Me pet values.
          Our team tracks value fluctuations daily so you always know what your
          pets are worth before trading. Check back regularly for the latest updates.
        </p>
      </section>
    </div>
  );
}
