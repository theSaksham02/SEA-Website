import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import TerminalFooter from '../TerminalFooter';
import { hasRealUrl } from '../../data/heroEvents';
import { REGISTER_URL, PITCH_URL } from '../../data/fashionExpo';
import '../../styles/hackathon.css';

const PAGE_TITLE = 'Fashion Founder Expo | SEA UoBD';

// Page copy as supplied by SEA. Anything still to be confirmed stays in [square brackets].
const PROGRAMME = [
    { time: '09:30', label: 'Registration and check-in (Room 0409)' },
    { time: '10:05', label: 'Welcome' },
    { time: '10:10', label: 'Opening remarks' },
    { time: '10:20', label: 'Panel 1: Designers – Sustainable Fashion from Studio to Store' },
    { time: '10:45', label: 'Panel 2: Founders & Industry – Building a Fashion Business' },
    { time: '11:10', label: 'Panel 3: Professors & Industry Partners – Sustainability You Can Measure' },
    { time: '11:35', label: 'Mementos, group photo, networking and interviews' },
    { time: '12:00', label: 'Lunch (Room 0409)' },
    { time: '12:30', label: 'Fashion Startup Pitching Competition (Room 0409)' },
    { time: '13:30', label: 'The Fashion Walk (Spanish Steps)' },
    { time: '14:00', label: 'The Souk: workshop "One Stitch at a Time", upcycling showcase, Sustainability Act, partner showcase (Spanish Steps)' },
    { time: '15:25', label: 'Closing' },
];

const PANELS = [
    {
        no: 'Panel 1 · 10:20',
        title: 'Designers',
        topic: 'Sustainable Fashion from Studio to Store',
        speakers: ['Anila Varghese, Tequmah', 'Kasheesh Bhatia, Founder, Kashesh Global', 'Bhavika Thadani, Priyankara [confirm]'],
        moderator: 'Moderator: Tanishka Mehta, The Fashion Society',
    },
    {
        no: 'Panel 2 · 10:45',
        title: 'Founders & Industry',
        topic: 'Building a Fashion Business',
        speakers: ['Araceli Gallego Diaz, Co-founder, Goshopia', 'Vinosupraja Audikesavalu'],
        moderator: 'Moderator: Hayaa Pardasani, SEA',
    },
    {
        no: 'Panel 3 · 11:10',
        title: 'Professors & Industry Partners',
        topic: 'Sustainability You Can Measure',
        speakers: ['Suchetana Paul, Sustainability Officer, Standard Chartered Bank', 'Saloome Showkat, Assistant Professor, American University in the Emirates'],
        moderator: 'Moderators: Hayaa Pardasani & Tanishka Mehta',
    },
];

const PITCHING = [
    { label: 'Format', value: '8 startups. 3-minute pitch + 2-minute Q&A, live, in front of industry judges.' },
    { label: 'Who can pitch', value: 'Student founders from UoBD, UOWD, Middlesex Dubai and Heriot-Watt Dubai building fashion that is better for people and planet: sustainable materials, upcycling, resale, ethical retail, beauty or fashion-tech. Idea stage is welcome.' },
    { label: 'Judges', value: 'Kasheesh Bhatia (Kashesh Global) · Araceli Gallego Diaz (Goshopia) · Suchetana Paul (Standard Chartered Bank) · Dr Imen Tebourbi (UoBD)' },
    { label: 'Prize', value: 'Medals and certificates for the top 3.' },
];

// Logos go in public/partners/; until a file is there the card shows the brand name.
const PARTNER_LOGOS = [
    { name: 'Tequmah', logo: '/partners/tequmah.png' },
    { name: 'Kashesh Global', logo: '/partners/kashesh.png' },
    { name: 'Priyankara', logo: '/partners/priyankara.png' },
    { name: 'Goshopia', logo: '/partners/goshopia.png' },
    { name: 'ScrunchUp', logo: '/partners/scrunchup.png' },
    { name: 'Artistek', logo: '/partners/artistek.png' },
    { name: 'Blandwear', logo: '/partners/blandwear.png' },
    { name: 'Serge DeNimes', logo: '/partners/sergedenimes.png' },
];

const PARTNERS_TEXT = 'Standard Chartered Bank · American University in the Emirates · Vogaya · Crafting Happiness DXB';

const FAQ = [
    { q: 'Is it free?', a: 'Yes, for all students and staff. Please register so we can plan numbers.' },
    { q: 'Can students from other universities come?', a: 'Yes. Students from UOWD, Middlesex Dubai and Heriot-Watt Dubai are welcome, free, with no approvals needed. Just register.' },
    { q: 'Can I pitch with an idea, not a business yet?', a: 'Yes. Tell us the idea and the problem it solves.' },
    { q: 'Can I attend only part of the day?', a: 'Yes. Drop in for any session.' },
];

