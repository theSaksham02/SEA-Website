export const HACKATHON_EVENT_NAME = 'SEA Hacks 2026';

export const HACKATHON_START = '2026-10-23T16:30:00+04:00';
export const HACKATHON_END = '2026-10-24T20:00:00+04:00';

export const PAGE_TITLE = 'SEA Hacks 2026 — Build to Pitch Hackathon | SEA UoBD';
export const PAGE_DESCRIPTION =
    'SEA Hacks 2026 is a free 24-hour build-to-pitch hackathon at the University of Birmingham Dubai, 23–24 October. Open to students from any UAE university. AED 8,000+ in awards.';

export const HERO = {
    eyebrow: 'SEA / HACKATHON 2026',
    title: 'SEA HACKS',
    year: '2026',
    subhead: 'Build to Pitch. 24 hours to build a working product and pitch it to industry judges.',
    facts: [
        { label: 'When', value: 'Fri 23 Oct, 16:30 – Sat 24 Oct, 20:00' },
        { label: 'Where', value: 'University of Birmingham Dubai, DIAC' },
        { label: 'Who', value: 'Students from any UAE university, solo or teams of 3–5' },
        { label: 'Entry', value: 'Free' },
    ],
};

export const TICKER =
    'AED 8,000+ IN AWARDS ✦ FREE ENTRY ✦ ALL UAE UNIVERSITIES ✦ AI TOOLS ALLOWED ✦ FREE PIZZA & DRINKS ✦ INTERNSHIP OPPORTUNITIES ✦';

// TODO-SEA: confirm open tracks (e.g. Core CS / FinTech / HealthTech), or remove the Open build card.
// TODO-SEA: confirm IntevaAI prize figures (AED 2,000 / AED 1,000).
// TODO-SEA: add the noon challenge and prize.
export const TRACKS = [
    {
        number: '01',
        title: 'Open build',
        by: null,
        body: 'Bring your own idea. Any problem worth solving.',
        prize: null,
    },
    {
        number: '02',
        title: 'Education Bounty: Early Support Agent',
        by: 'IntevaAI × ChatQLM',
        body: 'Build an AI agent that spots students who need support early, explains why with evidence, drafts a support plan and coordinates follow-up after teacher approval. Built on Inteva Nexus.',
        prize: 'AED 2,000 winner, AED 1,000 runner-up.',
    },
    {
        number: '03',
        title: 'Robotics Bounty',
        by: 'SkyTrack',
        body: 'Build on the SkyTrack platform. Projects are shared as “Built with SkyTrack” and judged online.',
        prize: 'Winning team gets 1 month of SkyTrack access.',
    },
    {
        number: '04',
        title: 'Noon Bounty',
        by: 'noon',
        body: 'Challenge details are shared at kickoff.',
        prize: null,
    },
];

export const TRACKS_NOTE = 'Full problem statements are shared at kickoff.';

export const SCHEDULE = [
    {
        day: 'Friday',
        date: '23 Oct',
        rows: [
            { time: '16:30', label: 'Arrival & check-in' },
            { time: '17:00', label: 'Opening & panel — Harvard Lecture Theatre' },
            { time: '19:00', label: 'Hacking starts — Library' },
            { time: '21:30', label: 'Campus closes, hacking continues online' },
        ],
    },
    {
        day: 'Saturday',
        date: '24 Oct',
        rows: [
            { time: '09:30', label: 'Back on site — Library' },
            { time: '10:30', label: 'Mentoring — Room 1405' },
            { time: '11:30–17:30', label: 'Hacking' },
            { time: '18:00', label: 'Judging & pitches — Rooms 1405 / 1410' },
            { time: '19:30', label: 'Results & awards' },
        ],
    },
];

// TODO-SEA: confirm the awards breakdown before going live.
export const AWARDS = {
    total: 'AED 8,000+',
    rows: [
        { label: 'Merch from Odoo Tech Club & noon', value: 'AED 1K' },
        { label: 'Free credits for 1 month + Max subscriptions', value: 'AED 4K' },
        { label: 'Cash prizes on bounty challenges', value: 'AED 3K+' },
        { label: 'Internship opportunities', value: 'Open' },
    ],
};

