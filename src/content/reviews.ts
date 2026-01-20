export interface Review {
    id: string;
    name: string;
    company: string;
    text: {
        ru: string;
        kk: string;
        en: string;
    };
    avatar?: string;
}

// Placeholder reviews - to be replaced with real ones from Amikhan
export const reviews: Review[] = [
    {
        id: 'review-1',
        name: 'Александр К.',
        company: 'Строительная компания',
        text: {
            ru: 'Отличная работа! Рилсы привлекли много новых клиентов.',
            kk: 'Керемет жұмыс! Рилстер көптеген жаңа клиенттерді тартты.',
            en: 'Great work! The reels attracted many new clients.',
        },
    },
    {
        id: 'review-2',
        name: 'Мария С.',
        company: 'Ресторан "Вкус"',
        text: {
            ru: 'Быстро, качественно и креативно. Рекомендуем!',
            kk: 'Жылдам, сапалы және креативті. Ұсынамыз!',
            en: 'Fast, high-quality, and creative. Highly recommend!',
        },
    },
    {
        id: 'review-3',
        name: 'Дмитрий П.',
        company: 'Производство \"Восток\"',
        text: {
            ru: 'Media-Gen AI помогли нам выйти на новый уровень продвижения.',
            kk: 'Media-Gen AI бізге жаңа деңгейдегі жылжытуға көтерілуге көмектесті.',
            en: 'Media-Gen AI helped us reach a new level of promotion.',
        },
    },
    {
        id: 'review-4',
        name: 'Айгуль Т.',
        company: 'Сеть кофеен "Арома"',
        text: {
            ru: 'Невероятный результат! За месяц наш Instagram вырос в 3 раза.',
            kk: 'Керемет нәтиже! Бір айда біздің Instagram 3 есе өсті.',
            en: 'Incredible results! Our Instagram grew 3x in one month.',
        },
    },
    {
        id: 'review-5',
        name: 'Олег Н.',
        company: 'ЖК "Премиум Резиденс"',
        text: {
            ru: 'Профессионалы своего дела. Все сроки соблюдены, качество на высоте.',
            kk: 'Өз ісінің профессионалдары. Барлық мерзімдер сақталды, сапасы жоғары.',
            en: 'True professionals. All deadlines met, quality is top-notch.',
        },
    },
];
