import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import PortfolioClient from './PortfolioClient';
import styles from './page.module.css';

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const titles: Record<string, string> = {
        ru: 'Портфолио — наши работы',
        kk: 'Портфолио — біздің жұмыстарымыз',
        en: 'Portfolio — Our Works',
    };

    return {
        title: titles[locale] || titles.ru,
    };
}

export default async function PortfolioPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations('portfolio');

    return (
        <div className={styles.page}>
            <div className="container">
                <header className={styles.header}>
                    <h1 className={styles.title}>{t('title')}</h1>
                    <p className={styles.description}>{t('description')}</p>
                </header>

                <PortfolioClient />
            </div>
        </div>
    );
}
