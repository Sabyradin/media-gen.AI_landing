'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations, useLocale } from 'next-intl';
import { z } from 'zod';
import { buildWhatsAppUrl } from '@/lib/utils';
import styles from './OrderSimpleForm.module.css';

// Simplified schema without captcha
const orderFormSchema = z.object({
    name: z.string().min(2, 'Введите имя'),
    companyInstagram: z.string().min(2, 'Введите название компании'),
    phone: z.string().min(10, 'Введите телефон'),
});

type OrderFormData = z.infer<typeof orderFormSchema>;

export default function OrderSimpleForm() {
    const t = useTranslations('forms');
    const locale = useLocale();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<OrderFormData>({
        resolver: zodResolver(orderFormSchema),
    });

    const onSubmit = async (data: OrderFormData) => {
        setIsSubmitting(true);

        try {
            // Build WhatsApp message
            const messages: Record<string, string> = {
                ru: `*Новая заявка на рилсы!*\n\nИмя: ${data.name}\nКомпания: ${data.companyInstagram}\nТелефон: ${data.phone}`,
                kk: `*Рилсқа жаңа өтінім!*\n\nАты: ${data.name}\nКомпания: ${data.companyInstagram}\nТелефон: ${data.phone}`,
                en: `*New Reels request!*\n\nName: ${data.name}\nCompany: ${data.companyInstagram}\nPhone: ${data.phone}`,
            };

            const message = messages[locale] || messages.ru;
            const whatsappUrl = buildWhatsAppUrl(message);

            setIsSuccess(true);

            // Redirect to WhatsApp after short delay
            setTimeout(() => {
                window.open(whatsappUrl, '_blank');
            }, 1500);

        } catch (error) {
            console.error('Form submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className={styles.success}>
                <div className={styles.successIcon}>✓</div>
                <p>{t('success')}</p>
                <a href={`/${locale}`} className="btn btn-secondary" style={{ marginTop: '1.5rem' }}>
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
                    {...register('name')}
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
                    placeholder={t('orderSimple.phonePlaceholder')}
                    {...register('phone')}
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
