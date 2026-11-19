export const COHORT = {
    name: 'B-Labs Cohort 3',
    tagline: 'Six hands-on sessions that take student teams from a problem worth solving to a pitch investors will read.',
    startups: 10,
    window: '27 Oct – 23 Nov 2026',
    audience: 'Open to all UoB Dubai students · Compulsory for Cohort 3 startups · Certificate for every session',
};

export const IMAGE_BASE = '/blabs/cohort3';
export const INSTAGRAM_URL = 'https://www.instagram.com/sea_uobd/';

// Photo hints: `size` is the full file's pixel size for landscape shots; portrait
// shots omit it (all 1200×1600). Thumbs are 640 px on the long edge. `pos` is the
// object-position used when a tile crops the photo, chosen so faces stay in frame.
export const SESSIONS = [
    {
        n: 1, slug: 'problem-validation',
        date: '2026-10-27', dateLabel: 'Tue 27 Oct',
        title: 'Problem Validation & Target Audience Mapping',
        time: '2:00 – 3:00 pm', location: 'Room 1410, UoB Dubai',
        speakers: [
            { name: 'Amir Kazemkhani', role: 'Founder, Samt Health' },
            { name: 'Rafik Haj Ibrahim', role: 'Co-founder, CreditPool' },
        ],
        partners: [
            { name: 'Samt Health', logo: '/partners/samt-health.svg' },
            { name: 'CreditPool' },
        ],
        summary: 'Cohort 3 opened with the question every startup has to answer first: is this a real problem, and for whom? Two founders led the session on customer discovery and mapping a target audience, and teams left with a clearer picture of who they are building for.',
        takeaways: ['Separating a real problem from an assumed one', 'Defining and mapping a target audience', 'How to run early customer discovery'],
        images: [
            { src: 'session1-group', size: [1600, 1069], pos: 'center 62%', alt: 'B-Labs Cohort 3 participants and speakers in a group photo in front of the session slide' },
            { src: 'session1-speaker', pos: '70% 32%', alt: 'Speaker presenting Problem Validation & Target Audience Mapping to students' },
            { src: 'session1-founder-talk', pos: '45% 30%', alt: 'Founder speaking to students during B-Labs Session 1' },
            { src: 'session1-room', size: [1600, 1200], pos: 'center 60%', alt: 'Students listening during Session 1 in Room 1410' },
        ],
    },
    {
        n: 2, slug: 'product-requirements-ai',
        date: '2026-10-29', dateLabel: 'Thu 29 Oct',
        title: 'Product Requirements & AI Integrations',
        subtitle: 'SEA × Klui',
        time: '1:00 – 2:00 pm', location: 'Room 0409, UoB Dubai',
        speakers: [
            { name: 'Priyanshu Naha', role: 'Klui · ArcScale Labs' },
            { name: 'Hayaa Pardasani', role: 'Moderator, SEA' },
        ],
        partners: [
            { name: 'Klui', logo: '/partners/hackathon/klui.png' },
            { name: 'ArcScale Labs', logo: '/partners/arcscale-labs.png', mono: true },
        ],
        summary: 'A hands-on session with Klui and ArcScale Labs. Teams moved from an idea to clear product requirements, then looked at where AI fits into the product and how to integrate it, working on their own laptops.',
        takeaways: ['Writing product requirements a team can build from', 'Choosing where AI genuinely adds value', 'Practical AI integration in an MVP'],
        images: [
            { src: 'session2-ai-integrations', pos: 'center 62%', alt: 'Session 2 title slide, Product Requirements and AI Integrations, in a full classroom' },
            { src: 'session2-hands-on', pos: 'center 66%', alt: 'Students working on laptops during the hands-on session' },
            { src: 'session2-builders', pos: 'center 68%', alt: 'Student teams building during Session 2' },
            { src: 'session2-teams', pos: '60% 62%', alt: 'Speaker working with student teams at their desks' },
        ],
    },
    {
        n: 3, slug: 'business-models',
        date: '2026-11-09', dateLabel: 'Mon 9 Nov',
        title: 'Business Models & Unit Economics',
        time: '1:00 – 2:00 pm', location: 'Room 2203-04, UoB Dubai',
        speakers: [
            { name: 'Saksham Mishra', role: 'President, SEA' },
        ],
        summary: 'How startups make money, and how to know it adds up. Teams worked out who actually pays them, compared six revenue models and three ways to price, then ran the six numbers investors ask for: CAC, ARPU, contribution, churn, LTV and payback. Two activities closed it out: a "Who Pays?" quiz on companies students use every week, and napkin maths on their own startups.',
        takeaways: ['The user isn’t always the payer: price for whoever signs the cheque', 'Unit economics: CAC, contribution, churn, LTV and payback', 'Investor rules of thumb: LTV:CAC of 3× or more, payback under 12 months'],
        images: [
            { src: 'session3-group', size: [1600, 1200], pos: 'center 58%', alt: 'B-Labs Cohort 3 participants in a group photo in front of the Let’s Network closing slide after Session 3' },
            { src: 'session3-speaker', pos: '55% 35%', alt: 'Saksham Mishra presenting Business Models & Unit Economics in Room 2203-04' },
            { src: 'session3-unit-economics', pos: 'center 45%', alt: 'Slide listing the six numbers investors ask for: CAC, ARPU, contribution, churn, LTV and payback' },
            { src: 'session3-teams', size: [1600, 1381], pos: 'center 60%', alt: 'Students working at their tables during the Session 3 activities' },
        ],
    },
    {
        n: 4, slug: 'pitch-arena',
        date: '2026-11-11', dateLabel: 'Wed 11 Nov',
        title: 'Pitch Coaching & Practice Arena',
        time: 'TBA', location: 'Room 0209, UoB Dubai',
        speakers: [
            { name: 'Areej Alahmad', role: 'Incubation Associate, in5' },
        ],
        partners: [
            { name: 'in5', logo: '/partners/in5.png' },
        ],
        summary: 'Areej Alahmad of in5 joined online for part one, From Idea to Incubation with in5, taking the questions our founders most wanted answered: what in5 offers at the very early stage, and how ready a startup needs to be before applying. Teams then structured their pitches, delivered them live and took direct feedback from the room.',
        takeaways: ['What in5 offers founders at the very early stage', 'How ready a startup needs to be before applying', 'Live pitch practice with feedback'],
        images: [
            { src: 'session4-room', pos: 'center 55%', alt: 'Session 4 in Room 0209 under the What our founders want to know slide for in5' },
            { src: 'session4-in5', pos: 'center 45%', alt: 'From Idea to Incubation with in5 slide during Session 4' },
            { src: 'session4-speaker', pos: '40% 50%', alt: 'Pitch practice underway in Room 0209' },
            { src: 'session4-founders', pos: '70% 55%', alt: 'Student founder working on a laptop during Session 4' },
        ],
    },
    {
        n: 5, slug: 'investor-deck',
        date: '2026-11-17', dateLabel: 'Tue 17 Nov',
        title: 'Investor Pitch Deck & Financial Storytelling',
        time: 'TBA', location: 'TBA',
        speakers: [
            { name: 'Shahid Sheikh OBE', role: 'Entrepreneur, former Director of Clifton Packaging' },
        ],
        partners: [
            { name: 'Asteria Space', logo: '/partners/asteria-space.png', mono: true },
            { name: 'MirZyme', logo: '/partners/mirzyme.png', mono: true },
            { name: 'British Asian Trust', logo: '/partners/british-asian-trust.svg', mono: true },
        ],
        summary: 'Shahid Sheikh OBE told his rags-to-riches story, from leaving Uganda under Idi Amin to leading Clifton Packaging in the UK, and used it to show how founders turn their numbers and journey into a story investors remember. Teams left knowing which slides an investor deck needs and how to tell the numbers behind them.',
        takeaways: ['Deck structure investors expect', 'Turning numbers into a narrative', 'Your founder story as part of the pitch'],
        images: [
            { src: 'session5-speaker', pos: '80% 55%', alt: 'Shahid Sheikh OBE beside his Rags to Riches Story title slide' },
            { src: 'session5-story', pos: '55% 45%', alt: 'Shahid Sheikh OBE presenting to B-Labs Cohort 3' },
            { src: 'session5-room', pos: 'center 55%', alt: 'Full room under the Investor Pitch Deck & Financial Storytelling slide' },
            { src: 'session5-audience', size: [900, 1600], pos: 'center 55%', alt: 'Students listening during Session 5' },
        ],
    },
    { n: 6, slug: 'legal-ip', date: '2026-11-23', dateLabel: 'Mon 23 Nov', title: 'Legal, IP & Data Compliance', badge: 'Final session',
        time: 'TBA', location: 'TBA',
        summary: 'Protect what you build. The final session of Cohort 3 covers intellectual property, the legal basics of starting up, and handling user data responsibly.',
        takeaways: ['Protecting your IP as a student founder', 'Legal basics before you incorporate', 'Data protection and user privacy'] },
];

