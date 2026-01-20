import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import styles from './page.module.css';

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const titles: Record<string, string> = {
        ru: 'Платформа Media-Gen — будущее рекламного контента',
        kk: 'Media-Gen платформасы — жарнамалық контенттің болашағы',
        en: 'Media-Gen Platform — The Future of Advertising Content',
    };

    return {
        title: titles[locale] || titles.ru,
    };
}

export default async function PlatformPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations('platform');

    const features = [
        { emoji: '📝', key: 'automation' },
        { emoji: '✨', key: 'quality' },
        { emoji: '🚀', key: 'speed' },
        { emoji: '🎯', key: 'control' },
    ];

    return (
        <div className={styles.page}>
            <div className="container">
                <div className={styles.hero}>
                    <span className={styles.badge}>{t('comingSoon')}</span>
                    <h1 className={styles.title}>{t('pageTitle')}</h1>
                    <p className={styles.description}>{t('pageText')}</p>
                </div>

                <div className={styles.features}>
                    {features.map((feature) => (
                        <div key={feature.key} className={styles.featureCard}>
                            <span className={styles.featureEmoji}>{feature.emoji}</span>
                            <h3 className={styles.featureName}>{t(`features.${feature.key}`)}</h3>
                        </div>
                    ))}
                </div>

                <div className={styles.timeline}>
                    <div className={styles.timelineItem}>
                        <div className={styles.timelineDot} />
                        <div className={styles.timelineContent}>
                            <h4>{locale === 'ru' ? 'Этап 1' : locale === 'kk' ? '1-кезең' : 'Phase 1'}</h4>
                            <p>{locale === 'ru' ? 'Разработка MVP платформы' : locale === 'kk' ? 'MVP платформасын әзірлеу' : 'MVP platform development'}</p>
                        </div>
                    </div>
                    <div className={styles.timelineItem}>
                        <div className={styles.timelineDot} />
                        <div className={styles.timelineContent}>
                            <h4>{locale === 'ru' ? 'Этап 2' : locale === 'kk' ? '2-кезең' : 'Phase 2'}</h4>
                            <p>{locale === 'ru' ? 'Тестирование с первыми пользователями' : locale === 'kk' ? 'Алғашқы пайдаланушылармен тестілеу' : 'Testing with early users'}</p>
                        </div>
                    </div>
                    <div className={styles.timelineItem}>
                        <div className={styles.timelineDot} />
                        <div className={styles.timelineContent}>
                            <h4>{locale === 'ru' ? 'Этап 3' : locale === 'kk' ? '3-кезең' : 'Phase 3'}</h4>
                            <p>{locale === 'ru' ? 'Публичный запуск' : locale === 'kk' ? 'Жария іске қосу' : 'Public launch'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
