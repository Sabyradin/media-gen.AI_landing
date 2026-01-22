import { NextRequest, NextResponse } from 'next/server';

interface ApplicationData {
    name: string;
    phone: string;
    message?: string;
    company?: string;
    portfolioLink?: string;
    sourceUrl?: string;
    formType: 'order' | 'creator';
}

async function sendTelegramMessage(text: string): Promise<boolean> {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
        console.error('Telegram credentials not configured');
        return false;
    }

    try {
        const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: text,
                parse_mode: 'Markdown',
            }),
        });

        if (!response.ok) {
            const error = await response.text();
            console.error('Telegram API error:', error);
            return false;
        }

        console.log('Telegram message sent successfully');
        return true;
    } catch (error) {
        console.error('Failed to send Telegram message:', error);
        return false;
    }
}

export async function POST(request: NextRequest) {
    try {
        const data: ApplicationData = await request.json();

        // Validate required fields
        if (!data.name || !data.phone || !data.formType) {
            return NextResponse.json(
                { ok: false, error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Build Telegram message based on form type
        let telegramMessage: string;
        const timestamp = new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Almaty' });

        if (data.formType === 'order') {
            telegramMessage = `📋 *Новая заявка на рилсы!*

👤 *Имя:* ${data.name}
🏢 *Компания:* ${data.company || '-'}
📱 *Телефон:* ${data.phone}

🕐 *Время:* ${timestamp}
🔗 *Источник:* ${data.sourceUrl || 'Сайт'}`;
        } else {
            telegramMessage = `🎨 *Новый AI-креатор!*

👤 *Имя:* ${data.name}
🔗 *Портфолио:* ${data.portfolioLink || '-'}
📱 *Телефон:* ${data.phone}

🕐 *Время:* ${timestamp}
🔗 *Источник:* ${data.sourceUrl || 'Сайт'}`;
        }

        // Send to Telegram (silent, fire and forget)
        // Don't await - we don't want to block the response
        sendTelegramMessage(telegramMessage).catch((err) => {
            console.error('Background Telegram send failed:', err);
        });

        // Return success immediately - client opens WhatsApp themselves
        return NextResponse.json({ ok: true });

    } catch (error) {
        console.error('Submit application error:', error);
        // Return success anyway - don't expose errors to client
        return NextResponse.json({ ok: true });
    }
}
