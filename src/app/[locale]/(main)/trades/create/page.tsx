import { AuthGuard } from '@/components/auth/AuthGuard';
import { CreateTradeForm } from '@/components/trades/CreateTradeForm';

export const metadata = {
  title: 'Post a Trade — Adopt Me Trading',
  description: 'Create and post your Adopt Me trade. Add the pets you have and the pets you want, then share with the community.',
  robots: { index: false, follow: false },
};

export default function CreateTradePage() {
  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold">Post a Trade</h1>
        <p className="text-muted-foreground mt-1">
          Add pets to each side and share your trade with the community.
        </p>
      </div>
      <AuthGuard>
        <CreateTradeForm />
      </AuthGuard>
    </div>
  );
}
