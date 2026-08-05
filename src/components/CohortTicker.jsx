import React, { useState, useRef, useEffect } from 'react';
import { submitStartupTeamApplication, submitStartupApplication } from '../lib/supabase';

const CohortTicker = () => {
    const [activeTab, setActiveTab] = useState('COHORT 1');
    const [selectedStartup, setSelectedStartup] = useState(null);
    const [showJoinModal, setShowJoinModal] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Allow OpeningNotification (and other CTAs) to open Join modals globally
    useEffect(() => {
        const openJoin = (event) => {
            const type = event.detail?.type;
            if (type === 'startup' || type === 'idea') {
                setShowJoinModal(type);
                setSelectedStartup(null);
            }
        };
        window.addEventListener('sea-open-join-modal', openJoin);
        return () => window.removeEventListener('sea-open-join-modal', openJoin);
    }, []);

    const cohort1 = [
        {
            ticker: "DORM",
            name: "DormMe",
            tagline: "Student Housing Reimagined",
            desc: "DormMe is a student-housing marketplace with integrated dorm management and community discussions, solving the scattered search and communication gap by listing verified dorms with live availability, instant booking, and in-app support for students and operators.",
            founders: "B-Labs Cohort 1",
            stage: "Phase 1",
            problem: "Students struggle with scattered housing searches and poor communication with operators",
            solution: "Verified dorm listings with live availability, instant booking, and in-app support"
        },
        {
            ticker: "RGNV",
            name: "Regenova",
            tagline: "AI-Driven Regenerative Medicine",
            desc: "An AI-driven platform that automates stem cell differentiation analysis using deep learning. Using CNNs for feature extraction, LSTMs for temporal tracking, and U-Net for image segmentation, with Grad-CAM for interpretability.",
            founders: "B-Labs Cohort 1",
            stage: "Development",
            problem: "Manual stem cell analysis is time-consuming and error-prone",
            solution: "Deep learning automation reducing analysis time by 60% with improved accuracy"
        },
        {
            ticker: "SPKV",
            name: "SpeakVolumes",
            tagline: "AI Public Speaking Coach",
            desc: "An AI-powered platform that empowers individuals to enhance their public speaking and communication skills through interactive learning modules, real-time analytics, personalized feedback, and gamified experiences.",
            founders: "B-Labs Cohort 1",
            stage: "Developed",
            problem: "Fear of public speaking and lack of personalized feedback",
            solution: "AI-driven insights with advanced learning paths and gamified practice tools"
        },
    ];

    const cohort2 = [
        {
            ticker: "KJAI",
            name: "Kejue.ai",
            tagline: "Multilingual Voice AI Router",
            desc: "An intelligent routing layer that automatically directs calls to the best voice AI provider for each language through a single integration point, solving the complexity of integrating with multiple providers.",
            founders: "B-Labs Cohort 2",
            stage: "Development",
            problem: "Enterprises need voice AI across 10+ languages but integrating 5-10 providers is complex and costly",
            solution: "Single integration point that routes calls to the best provider for each language"
        },
        {
            ticker: "NOVA",
            name: "Nova.ai",
            tagline: "AI Go-To-Market Engine",
            desc: "An AI-powered GTM engine that autonomously handles ad creation, optimization, content generation, CRM sync, voice lead qualification, and omnichannel deployment — replacing traditional marketing teams with AI-first automation.",
            founders: "B-Labs Cohort 2",
            stage: "Development",
            problem: "Marketing teams are expensive and slow to adapt",
            solution: "Real-time AI automation replacing agency services"
        },
        {
            ticker: "MUNI",
            name: "MUNI",
            tagline: "Your Entire Net Worth in One Place",
            desc: "A mobile app showing your entire net worth — stocks, crypto, real estate, watches, number plates — with performance analytics for smarter investment decisions, built with read-only integrations for security.",
            founders: "B-Labs Cohort 2",
            stage: "Development",
            problem: "Assets are scattered across platforms with no unified view",
            solution: "Single dashboard for all assets with performance analytics"
        },
        {
            ticker: "UPTD",
            name: "Uptrade",
            tagline: "AI Investment Intelligence",
            desc: "AI-powered platform that analyzes financial reports and news instantly, provides sentiment analysis, paper trading, and a Portfolio Twin AI manager to help investors make smarter decisions.",
            founders: "B-Labs Cohort 2",
            stage: "Development",
            problem: "Investors drown in disconnected data across charts, news, and 100-page reports",
            solution: "Paper trading, Portfolio Twin, AI chatbot, TradeX and VisualX tools"
        },
        {
            ticker: "NVAI",
            name: "Nav.ai",
            tagline: "AI Visa Application Assistant",
            desc: "AI-powered platform that analyzes visa documents, catches rejection risks before submission, and provides country-specific guidance — reducing rejections by 70% at a fraction of agency costs.",
            founders: "B-Labs Cohort 2",
            stage: "Development",
            problem: "30-40% of Uzbekistan visa applications get rejected due to document errors, costing $160-500",
            solution: "AI document analysis and guidance at $10-20 vs $200-500 for agencies"
        },
    ];

    const exclusive = [
        {
            ticker: "AINM",
            name: "AI Nigma",
            tagline: "AI-Powered Tier-0 SOC Analyst",
            desc: "An AI-powered cybersecurity workflow that automates SOC intake, analysis, risk scoring, and reporting. Built on Opus, it extracts IoCs, enriches data with threat context, and uses AI review for high-risk cases while generating automated reports for routine alerts.",
            founders: "Exclusive Cohort",
            stage: "Development",
            problem: "SOC teams face alert fatigue and slow manual triage as cyberattacks rise",
            solution: "Automated Tier-0 analyst with IoC extraction, RAG classification, severity scoring, and AI review"
        },
        {
            ticker: "TRNV",
            name: "TriNOVA",
            tagline: "Coming Soon",
            desc: "Details coming soon. Stay tuned for more information about this exciting venture.",
            founders: "Exclusive Cohort",
            stage: "Stealth",
            problem: "Coming soon",
            solution: "Coming soon"
        },
    ];

    const cohort3 = [
        {
            ticker: "C3-01",
            name: "Coming Soon",
            tagline: "B-Labs Cohort 3 — Upcoming",
            desc: "Cohort 3 startups will be announced here. Apply with an idea or join a founding team to be part of the next B-Labs wave.",
            founders: "B-Labs Cohort 3",
            stage: "Upcoming",
            problem: "Applications for the next cohort are opening soon",
            solution: "Watch this space — or join via the CTAs below"
        },
        {
            ticker: "C3-02",
            name: "Your Startup?",
            tagline: "Build with SEA",
            desc: "Have a venture idea or skills to join a founding team? Cohort 3 is the next intake for B-Labs incubation.",
            founders: "B-Labs Cohort 3",
            stage: "Recruiting",
            problem: "Student founders need structure, mentorship, and a peer cohort",
            solution: "B-Labs Cohort 3 — Educate, Incubate, Accelerate"
        },
    ];

    const tabs = ['COHORT 1', 'COHORT 2', 'COHORT 3', 'EXCLUSIVE'];
    const data =
        activeTab === 'COHORT 1' ? cohort1 :
        activeTab === 'COHORT 2' ? cohort2 :
        activeTab === 'COHORT 3' ? cohort3 :
        exclusive;

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.1 });
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
    }, []);

    return (
        <section id="ventures" ref={sectionRef} style={{ background: '#F5F5F5', padding: isMobile ? '50px 20px' : '80px 50px' }}>
            {/* Header */}
            <div style={{ marginBottom: isMobile ? '30px' : '50px', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(40px)', transition: 'all 0.8s ease' }}>
                <span style={{ fontSize: '11px', color: '#CC0000', fontWeight: 'bold', letterSpacing: '2px' }}>B-LABS INCUBATOR</span>
                <h1 style={{ fontSize: isMobile ? '28px' : 'clamp(36px, 5vw, 56px)', fontWeight: '900', marginTop: '12px' }}>THE <span style={{ color: '#CC0000' }}>PORTFOLIO.</span></h1>

                <div style={{ display: 'flex', gap: isMobile ? '12px' : '20px', marginTop: '20px', flexWrap: 'wrap' }}>
                    {tabs.map(tab => (
                        <button key={tab} onClick={() => { setActiveTab(tab); setSelectedStartup(null); }}
                            style={{ background: 'transparent', border: 'none', borderBottom: activeTab === tab ? '3px solid #CC0000' : '3px solid transparent', paddingBottom: '8px', fontSize: isMobile ? '12px' : '14px', fontWeight: '800', color: activeTab === tab ? '#000' : '#888', cursor: 'pointer', whiteSpace: 'nowrap' }}
                        >{tab}</button>
                    ))}
                </div>
                {activeTab === 'COHORT 3' && (
                    <p style={{ marginTop: '14px', fontSize: '13px', color: '#888', fontWeight: '600' }}>
                        Upcoming cohort — startups will be announced as they join B-Labs.
                    </p>
                )}
            </div>

            {/* Startup Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(280px, 1fr))', gap: isMobile ? '15px' : '20px' }}>
                {data.map((item, i) => (
                    <div key={item.ticker} onClick={() => setSelectedStartup(item)}
                        style={{ background: '#FFF', padding: isMobile ? '25px 20px' : '30px', cursor: 'pointer', transition: 'all 0.3s ease', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(20px)', transitionDelay: `${i * 0.1}s`, border: '1px solid #EEE' }}>
                        <div style={{ fontSize: '11px', color: '#CC0000', fontWeight: '800', letterSpacing: '2px', marginBottom: '10px' }}>{item.ticker}</div>
                        <h3 style={{ fontSize: isMobile ? '22px' : '24px', fontWeight: '900', marginBottom: '8px' }}>{item.name}</h3>
                        <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>{item.tagline}</p>
                        <div style={{ fontSize: '12px', color: '#CC0000', fontWeight: '700' }}>VIEW DETAILS →</div>
                    </div>
                ))}
            </div>

            {/* Startup Detail Modal */}
            {selectedStartup && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }} onClick={() => setSelectedStartup(null)}>
                    <div style={{ background: '#FFF', maxWidth: '550px', width: '100%', maxHeight: '85vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
                        <div style={{ background: '#CC0000', color: '#FFF', padding: isMobile ? '30px 25px' : '40px' }}>
                            <div style={{ fontSize: '11px', letterSpacing: '2px', opacity: 0.8, marginBottom: '8px' }}>{selectedStartup.ticker} • {selectedStartup.stage}</div>
                            <h2 style={{ fontSize: isMobile ? '28px' : '36px', fontWeight: '900' }}>{selectedStartup.name}</h2>
                            <p style={{ fontSize: '15px', marginTop: '8px', opacity: 0.9 }}>{selectedStartup.tagline}</p>
                        </div>
                        <div style={{ padding: isMobile ? '25px' : '35px' }}>
                            <div style={{ marginBottom: '25px' }}><h4 style={{ fontSize: '11px', color: '#888', letterSpacing: '2px', marginBottom: '8px' }}>THE PROBLEM</h4><p style={{ fontSize: '16px' }}>{selectedStartup.problem}</p></div>
                            <div style={{ marginBottom: '25px' }}><h4 style={{ fontSize: '11px', color: '#888', letterSpacing: '2px', marginBottom: '8px' }}>THE SOLUTION</h4><p style={{ fontSize: '16px' }}>{selectedStartup.solution}</p></div>
                            <div style={{ marginBottom: '25px' }}><h4 style={{ fontSize: '11px', color: '#888', letterSpacing: '2px', marginBottom: '8px' }}>ABOUT</h4><p style={{ fontSize: '15px', color: '#555', lineHeight: '1.6' }}>{selectedStartup.desc}</p></div>
                            <div style={{ borderTop: '1px solid #EEE', paddingTop: '20px' }}>
                                <div style={{ fontSize: '11px', color: '#888' }}>FOUNDERS</div>
                                <div style={{ fontSize: '15px', fontWeight: '600', marginTop: '5px' }}>{selectedStartup.founders}</div>
                            </div>
                        </div>
                        <button onClick={() => setSelectedStartup(null)} style={{ width: '100%', background: '#000', color: '#FFF', border: 'none', padding: '18px', fontSize: '13px', fontWeight: '800', cursor: 'pointer' }}>← BACK</button>
                    </div>
                </div>
            )}

            {/* CTA Blocks */}
            <div
                className="sea-join-cta-row"
                style={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    marginTop: isMobile ? '40px' : '60px',
                    gap: isMobile ? '12px' : '0',
                }}
            >
                <button
                    type="button"
                    className="sea-join-cta sea-join-cta--talent"
                    onClick={() => setShowJoinModal('startup')}
                >
                    <span className="sea-join-cta-kicker">TALENT</span>
                    <span className="sea-join-cta-title">Join a startup</span>
                    <span className="sea-join-cta-sub">Find your next role on a B-Labs team.</span>
                    <span className="sea-join-cta-go" aria-hidden="true">→</span>
                </button>

                <button
                    type="button"
                    className="sea-join-cta sea-join-cta--idea"
                    onClick={() => setShowJoinModal('idea')}
                >
                    <span className="sea-join-cta-mark" aria-hidden="true">03</span>
                    <span className="sea-join-cta-kicker">COHORT 3 · OPEN</span>
                    <span className="sea-join-cta-title">
                        Join with
                        <br />
                        an idea
                    </span>
                    <span className="sea-join-cta-sub">Pitch your venture into the next B-Labs wave.</span>
                    <span className="sea-join-cta-action">
                        Apply now
                        <span className="sea-join-cta-go" aria-hidden="true">→</span>
                    </span>
                </button>
            </div>

            <style>{`
                .sea-join-cta {
                    position: relative;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    text-align: left;
                    border: none;
                    cursor: pointer;
                    overflow: hidden;
                    padding: ${isMobile ? '28px 22px' : '40px 36px'};
                    min-height: ${isMobile ? 'auto' : '220px'};
                    font-family: inherit;
                    transition: transform 220ms cubic-bezier(0.25, 1, 0.5, 1), background 220ms cubic-bezier(0.25, 1, 0.5, 1), border-color 220ms cubic-bezier(0.25, 1, 0.5, 1);
                    touch-action: manipulation;
                }
                .sea-join-cta--talent {
                    background: #FFF;
                    color: #000;
                    border: 2px solid #CC0000;
                }
                .sea-join-cta--talent:hover {
                    background: #FAFAFA;
                    transform: translateY(-2px);
                }
                .sea-join-cta--idea {
                    background: #0A0A0A;
                    color: #FFF;
                    border: 2px solid #0A0A0A;
                    border-left: ${isMobile ? '2px solid #0A0A0A' : 'none'};
                }
                .sea-join-cta--idea::before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 0;
                    bottom: 0;
                    width: 6px;
                    background: #CC0000;
                }
                .sea-join-cta--idea:hover {
                    transform: translateY(-2px);
                    border-color: #CC0000;
                }
                .sea-join-cta-mark {
                    position: absolute;
                    right: 8px;
                    bottom: -12px;
                    font-size: ${isMobile ? '96px' : '128px'};
                    font-weight: 900;
                    line-height: 0.8;
                    letter-spacing: -0.06em;
                    color: rgba(204, 0, 0, 0.18);
                    pointer-events: none;
                    user-select: none;
                    transition: color 220ms cubic-bezier(0.25, 1, 0.5, 1), transform 280ms cubic-bezier(0.16, 1, 0.3, 1);
                }
                .sea-join-cta--idea:hover .sea-join-cta-mark {
                    color: rgba(204, 0, 0, 0.32);
                    transform: translateX(-6px);
                }
                .sea-join-cta-kicker {
                    font-size: 11px;
                    font-weight: 800;
                    letter-spacing: 0.18em;
                    margin-bottom: 14px;
                    color: #CC0000;
                    position: relative;
                    z-index: 1;
                }
                .sea-join-cta--talent .sea-join-cta-kicker {
                    color: #888;
                }
                .sea-join-cta-title {
                    font-size: ${isMobile ? '26px' : '34px'};
                    font-weight: 900;
                    line-height: 0.95;
                    letter-spacing: -0.03em;
                    text-transform: uppercase;
                    margin-bottom: 12px;
                    position: relative;
                    z-index: 1;
                }
                .sea-join-cta-sub {
                    font-size: 14px;
                    line-height: 1.5;
                    max-width: 28ch;
                    color: #666;
                    margin-bottom: 22px;
                    position: relative;
                    z-index: 1;
                }
                .sea-join-cta--idea .sea-join-cta-sub {
                    color: rgba(255,255,255,0.62);
                }
                .sea-join-cta--talent .sea-join-cta-go {
                    margin-top: auto;
                    font-size: 22px;
                    color: #CC0000;
                    transition: transform 180ms cubic-bezier(0.25, 1, 0.5, 1);
                }
                .sea-join-cta--talent:hover .sea-join-cta-go {
                    transform: translateX(5px);
                }
                .sea-join-cta-action {
                    margin-top: auto;
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    font-size: 12px;
                    font-weight: 800;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    color: #FFF;
                    position: relative;
                    z-index: 1;
                    padding-bottom: 2px;
                    border-bottom: 2px solid #CC0000;
                }
                .sea-join-cta-action .sea-join-cta-go {
                    transition: transform 180ms cubic-bezier(0.25, 1, 0.5, 1);
                }
                .sea-join-cta--idea:hover .sea-join-cta-action .sea-join-cta-go {
                    transform: translateX(5px);
                }
                @media (prefers-reduced-motion: reduce) {
                    .sea-join-cta,
                    .sea-join-cta-mark,
                    .sea-join-cta-go,
                    .sea-join-cta-action .sea-join-cta-go {
                        transition: none !important;
                    }
                    .sea-join-cta:hover,
                    .sea-join-cta--idea:hover .sea-join-cta-mark {
                        transform: none !important;
                    }
                }
            `}</style>

            {/* Join Modals */}
            {showJoinModal === 'startup' && <JoinModal type="startup" onClose={() => setShowJoinModal(null)} isMobile={isMobile} />}
            {showJoinModal === 'idea' && <JoinModal type="idea" onClose={() => setShowJoinModal(null)} isMobile={isMobile} />}
        </section>
    );
};

