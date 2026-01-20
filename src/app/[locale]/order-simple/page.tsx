import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { OrderSimpleForm } from '@/components/forms';
import styles from './page.module.css';

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const titles: Record<string, string> = {
        ru: 'Заказать рекламные рилсы',
        kk: 'Жарнамалық рилсқа тапсырыс беру',
        en: 'Order Advertising Reels',
    };

    return {
        title: titles[locale] || titles.ru,
    };
}

export default async function OrderSimplePage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations('forms.orderSimple');

    return (
        <div className={styles.page}>
            <div className={`container ${styles.container}`}>
                <div className={styles.card}>
                    <h1 className={styles.title}>{t('title')}</h1>
                    <OrderSimpleForm />
                </div>
            </div>
        </div>
    );
}
