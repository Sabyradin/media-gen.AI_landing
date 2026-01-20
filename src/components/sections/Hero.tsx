'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import styles from './Hero.module.css';

export default function Hero() {
    const t = useTranslations('hero');
    const locale = useLocale();

    return (
        <section className={styles.hero}>
            <div className={styles.backgroundOrbs} aria-hidden="true" />

            <div className={`container ${styles.container}`}>
                <motion.div
                    className={styles.content}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className={styles.title}>
                        <span className={styles.titleLine}>{t('title').split(' ').slice(0, 2).join(' ')}</span>
                        <span className={`${styles.titleLine} gradient-text`}>
                            {t('title').split(' ').slice(2).join(' ')}
                        </span>
                    </h1>

                    <p className={styles.subtitle}>{t('subtitle')}</p>

                    <p className={styles.description}>{t('description')}</p>

                    <div className={styles.actions}>
                        <Link href={`/${locale}/order-simple`} className="btn btn-primary btn-lg">
                            {t('ctaOrder')}
                        </Link>
                        <Link href={`/${locale}/creator`} className="btn btn-secondary btn-lg">
                            {t('ctaCreator')}
                        </Link>
                    </div>
                </motion.div>

                <motion.div
                    className={styles.visual}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className={styles.visualCard}>
                        <div className={styles.playIcon}>
                            <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                        <div className={styles.visualText}>
                            <span className={styles.visualLabel}>AI-Generated</span>
                            <span className={styles.visualValue}>Reels</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
