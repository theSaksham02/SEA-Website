import React, { useState, useRef, useEffect } from 'react';
import { supabase, submitEventRegistration } from '../lib/supabase';

const FALLBACK_EVENTS = [
    { id: '1', title: 'Global AI Summit', date: "Oct '24", status: 'past', loc: 'Main Hall', description: '', images: [] },
    { id: '2', title: 'SEA Entrepreneurship Day', date: "Nov '24", status: 'past', loc: 'Campus', description: '', images: [] },
    { id: '3', title: 'AI Genesis x SEA', date: "Dec '24", status: 'past', loc: 'Innovation Lab', description: '', images: [] },
    { id: '4', title: 'SEA x ACM', date: "Jan '25", status: 'past', loc: 'G12', description: '', images: [] },
    { id: '5', title: 'SEA Expo', date: "Feb '25", status: 'upcoming', loc: 'Campus Center', description: '', images: [] },
    { id: '6', title: 'Demo Day', date: "Mar '25", status: 'future', loc: 'TBD', description: '', images: [] },
];

const mapRow = (row) => ({
    id: row.id,
    title: row.title,
    date: row.date_label,
    status: row.status,
    loc: row.location || 'TBD',
    description: row.description || '',
    images: [row.image_url_1, row.image_url_2, row.image_url_3].filter(Boolean),
});

