'use client';

import { NextIntlClientProvider } from 'next-intl';
import { Header, Footer } from '@/components/layout';
import { ThemeProvider } from '@/lib/theme-context';
import type { ReactNode } from 'react';
import type { AbstractIntlMessages } from 'next-intl';

interface LocaleLayoutClientProps {
    children: ReactNode;
    messages: AbstractIntlMessages;
    locale: string;
}

export default function LocaleLayoutClient({ children, messages, locale }: LocaleLayoutClientProps) {
    return (
        <ThemeProvider>
            <NextIntlClientProvider messages={messages} locale={locale}>
                <Header />
                <main>{children}</main>
                <Footer />
            </NextIntlClientProvider>
        </ThemeProvider>
    );
}
