'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations, useLocale } from 'next-intl';
import { z } from 'zod';
import { buildWhatsAppUrl, WHATSAPP_CREATOR } from '@/lib/utils';
import styles from './OrderSimpleForm.module.css';

// Validation schema with strict rules
const creatorFormSchema = z.object({
    name: z.string()
        .min(2, 'Минимум 2 символа')
        .max(40, 'Максимум 40 символов')
        .regex(/^[a-zA-Zа-яА-ЯёЁәіңғүұқөһӘІҢҒҮҰҚӨҺ\s\-]+$/, 'Только буквы, пробел и дефис'),
    portfolioLink: z.string()
        .min(2, 'Минимум 2 символа')
        .max(200, 'Максимум 200 символов'),
    phone: z.string()
        .regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, 'Формат: +7 (777) 777-77-77'),
});

type CreatorFormData = z.infer<typeof creatorFormSchema>;

// Phone mask helper
function formatPhoneNumber(value: string): string {
    const digits = value.replace(/[^\d]/g, '');
    const limited = digits.slice(0, 11);

    if (limited.length === 0) return '+7 (';
    if (limited.length <= 1) return `+7 (`;
    if (limited.length <= 4) return `+7 (${limited.slice(1)}`;
    if (limited.length <= 7) return `+7 (${limited.slice(1, 4)}) ${limited.slice(4)}`;
    if (limited.length <= 9) return `+7 (${limited.slice(1, 4)}) ${limited.slice(4, 7)}-${limited.slice(7)}`;
    return `+7 (${limited.slice(1, 4)}) ${limited.slice(4, 7)}-${limited.slice(7, 9)}-${limited.slice(9, 11)}`;
}

// Name filter - only letters, space and hyphen
function filterName(value: string): string {
    return value.replace(/[^a-zA-Zа-яА-ЯёЁәіңғүұқөһӘІҢҒҮҰҚӨҺ\s\-]/g, '').slice(0, 40);
}

export default function CreatorForm() {
    const t = useTranslations('forms');
    const locale = useLocale();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<CreatorFormData>({
        resolver: zodResolver(creatorFormSchema),
        defaultValues: {
            phone: '+7 (',
        },
    });

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatPhoneNumber(e.target.value);
        setValue('phone', formatted);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const filtered = filterName(e.target.value);
        setValue('name', filtered);
    };

    const onSubmit = async (data: CreatorFormData) => {
        setIsSubmitting(true);

        try {
            // 1. Send to server (for Telegram notification)
            await fetch('/api/submit-application', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: data.name,
                    portfolioLink: data.portfolioLink,
                    phone: data.phone,
                    formType: 'creator',
                    sourceUrl: typeof window !== 'undefined' ? window.location.href : '',
                }),
            });

            // 2. Build WhatsApp message
            const messages: Record<string, string> = {
                ru: `*Новый AI-креатор!*\n\nИмя: ${data.name}\nПортфолио: ${data.portfolioLink}\nТелефон: ${data.phone}`,
                kk: `*Жаңа AI-креатор!*\n\nАты: ${data.name}\nПортфолио: ${data.portfolioLink}\nТелефон: ${data.phone}`,
                en: `*New AI Creator!*\n\nName: ${data.name}\nPortfolio: ${data.portfolioLink}\nPhone: ${data.phone}`,
            };

            const message = messages[locale] || messages.ru;
            const whatsappUrl = buildWhatsAppUrl(message, WHATSAPP_CREATOR);

            setIsSuccess(true);

            setTimeout(() => {
                window.open(whatsappUrl, '_blank');
            }, 1500);

        } catch (error) {
            console.error('Form submission error:', error);
            setIsSuccess(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className={styles.success}>
                <div className={styles.successIcon}>✓</div>
                <p>{t('success')}</p>
                <a href={`/${locale}`} className="btn btn-secondary" style={{ marginTop: '16px' }}>
                    {locale === 'ru' ? 'На главную' : locale === 'kk' ? 'Басты бетке' : 'Back to Home'}
                </a>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.field}>
                <label htmlFor="name" className="label">{t('creator.name')}</label>
                <input
                    id="name"
                    type="text"
                    className="input"
                    placeholder={t('creator.namePlaceholder')}
                    maxLength={40}
                    {...register('name')}
                    onChange={handleNameChange}
                />
                {errors.name && <span className={styles.error}>{errors.name.message}</span>}
            </div>

            <div className={styles.field}>
                <label htmlFor="portfolioLink" className="label">{t('creator.portfolio')}</label>
                <input
                    id="portfolioLink"
                    type="text"
                    className="input"
                    placeholder={t('creator.portfolioPlaceholder')}
                    maxLength={200}
                    {...register('portfolioLink')}
                />
                {errors.portfolioLink && <span className={styles.error}>{errors.portfolioLink.message}</span>}
            </div>

            <div className={styles.field}>
                <label htmlFor="phone" className="label">{t('creator.phone')}</label>
                <input
                    id="phone"
                    type="tel"
                    className="input"
                    placeholder="+7 (___) ___-__-__"
                    {...register('phone')}
                    onChange={handlePhoneChange}
                />
                {errors.phone && <span className={styles.error}>{errors.phone.message}</span>}
            </div>

            <button
                type="submit"
                className="btn btn-primary btn-lg"
                disabled={isSubmitting}
                style={{ width: '100%' }}
            >
                {isSubmitting ? t('submitting') : t('creator.submit')}
            </button>
        </form>
    );
}
