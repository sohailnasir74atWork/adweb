'use client';

import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('error');

  useEffect(() => {
    console.error('Page error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-4">
      <AlertTriangle className="h-12 w-12 text-destructive" />
      <h2 className="text-2xl font-semibold">{t('title')}</h2>
      <p className="text-muted-foreground max-w-md">
        {t('description')}
      </p>
      <Button onClick={reset} className="bg-app-primary hover:bg-app-primary/90 text-white">
        {t('retry')}
      </Button>
    </div>
  );
}
