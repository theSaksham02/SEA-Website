import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import TerminalFooter from '../TerminalFooter';
import { hasRealUrl } from '../../data/heroEvents';
import { EXPO, REGISTER_URL, PITCH_URL } from '../../data/fashionExpo';
import '../../styles/hackathon.css';

const PAGE_TITLE = 'Fashion Founder Expo | SEA UoBD';

// Copy from the Fashion Founder Expo run of show (draft of 13 Nov 2026).
// Anything still to be confirmed stays in [square brackets].
const SCHEDULE = [
    { time: '10:00 – 11:35', label: 'Opening and three panels: Designers · Founders & Industry · Professors & Industry Partners', where: 'Room 0409' },
    { time: '11:40 – 12:00', label: 'Networking and interviews', where: 'Room 0409' },
    { time: '12:00 – 12:30', label: 'Lunch', where: 'Room 0409' },
    { time: '12:30 – 13:30', label: 'Pitching competition', where: 'Room 0409' },
    { time: '13:30 – 14:00', label: 'Fashion walk', where: 'Spanish Steps' },
    { time: '14:00 – 15:30', label: 'The Souk: partner showcase, workshop and launch pad, food and games', where: 'Spanish Steps' },
];

const FEATURING = [
    'Aauraa',
    '[Designers TBC, from the Aauraa partners and The Fashion Society network]',
    '[Fashion walk brands TBC]',
];

const UNIVERSITIES = [
    'University of Birmingham Dubai',
    'Middlesex University Dubai',
    'University of Wollongong in Dubai',
];

const PITCHING = [
    { label: 'Format', value: '3-minute pitch + 2-minute Q&A · up to 8 teams · 12:30 – 13:30, Room 0409' },
    { label: 'Who can pitch', value: 'Fashion and fashion-related startups from UoB Dubai and partner universities (Middlesex University Dubai, University of Wollongong in Dubai)' },
    { label: 'Judges', value: '[3 judges TBC]' },
    { label: 'Prize', value: 'Medals and certificates for the top 3, plus prizes [TBC]' },
];

const FAQ = [
    {
        q: 'Is it free?',
        a: 'Yes. The Fashion Founder Expo is free and open to all UoB Dubai students and staff.',
    },
    {
        q: 'Can I sell at the Souk?',
        a: 'No. The Souk is a showcase only: there is no selling on campus.',
    },
    {
        q: 'I study at another university. Can I come?',
        a: 'Students from partner universities can apply to pitch. Guests from outside UoB Dubai must register in advance so they can be added to the campus visitor list.',
    },
];

const ExpoButtons = ({ light = false }) => {
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
                    className={`sea-hack__btn ${light ? 'sea-hack__btn--on-light' : 'sea-hack__btn--ghost'}`}
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
                        <p className="sea-hack__eyebrow"><span /> Green Week · {EXPO.partners}</p>
                        <h1>
                            FASHION FOUNDER
                            <em>EXPO</em>
                        </h1>
                        <p className="sea-hack__subhead">{EXPO.description}</p>
                        <dl className="sea-hack__facts">
                            <div className="sea-hack__fact"><dt>Date</dt><dd>{EXPO.dateLabel}</dd></div>
                            <div className="sea-hack__fact"><dt>Time</dt><dd>{EXPO.time}</dd></div>
                            <div className="sea-hack__fact"><dt>Venue</dt><dd>{EXPO.venue}, UoB Dubai</dd></div>
                            <div className="sea-hack__fact"><dt>Entry</dt><dd>Free · open to all students and staff</dd></div>
                        </dl>
                        <div className="sea-hack__hero-row">
                            <ExpoButtons />
                        </div>
                    </div>
                </header>

                {/* 2 · Programme */}
                <section id="programme" className="sea-hack__section section-animate" aria-labelledby="expo-programme-title">
                    <div className="sea-hack__inner">
                        <p className="sea-hack__index">02 / Programme</p>
                        <h2 id="expo-programme-title" className="sea-hack__h2">ONE DAY, TWO VENUES.</h2>
                        <div className="sea-hack__day" style={{ marginTop: 32 }}>
                            <h3>{EXPO.dateLabel}</h3>
                            <p>REGISTRATION OPENS 09:30 · OUTSIDE ROOM 0409</p>
                            {SCHEDULE.map((row) => (
                                <div className="sea-hack__slot" key={row.time}>
                                    <time>{row.time}</time>
                                    <span>
                                        <i className="sea-hack__dot" aria-hidden="true" />
                                        <span>{row.label} <span style={{ color: 'var(--color-muted)' }}>· {row.where}</span></span>
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="sea-hack__days" style={{ marginTop: 56 }}>
                            <div className="sea-hack__day">
                                <h3>Featuring</h3>
                                <ul className="sea-hack__rules">
                                    {FEATURING.map((item, index) => (
                                        <li key={item}><span>0{index + 1}</span>{item}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="sea-hack__day">
                                <h3>With students from</h3>
                                <ul className="sea-hack__rules">
                                    {UNIVERSITIES.map((item, index) => (
                                        <li key={item}><span>0{index + 1}</span>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3 · Pitching competition */}
                <section id="pitching" className="sea-hack__section sea-hack__awards section-animate" aria-labelledby="expo-pitch-title">
                    <div className="sea-hack__inner">
                        <p className="sea-hack__index">03 / Pitching competition · [Competition name TBC]</p>
                        <h2 id="expo-pitch-title" className="sea-hack__h2">PITCH YOUR FASHION STARTUP.</h2>
                        <div style={{ marginTop: 32 }}>
                            {PITCHING.map((row) => (
                                <div className="sea-hack__award-row" key={row.label}>
                                    <span>{row.label}</span>
                                    <strong style={{ whiteSpace: 'normal', textAlign: 'right', maxWidth: 640 }}>{row.value}</strong>
                                </div>
                            ))}
                        </div>
                        {hasRealUrl(PITCH_URL) && (
                            <div className="sea-hack__actions" style={{ marginTop: 28 }}>
                                <a className="sea-hack__btn" href={PITCH_URL} target="_blank" rel="noopener noreferrer">
                                    Apply to pitch ↗
                                </a>
                            </div>
                        )}
                    </div>
                </section>

                <section className="sea-hack__section section-animate" aria-labelledby="expo-faq-title">
                    <div className="sea-hack__inner">
                        <p className="sea-hack__index">FAQ</p>
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
                            Questions? Message SEA on Instagram{' '}
                            <a href="https://www.instagram.com/sea_uobd/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--hack-red)' }}>
                                @sea_uobd
                            </a>
                            .
                        </p>
                    </div>
                </section>

                <section className="sea-hack__final section-animate" aria-labelledby="expo-final-title">
                    <div className="sea-hack__inner">
                        <p className="sea-hack__index">{EXPO.dateLabel} · {EXPO.venue}</p>
                        <h2 id="expo-final-title">OTHERS LIKE TO DREAM. WE LIKE TO BUILD.</h2>
                        <ExpoButtons />
                    </div>
                </section>
            </main>
            <TerminalFooter />
        </div>
    );
};

export default FashionExpoPage;