const ExpoButtons = ({ onLight = false }) => {
    const showRegister = hasRealUrl(REGISTER_URL);
    const showPitch = hasRealUrl(PITCH_URL);
    if (!showRegister && !showPitch) {
        return <p className="sea-hack__note">Registration and pitch applications open soon.</p>;
    }
    return (
        <div className="sea-hack__actions">
            {showRegister && (
                <a className="sea-hack__btn" href={REGISTER_URL} target="_blank" rel="noopener noreferrer">
                    Register to attend ↗
                </a>
            )}
            {showPitch && (
                <a
                    className={`sea-hack__btn ${onLight ? 'sea-hack__btn--on-light' : 'sea-hack__btn--ghost'}`}
                    href={PITCH_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Apply to pitch ↗
                </a>
            )}
        </div>
    );
};

const PartnerLogo = ({ partner }) => {
    const [missing, setMissing] = useState(false);
    return (
        <div className="sea-hack__logo">
            {missing ? (
                <strong style={{ fontSize: 18, fontWeight: 900, letterSpacing: '-0.02em', textAlign: 'center' }}>{partner.name}</strong>
            ) : (
                <img src={partner.logo} alt={partner.name} loading="lazy" decoding="async" onError={() => setMissing(true)} />
            )}
        </div>
    );
};

const FashionExpoPage = () => {
    const [openFaq, setOpenFaq] = useState(null);

    useEffect(() => {
        const previousTitle = document.title;
        document.title = PAGE_TITLE;
        return () => { document.title = previousTitle; };
    }, []);

    useEffect(() => {
        const root = document.querySelector('.sea-hack');
        if (!root) return undefined;
        const nodes = root.querySelectorAll('.section-animate');
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduce || typeof IntersectionObserver === 'undefined') {
            nodes.forEach((node) => node.classList.add('visible'));
            return undefined;
        }
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        nodes.forEach((node) => observer.observe(node));
        return () => observer.disconnect();
    }, []);

    return (
        <div className="sea-hack">
            <Navbar />
            <main>
                {/* 1 · Overview */}
                <header className="sea-hack__hero">
                    <div className="sea-hack__inner sea-hack__hero-copy">
                        <p className="sea-hack__index">
                            <Link to="/#events" style={{ color: 'inherit', textDecoration: 'none' }}>← Back to events</Link>
                        </p>
                        <p className="sea-hack__eyebrow"><span /> Green Week · Green Fashion Day</p>
                        <h1>
                            FASHION FOUNDER
                            <em>EXPO</em>
                        </h1>
                        <p className="sea-hack__subhead" style={{ color: '#fff', fontWeight: 700 }}>
                            Sustainable fashion, from idea to runway.
                        </p>
                        <p className="sea-hack__subhead" style={{ marginTop: 12, fontSize: 15 }}>
                            An initiative of Marketing, Birmingham Business School, the Student Entrepreneurship Association (SEA) and BSc Sustainability, delivered with The Fashion Society and Aauraa.
                        </p>
                        <dl className="sea-hack__facts">
                            <div className="sea-hack__fact"><dt>Date</dt><dd>Tuesday 24 November 2026</dd></div>
                            <div className="sea-hack__fact"><dt>Time</dt><dd>10:00 – 15:30 (registration from 09:30)</dd></div>
                            <div className="sea-hack__fact"><dt>Where</dt><dd>Room 0409 &amp; the Spanish Steps, University of Birmingham Dubai</dd></div>
                            <div className="sea-hack__fact"><dt>Entry</dt><dd>Free · Open to all students and staff</dd></div>
                        </dl>
                        <p className="sea-hack__subhead">
                            The Fashion Founder Expo brings together founders, designers and industry experts from the UAE&apos;s fashion scene for a day on sustainable fashion: honest panels, live student startup pitches, a fashion walk on the Spanish Steps and The Souk.
                        </p>
                        <div className="sea-hack__hero-row">
                            <ExpoButtons />
                        </div>
                    </div>
                </header>

                {/* 2 · Programme */}
                <section id="programme" className="sea-hack__section section-animate" aria-labelledby="expo-programme-title">
                    <div className="sea-hack__inner">
                        <p className="sea-hack__index">02 / Programme</p>
                        <h2 id="expo-programme-title" className="sea-hack__h2">THE DAY.</h2>
                        <div className="sea-hack__day" style={{ marginTop: 32 }}>
                            <h3>Tuesday 24 November</h3>
                            <p>ROOM 0409 · SPANISH STEPS</p>
                            {PROGRAMME.map((row) => (
                                <div className="sea-hack__slot" key={row.time}>
                                    <time>{row.time}</time>
                                    <span><i className="sea-hack__dot" aria-hidden="true" />{row.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 3 · Panels */}
                <section id="panels" className="sea-hack__section section-animate" aria-labelledby="expo-panels-title">
                    <div className="sea-hack__inner">
                        <p className="sea-hack__index">03 / Panels</p>
                        <h2 id="expo-panels-title" className="sea-hack__h2">THREE PANELS.</h2>
                        <div className="sea-hack__cards" style={{ marginTop: 32 }}>
                            {PANELS.map((panel) => (
                                <article className="sea-hack__card" key={panel.no}>
                                    <span className="sea-hack__card-no">{panel.no.toUpperCase()}</span>
                                    <h3>{panel.title}</h3>
                                    <p className="sea-hack__by">{panel.topic}</p>
                                    {panel.speakers.map((speaker) => <p key={speaker}>{speaker}</p>)}
                                    <p className="sea-hack__prize">{panel.moderator}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 4 · Pitching competition */}
                <section id="pitching" className="sea-hack__section sea-hack__awards section-animate" aria-labelledby="expo-pitch-title">
                    <div className="sea-hack__inner">
                        <p className="sea-hack__index">04 / Pitching competition</p>
                        <h2 id="expo-pitch-title" className="sea-hack__h2">PITCH YOUR SUSTAINABLE FASHION STARTUP.</h2>
                        <div style={{ marginTop: 32 }}>
                            {PITCHING.map((row) => (
                                <div className="sea-hack__award-row" key={row.label}>
                                    <span>{row.label}</span>
                                    <strong style={{ whiteSpace: 'normal', textAlign: 'left', maxWidth: 680 }}>{row.value}</strong>
                                </div>
                            ))}
                        </div>
                        <p className="sea-hack__note" style={{ color: '#f7f7f7' }}>Free to enter · 8 slots only · Apply today</p>
                        {hasRealUrl(PITCH_URL) && (
                            <div className="sea-hack__actions" style={{ marginTop: 24 }}>
                                <a className="sea-hack__btn" href={PITCH_URL} target="_blank" rel="noopener noreferrer">
                                    Apply to pitch ↗
                                </a>
                            </div>
                        )}
                    </div>
                </section>

                {/* 5 · Partners & industry */}
                <section id="partners-industry" className="sea-hack__section section-animate" aria-labelledby="expo-partners-title">
                    <div className="sea-hack__inner">
                        <p className="sea-hack__index">05 / Partners &amp; industry</p>
                        <h2 id="expo-partners-title" className="sea-hack__h2">PARTNERS &amp; INDUSTRY.</h2>
                        <div className="sea-hack__logo-grid" style={{ marginTop: 32 }}>
                            {PARTNER_LOGOS.map((partner) => <PartnerLogo key={partner.name} partner={partner} />)}
                        </div>
                        <p className="sea-hack__note">{PARTNERS_TEXT}</p>
                    </div>
                </section>

                {/* 6 · FAQs + contact */}
                <section className="sea-hack__section section-animate" aria-labelledby="expo-faq-title">
                    <div className="sea-hack__inner">
                        <p className="sea-hack__index">06 / FAQ</p>
                        <h2 id="expo-faq-title" className="sea-hack__h2">BEFORE YOU ASK.</h2>
                        <div className="sea-hack__faq" style={{ marginTop: 28 }}>
                            {FAQ.map((item, index) => {
                                const isOpen = openFaq === index;
                                return (
                                    <div className={`sea-hack__faq-item${isOpen ? ' is-open' : ''}`} key={item.q}>
                                        <button type="button" aria-expanded={isOpen} onClick={() => setOpenFaq(isOpen ? null : index)}>
                                            <span className="sea-hack__faq-question">
                                                <span className="sea-hack__faq-number">{String(index + 1).padStart(2, '0')}</span>
                                                <span>{item.q}</span>
                                            </span>
                                            <span className="sea-hack__faq-icon" aria-hidden="true">+</span>
                                        </button>
                                        {isOpen && (
                                            <div className="sea-hack__faq-panel">
                                                <p>{item.a}</p>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                        <p className="sea-hack__note">
                            Contact: SEA · [email] · Instagram [@handle] | The Fashion Society ·{' '}
                            <a href="https://www.instagram.com/fashionsociety.uobd/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--hack-red)' }}>
                                @fashionsociety.uobd
                            </a>
                        </p>
                        <div style={{ marginTop: 28 }}>
                            <ExpoButtons onLight />
                        </div>
                    </div>
                </section>
            </main>
            <TerminalFooter />
        </div>
    );
};

export default FashionExpoPage;
