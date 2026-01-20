import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { CreatorForm } from '@/components/forms';
import styles from '../order-simple/page.module.css';

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const titles: Record<string, string> = {
        ru: 'Стать AI-креатором',
        kk: 'AI-креатор болу',
        en: 'Become an AI Creator',
    };

    return {
        title: titles[locale] || titles.ru,
    };
}

export default async function CreatorPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations('forms.creator');

    return (
        <div className={styles.page}>
            <div className={`container ${styles.container}`}>
                <div className={styles.card}>
                    <h1 className={styles.title}>{t('title')}</h1>
                    <CreatorForm />
                </div>
            </div>
        </div>
    );
}
