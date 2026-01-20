'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { portfolioItems, categories, type PortfolioCategory } from '@/content/portfolio';
import { PortfolioCard } from '@/components/portfolio';
import styles from './page.module.css';

export default function PortfolioClient() {
    const t = useTranslations('portfolio');
    const locale = useLocale();
    const [activeCategory, setActiveCategory] = useState<'all' | PortfolioCategory>('all');

    const filteredItems = activeCategory === 'all'
        ? portfolioItems
        : portfolioItems.filter((item) => item.category === activeCategory);

    return (
        <>
            <div className={styles.filters}>
                {categories.map((category) => (
                    <button
                        key={category}
                        className={`chip ${activeCategory === category ? 'active' : ''}`}
                        onClick={() => setActiveCategory(category)}
                    >
                        {t(`categories.${category}`)}
                    </button>
                ))}
            </div>

            <div className={styles.grid}>
                {filteredItems.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                        <PortfolioCard item={item} locale={locale} />
                    </motion.div>
                ))}
            </div>

            {filteredItems.length === 0 && (
                <p className={styles.empty}>
                    {locale === 'ru' ? 'Нет работ в этой категории' : locale === 'kk' ? 'Бұл санатта жұмыстар жоқ' : 'No works in this category'}
                </p>
            )}
        </>
    );
}
