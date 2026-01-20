'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import styles from './PlatformPreview.module.css';

export default function PlatformPreview() {
    const t = useTranslations('platform');
    const locale = useLocale();

    return (
        <section className={styles.section}>
            <div className="container">
                <motion.div
                    className={styles.card}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.5 }}
                >
                    <span className={styles.badge}>{t('comingSoon')}</span>

                    <h2 className={styles.title}>{t('title')}</h2>
                    <p className={styles.text}>{t('text')}</p>

                    <div className={styles.features}>
                        <div className={styles.feature}>
                            <div className={styles.featureIcon}>⚡</div>
                            <span>{t('features.automation')}</span>
                        </div>
                        <div className={styles.feature}>
                            <div className={styles.featureIcon}>✨</div>
                            <span>{t('features.quality')}</span>
                        </div>
                        <div className={styles.feature}>
                            <div className={styles.featureIcon}>🚀</div>
                            <span>{t('features.speed')}</span>
                        </div>
                        <div className={styles.feature}>
                            <div className={styles.featureIcon}>🎯</div>
                            <span>{t('features.control')}</span>
                        </div>
                    </div>

                    <Link href={`/${locale}/platform`} className="btn btn-secondary">
                        {locale === 'ru' ? 'Узнать больше' : locale === 'kk' ? 'Толығырақ' : 'Learn more'}
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
