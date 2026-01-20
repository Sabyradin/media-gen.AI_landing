'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import styles from './BusinessBlock.module.css';

export default function BusinessBlock() {
    const t = useTranslations('business');
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
                            <rect x="3" y="3" width="7" height="7" rx="1" />
                            <rect x="14" y="3" width="7" height="7" rx="1" />
                            <rect x="3" y="14" width="7" height="7" rx="1" />
                            <rect x="14" y="14" width="7" height="7" rx="1" />
                        </svg>
                    </div>

                    <div className={styles.content}>
                        <h2 className={styles.title}>{t('title')}</h2>
                        <p className={styles.text}>{t('text')}</p>
                    </div>

                    <Link href={`/${locale}/order-simple`} className="btn btn-primary">
                        {locale === 'ru' ? 'Заказать рилсы' : locale === 'kk' ? 'Рилс тапсырыс беру' : 'Order Reels'}
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
