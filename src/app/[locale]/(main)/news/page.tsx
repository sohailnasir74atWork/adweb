import { Newspaper, Bell, Sparkles, Calendar, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { config } from '@/lib/constants/config';

export const metadata = {
  title: 'Adopt Me News 2026 — Latest Updates & Announcements',
  description:
    'Stay up to date with the latest Adopt Me game updates, events, new pets, and community news. All the latest Roblox Adopt Me announcements in one place.',
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
              Latest Adopt Me game updates, events, and community news.
            </p>
          </div>
        </div>
      </section>

      {/* Coming soon / No news placeholder */}
      <Card className="relative overflow-hidden border-dashed">
        {/* Decorative gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-violet-500/5 pointer-events-none" />

        <div className="relative flex flex-col items-center justify-center text-center py-16 px-6">
          <div className="h-16 w-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-4">
            <Bell className="h-8 w-8 text-cyan-500" />
          </div>
          <h2 className="text-xl font-bold mb-2">No News Yet</h2>
          <p className="text-sm text-muted-foreground max-w-md mb-6">
            We&apos;re working on bringing you the latest Adopt Me updates, events, and announcements.
            Check back soon!
          </p>

          {/* Quick links */}
          <div className="flex flex-wrap gap-2 justify-center">
            <Link
              href="/analytics"
              className="flex items-center gap-1.5 text-xs font-semibold bg-app-primary/10 text-app-primary px-3 py-2 rounded-full hover:bg-app-primary/20 transition-colors"
            >
              <Sparkles className="h-3.5 w-3.5" />
              View Value Changes
            </Link>
            <a
              href="https://x.com/PlayAdoptMe"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-semibold bg-muted text-muted-foreground px-3 py-2 rounded-full hover:bg-accent transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              @PlayAdoptMe
            </a>
          </div>
        </div>
      </Card>

      {/* Useful links section */}
      <section>
        <h2 className="text-lg font-bold mb-3">Helpful Resources</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <Card className="p-4 flex items-center gap-3 hover:bg-accent/50 transition-colors">
            <div className="h-10 w-10 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0">
              <Sparkles className="h-5 w-5 text-green-500" />
            </div>
            <div className="min-w-0">
              <Link href="/analytics" className="text-sm font-semibold hover:underline">
                Market Analytics
              </Link>
              <p className="text-xs text-muted-foreground">Track rising & falling pet values</p>
            </div>
          </Card>

          <Card className="p-4 flex items-center gap-3 hover:bg-accent/50 transition-colors">
            <div className="h-10 w-10 rounded-xl bg-violet-500/10 flex items-center justify-center flex-shrink-0">
              <Calendar className="h-5 w-5 text-violet-500" />
            </div>
            <div className="min-w-0">
              <a
                href="https://adoptme.fandom.com/wiki/Adopt_Me!_Wiki"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold hover:underline"
              >
                Adopt Me Wiki
              </a>
              <p className="text-xs text-muted-foreground">Official game wiki & events</p>
            </div>
          </Card>

          <Card className="p-4 flex items-center gap-3 hover:bg-accent/50 transition-colors">
            <div className="h-10 w-10 rounded-xl bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
              <Image src="/logo.webp" alt="App" width={20} height={20} className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <a
                href={config.iosLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold hover:underline"
              >
                Get the App
              </a>
              <p className="text-xs text-muted-foreground">Push notifications for updates</p>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
