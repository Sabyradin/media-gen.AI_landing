'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations, useLocale } from 'next-intl';
import { z } from 'zod';
import { buildWhatsAppUrl, WHATSAPP_ORDER } from '@/lib/utils';
import styles from './OrderSimpleForm.module.css';

// Validation schema with strict rules
const orderFormSchema = z.object({
    name: z.string()
        .min(2, 'Минимум 2 символа')
        .max(40, 'Максимум 40 символов')
        .regex(/^[a-zA-Zа-яА-ЯёЁәіңғүұқөһӘІҢҒҮҰҚӨҺ\s\-]+$/, 'Только буквы, пробел и дефис'),
    companyInstagram: z.string()
        .min(2, 'Минимум 2 символа')
        .max(100, 'Максимум 100 символов'),
    phone: z.string()
        .regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, 'Формат: +7 (777) 777-77-77'),
});

type OrderFormData = z.infer<typeof orderFormSchema>;

// Phone mask helper
function formatPhoneNumber(value: string): string {
    // Remove all non-digits except +
    const digits = value.replace(/[^\d]/g, '');

    // Limit to 11 digits (7 + 10)
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

export default function OrderSimpleForm() {
    const t = useTranslations('forms');
    const locale = useLocale();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<OrderFormData>({
        resolver: zodResolver(orderFormSchema),
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

    const onSubmit = async (data: OrderFormData) => {
        setIsSubmitting(true);

        try {
            // 1. Send to server (for Telegram notification)
            await fetch('/api/submit-application', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: data.name,
                    company: data.companyInstagram,
                    phone: data.phone,
                    formType: 'order',
                    sourceUrl: typeof window !== 'undefined' ? window.location.href : '',
                }),
            });

            // 2. Build WhatsApp message
            const messages: Record<string, string> = {
                ru: `*Новая заявка на рилсы!*\n\nИмя: ${data.name}\nКомпания: ${data.companyInstagram}\nТелефон: ${data.phone}`,
                kk: `*Рилсқа жаңа өтінім!*\n\nАты: ${data.name}\nКомпания: ${data.companyInstagram}\nТелефон: ${data.phone}`,
                en: `*New Reels request!*\n\nName: ${data.name}\nCompany: ${data.companyInstagram}\nPhone: ${data.phone}`,
            };

            const message = messages[locale] || messages.ru;
            const whatsappUrl = buildWhatsAppUrl(message, WHATSAPP_ORDER);

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
                <label htmlFor="name" className="label">{t('orderSimple.name')}</label>
                <input
                    id="name"
                    type="text"
                    className="input"
                    placeholder={t('orderSimple.namePlaceholder')}
                    maxLength={40}
                    {...register('name')}
                    onChange={handleNameChange}
                />
                {errors.name && <span className={styles.error}>{errors.name.message}</span>}
            </div>

            <div className={styles.field}>
                <label htmlFor="companyInstagram" className="label">{t('orderSimple.company')}</label>
                <input
                    id="companyInstagram"
                    type="text"
                    className="input"
                    placeholder={t('orderSimple.companyPlaceholder')}
                    maxLength={100}
                    {...register('companyInstagram')}
                />
                {errors.companyInstagram && <span className={styles.error}>{errors.companyInstagram.message}</span>}
            </div>

            <div className={styles.field}>
                <label htmlFor="phone" className="label">{t('orderSimple.phone')}</label>
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
                {isSubmitting ? t('submitting') : t('orderSimple.submit')}
            </button>
        </form>
    );
}
