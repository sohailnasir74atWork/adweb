import { Header } from '@/components/layout/Header';
import { MobileNav } from '@/components/layout/MobileNav';
import { Footer } from '@/components/layout/Footer';

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
            <div className="sticky top-20 rounded-2xl border border-dashed border-muted-foreground/20 bg-muted/30 h-[600px] flex items-center justify-center">
              <span className="text-[10px] text-muted-foreground/50 font-bold tracking-widest [writing-mode:vertical-lr]">AD SPACE</span>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0 py-5 pb-24 lg:pb-6">
            {children}
          </main>

          {/* Right ad sidebar */}
          <aside className="hidden xl:block w-[160px] flex-shrink-0 py-5">
            <div className="sticky top-20 rounded-2xl border border-dashed border-muted-foreground/20 bg-muted/30 h-[600px] flex items-center justify-center">
              <span className="text-[10px] text-muted-foreground/50 font-bold tracking-widest [writing-mode:vertical-lr]">AD SPACE</span>
            </div>
          </aside>
        </div>
      </div>
      <Footer />
      <MobileNav />
    </div>
  );
}
