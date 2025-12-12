import React, { useState, useRef, useEffect } from 'react';

const ProcessAbout = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.2 });
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
    }, []);

    const steps = [
        { num: '01', title: 'EDUCATE', desc: 'Workshops, mentorship, and resources to build your entrepreneurial toolkit.' },
        { num: '02', title: 'INCUBATE', desc: 'B-Labs provides the structure and support to develop your startup idea.' },
        { num: '03', title: 'ACCELERATE', desc: 'Connect with investors, partners, and the global startup ecosystem.' },
    ];

    return (
        <section id="about" ref={sectionRef} style={{ background: '#000', color: '#FFF' }}>
            {/* Header */}
            <div style={{
                padding: isMobile ? '50px 25px 30px' : '80px 60px 50px',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                transition: 'all 0.8s ease'
            }}>
                <span style={{ fontSize: '11px', color: '#CC0000', fontWeight: 'bold', letterSpacing: '2px' }}>OUR MISSION</span>
                <h2 style={{
                    fontSize: isMobile ? '28px' : 'clamp(36px, 5vw, 56px)',
                    fontWeight: '900',
                    marginTop: '12px',
                    lineHeight: '1.1'
                }}>
                    FROM CAMPUS<br />TO <span style={{ color: '#CC0000' }}>COMPANY.</span>
                </h2>
            </div>

            {/* Steps */}
            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row' }}>
                {steps.map((step, i) => (
                    <div key={step.num} style={{
                        flex: 1,
                        padding: isMobile ? '30px 25px' : '50px 40px',
                        borderTop: '1px solid #222',
                        borderRight: !isMobile && i < 2 ? '1px solid #222' : 'none',
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                        transition: `all 0.6s ease ${0.2 + (i * 0.15)}s`
                    }}>
                        <div style={{
                            fontSize: isMobile ? '11px' : '12px',
                            color: '#CC0000',
                            fontWeight: '700',
                            letterSpacing: '2px',
                            marginBottom: '15px'
                        }}>{step.num}</div>
                        <h3 style={{
                            fontSize: isMobile ? '22px' : '28px',
                            fontWeight: '900',
                            marginBottom: '15px'
                        }}>{step.title}</h3>
                        <p style={{
                            fontSize: isMobile ? '14px' : '15px',
                            color: '#888',
                            lineHeight: '1.6'
                        }}>{step.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProcessAbout;