const JoinModal = ({ type, onClose, isMobile }) => {
    const [formData, setFormData] = useState({ name: '', email: '', extra: '' });
    const [status, setStatus] = useState('idle');
    const [entered, setEntered] = useState(false);
    const isStartup = type === 'startup';

    useEffect(() => {
        const id = window.requestAnimationFrame(() => setEntered(true));
        return () => window.cancelAnimationFrame(id);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        try {
            if (isStartup) {
                await submitStartupTeamApplication({
                    name: formData.name,
                    email: formData.email,
                    skills: formData.extra
                });
            } else {
                await submitStartupApplication({
                    name: formData.name,
                    email: formData.email,
                    description: formData.extra,
                    stage: 'Idea'
                });
            }
            setStatus('success');
            setTimeout(onClose, 2000);
        } catch {
            setStatus('error');
        }
    };

    if (isStartup) {
        return (
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }} onClick={onClose}>
                <div style={{ background: '#000', color: '#FFF', padding: isMobile ? '35px 25px' : '45px', maxWidth: '450px', width: '100%' }} onClick={e => e.stopPropagation()}>
                    <h2 style={{ fontSize: '11px', letterSpacing: '2px', marginBottom: '8px', opacity: 0.7 }}>TALENT PORTAL</h2>
                    <h3 style={{ fontSize: isMobile ? '24px' : '28px', fontWeight: '900', marginBottom: '25px' }}>JOIN A STARTUP</h3>

                    {status === 'success' ? (
                        <div style={{ textAlign: 'center', padding: '30px 0' }}><div style={{ fontSize: '40px', marginBottom: '10px' }}>✓</div><p>Application received!</p></div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <input type="text" placeholder="Full Name" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} style={{ width: '100%', padding: '14px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', color: '#FFF', fontSize: '16px', marginBottom: '12px', outline: 'none' }} />
                            <input type="email" placeholder="Email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} style={{ width: '100%', padding: '14px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', color: '#FFF', fontSize: '16px', marginBottom: '12px', outline: 'none' }} />
                            <input type="text" placeholder="Skills (e.g. React, Design)" value={formData.extra} onChange={e => setFormData({ ...formData, extra: e.target.value })} style={{ width: '100%', padding: '14px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', color: '#FFF', fontSize: '16px', marginBottom: '20px', outline: 'none' }} />
                            <button type="submit" disabled={status === 'loading'} style={{ width: '100%', background: '#CC0000', color: '#FFF', border: 'none', padding: '16px', fontSize: '13px', fontWeight: '800', cursor: 'pointer' }}>{status === 'loading' ? 'SUBMITTING...' : 'SUBMIT'}</button>
                        </form>
                    )}
                    {status === 'error' && <p style={{ color: '#FF8A8A', fontSize: '13px', marginTop: '12px' }}>Something went wrong. Try again.</p>}
                    <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', marginTop: '15px', cursor: 'pointer', fontSize: '12px' }}>← Back</button>
                </div>
            </div>
        );
    }

    // Idea / Cohort 3 application — editorial intake board
    return (
        <div
            className={`sea-idea-overlay${entered ? ' sea-idea-overlay--in' : ''}`}
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="sea-idea-title"
        >
            <div className={`sea-idea-board${entered ? ' sea-idea-board--in' : ''}`} onClick={e => e.stopPropagation()}>
                <span className="sea-idea-slash" aria-hidden="true" />
                <span className="sea-idea-watermark" aria-hidden="true">03</span>

                <button type="button" className="sea-idea-close" onClick={onClose} aria-label="Close">×</button>

                <p className="sea-idea-kicker">B-LABS · COHORT 3</p>
                <h3 id="sea-idea-title" className="sea-idea-title">
                    Join with
                    <br />
                    <em>an idea</em>
                </h3>
                <p className="sea-idea-lede">One line is enough to start. We’ll follow up if you’re a fit for the next wave.</p>

                {status === 'success' ? (
                    <div className="sea-idea-success">
                        <p className="sea-idea-success-label">Received</p>
                        <p>Your Cohort 3 application is in. Watch your inbox.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="sea-idea-form">
                        <label className="sea-idea-field">
                            <span>Full name</span>
                            <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} autoComplete="name" />
                        </label>
                        <label className="sea-idea-field">
                            <span>Email</span>
                            <input type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} autoComplete="email" />
                        </label>
                        <label className="sea-idea-field">
                            <span>Your idea in one line</span>
                            <input type="text" value={formData.extra} onChange={e => setFormData({ ...formData, extra: e.target.value })} placeholder="What are you building?" />
                        </label>
                        {status === 'error' && <p className="sea-idea-error">Couldn’t send — check your connection and try again.</p>}
                        <button type="submit" className="sea-idea-submit" disabled={status === 'loading'}>
                            {status === 'loading' ? 'Sending…' : 'Submit application'}
                            {status !== 'loading' && <span aria-hidden="true">→</span>}
                        </button>
                    </form>
                )}

                <button type="button" className="sea-idea-back" onClick={onClose}>← Back</button>
            </div>

            <style>{`
                .sea-idea-overlay {
                    position: fixed;
                    inset: 0;
                    z-index: 1000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                    background: rgba(5,5,5,0.82);
                    backdrop-filter: blur(6px);
                    -webkit-backdrop-filter: blur(6px);
                    opacity: 0;
                    transition: opacity 280ms cubic-bezier(0.16, 1, 0.3, 1);
                }
                .sea-idea-overlay--in { opacity: 1; }
                .sea-idea-board {
                    position: relative;
                    width: 100%;
                    max-width: 460px;
                    max-height: 90vh;
                    overflow: auto;
                    background: #0A0A0A;
                    color: #FFF;
                    border: 1px solid rgba(255,255,255,0.12);
                    padding: ${isMobile ? '28px 22px 24px' : '36px 34px 28px'};
                    box-shadow: 0 28px 70px rgba(0,0,0,0.5);
                    opacity: 0;
                    transform: translate3d(0, 22px, 0) scale(0.98);
                    transition: opacity 420ms cubic-bezier(0.16, 1, 0.3, 1), transform 420ms cubic-bezier(0.16, 1, 0.3, 1);
                }
                .sea-idea-board--in {
                    opacity: 1;
                    transform: translate3d(0, 0, 0) scale(1);
                }
                .sea-idea-slash {
                    position: absolute;
                    left: 0; top: 0; bottom: 0;
                    width: 5px;
                    background: #CC0000;
                }
                .sea-idea-watermark {
                    position: absolute;
                    right: -6px;
                    top: 36%;
                    transform: translateY(-50%);
                    font-size: ${isMobile ? '120px' : '150px'};
                    font-weight: 900;
                    line-height: 0.8;
                    letter-spacing: -0.06em;
                    color: rgba(255,255,255,0.04);
                    pointer-events: none;
                }
                .sea-idea-close {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    width: 40px;
                    height: 40px;
                    border: 1px solid rgba(255,255,255,0.18);
                    background: transparent;
                    color: #FFF;
                    font-size: 22px;
                    cursor: pointer;
                    touch-action: manipulation;
                }
                .sea-idea-kicker {
                    font-size: 11px;
                    font-weight: 800;
                    letter-spacing: 0.16em;
                    color: #CC0000;
                    margin: 0 0 12px;
                    padding-right: 40px;
                }
                .sea-idea-title {
                    font-size: ${isMobile ? '30px' : '38px'};
                    font-weight: 900;
                    line-height: 0.95;
                    letter-spacing: -0.03em;
                    text-transform: uppercase;
                    margin: 0 0 12px;
                    position: relative;
                    z-index: 1;
                }
                .sea-idea-title em {
                    font-style: normal;
                    color: #CC0000;
                }
                .sea-idea-lede {
                    font-size: 14px;
                    line-height: 1.55;
                    color: rgba(255,255,255,0.58);
                    margin: 0 0 22px;
                    max-width: 34ch;
                    position: relative;
                    z-index: 1;
                }
                .sea-idea-form {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    position: relative;
                    z-index: 1;
                }
                .sea-idea-field {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                }
                .sea-idea-field span {
                    font-size: 10px;
                    font-weight: 800;
                    letter-spacing: 0.14em;
                    text-transform: uppercase;
                    color: rgba(255,255,255,0.45);
                }
                .sea-idea-field input {
                    width: 100%;
                    padding: 14px 12px;
                    background: rgba(255,255,255,0.06);
                    border: 1px solid rgba(255,255,255,0.18);
                    color: #FFF;
                    font-size: 16px;
                    outline: none;
                    font-family: inherit;
                    transition: border-color 160ms cubic-bezier(0.25, 1, 0.5, 1), background 160ms cubic-bezier(0.25, 1, 0.5, 1);
                }
                .sea-idea-field input::placeholder { color: rgba(255,255,255,0.28); }
                .sea-idea-field input:focus {
                    border-color: #CC0000;
                    background: rgba(204,0,0,0.08);
                }
                .sea-idea-submit {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: 100%;
                    min-height: 52px;
                    margin-top: 8px;
                    padding: 14px 18px;
                    border: none;
                    background: #CC0000;
                    color: #FFF;
                    font-size: 13px;
                    font-weight: 800;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    cursor: pointer;
                    touch-action: manipulation;
                    font-family: inherit;
                    transition: background 160ms cubic-bezier(0.25, 1, 0.5, 1), transform 160ms cubic-bezier(0.25, 1, 0.5, 1);
                }
                .sea-idea-submit:hover:not(:disabled) {
                    background: #E00000;
                    transform: translateY(-1px);
                }
                .sea-idea-submit:disabled { opacity: 0.7; cursor: wait; }
                .sea-idea-error {
                    color: #FF8A8A;
                    font-size: 13px;
                    margin: 0;
                }
                .sea-idea-success {
                    position: relative;
                    z-index: 1;
                    padding: 18px 0 8px;
                }
                .sea-idea-success-label {
                    font-size: 11px;
                    font-weight: 800;
                    letter-spacing: 0.16em;
                    color: #CC0000;
                    margin: 0 0 8px;
                }
                .sea-idea-back {
                    background: none;
                    border: none;
                    color: rgba(255,255,255,0.45);
                    margin-top: 16px;
                    cursor: pointer;
                    font-size: 12px;
                    font-family: inherit;
                    padding: 8px 0;
                    touch-action: manipulation;
                }
                .sea-idea-back:hover { color: rgba(255,255,255,0.85); }
                @media (prefers-reduced-motion: reduce) {
                    .sea-idea-overlay,
                    .sea-idea-board,
                    .sea-idea-field input,
                    .sea-idea-submit {
                        transition: none !important;
                    }
                    .sea-idea-overlay,
                    .sea-idea-board {
                        opacity: 1 !important;
                        transform: none !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default CohortTicker;
