import React, { useEffect, useMemo, useRef, useState } from 'react';
import BLabsCollage from './BLabsCollage';
import {
    COHORT, SESSIONS, INSTAGRAM_URL,
    dubaiToday, getCohortProgress, countdownLabel,
} from './blabsData';
import './blabs.css';

const STATUS_LABEL = { done: 'Done', today: 'Today', upcoming: 'Upcoming' };
const pad = (n) => String(n).padStart(2, '0');

// Dev-only: `?today=2026-11-10` previews the section on another date.
const resolveToday = () => {
    if (import.meta.env.DEV) {
        const mock = new URLSearchParams(window.location.search).get('today');
        if (/^\d{4}-\d{2}-\d{2}$/.test(mock || '')) return mock;
    }
    return dubaiToday();
};

// `/#blabs-cohort3/session-2` or `/?session=2` opens that session.
const sessionFromUrl = () => {
    const fromHash = window.location.hash.match(/^#blabs-cohort3\/session-(\d)$/);
    const fromQuery = new URLSearchParams(window.location.search).get('session');
    const n = Number(fromHash ? fromHash[1] : fromQuery);
    return SESSIONS.some(session => session.n === n) ? n : null;
};

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const SessionDetails = ({ session, status, today, hasOpened }) => {
    if (status === 'done') {
        const meta = [session.dateLabel, session.time, session.location].filter(v => v && v !== 'TBA');
        return (
            <div className="sea-blabs-panel__grid">
                <div className="sea-blabs-panel__text">
                    <p className="sea-blabs-panel__summary">{session.summary}</p>
                    <ul className="sea-blabs-panel__takeaways">
                        {session.takeaways.map(item => <li key={item}>{item}</li>)}
                    </ul>
                    <p className="sea-blabs-panel__meta">{meta.join(' · ')}</p>
                    {session.speakers?.length > 0 && (
                        <ul className="sea-blabs-panel__speakers" aria-label="Speakers">
                            {session.speakers.map(speaker => (
                                <li key={speaker.name}><strong>{speaker.name}</strong> <span>{speaker.role}</span></li>
                            ))}
                        </ul>
                    )}
                </div>
                {session.images?.length ? (
                    // Mounted on first open, so photos in closed panels never download early.
                    hasOpened && <BLabsCollage session={session} />
                ) : (
                    <p className="sea-blabs-panel__recap-soon">Recap coming soon</p>
                )}
            </div>
        );
    }

    const goToSubscribe = () => {
        const target = document.getElementById('subscribe');
        if (!target) return;
        target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'center' });
        setTimeout(() => document.getElementById('subscribe-email')?.focus({ preventScroll: true }), 700);
    };

    const tba = (value) => (value === 'TBA'
        ? <abbr className="sea-blabs-tba" title="To be announced">TBA</abbr>
        : value);

    return (
        <div className="sea-blabs-panel__grid">
            <div className="sea-blabs-panel__text">
                <p className="sea-blabs-panel__summary">{session.summary}</p>
                <ul className="sea-blabs-panel__takeaways">
                    {session.takeaways.map(item => <li key={item}>{item}</li>)}
                </ul>
            </div>
            <div className="sea-blabs-panel__aside">
                <dl className="sea-blabs-panel__details">
                    <div><dt>Date</dt><dd>{session.dateLabel}</dd></div>
                    <div><dt>Time</dt><dd>{tba(session.time)}</dd></div>
                    <div><dt>Location</dt><dd>{tba(session.location)}</dd></div>
                </dl>
                <p className="sea-blabs-panel__countdown">
                    <span aria-hidden="true" /> {countdownLabel(session, today)}
                </p>
                <div className="sea-blabs-panel__actions">
                    <button type="button" className="sea-blabs-btn sea-blabs-btn--solid" onClick={goToSubscribe}>
                        Get updates <span aria-hidden="true">→</span>
                    </button>
                    <a
                        className="sea-blabs-btn sea-blabs-btn--ghost"
                        href={INSTAGRAM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Follow SEA on Instagram (opens in a new tab)"
                    >
                        Follow on Instagram <span aria-hidden="true">↗</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

const BLabsSessions = () => {
    const [today] = useState(resolveToday);
    const { statuses, done, total } = useMemo(() => getCohortProgress(today), [today]);
    const latestDone = useMemo(() => {
        const finished = SESSIONS.filter((_, i) => statuses[i] === 'done');
        return finished.length ? finished[finished.length - 1].n : SESSIONS[0].n;
    }, [statuses]);

    const [open, setOpen] = useState(() => new Set([sessionFromUrl() ?? latestDone]));
    const [opened, setOpened] = useState(open);
    const [isVisible, setIsVisible] = useState(false);
    const [isDesktop, setIsDesktop] = useState(() => window.matchMedia('(min-width: 1024px)').matches);
    const sectionRef = useRef(null);
    const buttonRefs = useRef([]);

    useEffect(() => {
        const query = window.matchMedia('(min-width: 1024px)');
        const update = () => setIsDesktop(query.matches);
        query.addEventListener('change', update);
        return () => query.removeEventListener('change', update);
    }, []);

    useEffect(() => {
        const element = sectionRef.current;
        if (!element || typeof IntersectionObserver === 'undefined') {
            setIsVisible(true);
            return undefined;
        }
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(element);
            }
        }, { threshold: 0.12 });
        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    // Deep links: open the session and bring it into view, on load and on hash changes.
    useEffect(() => {
        const reveal = (n, delay, behavior) => setTimeout(() => {
            document.getElementById(`blabs-session-${n}`)?.scrollIntoView({ behavior, block: 'start' });
        }, delay);

        // On page load jump straight there, like a normal anchor link; in-page changes scroll smoothly.
        let timer;
        const initial = sessionFromUrl();
        if (initial) timer = reveal(initial, 450, 'instant');

        const handleHash = () => {
            const n = sessionFromUrl();
            if (!n) return;
            setOpen(prev => new Set(window.matchMedia('(min-width: 1024px)').matches ? [...prev, n] : [n]));
            setOpened(prev => new Set(prev).add(n));
            timer = reveal(n, 60, prefersReducedMotion() ? 'instant' : 'smooth');
        };
        window.addEventListener('hashchange', handleHash);
        return () => { clearTimeout(timer); window.removeEventListener('hashchange', handleHash); };
    }, []);

    const toggle = (n) => {
        setOpen(prev => {
            const next = new Set(isDesktop ? prev : []);
            if (prev.has(n)) next.delete(n);
            else next.add(n);
            return next;
        });
        setOpened(prev => (prev.has(n) ? prev : new Set(prev).add(n)));
    };

    const handleRowKeyDown = (e, i) => {
        const last = SESSIONS.length - 1;
        const target = { ArrowDown: Math.min(i + 1, last), ArrowUp: Math.max(i - 1, 0), Home: 0, End: last }[e.key];
        if (target === undefined) return;
        e.preventDefault();
        buttonRefs.current[target]?.focus();
    };

    return (
        <section
            id="blabs-cohort3"
            ref={sectionRef}
            className={`sea-blabs${isVisible ? ' sea-blabs--visible' : ''}`}
            aria-labelledby="sea-blabs-title"
        >
            <div className="sea-blabs__inner">
                <header className="sea-blabs__header">
                    <p className="sea-blabs__kicker"><span aria-hidden="true" /> B-LABS · COHORT 3 · WORKSHOP SERIES</p>
                    <h2 id="sea-blabs-title" className="sea-blabs__title">
                        SIX SESSIONS. <span>ONE STARTUP.</span>
                    </h2>
                    <p className="sea-blabs__tagline">{COHORT.tagline}</p>
                    <p className="sea-blabs__meta">
                        {COHORT.startups} startups · {COHORT.window} · Certificate for every session
                    </p>
                </header>

                <div className="sea-blabs__progress">
                    <div className="sea-blabs__progress-head">
                        <span>{done} of {total} sessions complete</span>
                        <span aria-hidden="true">{pad(done)}/{pad(total)}</span>
                    </div>
                    <div
                        className="sea-blabs__bar"
                        role="progressbar"
                        aria-label="Cohort 3 progress"
                        aria-valuemin={0}
                        aria-valuemax={total}
                        aria-valuenow={done}
                        aria-valuetext={`${done} of ${total} sessions complete`}
                    >
                        <span style={{ '--progress': done / total }} />
                    </div>
                    <ol className="sea-blabs__ticks" aria-hidden="true">
                        {SESSIONS.map((session, i) => (
                            <li key={session.n} className={`is-${statuses[i]}`}>
                                <span />{pad(session.n)}
                            </li>
                        ))}
                    </ol>
                </div>

                <div className="sea-blabs__list">
                    {SESSIONS.map((session, i) => {
                        const status = statuses[i];
                        const isOpen = open.has(session.n);
                        const id = `blabs-session-${session.n}`;
                        return (
                            <div
                                key={session.n}
                                id={id}
                                className={`sea-blabs-row is-${status}${isOpen ? ' is-open' : ''}`}
                                style={{ '--i': i }}
                            >
                                <h3 className="sea-blabs-row__heading">
                                    <button
                                        type="button"
                                        id={`${id}-button`}
                                        ref={el => { buttonRefs.current[i] = el; }}
                                        className="sea-blabs-row__button"
                                        aria-expanded={isOpen}
                                        aria-controls={`${id}-panel`}
                                        onClick={() => toggle(session.n)}
                                        onKeyDown={e => handleRowKeyDown(e, i)}
                                    >
                                        <span className="sea-blabs-row__num"><span className="sea-blabs-sr">Session </span>{pad(session.n)}</span>
                                        <span className="sea-blabs-row__date"><span className="sea-blabs-sr">, </span>{session.dateLabel}</span>
                                        <span className="sea-blabs-row__title">
                                            <span className="sea-blabs-sr">, </span>{session.title}
                                            {session.subtitle && <span className="sea-blabs-row__subtitle"><span className="sea-blabs-sr">, </span>{session.subtitle}</span>}
                                        </span>
                                        <span className="sea-blabs-row__tags">
                                            {session.badge && <span className="sea-blabs-row__badge"><span className="sea-blabs-sr">, </span>{session.badge}</span>}
                                            <span className={`sea-blabs-chip sea-blabs-chip--${status}`}>
                                                <span className="sea-blabs-sr">, status: </span>{STATUS_LABEL[status]}
                                            </span>
                                        </span>
                                        <span className="sea-blabs-row__chevron" aria-hidden="true" />
                                    </button>
                                </h3>
                                <div
                                    id={`${id}-panel`}
                                    className="sea-blabs-panel"
                                    role="region"
                                    aria-labelledby={`${id}-button`}
                                    inert={!isOpen}
                                >
                                    <div className="sea-blabs-panel__clip">
                                        <SessionDetails session={session} status={status} today={today} hasOpened={opened.has(session.n)} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <footer className="sea-blabs__footer">
                    <p>Cohort 3 startups pitch at SEA Expo &amp; Whale Tank in February 2027.</p>
                    <a
                        href="#ventures"
                        onClick={(e) => {
                            e.preventDefault();
                            document.querySelector('#ventures')?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
                        }}
                    >
                        Meet the portfolio <span aria-hidden="true">→</span>
                    </a>
                </footer>
            </div>
        </section>
    );
};

export default BLabsSessions;
