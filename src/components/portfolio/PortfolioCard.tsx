'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import type { PortfolioItem } from '@/content/portfolio';
import styles from './PortfolioCard.module.css';

interface PortfolioCardProps {
    item: PortfolioItem;
    locale: string;
}

export default function PortfolioCard({ item, locale }: PortfolioCardProps) {
    const t = useTranslations('portfolio');
    const [isLoading, setIsLoading] = useState(true);

    const handleIframeLoad = () => {
        setIsLoading(false);
    };

    return (
        <div className={styles.card}>
            {/* Title at top */}
            <div className={styles.header}>
                <span className={styles.title}>
                    {item.title[locale as keyof typeof item.title] || item.title.en}
                </span>
                <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.openLink}
                >
                    {t('openInstagram')}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                </a>
            </div>

            {/* Instagram Embed - loads immediately */}
            <div className={styles.embedWrapper}>
                {isLoading && (
                    <div className={styles.loading}>
                        <div className={styles.spinner} />
                    </div>
                )}
                <iframe
                    src={`${item.url}embed/`}
                    className={styles.embed}
                    allowFullScreen
                    onLoad={handleIframeLoad}
                    title={item.title[locale as keyof typeof item.title] || item.title.en}
                />
            </div>
        </div>
    );
}
