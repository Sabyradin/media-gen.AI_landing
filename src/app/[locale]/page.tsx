import { setRequestLocale } from 'next-intl/server';
import {
    Hero,
    BusinessBlock,
    CreatorBlock,
    PlatformPreview,
    PortfolioPreview,
    ReviewsPreview,
} from '@/components/sections';

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <>
            <Hero />
            <PortfolioPreview />
            <BusinessBlock />
            <CreatorBlock />
            <ReviewsPreview />
            <PlatformPreview />
        </>
    );
}

