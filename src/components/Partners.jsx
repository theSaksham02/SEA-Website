import React, { useState, useRef, useEffect } from 'react';

const Partners = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [showSponsorModal, setShowSponsorModal] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const partners = [
        { name: "Access Bridge Ventures", type: "VC Partner", logo: "/partners/Access Bridge Ventures.png" },
        { name: "Plug and Play ME", type: "Accelerator", logo: "/partners/Plug play middle east.png" },
        { name: "Salica Investments", type: "Investment", logo: "/partners/Salica Investment.png" },
        { name: "SOSV", type: "VC Partner", logo: "/partners/SOSV.png" },
        { name: "Lenovo", type: "Corporate", logo: "/partners/Lenovo.png" },
        { name: "Plug and Play Africa", type: "Accelerator", logo: "/partners/Plug and Play Africa.png" },
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.15 });
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
    }, []);

    return (
        <section id="partners" ref={sectionRef} style={{ padding: isMobile ? '50px 0' : '80px 0', background: '#FAFAFA', overflow: 'hidden' }}>
            {/* Header */}
            <div style={{
                padding: isMobile ? '0 25px 40px' : '0 50px 60px',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
            }}>
                <span style={{ fontSize: '11px', color: '#CC0000', fontWeight: 'bold', letterSpacing: '2px', display: 'block', marginBottom: '15px' }}>OUR NETWORK</span>
                <h1 style={{ fontSize: isMobile ? '32px' : 'clamp(40px, 5vw, 60px)', fontWeight: '900', lineHeight: '1.1' }}>
                    PARTNERS &<br /><span style={{ color: '#CC0000' }}>SPONSORS.</span>
                </h1>
            </div>

            {/* Auto-scrolling Marquee */}
            <div className="marquee-container" style={{ position: 'relative', overflow: 'hidden', padding: '30px 0 40px' }}>
                <div className="marquee-track" style={{
                    display: 'flex',
                    gap: isMobile ? '20px' : '30px',
                    width: 'max-content'
                }}>
                    {/* First set */}
                    {partners.map((partner, i) => (
                        <PartnerCard key={`a-${i}`} partner={partner} isVisible={isVisible} isMobile={isMobile} />
                    ))}
                    {/* Duplicate for seamless loop */}
                    {partners.map((partner, i) => (
                        <PartnerCard key={`b-${i}`} partner={partner} isVisible={isVisible} isMobile={isMobile} />
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <div style={{
                margin: isMobile ? '50px 25px 0' : '70px 50px 0',
                background: '#000',
                padding: isMobile ? '50px 30px' : '70px 60px',
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '30px',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s'
            }}>
                <div style={{ textAlign: isMobile ? 'center' : 'left' }}>
                    <h3 style={{ color: '#FFF', fontSize: isMobile ? '26px' : '32px', fontWeight: '900', marginBottom: '12px' }}>
                        Partner With Us
                    </h3>
                    <p style={{ color: '#888', fontSize: '15px', maxWidth: '400px' }}>
                        Join our ecosystem and connect with the next generation of student founders.
                    </p>
                </div>
                <button
                    onClick={() => setShowSponsorModal(true)}
                    style={{
                        background: '#CC0000',
                        color: '#FFF',
                        border: 'none',
                        padding: '20px 50px',
                        fontSize: '13px',
                        fontWeight: '800',
                        letterSpacing: '2px',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                    onMouseEnter={e => {
                        e.target.style.background = '#FFF';
                        e.target.style.color = '#000';
                        e.target.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={e => {
                        e.target.style.background = '#CC0000';
                        e.target.style.color = '#FFF';
                        e.target.style.transform = 'scale(1)';
                    }}
                >
                    BECOME A SPONSOR →
                </button>
            </div>

            {showSponsorModal && <SponsorModal onClose={() => setShowSponsorModal(false)} isMobile={isMobile} />}

            {/* CSS Animation - pause only on desktop hover, not on mobile touch */}
            <style>{`
                .marquee-track {
                    animation: marquee 25s linear infinite;
                }
                @media (hover: hover) and (pointer: fine) {
                    .marquee-container:hover .marquee-track {
                        animation-play-state: paused;
                    }
                }
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>
        </section>
    );
};

const PartnerCard = ({ partner, isVisible, isMobile }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                flex: '0 0 auto',
                width: isMobile ? '180px' : '260px',
                background: '#FFF',
                border: isHovered ? '2px solid #CC0000' : '2px solid #EEE',
                padding: isMobile ? '30px 20px' : '45px 35px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: isVisible ? 1 : 0,
                transform: isHovered ? 'translateY(-10px) scale(1.02)' : 'translateY(0) scale(1)',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: isHovered ? '0 25px 50px rgba(204, 0, 0, 0.15)' : '0 5px 20px rgba(0,0,0,0.05)',
                cursor: 'default'
            }}
        >
            <div style={{
                height: isMobile ? '50px' : '70px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
            }}>
                <img
                    src={partner.logo}
                    alt={partner.name}
                    style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain',
                        filter: isHovered ? 'grayscale(0%) brightness(1)' : 'grayscale(100%) brightness(0.7)',
                        transform: isHovered ? 'scale(1.15)' : 'scale(1)',
                        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                />
            </div>
            <div style={{
                fontSize: '10px',
                color: isHovered ? '#CC0000' : '#999',
                fontWeight: '700',
                letterSpacing: '2px',
                textAlign: 'center',
                textTransform: 'uppercase',
                transition: 'color 0.3s ease',
                marginBottom: '8px'
            }}>
                {partner.type}
            </div>
            <h3 style={{
                fontSize: isMobile ? '14px' : '16px',
                fontWeight: '800',
                textAlign: 'center',
                color: '#000'
            }}>
                {partner.name}
            </h3>
        </div>
    );
};

const SponsorModal = ({ onClose, isMobile }) => {
    const [formData, setFormData] = useState({ company: '', name: '', email: '', type: '' });
    const [status, setStatus] = useState('idle');
    const [focusedField, setFocusedField] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        try {
            const response = await fetch('https://formspree.io/f/xpwzgkjv', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...formData, form_type: 'sponsor_inquiry' }) });
            if (response.ok) { setStatus('success'); setTimeout(onClose, 2000); } else throw new Error();
        } catch { setStatus('error'); }
    };

    const inputStyle = (field) => ({
        width: '100%',
        padding: '16px',
        border: focusedField === field ? '2px solid #CC0000' : '2px solid #EEE',
        marginBottom: '15px',
        fontSize: '16px',
        outline: 'none',
        transition: 'all 0.3s ease',
        background: focusedField === field ? '#FFF9F9' : '#FFF'
    });

    return (
        <div
            style={{
                position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
                background: 'rgba(0,0,0,0.9)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 1000, padding: '20px'
            }}
            onClick={onClose}
        >
            <div
                style={{
                    background: '#FFF',
                    padding: isMobile ? '40px 30px' : '50px',
                    maxWidth: '480px',
                    width: '100%',
                    maxHeight: '85vh',
                    overflowY: 'auto'
                }}
                onClick={e => e.stopPropagation()}
            >
                <h2 style={{ fontSize: '11px', color: '#CC0000', letterSpacing: '2px', marginBottom: '10px' }}>PARTNERSHIP INQUIRY</h2>
                <h3 style={{ fontSize: isMobile ? '26px' : '32px', fontWeight: '900', marginBottom: '30px' }}>Become a Sponsor</h3>

                {status === 'success' ? (
                    <div style={{ textAlign: 'center', padding: '40px 0' }}>
                        <div style={{ fontSize: '50px', marginBottom: '15px' }}>🤝</div>
                        <p style={{ fontSize: '18px', fontWeight: '600' }}>Thanks! We'll be in touch.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="Company Name" required value={formData.company}
                            onChange={e => setFormData({ ...formData, company: e.target.value })}
                            onFocus={() => setFocusedField('company')} onBlur={() => setFocusedField(null)}
                            style={inputStyle('company')} />
                        <input type="text" placeholder="Your Name" required value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            onFocus={() => setFocusedField('name')} onBlur={() => setFocusedField(null)}
                            style={inputStyle('name')} />
                        <input type="email" placeholder="Email" required value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)}
                            style={inputStyle('email')} />
                        <select value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}
                            onFocus={() => setFocusedField('type')} onBlur={() => setFocusedField(null)}
                            style={{ ...inputStyle('type'), cursor: 'pointer' }}>
                            <option value="">Partnership Type...</option>
                            <option value="event">Event Sponsor</option>
                            <option value="annual">Annual Partner</option>
                            <option value="vc">VC / Investment</option>
                            <option value="corporate">Corporate Partner</option>
                        </select>
                        <button type="submit" disabled={status === 'loading'}
                            style={{
                                width: '100%', background: '#CC0000', color: '#FFF', border: 'none',
                                padding: '18px', fontSize: '14px', fontWeight: '800', letterSpacing: '1px',
                                cursor: 'pointer', marginTop: '10px', transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={e => { if (status !== 'loading') e.target.style.background = '#000'; }}
                            onMouseLeave={e => { if (status !== 'loading') e.target.style.background = '#CC0000'; }}
                        >
                            {status === 'loading' ? 'SENDING...' : 'SUBMIT APPLICATION'}
                        </button>
                    </form>
                )}
                <button onClick={onClose} style={{ background: 'none', border: 'none', marginTop: '20px', cursor: 'pointer', fontSize: '13px', color: '#888' }}>
                    ← Back to site
                </button>
            </div>
        </div>
    );
};

export default Partners;
