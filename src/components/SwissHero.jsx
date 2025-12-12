import React, { useState, useEffect } from 'react';

const SwissHero = () => {
    const images = [
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }, 5000);
        setTimeout(() => setLoaded(true), 300);
        return () => clearInterval(interval);
    }, []);

    return (
        <section style={{
            minHeight: isMobile ? 'auto' : '100vh',
            display: 'flex',
            flexDirection: isMobile ? 'column-reverse' : 'row',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* LEFT SIDE - Content */}
            <div style={{
                flex: isMobile ? 'none' : '0 0 45%',
                background: '#FFFFFF',
                borderRight: isMobile ? 'none' : '1px solid #E5E5E5',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: isMobile ? '40px 25px 60px' : '60px 50px',
                position: 'relative',
                zIndex: 10
            }}>
                {/* Main Headline */}
                <div>
                    <h1 style={{
                        fontSize: isMobile ? '42px' : 'clamp(50px, 7vw, 90px)',
                        lineHeight: '0.95',
                        fontWeight: '900',
                        letterSpacing: isMobile ? '-1px' : '-3px',
                        marginBottom: '25px',
                        opacity: loaded ? 1 : 0,
                        transform: loaded ? 'translateX(0)' : 'translateX(-40px)',
                        transition: 'all 1s ease 0.2s'
                    }}>
                        BUILDING<br />THE<br /><span style={{ color: '#CC0000' }}>FUTURE.</span>
                    </h1>
                    <p style={{
                        fontSize: isMobile ? '15px' : '17px',
                        maxWidth: '380px',
                        lineHeight: '1.7',
                        color: '#555',
                        opacity: loaded ? 1 : 0,
                        transition: 'opacity 1s ease 0.5s'
                    }}>
                        The premier ecosystem for student founders at the University of Birmingham.
                    </p>
                </div>

                {/* Scroll Indicator */}
                {!isMobile && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '60px', opacity: loaded ? 1 : 0, transition: 'opacity 1s ease 1s' }}>
                        <div style={{ height: '2px', width: '40px', background: '#CC0000' }}></div>
                        <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '1px' }}>SCROLL</span>
                        <span style={{ animation: 'float 2s ease-in-out infinite', color: '#CC0000' }}>↓</span>
                    </div>
                )}
            </div>

            {/* RIGHT SIDE - Image Carousel */}
            <div style={{
                flex: '1',
                position: 'relative',
                overflow: 'hidden',
                background: '#000',
                height: isMobile ? '50vh' : 'auto',
                minHeight: isMobile ? '300px' : 'auto'
            }}>
                {images.map((img, index) => (
                    <div
                        key={index}
                        style={{
                            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                            backgroundImage: `url(${img})`, backgroundSize: 'cover',
                            backgroundPosition: isMobile ? 'center center' : 'center',
                            opacity: currentImageIndex === index ? 1 : 0,
                            transition: 'opacity 1.5s ease, transform 8s ease-out',
                            transform: currentImageIndex === index ? 'scale(1.1)' : 'scale(1.0)',
                        }}
                    />
                ))}

                {/* Overlay Text Strip */}
                <div style={{
                    position: 'absolute', bottom: isMobile ? '20px' : '30px', left: '0',
                    background: 'rgba(0,0,0,0.9)', padding: isMobile ? '12px 18px' : '15px 25px', zIndex: 2,
                    display: 'flex', alignItems: 'center', gap: '10px',
                    opacity: loaded ? 1 : 0, transform: loaded ? 'translateX(0)' : 'translateX(-100%)',
                    transition: 'all 1s ease 0.8s'
                }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#CC0000', animation: 'pulse 2s infinite' }}></div>
                    <span style={{ color: '#FFF', fontSize: isMobile ? '10px' : '12px', fontWeight: '700', letterSpacing: '1px' }}>NEXT: SEA EXPO - FEB '25</span>
                </div>

                {/* Dots */}
                <div style={{ position: 'absolute', bottom: isMobile ? '20px' : '30px', right: '20px', display: 'flex', gap: '8px', zIndex: 2 }}>
                    {images.map((_, i) => (
                        <div key={i} style={{
                            width: currentImageIndex === i ? '20px' : '8px', height: '8px', borderRadius: '4px',
                            background: currentImageIndex === i ? '#CC0000' : 'rgba(255,255,255,0.5)',
                            transition: 'all 0.4s ease'
                        }}></div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SwissHero;
