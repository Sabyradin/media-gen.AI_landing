export const WHATSAPP_NUMBER = '77478423632';
export const INSTAGRAM_HANDLE = 'mediagenai';
export const INSTAGRAM_URL = 'https://www.instagram.com/mediagenai/';
export const SITE_URL = 'https://media-gen.ai';

export function buildWhatsAppUrl(message: string): string {
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

export function extractReelId(url: string): string | null {
    const match = url.match(/\/reel\/([A-Za-z0-9_-]+)/);
    return match ? match[1] : null;
}

export function getInstagramEmbedUrl(reelUrl: string): string {
    return `${reelUrl}embed/`;
}
