import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('notFound');
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-4">
      <h1 className="text-6xl font-bold text-app-primary">404</h1>
      <h2 className="text-2xl font-semibold">{t('title')}</h2>
      <p className="text-muted-foreground max-w-md">
        {t('description')}
      </p>
      <Link
        href="/"
        className="mt-2 inline-flex items-center gap-2 rounded-lg bg-app-primary px-6 py-2.5 text-sm font-medium text-white hover:bg-app-primary/90 transition-colors"
      >
        {t('backHome')}
      </Link>
    </div>
  );
}
