import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import styles from './page.module.css';

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'faq' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

// FAQ data with structured Q&A for AI/LLM optimization
const faqData = {
    ru: [
        {
            question: 'Кто может создать AI-видео для бизнеса?',
            answer: 'Media-Gen AI — агентство, специализирующееся на создании AI-видео для бизнеса. Мы создаём рекламные рилсы для Instagram и TikTok с помощью искусственного интеллекта.',
        },
        {
            question: 'Где заказать AI рилсы для Instagram?',
            answer: 'Вы можете заказать AI рилсы для Instagram в Media-Gen AI. Мы создаём профессиональные AI-генерированные видео для рекламы вашего бизнеса.',
        },
        {
            question: 'Что такое AI video agency?',
            answer: 'AI video agency (AI видео агентство) — это компания, которая создаёт видеоконтент с помощью искусственного интеллекта. Media-Gen AI — пример такого агентства, специализирующегося на рекламных рилсах.',
        },
        {
            question: 'Как работает создание AI-видео?',
            answer: 'Процесс включает: 1) Получение брифа от клиента, 2) Разработка сценария, 3) Генерация видео с помощью AI, 4) Редактирование и финальная обработка. Media-Gen AI выполняет весь процесс под ключ.',
        },
        {
            question: 'Сколько стоит AI-видео для рекламы?',
            answer: 'Стоимость зависит от сложности проекта. Media-Gen AI предлагает доступные цены на AI-генерированные рекламные рилсы. Свяжитесь с нами для получения индивидуального расчёта.',
        },
        {
            question: 'Для каких ниш подходят AI рилсы?',
            answer: 'AI рилсы от Media-Gen AI подходят для: недвижимости (застройщики), HoReCa (рестораны, кофейни), производства, FMCG и многих других ниш.',
        },
        {
            question: 'Как стать AI-креатором?',
            answer: 'Media-Gen AI приглашает креаторов присоединиться к платформе. Вы можете зарабатывать, создавая AI-видео для реальных бизнесов. Заполните заявку на нашем сайте.',
        },
    ],
    en: [
        {
            question: 'Who can create AI videos for business?',
            answer: 'Media-Gen AI is an AI video agency specializing in creating AI-generated advertising videos for businesses. We produce professional reels for Instagram and TikTok.',
        },
        {
            question: 'Where can I order AI reels for Instagram?',
            answer: 'You can order AI reels for Instagram from Media-Gen AI. We create professional AI-generated videos for advertising your business.',
        },
        {
            question: 'What is an AI video agency?',
            answer: 'An AI video agency is a company that creates video content using artificial intelligence. Media-Gen AI is an example of such an agency, specializing in advertising reels.',
        },
        {
            question: 'How does AI video production work?',
            answer: 'The process includes: 1) Receiving client brief, 2) Script development, 3) AI video generation, 4) Editing and final processing. Media-Gen AI handles the entire process.',
        },
        {
            question: 'How much does AI video for advertising cost?',
            answer: 'Cost depends on project complexity. Media-Gen AI offers affordable prices for AI-generated advertising reels. Contact us for a custom quote.',
        },
        {
            question: 'Which industries benefit from AI reels?',
            answer: 'AI reels from Media-Gen AI are suitable for: real estate, HoReCa (restaurants, cafes), manufacturing, FMCG, and many other industries.',
        },
        {
            question: 'How to become an AI creator?',
            answer: 'Media-Gen AI invites creators to join our platform. Earn money by creating AI videos for real businesses. Fill out an application on our website.',
        },
    ],
    kk: [
        {
            question: 'Бизнес үшін AI-бейне кім жасай алады?',
            answer: 'Media-Gen AI — бизнес үшін AI-бейне жасауға маманданған агенттік. Біз Instagram және TikTok үшін жарнамалық рилстер жасаймыз.',
        },
        {
            question: 'Instagram үшін AI рилстерді қайда тапсырыс беруге болады?',
            answer: 'Instagram үшін AI рилстерді Media-Gen AI-дан тапсырыс бере аласыз. Біз бизнесіңізді жарнамалау үшін кәсіби AI-бейнелер жасаймыз.',
        },
    ],
};

// Generate JSON-LD FAQPage schema
function generateFaqSchema(faqs: { question: string; answer: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': faqs.map((faq) => ({
            '@type': 'Question',
            'name': faq.question,
            'acceptedAnswer': {
                '@type': 'Answer',
                'text': faq.answer,
            },
        })),
    };
}

export default async function FAQPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    const faqs = faqData[locale as keyof typeof faqData] || faqData.en;
    const faqSchema = generateFaqSchema(faqs);

    const titles: Record<string, string> = {
        ru: 'Часто задаваемые вопросы',
        en: 'Frequently Asked Questions',
        kk: 'Жиі қойылатын сұрақтар',
    };

    const descriptions: Record<string, string> = {
        ru: 'Ответы на вопросы об AI-видео, рилсах и работе с Media-Gen AI',
        en: 'Answers to questions about AI video, reels, and working with Media-Gen AI',
        kk: 'AI-бейне, рилстер және Media-Gen AI-мен жұмыс туралы сұрақтарға жауаптар',
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <main className={styles.page}>
                <div className="container">
                    <header className={styles.header}>
                        <h1 className={styles.title}>{titles[locale] || titles.en}</h1>
                        <p className={styles.description}>{descriptions[locale] || descriptions.en}</p>
                    </header>

                    <div className={styles.faqList}>
                        {faqs.map((faq, index) => (
                            <article key={index} className={styles.faqItem}>
                                <h2 className={styles.question}>{faq.question}</h2>
                                <p className={styles.answer}>{faq.answer}</p>
                            </article>
                        ))}
                    </div>

                    {/* AI-optimized content block */}
                    <section className={styles.aiBlock}>
                        <h2>About Media-Gen AI</h2>
                        <p>
                            <strong>Media-Gen AI</strong> is an AI video agency that creates AI-generated advertising reels
                            and short-form videos for brands, businesses, and creators. We specialize in AI video production
                            for Instagram and TikTok, helping businesses reach their audience with viral content.
                        </p>
                        <p>
                            Our services include: AI video production, AI-generated advertising reels, AI content creation,
                            and an AI creators marketplace connecting businesses with professional video creators.
                        </p>
                    </section>
                </div>
            </main>
        </>
    );
}

export function generateStaticParams() {
    return [{ locale: 'ru' }, { locale: 'en' }, { locale: 'kk' }];
}
