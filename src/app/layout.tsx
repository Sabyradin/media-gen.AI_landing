import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://media-gen.ai'),
  title: {
    default: 'Media-Gen AI — AI Video Agency',
    template: '%s | Media-Gen AI',
  },
  description: 'AI video agency for Instagram and TikTok advertising. We create viral Reels for businesses.',
  keywords: ['AI video', 'Instagram Reels', 'TikTok', 'video advertising', 'AI agency', 'рилсы', 'видеореклама'],
  authors: [{ name: 'Media-Gen AI' }],
  creator: 'Media-Gen AI',
  publisher: 'Media-Gen AI',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  verification: {
    // Add when you have these
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <head>
        {/* Preconnect to critical domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.instagram.com" />
        <link rel="dns-prefetch" href="https://wa.me" />

        {/* Theme initialization to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme')||'dark';document.documentElement.setAttribute('data-theme',t)})();`,
          }}
        />
      </head>
      <body className={inter.variable}>
        {children}
      </body>
    </html>
  );
}