const TimelineEvents = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [formStatus, setFormStatus] = useState('idle');
    const [events, setEvents] = useState(FALLBACK_EVENTS);
    const sectionRef = useRef(null);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const load = async () => {
            const { data, error } = await supabase
                .from('timeline_events')
                .select('*')
                .order('sort_order', { ascending: true });

            if (!error && data?.length) {
                setEvents(data.map(mapRow));
            }
        };
        load();
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.1 });
        const el = sectionRef.current;
        if (el) observer.observe(el);
        return () => { if (el) observer.unobserve(el); };
    }, []);

    const featured = events.find(e => e.status === 'upcoming') || events.find(e => e.status !== 'past');

    const openDetail = (event) => {
        if (!event) return;
        setSelectedEvent(event);
        setShowDetail(true);
    };

    const openRegister = (event) => {
        if (!event || event.status === 'past') return;
        setSelectedEvent(event);
        setShowDetail(false);
        setShowRegister(true);
        setFormStatus('idle');
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
                setShowRegister(false);
                setFormData({ name: '', email: '' });
                setFormStatus('idle');
            }, 2000);
        } catch {
            setFormStatus('error');
        }
    };

    return (
        <section id="events" ref={sectionRef} style={{ background: '#000', color: '#FFF', padding: isMobile ? '50px 20px' : '80px 50px' }}>
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
                <button
                    type="button"
                    onClick={() => openRegister(featured)}
                    disabled={!featured}
                    style={{
                        background: '#CC0000',
                        color: '#FFF',
                        border: 'none',
                        padding: isMobile ? '15px 30px' : '16px 30px',
                        fontSize: '12px',
                        fontWeight: '800',
                        cursor: featured ? 'pointer' : 'not-allowed',
                        opacity: featured ? 1 : 0.5,
                        width: isMobile ? '100%' : 'auto'
                    }}
                >
                    PRE-REGISTER →
                </button>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : `repeat(${Math.max(events.length, 1)}, 1fr)`,
                gap: isMobile ? '12px' : '15px'
            }}>
                {events.map((ev, i) => (
                    <div
                        key={ev.id}
                        style={{
                            background: ev.status === 'upcoming' ? '#CC0000' : '#111',
                            padding: isMobile ? '20px 15px' : '25px 20px',
                            opacity: isVisible ? (ev.status === 'past' ? 0.55 : 1) : 0,
                            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                            transition: `all 0.5s ease ${0.1 + (i * 0.08)}s`,
                            border: ev.status === 'upcoming' ? 'none' : '1px solid #222',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <div style={{ fontSize: isMobile ? '10px' : '11px', color: ev.status === 'upcoming' ? '#FFF' : '#CC0000', fontWeight: '700', marginBottom: '8px', opacity: ev.status === 'upcoming' ? 0.8 : 1 }}>
                            {ev.date}
                        </div>
                        <h3 style={{ fontSize: isMobile ? '14px' : '15px', fontWeight: '800', marginBottom: '6px', lineHeight: '1.2' }}>
                            {ev.title.toUpperCase()}
                        </h3>
                        <div style={{ fontSize: isMobile ? '11px' : '12px', color: ev.status === 'upcoming' ? 'rgba(255,255,255,0.7)' : '#555', marginBottom: 'auto' }}>
                            {ev.loc}
                        </div>
                        <div style={{ marginTop: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <button
                                type="button"
                                onClick={() => openDetail(ev)}
                                style={{
                                    background: 'transparent',
                                    border: ev.status === 'upcoming' ? '1px solid rgba(255,255,255,0.7)' : '1px solid #333',
                                    color: ev.status === 'upcoming' ? '#FFF' : '#CCC',
                                    padding: '8px 10px',
                                    fontSize: '10px',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                    letterSpacing: '0.5px'
                                }}
                            >
                                VIEW MORE →
                            </button>
                            {ev.status !== 'past' && (
                                <button
                                    type="button"
                                    onClick={() => openRegister(ev)}
                                    style={{
                                        background: 'transparent',
                                        border: 'none',
                                        padding: 0,
                                        fontSize: '10px',
                                        fontWeight: '700',
                                        color: ev.status === 'upcoming' ? '#FFF' : '#CC0000',
                                        cursor: 'pointer',
                                        textAlign: 'left'
                                    }}
                                >
                                    REGISTER →
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {showDetail && selectedEvent && (
                <div
                    style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}
                    onClick={() => setShowDetail(false)}
                >
                    <div
                        style={{ background: '#111', color: '#FFF', padding: isMobile ? '28px 22px' : '40px', maxWidth: '720px', width: '100%', maxHeight: '90vh', overflowY: 'auto', border: '1px solid #222' }}
                        onClick={e => e.stopPropagation()}
                    >
                        <div style={{ fontSize: '11px', color: '#CC0000', fontWeight: '700', letterSpacing: '1px', marginBottom: '8px' }}>
                            {selectedEvent.date} · {selectedEvent.loc}
                        </div>
                        <h3 style={{ fontSize: isMobile ? '24px' : '32px', fontWeight: '900', marginBottom: '16px' }}>
                            {selectedEvent.title}
                        </h3>
                        <p style={{ fontSize: '15px', lineHeight: 1.6, color: '#BBB', marginBottom: '24px', whiteSpace: 'pre-wrap' }}>
                            {selectedEvent.description?.trim()
                                ? selectedEvent.description
                                : 'More details for this event will be posted soon.'}
                        </p>

                        {selectedEvent.images?.length > 0 && (
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: selectedEvent.images.length === 1 ? '1fr' : (isMobile ? '1fr' : 'repeat(3, 1fr)'),
                                gap: '12px',
                                marginBottom: '24px'
                            }}>
                                {selectedEvent.images.map((src) => (
                                    <a key={src} href={src} target="_blank" rel="noopener noreferrer" style={{ display: 'block', overflow: 'hidden', border: '1px solid #222' }}>
                                        <img
                                            src={src}
                                            alt={`${selectedEvent.title} gallery`}
                                            style={{ width: '100%', height: isMobile ? '180px' : '160px', objectFit: 'cover', display: 'block' }}
                                        />
                                    </a>
                                ))}
                            </div>
                        )}

                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                            {selectedEvent.status !== 'past' && (
                                <button
                                    type="button"
                                    onClick={() => openRegister(selectedEvent)}
                                    style={{ background: '#CC0000', color: '#FFF', border: 'none', padding: '14px 24px', fontSize: '12px', fontWeight: '800', cursor: 'pointer' }}
                                >
                                    REGISTER →
                                </button>
                            )}
                            <button
                                type="button"
                                onClick={() => setShowDetail(false)}
                                style={{ background: 'transparent', color: '#888', border: '1px solid #333', padding: '14px 24px', fontSize: '12px', cursor: 'pointer' }}
                            >
                                CLOSE
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showRegister && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1001, padding: '20px' }} onClick={() => setShowRegister(false)}>
                    <div style={{ background: '#FFF', color: '#000', padding: isMobile ? '35px 25px' : '50px', maxWidth: '420px', width: '100%' }} onClick={e => e.stopPropagation()}>
                        <h2 style={{ fontSize: '11px', color: '#CC0000', letterSpacing: '2px', marginBottom: '8px' }}>EVENT REGISTRATION</h2>
                        <h3 style={{ fontSize: isMobile ? '24px' : '28px', fontWeight: '900', marginBottom: '25px' }}>{selectedEvent?.title}</h3>
                        {formStatus === 'success' ? (
                            <div style={{ textAlign: 'center', padding: '30px 0' }}><div style={{ fontSize: '40px', marginBottom: '10px' }}>✓</div><p>You're registered!</p></div>
                        ) : (
                            <form onSubmit={handleRegister}>
                                <input type="text" placeholder="Full Name" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} style={{ width: '100%', padding: '14px', border: '2px solid #EEE', marginBottom: '12px', fontSize: '16px', outline: 'none' }} />
                                <input type="email" placeholder="Email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} style={{ width: '100%', padding: '14px', border: '2px solid #EEE', marginBottom: '20px', fontSize: '16px', outline: 'none' }} />
                                {formStatus === 'error' && (
                                    <p style={{ color: '#C00', fontSize: '13px', marginBottom: '12px' }}>Registration failed. Try again.</p>
                                )}
                                <button type="submit" disabled={formStatus === 'loading'} style={{ width: '100%', background: '#CC0000', color: '#FFF', border: 'none', padding: '16px', fontSize: '13px', fontWeight: '800', cursor: 'pointer' }}>{formStatus === 'loading' ? 'REGISTERING...' : 'CONFIRM'}</button>
                            </form>
                        )}
                        <button type="button" onClick={() => setShowRegister(false)} style={{ background: 'none', border: 'none', marginTop: '15px', cursor: 'pointer', fontSize: '12px', color: '#888' }}>← Back</button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default TimelineEvents;
