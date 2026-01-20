'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { portfolioItems } from '@/content/portfolio';
import PortfolioCard from '@/components/portfolio/PortfolioCard';
import styles from './PortfolioPreview.module.css';

export default function PortfolioPreview() {
    const t = useTranslations('portfolio');
    const locale = useLocale();

    // Show first 6 items on home page
    const previewItems = portfolioItems.slice(0, 6);

    return (
        <section className={styles.section}>
            <div className="container">
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className={styles.title}>{t('title')}</h2>
                    <p className={styles.description}>{t('description')}</p>
                </motion.div>

                <div className={styles.grid}>
                    {previewItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                            <PortfolioCard item={item} locale={locale} />
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className={styles.actions}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <Link href={`/${locale}/portfolio`} className="btn btn-secondary">
                        {t('viewMore')}
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
