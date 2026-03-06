import { config } from '@/lib/constants/config';
import { getLocalizedAlternates } from '@/lib/utils/seoHelpers';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const { canonical, languages } = getLocalizedAlternates('/delete-account', locale);
    return {
        title: 'Delete Your Account',
        description: `Request deletion of your ${config.appName} account and all associated data. Permanent and irreversible.`,
        alternates: { canonical, languages },
    };
}

export default function DeleteAccountLayout({ children }: { children: React.ReactNode }) {
    return children;
}
