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
        { ticker: "UPTD", name: "Uptrade", tagline: "Campus Marketplace", desc: "P2P marketplace for textbooks. Zero fees.", founders: "Daniel Lee", stage: "Pre-Seed", problem: "Students waste money on textbooks", solution: "Free P2P marketplace" },
        { ticker: "NVAI", name: "NavAI", tagline: "AR Campus Navigation", desc: "Indoor navigation using AR.", founders: "Emma Davis", stage: "Seed", problem: "Large campuses hard to navigate", solution: "AR-powered indoor maps" },
        { ticker: "KJAI", name: "Kejue.ai", tagline: "Research Assistant", desc: "Automated literature review.", founders: "Wei Zhang", stage: "Pre-Seed", problem: "Literature reviews take weeks", solution: "AI research automation" },
    ];

    const data = activeTab === 'COHORT 1' ? cohort1 : cohort2;

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

                <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                    {['COHORT 1', 'COHORT 2'].map(tab => (
                        <button key={tab} onClick={() => { setActiveTab(tab); setSelectedStartup(null); }}
                            style={{ background: 'transparent', border: 'none', borderBottom: activeTab === tab ? '3px solid #CC0000' : '3px solid transparent', paddingBottom: '8px', fontSize: isMobile ? '13px' : '14px', fontWeight: '800', color: activeTab === tab ? '#000' : '#888', cursor: 'pointer' }}
                        >{tab}</button>
                    ))}
                </div>
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
            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', marginTop: isMobile ? '40px' : '60px', gap: isMobile ? '15px' : '0' }}>
                <div onClick={() => setShowJoinModal('startup')}
                    style={{ flex: 1, background: '#FFF', border: '2px solid #CC0000', padding: isMobile ? '35px 25px' : '50px 40px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s' }}>
                    <h3 style={{ fontSize: isMobile ? '22px' : '26px', fontWeight: '900' }}>JOIN A STARTUP</h3>
                    <p style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>Find your next role.</p>
                    <span style={{ display: 'block', marginTop: '15px', fontSize: '18px', color: '#CC0000' }}>→</span>
                </div>
                <div onClick={() => setShowJoinModal('idea')}
                    style={{ flex: 1, background: '#CC0000', color: '#FFF', padding: isMobile ? '35px 25px' : '50px 40px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s' }}>
                    <h3 style={{ fontSize: isMobile ? '22px' : '26px', fontWeight: '900' }}>JOIN WITH AN IDEA</h3>
                    <p style={{ marginTop: '10px', fontSize: '14px', opacity: 0.85 }}>Apply for Cohort 3.</p>
                    <span style={{ display: 'block', marginTop: '15px', fontSize: '18px' }}>→</span>
                </div>
            </div>

            {/* Join Modals */}
            {showJoinModal === 'startup' && <JoinModal type="startup" onClose={() => setShowJoinModal(null)} isMobile={isMobile} />}
            {showJoinModal === 'idea' && <JoinModal type="idea" onClose={() => setShowJoinModal(null)} isMobile={isMobile} />}
        </section>
    );
};

const JoinModal = ({ type, onClose, isMobile }) => {
    const [formData, setFormData] = useState({ name: '', email: '', extra: '' });
    const [status, setStatus] = useState('idle');
    const isStartup = type === 'startup';

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
        } catch (err) {
            setStatus('error');
        }
    };

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }} onClick={onClose}>
            <div style={{ background: isStartup ? '#000' : '#CC0000', color: '#FFF', padding: isMobile ? '35px 25px' : '45px', maxWidth: '450px', width: '100%' }} onClick={e => e.stopPropagation()}>
                <h2 style={{ fontSize: '11px', letterSpacing: '2px', marginBottom: '8px', opacity: 0.7 }}>{isStartup ? 'TALENT PORTAL' : 'B-LABS COHORT 3'}</h2>
                <h3 style={{ fontSize: isMobile ? '24px' : '28px', fontWeight: '900', marginBottom: '25px' }}>{isStartup ? 'JOIN A STARTUP' : 'JOIN WITH AN IDEA'}</h3>

                {status === 'success' ? (
                    <div style={{ textAlign: 'center', padding: '30px 0' }}><div style={{ fontSize: '40px', marginBottom: '10px' }}>{isStartup ? '✓' : '🚀'}</div><p>Application received!</p></div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="Full Name" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} style={{ width: '100%', padding: '14px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', color: '#FFF', fontSize: '16px', marginBottom: '12px', outline: 'none' }} />
                        <input type="email" placeholder="Email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} style={{ width: '100%', padding: '14px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', color: '#FFF', fontSize: '16px', marginBottom: '12px', outline: 'none' }} />
                        <input type="text" placeholder={isStartup ? 'Skills (e.g. React, Design)' : 'Your idea in one line'} value={formData.extra} onChange={e => setFormData({ ...formData, extra: e.target.value })} style={{ width: '100%', padding: '14px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', color: '#FFF', fontSize: '16px', marginBottom: '20px', outline: 'none' }} />
                        <button type="submit" disabled={status === 'loading'} style={{ width: '100%', background: isStartup ? '#CC0000' : '#000', color: '#FFF', border: 'none', padding: '16px', fontSize: '13px', fontWeight: '800', cursor: 'pointer' }}>{status === 'loading' ? 'SUBMITTING...' : 'SUBMIT'}</button>
                    </form>
                )}
                <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', marginTop: '15px', cursor: 'pointer', fontSize: '12px' }}>← Back</button>
            </div>
        </div>
    );
};

export default CohortTicker;
