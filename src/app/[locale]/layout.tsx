import { notFound } from 'next/navigation';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { locales, type Locale } from '@/i18n';
import { SITE_URL } from '@/lib/utils';
import LocaleLayoutClient from './LocaleLayoutClient';
import type { Metadata } from 'next';

type Props = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;

    const titles: Record<Locale, string> = {
        ru: 'Media-Gen AI — Создаём AI-видео для рекламы',
        kk: 'Media-Gen AI — Бизнесіңізге AI-бейне жасаймыз',
        en: 'Media-Gen AI — We Create AI Videos for Advertising',
    };

    const descriptions: Record<Locale, string> = {
        ru: 'AI-агентство нового поколения. Создаём вирусные рекламные Reels для Instagram и TikTok. Для застройщиков, ресторанов, производителей.',
        kk: 'Жаңа буын AI-агенттігі. Instagram және TikTok үшін вирустық жарнамалық Reels жасаймыз. Құрылыс салушылар, мейрамханалар, өндірушілер үшін.',
        en: 'Next-generation AI agency. We create viral advertising Reels for Instagram and TikTok. For real estate developers, restaurants, manufacturers.',
    };

    return {
        title: {
            default: titles[locale as Locale] || titles.ru,
            template: `%s | Media-Gen AI`,
        },
        description: descriptions[locale as Locale] || descriptions.ru,
        alternates: {
            canonical: `${SITE_URL}/${locale}`,
            languages: {
                'ru': `${SITE_URL}/ru`,
                'kk': `${SITE_URL}/kk`,
                'en': `${SITE_URL}/en`,
            },
        },
        openGraph: {
            title: titles[locale as Locale] || titles.ru,
            description: descriptions[locale as Locale] || descriptions.ru,
            url: `${SITE_URL}/${locale}`,
            siteName: 'Media-Gen AI',
            locale: locale === 'kk' ? 'kk_KZ' : locale === 'en' ? 'en_US' : 'ru_RU',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: titles[locale as Locale] || titles.ru,
            description: descriptions[locale as Locale] || descriptions.ru,
        },
    };
}

export default async function LocaleLayout({ children, params }: Props) {
    const { locale } = await params;

    if (!locales.includes(locale as Locale)) {
        notFound();
    }

    setRequestLocale(locale);

    const messages = await getMessages();

    return (
        <LocaleLayoutClient messages={messages} locale={locale}>
            {children}
        </LocaleLayoutClient>
    );
}
