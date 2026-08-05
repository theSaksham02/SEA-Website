import React, { useState, useEffect } from 'react';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleResize = () => { if (window.innerWidth > 768) setMobileOpen(false); };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    const links = [
        { label: 'About', href: '#about' },
        { label: 'Team', href: '#team' },
        { label: 'Events', href: '#events' },
        { label: 'B-Labs', href: '#ventures' },
        { label: 'Partners', href: '#partners' },
        { label: 'News', href: '#news' },
    ];

    const scrollToSection = (e, href) => {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        setMobileOpen(false);
    };

    return (
        <>
            <nav style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 999,
                background: scrolled ? 'rgba(0,0,0,0.95)' : 'transparent',
                backdropFilter: scrolled ? 'blur(10px)' : 'none',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                padding: scrolled ? '10px 20px' : '15px 20px',
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1400px', margin: '0 auto' }}>
                    {/* Logo - smoother transition */}
                    <a
                        href="#"
                        onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); setMobileOpen(false); }}
                        style={{ display: 'flex', alignItems: 'center' }}
                        aria-label="Go to top"
                    >
                        <img
                            src="/logo-transparent.png"
                            alt="SEA"
                            style={{
                                height: scrolled ? '45px' : '60px',
                                transition: 'height 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                                objectFit: 'contain'
                            }}
                        />
                    </a>

                    {/* Desktop Links */}
                    <div className="nav-desktop" style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
                        {links.map(link => (
                            <a
                                key={link.label}
                                href={link.href}
                                onClick={e => scrollToSection(e, link.href)}
                                style={{
                                    color: '#FFF',
                                    fontSize: '11px',
                                    fontWeight: '600',
                                    letterSpacing: '1px',
                                    opacity: 0.8,
                                    transition: 'all 0.3s ease',
                                    padding: '8px 0',
                                    borderBottom: '2px solid transparent'
                                }}
                                onMouseEnter={e => { e.target.style.opacity = 1; e.target.style.borderBottomColor = '#CC0000'; }}
                                onMouseLeave={e => { e.target.style.opacity = 0.8; e.target.style.borderBottomColor = 'transparent'; }}
                                onFocus={e => { e.target.style.opacity = 1; e.target.style.borderBottomColor = '#CC0000'; }}
                                onBlur={e => { e.target.style.opacity = 0.8; e.target.style.borderBottomColor = 'transparent'; }}
                            >
                                {link.label.toUpperCase()}
                            </a>
                        ))}
                        <a
                            href="#ventures"
                            onClick={e => scrollToSection(e, '#ventures')}
                            style={{
                                background: '#CC0000',
                                color: '#FFF',
                                padding: '10px 20px',
                                fontSize: '10px',
                                fontWeight: '800',
                                letterSpacing: '1px',
                                transition: 'all 0.3s ease',
                                outline: 'none'
                            }}
                            onMouseEnter={e => { e.target.style.background = '#FFF'; e.target.style.color = '#000'; }}
                            onMouseLeave={e => { e.target.style.background = '#CC0000'; e.target.style.color = '#FFF'; }}
                            onFocus={e => { e.target.style.background = '#FFF'; e.target.style.color = '#000'; }}
                            onBlur={e => { e.target.style.background = '#CC0000'; e.target.style.color = '#FFF'; }}
                        >
                            APPLY
                        </a>
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        className="nav-hamburger"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                        aria-expanded={mobileOpen}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '10px', zIndex: 1001, display: 'none' }}
                    >
                        <div style={{ width: '24px', height: '2px', background: '#FFF', marginBottom: '6px', transition: 'all 0.3s', transform: mobileOpen ? 'rotate(45deg) translate(5px, 6px)' : 'none' }} />
                        <div style={{ width: '24px', height: '2px', background: '#FFF', marginBottom: '6px', opacity: mobileOpen ? 0 : 1, transition: 'opacity 0.3s' }} />
                        <div style={{ width: '24px', height: '2px', background: '#FFF', transition: 'all 0.3s', transform: mobileOpen ? 'rotate(-45deg) translate(5px, -6px)' : 'none' }} />
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: '#000',
                    zIndex: 998,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '25px',
                    animation: 'fadeIn 0.3s ease'
                }}>
                    {links.map((link, i) => (
                        <a
                            key={link.label}
                            href={link.href}
                            onClick={e => scrollToSection(e, link.href)}
                            style={{
                                color: '#FFF',
                                fontSize: '28px',
                                fontWeight: '800',
                                letterSpacing: '2px',
                                opacity: 0,
                                animation: `slideUp 0.4s ease ${i * 0.1}s forwards`
                            }}
                        >
                            {link.label.toUpperCase()}
                        </a>
                    ))}
                    <a
                        href="#ventures"
                        onClick={e => scrollToSection(e, '#ventures')}
                        style={{
                            background: '#CC0000',
                            color: '#FFF',
                            padding: '18px 50px',
                            fontSize: '14px',
                            fontWeight: '800',
                            letterSpacing: '2px',
                            marginTop: '20px',
                            opacity: 0,
                            animation: `slideUp 0.4s ease ${links.length * 0.1}s forwards`
                        }}
                    >
                        APPLY NOW
                    </a>
                </div>
            )}

            <style>{`
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                
                @media (max-width: 768px) {
                    .nav-desktop { display: none !important; }
                    .nav-hamburger { display: block !important; }
                }
                
                /* Focus visible for accessibility */
                a:focus-visible, button:focus-visible {
                    outline: 2px solid #CC0000;
                    outline-offset: 2px;
                }
            `}</style>
        </>
    );
};

export default Navbar;
