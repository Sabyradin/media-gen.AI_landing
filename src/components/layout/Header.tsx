'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '@/components/ui/ThemeToggle';
import styles from './Header.module.css';

const navLinks = [
    { href: '', key: 'home' },
    { href: '/platform', key: 'platform' },
    { href: '/portfolio', key: 'portfolio' },
    { href: '/contacts', key: 'contacts' },
];

export default function Header() {
    const t = useTranslations('nav');
    const locale = useLocale();
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isActive = (href: string) => {
        const fullPath = `/${locale}${href}`;
        if (href === '') {
            return pathname === `/${locale}` || pathname === `/${locale}/`;
        }
        return pathname.startsWith(fullPath);
    };

    return (
        <header className={styles.header}>
            <div className={`container ${styles.container}`}>
                <Link href={`/${locale}`} className={styles.logo}>
                    <span className={styles.logoText}>Media-Gen</span>
                    <span className={styles.logoAi}>AI</span>
                </Link>

                <nav className={styles.nav}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.key}
                            href={`/${locale}${link.href}`}
                            className={`${styles.navLink} ${isActive(link.href) ? styles.active : ''}`}
                        >
                            {t(link.key)}
                        </Link>
                    ))}
                </nav>

                <div className={styles.actions}>
                    <LanguageSwitcher />
                    <Link href={`/${locale}/order-simple`} className={`btn btn-primary ${styles.ctaBtn}`}>
                        {t('home') === 'Главная' ? 'Заказать' : t('home') === 'Басты бет' ? 'Тапсырыс' : 'Order'}
                    </Link>
                    <ThemeToggle />
                </div>

                <button
                    className={styles.menuButton}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={`${styles.menuIcon} ${isMenuOpen ? styles.open : ''}`} />
                </button>
            </div>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        className={styles.mobileMenu}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        <nav className={styles.mobileNav}>
                            {navLinks.map((link) => (
                                <Link
                                    key={link.key}
                                    href={`/${locale}${link.href}`}
                                    className={`${styles.mobileNavLink} ${isActive(link.href) ? styles.active : ''}`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {t(link.key)}
                                </Link>
                            ))}
                            <Link
                                href={`/${locale}/order-simple`}
                                className={`btn btn-primary ${styles.mobileCta}`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {t('home') === 'Главная' ? 'Заказать рилсы' : t('home') === 'Басты бет' ? 'Рилс тапсырыс беру' : 'Order Reels'}
                            </Link>
                        </nav>
                        <div className={styles.mobileActions}>
                            <LanguageSwitcher />
                            <ThemeToggle />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}

function LanguageSwitcher() {
    const locale = useLocale();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const locales = [
        { code: 'ru', label: 'RU', full: 'Русский' },
        { code: 'kk', label: 'KK', full: 'Қазақша' },
        { code: 'en', label: 'EN', full: 'English' },
    ];

    const currentLocale = locales.find((l) => l.code === locale) || locales[0];

    const getLocalePath = (newLocale: string) => {
        const segments = pathname.split('/');
        segments[1] = newLocale;
        return segments.join('/');
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={styles.langDropdown} ref={dropdownRef}>
            <button
                className={styles.langButton}
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
            >
                <span className={styles.langCurrent}>{currentLocale.label}</span>
                <svg
                    className={`${styles.langArrow} ${isOpen ? styles.langArrowOpen : ''}`}
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className={styles.langMenu}
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                    >
                        {locales.map((l) => (
                            <Link
                                key={l.code}
                                href={getLocalePath(l.code)}
                                className={`${styles.langOption} ${locale === l.code ? styles.langOptionActive : ''}`}
                                onClick={() => setIsOpen(false)}
                            >
                                <span className={styles.langCode}>{l.label}</span>
                                <span className={styles.langFull}>{l.full}</span>
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
