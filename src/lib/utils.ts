// WhatsApp numbers for different forms
export const WHATSAPP_ORDER = '77069063535';  // For ordering advertising reels
export const WHATSAPP_CREATOR = '77478423632'; // For AI creator applications
export const WHATSAPP_NUMBER = WHATSAPP_ORDER; // Default (used in footer/contacts)

export const INSTAGRAM_HANDLE = 'mediagenai';
export const INSTAGRAM_URL = 'https://www.instagram.com/mediagenai/';
export const SITE_URL = 'https://media-gen.ai';

export function buildWhatsAppUrl(message: string, number?: string): string {
    const phoneNumber = number || WHATSAPP_ORDER;
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}

export function extractReelId(url: string): string | null {
    const match = url.match(/\/reel\/([A-Za-z0-9_-]+)/);
    return match ? match[1] : null;
}

export function getInstagramEmbedUrl(reelUrl: string): string {
    return `${reelUrl}embed/`;
}
