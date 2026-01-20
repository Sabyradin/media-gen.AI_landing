'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import styles from './CreatorBlock.module.css';

export default function CreatorBlock() {
    const t = useTranslations('creator');
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
                    <div className={styles.icon}>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <circle cx="12" cy="8" r="4" />
                            <path d="M20 21a8 8 0 1 0-16 0" />
                            <path d="M12 12v4" />
                            <path d="m15 13-3 3-3-3" />
                        </svg>
                    </div>

                    <div className={styles.content}>
                        <h2 className={styles.title}>{t('title')}</h2>
                        <p className={styles.text}>{t('text')}</p>
                    </div>

                    <Link href={`/${locale}/creator`} className="btn btn-secondary">
                        {locale === 'ru' ? 'Стать креатором' : locale === 'kk' ? 'Креатор болу' : 'Become a Creator'}
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
