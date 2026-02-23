import { Header } from '@/components/layout/Header';
import { MobileNav } from '@/components/layout/MobileNav';
import { Footer } from '@/components/layout/Footer';
import { AppDownloadBanner } from '@/components/layout/AppDownloadBanner';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-1 w-full">
        <div className="mx-auto flex max-w-[1400px] px-2 lg:px-4 gap-4">
          {/* Left ad sidebar */}
          <aside className="hidden xl:block w-[160px] flex-shrink-0 py-5">
            <div className="sticky top-20 h-[600px]" />
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0 py-5 pb-20 lg:pb-6">
            {children}
          </main>

          {/* Right sidebar — App download */}
          <aside className="hidden xl:block w-[200px] flex-shrink-0 py-5">
            <div className="sticky top-20">
              <AppDownloadBanner />
            </div>
          </aside>
        </div>
      </div>

      {/* Full-width app banner above footer — visible on all screens */}
      <div className="px-4 pb-20 lg:pb-6 max-w-xl mx-auto w-full xl:hidden">
        <AppDownloadBanner />
      </div>

      <Footer />
      <MobileNav />
    </div>
  );
}