export const PLATFORMS = [
    { name: 'Klui', detail: 'Credits' },
    { name: 'SkyTrack', detail: 'Robotics platform' },
    { name: 'Inteva Nexus', detail: 'AI models via an OpenAI-compatible API, both days' },
    { name: 'AI coding tools', detail: 'Allowed for all teams' },
];

export const PARTNER_TIERS = [
    {
        tier: 'Lead Partner',
        partners: [{ name: 'Klui', logo: '/partners/hackathon/klui.png', url: 'https://klui.ai', dark: true, lead: true }],
    },
    {
        tier: 'Hackathon & Bounty Partner',
        partners: [{ name: 'SkyTrack', logo: '/partners/hackathon/skytrack.png', url: 'https://getskytrack.com/', dark: true }],
    },
    {
        tier: 'Bounty Partner',
        partners: [{ name: 'noon', logo: '/partners/hackathon/noon.png',url: 'https://www.noon.com', dark: false }],
    },
    {
        tier: 'Partners',
        partners: [
            { name: 'IntevaAI', logo: '/partners/hackathon/inteva.png',url: 'https://www.inteva.ai/', dark: false },
            { name: 'ChatQLM', logo: '/partners/hackathon/chatqlm.png', url: 'https://www.chatqlm.com/', dark: true },
            { name: 'ArcScale Labs', logo: '/partners/hackathon/arcscale.png', url: 'https://arcscalelabs.com/', dark: true },
            { name: 'Rabbitron Labs', logo: '/partners/hackathon/rabbitron.png', url: 'https://www.rabbitronlab.com/', dark: false },
        ],
    },
    {
        tier: 'Student Partners',
        partners: [
            { name: 'Odoo Tech Club', logo: '/partners/hackathon/odoo-tech-club.png',url: null, dark: false },
            { name: 'Biomedical Science Society', logo: '/partners/hackathon/bss.png', url: null, dark: true },
        ],
    },
    {
        tier: 'Host',
        partners: [{ name: 'University of Birmingham Dubai', logo: '/partners/hackathon/uobd.png', url: null, dark: true }],
    },
];

export const PARTNER_LOGOS = PARTNER_TIERS.flatMap((tier) => tier.partners);

// TODO-SEA: add other judges and mentors.
export const SPEAKERS = [
    {
        name: 'Arockiaraj Arockiam',
        role: 'Founder & CEO, IntevaAI',
        detail: 'Friday panel and Saturday judge.',
    },
];

export const VENUE = {
    rooms: [
        { place: 'Harvard Lecture Theatre', use: 'Opening' },
        { place: 'Klui Hacking Lounge, Library First Floor', use: 'Hacking' },
        { place: 'Rooms 1405 / 1410', use: 'Mentoring and pitches' },
        { place: 'Main Auditorium', use: 'Awards, TBC' },
    ],
    bring: ['Laptop', 'Charger', 'University ID'],
    note: 'Campus closes at 21:30 on Friday. Hacking continues online overnight. Free pizza and soft drinks.',
};

export const RULES = [
    'Teams of 3–5, or join solo and get matched.',
    'AI coding tools are allowed.',
    'Pre-existing code is allowed. Declare it.',
    'Students own their code and IP. Partners get no automatic equity or licensing rights.',
    'Wear your badge on campus at all times.',
];

export const FAQ = [
    { q: 'Do I need a team?', a: 'No. Register solo and we’ll match you on the night.' },
    { q: 'Do I need to code?', a: 'No. AI tools are allowed. Designers, business and science students are welcome.' },
    { q: 'What will we build?', a: 'Your own idea or a partner bounty. Full problem statements are shared at kickoff.' },
    { q: 'Is it free?', a: 'Yes, including food and drinks.' },
    { q: 'Who can join?', a: 'Students from any UAE university, with a valid university ID.' },
    { q: 'Do I stay overnight?', a: 'No. Campus closes at 21:30 and you continue online.' },
    { q: 'Who owns what I build?', a: 'You do.' },
];

export const PARTICIPATION_OPTIONS = ['Solo', 'Team'];
export const TRACK_OPTIONS = ['Open', 'Education Bounty', 'Robotics', 'noon', 'Not sure'];
