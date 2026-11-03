// Partner events: shown first in the home hero carousel and as detailed rows in
// the Events section. Each hero slide hides itself after `endDate` (absolute time,
// Asia/Dubai offset), so nothing needs editing once an event is over.
// Order here = order in the carousel.
export const heroEvents = [
    {
        id: "revive-me-2026",
        name: "Revive ME",
        title: "REVIVE ME 2026",
        subtitle: "Global Longevity & Health Tech Summit",
        description: "Rejuvenate. Restore. Revive. Two days on longevity and health tech, where the future of health starts now.",
        dateLabel: "11–12 NOV 2026",
        location: "ADNEC Hall 5, Abu Dhabi",
        badge: "SEA · Official Community Partner",
        nextEventLabel: "REVIVE ME · 11–12 NOV",
        ariaLabel: "Revive ME 2026, 11–12 November, ADNEC Hall 5, Abu Dhabi",
        image: "/hero-images/events/revive-me.jpg",
        endDate: "2026-11-12T23:59:59+04:00",
        volunteerUrl: "REVIVE_VOLUNTEER_URL", // TODO: SEA to provide (Google Form). Volunteer button stays hidden until set.
        ticketsUrl: "https://revivemeexpo.com/register?tab=delegate",
        note: "SEA members: ask in the SEA WhatsApp for a free visitor pass.",
    },
    {
        id: "doers-summit-2026",
        name: "Doers Summit",
        title: "DOERS SUMMIT DUBAI",
        subtitle: "Founders, investors, operators & decision-makers",
        description: "Founders, investors, operators and corporate decision-makers from Europe, the GCC, Asia and the Global South, there to forge partnerships, raise capital and scale. By The Doers Company, with strategic partner Dubai Silicon Oasis.",
        dateLabel: "25–26 NOV 2026",
        location: "Dubai Digital Park, Dubai Silicon Oasis",
        badge: "SEA · Official Community Partner",
        nextEventLabel: "DOERS SUMMIT · 25–26 NOV",
        ariaLabel: "Doers Summit Dubai, 25–26 November, Dubai Digital Park, Dubai Silicon Oasis",
        image: "/hero-images/events/doers-summit.jpg",
        endDate: "2026-11-26T23:59:59+04:00",
        volunteerUrl: "https://docs.google.com/forms/d/e/1FAIpQLSeGqq3adxA1AkvpQYiCb82OzTpDCVKKdGtfpuYOJ_7-8U-yew/viewform",
        volunteerNote: "Volunteer by 7 Nov",
        ticketsUrl: "https://doerssummit.com/tickets",
        promoCode: "DS26SEA",
        note: "Free Doer Pass with code DS26SEA (100 passes, first come, first served).",
    },
];

export const getActiveHeroEvents = (now = Date.now()) =>
    heroEvents.filter(event => new Date(event.endDate).getTime() > now);

// Placeholder URLs (e.g. "REVIVE_VOLUNTEER_URL") are treated as "not set yet".
export const hasRealUrl = (url) => typeof url === 'string' && /^https?:\/\//.test(url);
