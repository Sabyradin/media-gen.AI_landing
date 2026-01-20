'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations, useLocale } from 'next-intl';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { creatorSchema, type CreatorFormData } from '@/lib/schemas';
import { buildWhatsAppUrl } from '@/lib/utils';
import styles from './OrderSimpleForm.module.css';

export default function CreatorForm() {
    const t = useTranslations('forms');
    const locale = useLocale();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const captchaRef = useRef<HCaptcha>(null);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<CreatorFormData>({
        resolver: zodResolver(creatorSchema),
    });

    const onCaptchaVerify = (token: string) => {
        setValue('captchaToken', token);
    };

    const onSubmit = async (data: CreatorFormData) => {
        setIsSubmitting(true);

        try {
            // Build WhatsApp message
            const messages: Record<string, string> = {
                ru: `🎨 Новый AI-креатор!\n\n👤 Имя: ${data.name}\n🔗 Портфолио: ${data.portfolioLink}\n📱 Телефон: ${data.phone}`,
                kk: `🎨 Жаңа AI-креатор!\n\n👤 Аты: ${data.name}\n🔗 Портфолио: ${data.portfolioLink}\n📱 Телефон: ${data.phone}`,
                en: `🎨 New AI Creator!\n\n👤 Name: ${data.name}\n🔗 Portfolio: ${data.portfolioLink}\n📱 Phone: ${data.phone}`,
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
                    {...register('name')}
                />
                {errors.name && <span className={styles.error}>{errors.name.message}</span>}
            </div>

            <div className={styles.field}>
                <label htmlFor="portfolioLink" className="label">{t('creator.portfolio')}</label>
                <input
                    id="portfolioLink"
                    type="url"
                    className="input"
                    placeholder={t('creator.portfolioPlaceholder')}
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
                    placeholder={t('creator.phonePlaceholder')}
                    {...register('phone')}
                />
                {errors.phone && <span className={styles.error}>{errors.phone.message}</span>}
            </div>

            <div className={styles.captcha}>
                <HCaptcha
                    sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || '10000000-ffff-ffff-ffff-000000000001'}
                    onVerify={onCaptchaVerify}
                    ref={captchaRef}
                    theme="dark"
                />
                {errors.captchaToken && <span className={styles.error}>{errors.captchaToken.message}</span>}
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
