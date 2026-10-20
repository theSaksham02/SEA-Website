import React, { useEffect, useState } from 'react';
import { HACKATHON_END, HACKATHON_START, HERO } from './hackathonData';

const START = new Date(HACKATHON_START).getTime();
const END = new Date(HACKATHON_END).getTime();

const pad = (value) => String(value).padStart(2, '0');

const formatRemaining = (ms) => {
    const total = Math.max(0, Math.floor(ms / 1000));
    const days = Math.floor(total / 86400);
    const hours = Math.floor((total % 86400) / 3600);
    const minutes = Math.floor((total % 3600) / 60);
    const seconds = total % 60;
    return `${pad(days)}:${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};

const HackathonHero = ({ onRegister }) => {
    const [now, setNow] = useState(() => Date.now());

    useEffect(() => {
        const timer = window.setInterval(() => setNow(Date.now()), 1000);
        return () => window.clearInterval(timer);
    }, []);

    let clock = formatRemaining(START - now);
    let caption = 'DD:HH:MM:SS · DUBAI';
    if (now >= END) {
        clock = "THAT'S A WRAP";
        caption = 'SEA HACKS 2026';
    } else if (now >= START) {
        clock = 'LIVE NOW';
        caption = 'HACKING IS OPEN';
    }

    return (
        <header className="sea-hack__hero">
            <div className="sea-hack__inner sea-hack__hero-copy">
                <p className="sea-hack__eyebrow"><span /> {HERO.eyebrow}</p>
                <h1>
                    {HERO.title}
                    <em>{HERO.year}</em>
                </h1>
                <p className="sea-hack__subhead">{HERO.subhead}</p>
                <dl className="sea-hack__facts">
                    {HERO.facts.map((fact) => (
                        <div className="sea-hack__fact" key={fact.label}>
                            <dt>{fact.label}</dt>
                            <dd>{fact.value}</dd>
                        </div>
                    ))}
                </dl>
                <div className="sea-hack__hero-row">
                    <p className="sea-hack__countdown" aria-live="polite">
                        {clock}
                        <small>{caption}</small>
                    </p>
                    <div className="sea-hack__actions">
                        <button type="button" className="sea-hack__btn" onClick={onRegister}>
                            Register for SEA Hacks ↗
                        </button>
                        <a className="sea-hack__btn sea-hack__btn--ghost" href="#schedule">
                            See the schedule ↓
                        </a>
                    </div>
                </div>
                <div className="sea-hack__lockup">
                    <img src="/Logo/transparent_logo.png" alt="Student Entrepreneurship Association" />
                    <img src="/partners/hackathon/uobd.png" alt="University of Birmingham Dubai" />
                    <p>Hosted by the University of Birmingham Dubai.</p>
                </div>
            </div>
        </header>
    );
};

export default HackathonHero;
