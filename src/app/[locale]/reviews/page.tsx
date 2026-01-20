import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { reviews } from '@/content/reviews';
import styles from './page.module.css';

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const titles: Record<string, string> = {
        ru: 'Отзывы клиентов',
        kk: 'Клиенттердің пікірлері',
        en: 'Client Reviews',
    };

    return {
        title: titles[locale] || titles.ru,
    };
}

export default async function ReviewsPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations('reviews');

    return (
        <div className={styles.page}>
            <div className="container">
                <header className={styles.header}>
                    <h1 className={styles.title}>{t('title')}</h1>
                </header>

                {reviews.length > 0 ? (
                    <div className={styles.grid}>
                        {reviews.map((review) => (
                            <div key={review.id} className={styles.card}>
                                <div className={styles.avatar}>
                                    {review.name.charAt(0)}
                                </div>
                                <div className={styles.content}>
                                    <p className={styles.text}>
                                        &quot;{review.text[locale as keyof typeof review.text] || review.text.ru}&quot;
                                    </p>
                                    <div className={styles.author}>
                                        <span className={styles.name}>{review.name}</span>
                                        <span className={styles.company}>{review.company}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={styles.empty}>
                        <p>{t('comingSoon')}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
