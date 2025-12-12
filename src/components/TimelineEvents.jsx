import React, { useState, useRef, useEffect } from 'react';
import { submitEventRegistration } from '../lib/supabase';

const TimelineEvents = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [formStatus, setFormStatus] = useState('idle');
    const sectionRef = useRef(null);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const events = [
        { id: 1, title: "Global AI Summit", date: "Oct '24", status: "past", loc: "Main Hall" },
        { id: 2, title: "SEA Entrepreneurship Day", date: "Nov '24", status: "past", loc: "Campus" },
        { id: 3, title: "AI Genesis x SEA", date: "Dec '24", status: "past", loc: "Innovation Lab" },
        { id: 4, title: "SEA x ACM", date: "Jan '25", status: "past", loc: "G12" },
        { id: 5, title: "SEA Expo", date: "Feb '25", status: "upcoming", loc: "Campus Center" },
        { id: 6, title: "Demo Day", date: "Mar '25", status: "future", loc: "TBD" },
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.1 });
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
    }, []);

    const openRegister = (event) => {
        if (event.status !== 'past') { setSelectedEvent(event); setShowModal(true); }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setFormStatus('loading');
        try {
            await submitEventRegistration({
                name: formData.name,
                email: formData.email,
                eventName: selectedEvent?.title
            });
            setFormStatus('success');
            setTimeout(() => {
                setShowModal(false);
                setFormData({ name: '', email: '' });
                setFormStatus('idle');
            }, 2000);
        } catch (err) {
            setFormStatus('error');
        }
    };

    return (
        <section id="events" ref={sectionRef} style={{ background: '#000', color: '#FFF', padding: isMobile ? '50px 20px' : '80px 50px' }}>
            {/* Header */}
            <div style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                justifyContent: 'space-between',
                alignItems: isMobile ? 'flex-start' : 'flex-end',
                marginBottom: isMobile ? '40px' : '60px',
                gap: '20px',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                transition: 'all 0.8s ease'
            }}>
                <div>
                    <span style={{ fontSize: '11px', color: '#CC0000', fontWeight: 'bold', letterSpacing: '2px' }}>OUR JOURNEY</span>
                    <h1 style={{ fontSize: isMobile ? '28px' : 'clamp(36px, 5vw, 56px)', fontWeight: '900', marginTop: '12px' }}>
                        EVENTS <span style={{ color: '#CC0000' }}>ECOSYSTEM</span>
                    </h1>
                </div>
                <button onClick={() => openRegister(events.find(e => e.status === 'upcoming'))}
                    style={{ background: '#CC0000', color: '#FFF', border: 'none', padding: isMobile ? '15px 30px' : '16px 30px', fontSize: '12px', fontWeight: '800', cursor: 'pointer', width: isMobile ? '100%' : 'auto' }}>
                    PRE-REGISTER →
                </button>
            </div>

            {/* Events Grid - Simple cards for mobile */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : `repeat(${events.length}, 1fr)`,
                gap: isMobile ? '12px' : '15px'
            }}>
                {events.map((ev, i) => (
                    <div key={ev.id} onClick={() => openRegister(ev)}
                        style={{
                            background: ev.status === 'upcoming' ? '#CC0000' : '#111',
                            padding: isMobile ? '20px 15px' : '25px 20px',
                            cursor: ev.status !== 'past' ? 'pointer' : 'default',
                            opacity: isVisible ? (ev.status === 'past' ? 0.5 : 1) : 0,
                            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                            transition: `all 0.5s ease ${0.1 + (i * 0.08)}s`,
                            border: ev.status === 'upcoming' ? 'none' : '1px solid #222'
                        }}>
                        <div style={{ fontSize: isMobile ? '10px' : '11px', color: ev.status === 'upcoming' ? '#FFF' : '#CC0000', fontWeight: '700', marginBottom: '8px', opacity: ev.status === 'upcoming' ? 0.8 : 1 }}>
                            {ev.date}
                        </div>
                        <h3 style={{ fontSize: isMobile ? '14px' : '15px', fontWeight: '800', marginBottom: '6px', lineHeight: '1.2' }}>
                            {ev.title.toUpperCase()}
                        </h3>
                        <div style={{ fontSize: isMobile ? '11px' : '12px', color: ev.status === 'upcoming' ? 'rgba(255,255,255,0.7)' : '#555' }}>
                            {ev.loc}
                        </div>
                        {ev.status !== 'past' && (
                            <div style={{ marginTop: '12px', fontSize: '10px', fontWeight: '700', color: ev.status === 'upcoming' ? '#FFF' : '#CC0000' }}>
                                REGISTER →
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Registration Modal */}
            {showModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }} onClick={() => setShowModal(false)}>
                    <div style={{ background: '#FFF', color: '#000', padding: isMobile ? '35px 25px' : '50px', maxWidth: '420px', width: '100%' }} onClick={e => e.stopPropagation()}>
                        <h2 style={{ fontSize: '11px', color: '#CC0000', letterSpacing: '2px', marginBottom: '8px' }}>EVENT REGISTRATION</h2>
                        <h3 style={{ fontSize: isMobile ? '24px' : '28px', fontWeight: '900', marginBottom: '25px' }}>{selectedEvent?.title}</h3>
                        {formStatus === 'success' ? (
                            <div style={{ textAlign: 'center', padding: '30px 0' }}><div style={{ fontSize: '40px', marginBottom: '10px' }}>✓</div><p>You're registered!</p></div>
                        ) : (
                            <form onSubmit={handleRegister}>
                                <input type="text" placeholder="Full Name" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} style={{ width: '100%', padding: '14px', border: '2px solid #EEE', marginBottom: '12px', fontSize: '16px', outline: 'none' }} />
                                <input type="email" placeholder="Email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} style={{ width: '100%', padding: '14px', border: '2px solid #EEE', marginBottom: '20px', fontSize: '16px', outline: 'none' }} />
                                <button type="submit" disabled={formStatus === 'loading'} style={{ width: '100%', background: '#CC0000', color: '#FFF', border: 'none', padding: '16px', fontSize: '13px', fontWeight: '800', cursor: 'pointer' }}>{formStatus === 'loading' ? 'REGISTERING...' : 'CONFIRM'}</button>
                            </form>
                        )}
                        <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', marginTop: '15px', cursor: 'pointer', fontSize: '12px', color: '#888' }}>← Back</button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default TimelineEvents;
