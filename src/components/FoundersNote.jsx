import React, { useState, useRef, useEffect } from 'react';

const FoundersNote = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const founders = [
        { name: "Ameer Alhashemi", role: "Co-Founder", img: "/team/Co-Chair.png" },
        { name: "Adham Sameh", role: "Co-Founder", img: "/team/Chair.png" },
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.2 });
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
    }, []);

    return (
        <section ref={sectionRef} style={{ background: '#111', color: '#FFF', padding: isMobile ? '50px 25px' : '80px 50px' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                {/* Header */}
                <div style={{ marginBottom: isMobile ? '30px' : '50px', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease' }}>
                    <span style={{ fontSize: '11px', color: '#CC0000', fontWeight: 'bold', letterSpacing: '2px' }}>WHERE IT STARTED</span>
                    <h2 style={{ fontSize: isMobile ? '28px' : 'clamp(36px, 5vw, 48px)', fontWeight: '900', marginTop: '12px' }}>FOUNDER'S <span style={{ color: '#CC0000' }}>NOTE.</span></h2>
                </div>

                {/* Content */}
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '35px' : '50px', alignItems: 'center' }}>
                    {/* Images - First on mobile */}
                    <div style={{
                        display: 'flex',
                        gap: '15px',
                        order: isMobile ? -1 : 1,
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateX(0)' : 'translateX(30px)',
                        transition: 'all 0.8s ease 0.3s'
                    }}>
                        {founders.map((f, i) => (
                            <div key={i} style={{ flex: 1, position: 'relative', aspectRatio: isMobile ? '1' : '3/4', overflow: 'hidden' }}>
                                <div style={{
                                    width: '100%',
                                    height: '100%',
                                    backgroundImage: `url(${f.img})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center top',
                                    filter: 'grayscale(30%)'
                                }} />
                                <div style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    background: 'linear-gradient(transparent, rgba(0,0,0,0.9))',
                                    padding: isMobile ? '20px 12px 12px' : '30px 15px 15px'
                                }}>
                                    <div style={{ fontWeight: '700', fontSize: isMobile ? '13px' : '14px' }}>{f.name}</div>
                                    <div style={{ fontSize: '11px', opacity: 0.7, marginTop: '2px' }}>{f.role}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Quote */}
                    <div style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateX(0)' : 'translateX(-30px)', transition: 'all 0.8s ease 0.2s' }}>
                        <p style={{
                            fontSize: isMobile ? '18px' : '22px',
                            lineHeight: '1.6',
                            fontWeight: '300',
                            fontStyle: 'italic',
                            color: '#CCC',
                            marginBottom: '30px'
                        }}>
                            "SEA started as a simple idea: what if university wasn't just about degrees, but about building the future? We created this community to empower students to become founders, not just employees."
                        </p>
                        <div style={{ display: 'flex', gap: '25px', flexWrap: 'wrap' }}>
                            {founders.map((f, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        backgroundImage: `url(${f.img})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        border: '2px solid #CC0000'
                                    }} />
                                    <div>
                                        <div style={{ fontWeight: '700', fontSize: '13px' }}>{f.name}</div>
                                        <div style={{ fontSize: '11px', color: '#888' }}>{f.role}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FoundersNote;
