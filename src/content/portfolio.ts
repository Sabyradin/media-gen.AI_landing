export type PortfolioCategory = 'real_estate' | 'horeca' | 'manufacturing' | 'fmcg' | 'other';

export interface PortfolioItem {
    id: string;
    url: string;
    category: PortfolioCategory;
    title: {
        ru: string;
        kk: string;
        en: string;
    };
}

export const portfolioItems: PortfolioItem[] = [
    {
        id: 'reel-1',
        url: 'https://www.instagram.com/reel/DS2Bb17DcEW/',
        category: 'real_estate',
        title: {
            ru: 'Санаторий Saryagash Thermal Resort',
            kk: 'Saryagash Thermal Resort Шипажайы',
            en: 'Saryagash Thermal Resort',
        },
    },
    {
        id: 'reel-2',
        url: 'https://www.instagram.com/reel/DSswz8BDQ3z/',
        category: 'horeca',
        title: {
            ru: 'Джон Хэмм одобряет наш продукт',
            kk: 'Джон Хамм біздің өнімді мақұлдайды  ',
            en: 'John Hamm approves of our product  ',
        },
    },
    {
        id: 'reel-3',
        url: 'https://www.instagram.com/reel/DSsm8E_DTdi/',
        category: 'manufacturing',
        title: {
            ru: 'Компания по 3D моделированию - Nebula XR',
            kk: '3D модельдеу компаниясы-Nebula XR',
            en: '3D modeling company - Nebula XR',
        },
    },
    {
        id: 'reel-4',
        url: 'https://www.instagram.com/reel/DSsHLFYjali/',
        category: 'real_estate',
        title: {
            ru: 'Rise group новый жилой квартал',
            kk: 'Rise group жаңа тұрғын үй ауданы',
            en: 'Rise group new residential quarter',
        },
    },
    {
        id: 'reel-5',
        url: 'https://www.instagram.com/reel/DSmbgh7jc9O/',
        category: 'fmcg',
        title: {
            ru: 'Бренд товаров повседневного спроса',
            kk: 'Күнделікті тұтыну тауарлары бренді',
            en: 'FMCG brand campaign',
        },
    },
    {
        id: 'reel-6',
        url: 'https://www.instagram.com/reel/DSkaUJgDQ-k/',
        category: 'horeca',
        title: {
            ru: 'Кофейня в центре города',
            kk: 'Қала орталығындағы кофехана',
            en: 'Downtown coffee shop',
        },
    },
    {
        id: 'reel-7',
        url: 'https://www.instagram.com/reel/DSkZj6RDTjJ/',
        category: 'manufacturing',
        title: {
            ru: 'Rise group',
            kk: 'Rise group',
            en: 'Rise group',
        },
    },
    {
        id: 'reel-8',
        url: 'https://www.instagram.com/reel/DSXCJqBDVid/',
        category: 'real_estate',
        title: {
            ru: 'Коммерческая недвижимость',
            kk: 'Коммерциялық жылжымайтын мүлік',
            en: 'Commercial real estate',
        },
    },
    {
        id: 'reel-9',
        url: 'https://www.instagram.com/reel/DSW-lrYjb6J/',
        category: 'other',
        title: {
            ru: 'Креативная реклама',
            kk: 'Креативті жарнама',
            en: 'Creative advertising',
        },
    },
    {
        id: 'reel-10',
        url: 'https://www.instagram.com/reel/DSXEqC4DaT1/',
        category: 'fmcg',
        title: {
            ru: 'Master Coffee ',
            kk: 'Master Coffee ',
            en: 'Master Coffee ',
        },
    },
];

export const categories: Array<'all' | PortfolioCategory> = [
    'all',
    'real_estate',
    'horeca',
    'manufacturing',
    'fmcg',
    'other',
];
