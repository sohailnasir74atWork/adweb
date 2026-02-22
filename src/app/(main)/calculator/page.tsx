import { CalculatorBoard } from '@/components/calculator/CalculatorBoard';
import { JsonLd } from '@/components/seo/JsonLd';
import { ListOrdered, HelpCircle, Sparkles, BarChart3 } from 'lucide-react';

export const metadata = {
  title: 'Adopt Me Trade Calculator — Is Your Trade Fair?',
  description:
    'Use our free Adopt Me trade calculator to check pet values and see if your trade is a win, lose, or fair. Updated daily with the latest values.',
};

const calculatorJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Adopt Me Trade Calculator',
  url: 'https://adoptmevalues.app/calculator',
  applicationCategory: 'GameApplication',
  operatingSystem: 'Web',
  description:
    'Free trade calculator for Adopt Me. Check if your trade is a Win, Lose, or Fair with real-time pet values.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
};

export default function CalculatorPage() {
  return (
    <div className="flex flex-col gap-6">
      <JsonLd data={calculatorJsonLd} />
      {/* SEO shell — server rendered */}
      <section>
        <h1 className="text-3xl font-bold">
          Adopt Me Trade Calculator — Check if Your Trade is Fair
        </h1>
        <p className="text-muted-foreground mt-1">
          Add pets to each side and instantly see if your trade is a Win, Lose, or Fair.
          All values updated daily.
        </p>
      </section>

      {/* Interactive calculator — client component */}
      <CalculatorBoard />

      {/* How to Use — kid-friendly card */}
      <div className="rounded-3xl bg-gradient-to-br from-rose-100 to-orange-100 dark:from-rose-950/40 dark:to-orange-950/40 ring-1 ring-rose-200 dark:ring-rose-800 p-5 sm:p-6 mt-6">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="rounded-2xl bg-rose-200 dark:bg-rose-800/50 p-2.5">
            <ListOrdered className="h-6 w-6 text-rose-600 dark:text-rose-400" />
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold">How to Use the Calculator</h2>
        </div>
        <div className="space-y-2.5">
          {[
            { num: '1', title: 'Add pets to "Offering"', desc: 'Click the Add button on the left and search for the pets you\'re giving away.' },
            { num: '2', title: 'Add pets to "Looking For"', desc: 'Click the Add button on the right and search for the pets you want in return.' },
            { num: '3', title: 'Adjust variants', desc: 'Toggle between Normal, Neon, and Mega Neon. Set potion status to No Potion, Fly, Ride, or Fly Ride.' },
            { num: '4', title: 'See your result', desc: 'The calculator instantly shows Win, Lose, or Fair with a percentage breakdown.' },
          ].map((step) => (
            <div key={step.num} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-rose-500 text-white text-sm font-bold flex items-center justify-center">{step.num}</span>
              <div>
                <p className="text-sm sm:text-base font-bold">{step.title}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ — kid-friendly cards */}
      <div className="mt-4 space-y-3">
        <h2 className="text-lg sm:text-xl font-extrabold flex items-center gap-2 px-1">
          <HelpCircle className="h-5 w-5 text-violet-500" />
          Frequently Asked Questions
        </h2>

        <div className="rounded-2xl bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-950/40 dark:to-yellow-950/40 ring-1 ring-amber-200 dark:ring-amber-800 p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-1.5">
            <BarChart3 className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <h3 className="font-bold text-sm sm:text-base">How accurate are the values?</h3>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Our pet values are updated daily based on real trading data and community demand.
            We track Normal, Neon, Mega Neon, Fly, Ride, and Fly Ride values for every pet.
          </p>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-sky-100 to-blue-100 dark:from-sky-950/40 dark:to-blue-950/40 ring-1 ring-sky-200 dark:ring-sky-800 p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-1.5">
            <HelpCircle className="h-4 w-4 text-sky-600 dark:text-sky-400" />
            <h3 className="font-bold text-sm sm:text-base">What does Win, Lose, and Fair mean?</h3>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            <strong>Win</strong> means you receive more value than you give.{' '}
            <strong>Lose</strong> means you give more value than you receive.{' '}
            <strong>Fair</strong> means the trade is roughly equal (within 10% difference).
          </p>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-950/40 dark:to-purple-950/40 ring-1 ring-violet-200 dark:ring-violet-800 p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-1.5">
            <Sparkles className="h-4 w-4 text-violet-600 dark:text-violet-400" />
            <h3 className="font-bold text-sm sm:text-base">Can I check Neon and Mega Neon trades?</h3>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Yes! After adding a pet, use the variant toggles on each card to switch between
            Normal, Neon, and Mega Neon. You can also set potion status for the most accurate value.
          </p>
        </div>
      </div>
    </div>
  );
}
