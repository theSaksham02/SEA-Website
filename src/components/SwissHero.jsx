import React, { useState, useEffect, useMemo } from 'react';
import HeroEventSlide, { HeroEventStyles } from './HeroEventSlide';
import { getActiveHeroEvents } from '../data/heroEvents';

const images = [
    "/hero-images/hero1.png",
    "/hero-images/hero2.png",
    "/hero-images/hero3.png",
    "/hero-images/hero4.png",
    "/hero-images/hero5.png",
    "/hero-images/hero6.png",
    "/hero-images/hero7.png",
];

const SwissHero = () => {
    const [now, setNow] = useState(() => Date.now());
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [focusInEvent, setFocusInEvent] = useState(false);

    const events = useMemo(() => getActiveHeroEvents(now), [now]);
    const slides = useMemo(() => [
        ...events.map(event => ({ type: 'event', key: event.id, event })),
        ...images.map(img => ({ type: 'image', key: img, img })),
    ], [events]);
    const nextEvent = useMemo(
        () => [...events].sort((a, b) => new Date(a.endDate) - new Date(b.endDate))[0],
        [events]
    );

    // An event can expire while the page is open, so keep the index in range.
    const activeIndex = currentImageIndex % slides.length;
    const activeType = slides[activeIndex].type;
    const paused = (hovered && activeType === 'event') || focusInEvent;

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Re-check event end dates so finished events drop out without a reload.
    useEffect(() => {
        const interval = setInterval(() => setNow(Date.now()), 60000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => setLoaded(true), 300);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (paused) return undefined;
        // Event slides carry more to read, so they stay up a little longer.
        const timer = setTimeout(() => {
            setCurrentImageIndex(prev => (prev % slides.length + 1) % slides.length);
        }, activeType === 'event' ? 8000 : 5000);
        return () => clearTimeout(timer);
    }, [activeIndex, activeType, paused, slides.length]);

    const handleFocus = (e) => setFocusInEvent(Boolean(e.target.closest('.sea-hero-event')));
    const handleBlur = (e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setFocusInEvent(false);
    };

    const isNear = (index) => {
        const n = slides.length;
        return index === activeIndex || index === (activeIndex + 1) % n || index === (activeIndex - 1 + n) % n;
    };

    const stripStyle = {
        position: 'absolute', bottom: isMobile ? '20px' : '30px', left: '0',
        background: 'rgba(0,0,0,0.9)', padding: isMobile ? '12px 18px' : '15px 25px', zIndex: 2,
        display: 'flex', alignItems: 'center', gap: '10px',
        opacity: loaded ? 1 : 0, transform: loaded ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'all 1s ease 0.8s'
    };
    const stripContent = (
        <>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#CC0000', animation: 'pulse 2s infinite' }}></div>
            <span style={{ color: '#FFF', fontSize: isMobile ? '10px' : '12px', fontWeight: '700', letterSpacing: '1px' }}>
                NEXT EVENT — {nextEvent ? nextEvent.nextEventLabel : 'TBA'}
            </span>
        </>
    );

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
                        The Student Entrepreneurship Association for student founders at the University of Birmingham Dubai.
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
            <div
                aria-roledescription="carousel"
                aria-label="Highlights and upcoming events"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={{
                    flex: '1',
                    position: 'relative',
                    overflow: 'hidden',
                    background: '#000',
                    height: isMobile ? '50vh' : 'auto',
                    // Event slides need room for their text and stacked buttons below the fixed navbar.
                    // One height for every slide, so changing slides never shifts the page.
                    minHeight: isMobile ? (events.length ? '580px' : '300px') : 'auto'
                }}
            >
                {events.length > 0 && <HeroEventStyles isMobile={isMobile} />}
                {slides.map((slide, index) => slide.type === 'event' ? (
                    <HeroEventSlide
                        key={slide.key}
                        event={slide.event}
                        active={activeIndex === index}
                        isMobile={isMobile}
                        loadImage={isNear(index)}
                        eager={index === 0}
                    />
                ) : (
                    <div
                        key={slide.key}
                        style={{
                            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                            backgroundImage: `url(${slide.img})`, backgroundSize: 'cover',
                            backgroundPosition: isMobile ? 'center center' : 'center',
                            opacity: activeIndex === index ? 1 : 0,
                            transition: 'opacity 1.5s ease, transform 8s ease-out',
                            transform: activeIndex === index ? 'scale(1.1)' : 'scale(1.0)',
                        }}
                    />
                ))}

                {/* Overlay Text Strip */}
                {nextEvent ? (
                    <button
                        type="button"
                        onClick={() => setCurrentImageIndex(slides.findIndex(slide => slide.key === nextEvent.id))}
                        aria-label={`Next event: ${nextEvent.ariaLabel}. Show event slide`}
                        style={{ ...stripStyle, border: 'none', cursor: 'pointer', font: 'inherit', textAlign: 'left' }}
                    >
                        {stripContent}
                    </button>
                ) : (
                    <div style={stripStyle}>{stripContent}</div>
                )}

                {/* Dots — on mobile they sit above the longer event strip so the two never collide */}
                <div style={{ position: 'absolute', bottom: isMobile ? (nextEvent ? '68px' : '20px') : '30px', right: '20px', display: 'flex', gap: '8px', zIndex: 2 }}>
                    {slides.map((slide, i) => (
                        <div key={slide.key} style={{
                            width: activeIndex === i ? '20px' : '8px', height: '8px', borderRadius: '4px',
                            background: activeIndex === i ? '#CC0000' : 'rgba(255,255,255,0.5)',
                            transition: 'all 0.4s ease'
                        }}></div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SwissHero;
