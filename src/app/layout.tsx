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
    default: 'Media-Gen AI — AI Video Agency for Advertising Reels',
    template: '%s | Media-Gen AI',
  },
  description: 'Media-Gen AI is an AI video agency that creates AI-generated advertising reels and short-form videos for Instagram and TikTok. Professional AI video production for brands, businesses, and creators.',
  keywords: [
    'AI video agency',
    'AI video production',
    'AI-generated advertising reels',
    'AI content creation',
    'AI video creators',
    'Instagram Reels',
    'TikTok videos',
    'AI reels studio',
    'AI видео агентство',
    'рилсы для бизнеса',
  ],
  authors: [{ name: 'Media-Gen AI', url: 'https://media-gen.ai' }],
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
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    alternateLocale: ['en_US', 'kk_KZ'],
    url: 'https://media-gen.ai',
    siteName: 'Media-Gen AI',
    title: 'Media-Gen AI — AI Video Agency',
    description: 'AI video agency specializing in AI-generated advertising reels for Instagram and TikTok.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Media-Gen AI - AI Video Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Media-Gen AI — AI Video Agency',
    description: 'AI video agency specializing in AI-generated advertising reels for Instagram and TikTok.',
    images: ['/og-image.png'],
  },
};

// JSON-LD Structured Data for AI/LLM SEO
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    // Organization Schema
    {
      '@type': 'Organization',
      '@id': 'https://media-gen.ai/#organization',
      'name': 'Media-Gen AI',
      'url': 'https://media-gen.ai',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://media-gen.ai/logo.png',
      },
      'sameAs': [
        'https://www.instagram.com/mediagenai/',
      ],
      'description': 'Media-Gen AI is an AI video agency that creates AI-generated advertising reels and short-form videos for brands, businesses, and creators.',
      'foundingDate': '2024',
      'areaServed': 'Worldwide',
      'knowsAbout': [
        'AI video production',
        'AI-generated advertising',
        'Instagram Reels',
        'TikTok videos',
        'Short-form video content',
        'AI content creation',
      ],
    },
    // WebSite Schema
    {
      '@type': 'WebSite',
      '@id': 'https://media-gen.ai/#website',
      'url': 'https://media-gen.ai',
      'name': 'Media-Gen AI',
      'description': 'AI video agency for advertising reels',
      'publisher': {
        '@id': 'https://media-gen.ai/#organization',
      },
      'inLanguage': ['ru', 'en', 'kk'],
    },
    // Service Schema - AI Video Production
    {
      '@type': 'Service',
      '@id': 'https://media-gen.ai/#service-video',
      'name': 'AI Video Production',
      'alternateName': 'AI Reels Creation',
      'provider': {
        '@id': 'https://media-gen.ai/#organization',
      },
      'serviceType': 'AI Video Production',
      'areaServed': 'Worldwide',
      'description': 'AI-generated advertising videos, reels, and short-form content for brands and businesses. Professional AI video production for Instagram and TikTok.',
      'offers': {
        '@type': 'Offer',
        'availability': 'https://schema.org/InStock',
      },
    },
    // Service Schema - AI Creators Platform
    {
      '@type': 'Service',
      '@id': 'https://media-gen.ai/#service-platform',
      'name': 'AI Creators Marketplace',
      'provider': {
        '@id': 'https://media-gen.ai/#organization',
      },
      'serviceType': 'AI Content Creation Platform',
      'description': 'Platform connecting businesses with AI video creators. Order AI-generated reels and videos directly from professional creators.',
    },
  ],
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

        {/* JSON-LD Structured Data for AI/LLM SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Theme initialization to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme')||'dark';document.documentElement.setAttribute('data-theme',t)})();`,
          }}
        />

        {/* Yandex.Metrika counter */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,'script','https://mc.yandex.ru/metrika/tag.js?id=106420383','ym');ym(106420383,'init',{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});`,
          }}
        />
      </head>
      <body className={inter.variable}>
        {/* Yandex.Metrika noscript */}
        <noscript>
          <div>
            <img src="https://mc.yandex.ru/watch/106420383" style={{ position: 'absolute', left: '-9999px' }} alt="" />
          </div>
        </noscript>
        {children}
      </body>
    </html>
  );
}