const dubaiDate = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Dubai', year: 'numeric', month: '2-digit', day: '2-digit',
});

// Today's calendar date in Dubai as YYYY-MM-DD, whatever the visitor's timezone.
export const dubaiToday = (now = new Date()) => dubaiDate.format(now);

export const getSessionStatus = (session, today = dubaiToday()) => {
    if (session.date < today) return 'done';
    if (session.date === today) return 'today';
    return 'upcoming';
};

export const daysUntil = (session, today = dubaiToday()) =>
    Math.round((Date.parse(session.date) - Date.parse(today)) / 86400000);

export const countdownLabel = (session, today = dubaiToday()) => {
    const days = daysUntil(session, today);
    if (days <= 0) return 'Today';
    if (days === 1) return 'Tomorrow';
    return `In ${days} days`;
};

export const getCohortProgress = (today = dubaiToday()) => {
    const statuses = SESSIONS.map(session => getSessionStatus(session, today));
    const done = statuses.filter(status => status === 'done').length;
    const next = SESSIONS.find((_, i) => statuses[i] !== 'done');
    return { statuses, done, total: SESSIONS.length, next };
};

export const isWide = (image) => Boolean(image.size && image.size[0] > image.size[1]);

export const imageSources = (image) => {
    const [width, height] = image.size || [1200, 1600];
    const thumbWidth = Math.round((width / Math.max(width, height)) * 640);
    return {
        src: `${IMAGE_BASE}/${image.src}-thumb.webp`,
        full: `${IMAGE_BASE}/${image.src}.webp`,
        srcSet: `${IMAGE_BASE}/${image.src}-thumb.webp ${thumbWidth}w, ${IMAGE_BASE}/${image.src}.webp ${width}w`,
        width,
        height,
    };
};
