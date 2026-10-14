import React, { useEffect, useRef, useState } from 'react';
import { submitEventRegistration } from '../lib/supabase';

const FEATURED_EVENT = {
    id: 'sea-hackathon',
    title: 'SEA Hackathon',
    number: '01',
    status: 'featured',
};

const UPCOMING_EVENTS = [
    { id: 'fashion-founders-expo', title: 'Fashion Founders Expo', number: '02' },
    { id: 'doers-summit', title: 'Doers Summit', number: '03' },
    { id: 'career-expo-collab', title: 'Career Expo Collab', number: '04' },
    { id: 'blabs-workshops', title: 'BLabs Workshops', number: '05' },
    { id: 'revive-me', title: 'Revive ME', number: '06' },
    { id: 'sea-expo-2026', title: 'SEA Expo 2026', number: '07' },
];

const TimelineEvents = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [formStatus, setFormStatus] = useState('idle');
    const sectionRef = useRef(null);

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

    useEffect(() => {
        if (!showModal) return undefined;
        const onKeyDown = (event) => {
            if (event.key === 'Escape' && formStatus !== 'loading') setShowModal(false);
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [showModal, formStatus]);

    const handleRegister = async (event) => {
        event.preventDefault();
        if (formStatus === 'loading') return;
        setFormStatus('loading');

        try {
            await submitEventRegistration({
                name: formData.name.trim(),
                email: formData.email.trim(),
                eventName: FEATURED_EVENT.title,
            });
            setFormStatus('success');
            window.setTimeout(() => {
                setShowModal(false);
                setFormData({ name: '', email: '' });
                setFormStatus('idle');
            }, 2200);
        } catch {
            setFormStatus('error');
        }
    };

    return (
        <section
            id="events"
            ref={sectionRef}
            className={`sea-events ${isVisible ? 'sea-events--visible' : ''}`}
            aria-labelledby="sea-events-title"
        >
            <div className="sea-events__inner">
                <header className="sea-events__header">
                    <div className="sea-events__heading-block">
                        <p className="sea-events__eyebrow"><span /> SEA / PROGRAMMES</p>
                        <h2 id="sea-events-title" className="sea-events__title">
                            EVENTS <span>ECOSYSTEM.</span>
                        </h2>
                        <p className="sea-events__intro">
                            Spaces to build, meet people and move ideas forward.
                        </p>
                    </div>
                    <div className="sea-events__index" aria-hidden="true">
                        <span>01—07</span>
                        <span>THE LINE-UP</span>
                    </div>
                </header>

                <article className="sea-events__featured" aria-labelledby="sea-hackathon-title">
                    <div className="sea-events__featured-topline">
                        <span className="sea-events__number">{FEATURED_EVENT.number} / FEATURED EVENT</span>
                        <span className="sea-events__status sea-events__status--featured">
                            <span className="sea-events__status-dot" /> FEATURED
                        </span>
                    </div>
                    <div className="sea-events__featured-content">
                        <div className="sea-events__featured-copy">
                            <p className="sea-events__micro-label">SEA UOBD PRESENTS</p>
                            <h3 id="sea-hackathon-title">SEA<br />HACKATHON</h3>
                            <p className="sea-events__featured-description">
                                Bring a problem. Build with a team. Turn an idea into something real.
                            </p>
                        </div>
                        <div className="sea-events__featured-action">
                            <span className="sea-events__orbit" aria-hidden="true">SEA<br />BUILD<br />TOGETHER</span>
                            <button
                                className="sea-events__cta"
                                type="button"
                                onClick={() => { setShowModal(true); setFormStatus('idle'); }}
                            >
                                REGISTER INTEREST <span aria-hidden="true">↗</span>
                            </button>
                            <p className="sea-events__action-note">Leave your details to register your interest.</p>
                        </div>
                    </div>
                    <div className="sea-events__featured-footer">
                        <span>IDEAS INTO ACTION</span>
                        <span>UNIVERSITY OF BIRMINGHAM DUBAI</span>
                    </div>
                </article>

                <div className="sea-events__list-heading">
                    <h3><span>02—07</span> NEXT IN THE ECOSYSTEM</h3>
                    <p>MORE PROGRAMMES. MORE TO COME.</p>
                </div>

                <div className="sea-events__list">
                    {UPCOMING_EVENTS.map((event) => (
                        <article className="sea-events__row" key={event.id}>
                            <span className="sea-events__row-number">{event.number}</span>
                            <h4>{event.title}</h4>
                            <span className="sea-events__coming-soon">COMING SOON <span aria-hidden="true">↗</span></span>
                        </article>
                    ))}
                </div>

                <footer className="sea-events__footer">
                    <span>THE ECOSYSTEM IS ALWAYS IN MOTION.</span>
                    <a href="#events" onClick={(event) => { event.preventDefault(); sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}>
                        BACK TO TOP ↑
                    </a>
                </footer>
            </div>

            {showModal && (
                <div className="sea-events__modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget && formStatus !== 'loading') setShowModal(false); }}>
                    <section className="sea-events__modal" role="dialog" aria-modal="true" aria-labelledby="sea-events-modal-title">
                        <div className="sea-events__modal-topline">
                            <span>SEA HACKATHON / REGISTER INTEREST</span>
                            <button type="button" className="sea-events__modal-close" onClick={() => setShowModal(false)} disabled={formStatus === 'loading'} aria-label="Close registration form">×</button>
                        </div>
                        <h3 id="sea-events-modal-title">BE PART<br />OF THE BUILD.</h3>
                        {formStatus === 'success' ? (
                            <div className="sea-events__success" role="status">
                                <span aria-hidden="true">✓</span>
                                <p>Thanks — your interest has been received.</p>
                            </div>
                        ) : (
                            <>
                                <p className="sea-events__modal-copy">Leave your details and the SEA team can follow up with event information.</p>
                                <form onSubmit={handleRegister} className="sea-events__form">
                                    <label>
                                        <span>FULL NAME</span>
                                        <input
                                            type="text"
                                            name="name"
                                            autoComplete="name"
                                            placeholder="Your name"
                                            required
                                            value={formData.name}
                                            onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                                        />
                                    </label>
                                    <label>
                                        <span>EMAIL ADDRESS</span>
                                        <input
                                            type="email"
                                            name="email"
                                            autoComplete="email"
                                            placeholder="you@example.com"
                                            required
                                            value={formData.email}
                                            onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                                        />
                                    </label>
                                    {formStatus === 'error' && <p className="sea-events__form-error" role="alert">Something went wrong. Please try again.</p>}
                                    <button className="sea-events__cta sea-events__cta--form" type="submit" disabled={formStatus === 'loading'}>
                                        {formStatus === 'loading' ? 'SENDING…' : 'REGISTER INTEREST'} <span aria-hidden="true">↗</span>
                                    </button>
                                </form>
                            </>
                        )}
                        <p className="sea-events__modal-footnote">SEA · UNIVERSITY OF BIRMINGHAM DUBAI</p>
                    </section>
                </div>
            )}

            <style>{`
                .sea-events {
                    --sea-red: #CC0000;
                    --sea-black: #050505;
                    --sea-white: #F7F7F7;
                    --sea-muted: #9A9A9A;
                    background: var(--sea-black);
                    color: var(--sea-white);
                    padding: clamp(56px, 8vw, 112px) clamp(20px, 5vw, 72px);
                    overflow: hidden;
                }
                .sea-events * { box-sizing: border-box; }
                .sea-events__inner { max-width: 1440px; margin: 0 auto; }
                .sea-events__header {
                    display: flex; align-items: flex-end; justify-content: space-between; gap: 28px;
                    padding-bottom: clamp(28px, 4vw, 52px); border-bottom: 1px solid #333;
                    opacity: 0; transform: translateY(18px); transition: opacity .55s ease, transform .55s ease;
                }
                .sea-events--visible .sea-events__header { opacity: 1; transform: translateY(0); }
                .sea-events__eyebrow, .sea-events__micro-label, .sea-events__number, .sea-events__status,
                .sea-events__index, .sea-events__list-heading p, .sea-events__row-number,
                .sea-events__coming-soon, .sea-events__featured-footer, .sea-events__footer,
                .sea-events__modal-topline, .sea-events__form label > span, .sea-events__modal-footnote {
                    font-size: 10px; font-weight: 800; letter-spacing: .13em; line-height: 1.4;
                }
                .sea-events__eyebrow { display: flex; align-items: center; gap: 10px; color: #D5D5D5; margin: 0 0 18px; }
                .sea-events__eyebrow > span { width: 8px; height: 8px; background: var(--sea-red); display: inline-block; }
                .sea-events__title { margin: 0; font-size: clamp(42px, 7.4vw, 104px); line-height: .9; letter-spacing: -.075em; font-weight: 950; }
                .sea-events__title span { color: var(--sea-red); display: block; }
                .sea-events__intro { margin: 22px 0 0; color: #B6B6B6; font-size: 14px; line-height: 1.6; max-width: 410px; }
                .sea-events__index { display: flex; flex-direction: column; gap: 7px; color: #888; text-align: right; white-space: nowrap; }
                .sea-events__index span:first-child { font-size: 20px; color: var(--sea-white); letter-spacing: -.04em; }
                .sea-events__featured {
                    margin-top: 28px; padding: clamp(22px, 4vw, 48px); background: var(--sea-red); color: #fff;
                    position: relative; overflow: hidden; opacity: 0; transform: translateY(20px);
                    transition: opacity .55s ease .08s, transform .55s ease .08s;
                }
                .sea-events--visible .sea-events__featured { opacity: 1; transform: translateY(0); }
                .sea-events__featured-topline { display: flex; justify-content: space-between; gap: 16px; align-items: center; position: relative; z-index: 1; }
                .sea-events__status { display: inline-flex; align-items: center; gap: 8px; }
                .sea-events__status-dot { display: inline-block; width: 7px; height: 7px; border-radius: 50%; background: white; }
                .sea-events__featured-content { display: flex; align-items: flex-end; justify-content: space-between; gap: 30px; padding: clamp(34px, 7vw, 88px) 0 clamp(28px, 5vw, 56px); position: relative; z-index: 1; }
                .sea-events__micro-label { margin: 0 0 15px; opacity: .8; }
                .sea-events__featured h3 { margin: 0; font-size: clamp(48px, 9vw, 128px); line-height: .79; letter-spacing: -.085em; font-weight: 950; }
                .sea-events__featured-description { margin: 24px 0 0; max-width: 420px; font-size: 14px; line-height: 1.65; color: rgba(255,255,255,.86); }
                .sea-events__featured-action { display: flex; flex-direction: column; align-items: flex-start; gap: 12px; min-width: 200px; }
                .sea-events__orbit { display: flex; align-items: center; justify-content: center; width: 100px; height: 100px; border: 1px solid rgba(255,255,255,.65); border-radius: 50%; font-size: 9px; font-weight: 900; letter-spacing: .1em; line-height: 1.35; text-align: center; transform: rotate(-9deg); margin-bottom: 18px; }
                .sea-events__cta { min-height: 48px; min-width: 190px; display: inline-flex; align-items: center; justify-content: space-between; gap: 28px; padding: 0 17px; border: 1px solid #fff; background: #fff; color: #080808; font: inherit; font-size: 10px; font-weight: 900; letter-spacing: .08em; cursor: pointer; text-align: left; transition: background .18s ease, color .18s ease; }
                .sea-events__cta:hover { background: #080808; color: #fff; }
                .sea-events__cta:focus-visible, .sea-events__footer a:focus-visible, .sea-events__modal-close:focus-visible { outline: 2px solid #fff; outline-offset: 4px; }
                .sea-events__action-note { margin: 0; max-width: 220px; font-size: 11px; line-height: 1.5; color: rgba(255,255,255,.78); }
                .sea-events__featured-footer { display: flex; justify-content: space-between; gap: 16px; padding-top: 18px; border-top: 1px solid rgba(255,255,255,.38); }
                .sea-events__list-heading { display: flex; align-items: baseline; justify-content: space-between; gap: 20px; margin: clamp(44px, 7vw, 82px) 0 12px; }
                .sea-events__list-heading h3 { margin: 0; font-size: 12px; font-weight: 900; letter-spacing: .06em; }
                .sea-events__list-heading h3 span { color: var(--sea-red); margin-right: 12px; }
                .sea-events__list-heading p { margin: 0; color: #777; text-align: right; }
                .sea-events__list { border-top: 1px solid #3A3A3A; }
                .sea-events__row { display: grid; grid-template-columns: 70px minmax(0, 1fr) auto; align-items: center; gap: 20px; min-height: 92px; border-bottom: 1px solid #333; transition: background .2s ease, padding .2s ease; }
                .sea-events__row:hover { background: #101010; padding-left: 12px; padding-right: 12px; }
                .sea-events__row-number { color: var(--sea-red); }
                .sea-events__row h4 { margin: 0; font-size: clamp(19px, 2.7vw, 32px); line-height: 1.1; letter-spacing: -.045em; font-weight: 850; }
                .sea-events__coming-soon { color: #A5A5A5; display: inline-flex; align-items: center; gap: 18px; white-space: nowrap; }
                .sea-events__coming-soon span { color: var(--sea-red); font-size: 15px; }
                .sea-events__footer { display: flex; justify-content: space-between; gap: 20px; padding-top: 25px; color: #777; }
                .sea-events__footer a { color: #D5D5D5; text-decoration: none; }
                .sea-events__footer a:hover { color: var(--sea-red); }
                .sea-events__modal-backdrop { position: fixed; inset: 0; z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 20px; background: rgba(0,0,0,.88); }
                .sea-events__modal { width: min(100%, 480px); max-height: min(90vh, 760px); overflow-y: auto; padding: clamp(24px, 5vw, 42px); background: #F7F7F7; color: #080808; }
                .sea-events__modal-topline { display: flex; align-items: center; justify-content: space-between; gap: 18px; color: var(--sea-red); }
                .sea-events__modal-close { width: 44px; height: 44px; border: 1px solid #D5D5D5; background: transparent; color: #111; font-size: 28px; line-height: 1; cursor: pointer; }
                .sea-events__modal-close:disabled { opacity: .45; cursor: not-allowed; }
                .sea-events__modal h3 { margin: 30px 0 16px; font-size: clamp(38px, 8vw, 58px); line-height: .88; letter-spacing: -.07em; font-weight: 950; }
                .sea-events__modal-copy { color: #555; font-size: 13px; line-height: 1.6; margin: 0 0 24px; }
                .sea-events__form { display: flex; flex-direction: column; gap: 17px; }
                .sea-events__form label { display: flex; flex-direction: column; gap: 8px; }
                .sea-events__form label > span { color: #555; }
                .sea-events__form input { width: 100%; min-height: 48px; padding: 12px 13px; border: 1px solid #CFCFCF; border-radius: 0; background: #fff; color: #111; font: inherit; font-size: 16px; }
                .sea-events__form input:focus { outline: 2px solid var(--sea-red); outline-offset: 1px; }
                .sea-events__cta--form { width: 100%; margin-top: 5px; border-color: var(--sea-red); background: var(--sea-red); color: #fff; }
                .sea-events__cta--form:hover { background: #111; border-color: #111; }
                .sea-events__cta--form:disabled { opacity: .65; cursor: wait; }
                .sea-events__form-error { margin: 0; color: var(--sea-red); font-size: 13px; }
                .sea-events__success { display: flex; align-items: center; gap: 14px; padding: 20px 0; }
                .sea-events__success > span { display: grid; place-items: center; width: 40px; height: 40px; background: var(--sea-red); color: #fff; font-size: 22px; }
                .sea-events__success p { margin: 0; font-size: 14px; line-height: 1.5; }
                .sea-events__modal-footnote { margin: 28px 0 0; padding-top: 16px; border-top: 1px solid #DDD; color: #777; }
                @media (max-width: 640px) {
                    .sea-events__header { align-items: flex-start; }
                    .sea-events__index { padding-top: 5px; }
                    .sea-events__index span:last-child { display: none; }
                    .sea-events__title { font-size: clamp(39px, 10.2vw, 64px); }
                    .sea-events__intro { font-size: 13px; max-width: 300px; }
                    .sea-events__featured-content { flex-direction: column; align-items: stretch; gap: 28px; padding-top: 52px; }
                    .sea-events__featured h3 { font-size: clamp(54px, 14vw, 86px); }
                    .sea-events__featured-action { min-width: 0; display: grid; grid-template-columns: 64px minmax(0, 1fr); align-items: center; column-gap: 14px; }
                    .sea-events__orbit { width: 62px; height: 62px; font-size: 7px; grid-row: span 2; margin: 0; }
                    .sea-events__cta { min-width: 0; width: 100%; min-height: 48px; }
                    .sea-events__action-note { grid-column: 2; }
                    .sea-events__featured-footer { flex-direction: column; gap: 6px; font-size: 9px; }
                    .sea-events__list-heading { align-items: flex-start; flex-direction: column; gap: 8px; }
                    .sea-events__list-heading p { text-align: left; }
                    .sea-events__row { grid-template-columns: 34px minmax(0, 1fr); gap: 10px 12px; padding: 18px 0; min-height: 0; }
                    .sea-events__row h4 { font-size: clamp(19px, 5.5vw, 25px); }
                    .sea-events__coming-soon { grid-column: 2; font-size: 9px; }
                    .sea-events__row:hover { padding-left: 8px; padding-right: 8px; }
                    .sea-events__footer { flex-direction: column; gap: 12px; font-size: 9px; }
                }
                @media (prefers-reduced-motion: reduce) {
                    .sea-events *, .sea-events *::before, .sea-events *::after { scroll-behavior: auto !important; animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
                    .sea-events__header, .sea-events__featured { opacity: 1; transform: none; }
                }
            `}</style>
        </section>
    );
};

export default TimelineEvents;
