import React, { useState, useEffect } from 'react';

const TerminalFooter = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle');
    const [message, setMessage] = useState('');
    const [isMobile, setIsMobile] = useState(false);
    const [focusedInput, setFocusedInput] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !email.includes('@')) { setStatus('error'); setMessage('Please enter a valid email'); return; }
        setStatus('loading');
        try {
            const response = await fetch('https://formspree.io/f/xpwzgkjv', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, type: 'newsletter_signup' })
            });
            if (response.ok) { setStatus('success'); setMessage('Welcome to SEA!'); setEmail(''); }
            else throw new Error();
        } catch { setStatus('error'); setMessage('Something went wrong.'); }
    };

    const socialLinks = [
        { name: 'Instagram', url: 'https://www.instagram.com/sea_uobd/', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
        { name: 'LinkedIn', url: 'https://www.linkedin.com/company/seauobd/', icon: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' },
        { name: 'TikTok', url: 'https://www.tiktok.com/@sea_uobd', icon: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z' }
    ];

    return (
        <section style={{
            minHeight: isMobile ? '60vh' : '70vh',
            background: '#000',
            color: '#FFF',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: isMobile ? '50px 25px' : '60px 50px'
        }}>
            <div style={{ maxWidth: '600px', margin: '0 auto', width: '100%' }}>
                <p style={{ fontFamily: 'monospace', color: '#CC0000', marginBottom: '15px', fontSize: '13px' }}>&gt; READY_TO_BUILD?</p>

                <h1 style={{
                    fontSize: isMobile ? '26px' : '40px',
                    fontWeight: '700',
                    marginBottom: '35px',
                    lineHeight: '1.3'
                }}>
                    Enter the ecosystem.<br />Start your journey.
                </h1>

                <form onSubmit={handleSubmit}>
                    <div style={{
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        alignItems: isMobile ? 'stretch' : 'center',
                        gap: isMobile ? '15px' : '10px',
                        borderBottom: isMobile ? 'none' : `2px solid ${focusedInput ? '#CC0000' : status === 'error' ? '#CC0000' : status === 'success' ? '#00AA00' : '#333'}`,
                        paddingBottom: isMobile ? '0' : '10px',
                        transition: 'border-color 0.3s ease'
                    }}>
                        {!isMobile && <span style={{ fontSize: '18px', color: '#CC0000' }}>➜</span>}
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value); setStatus('idle'); }}
                            onFocus={() => setFocusedInput(true)}
                            onBlur={() => setFocusedInput(false)}
                            placeholder="Enter your university email..."
                            disabled={status === 'loading'}
                            aria-label="Email address"
                            style={{
                                background: isMobile ? '#111' : 'transparent',
                                border: isMobile ? (focusedInput ? '1px solid #CC0000' : '1px solid #333') : 'none',
                                color: '#FFF',
                                fontSize: '16px',
                                fontFamily: 'monospace',
                                flex: 1,
                                outline: 'none',
                                padding: isMobile ? '16px' : '5px',
                                borderRadius: '0',
                                transition: 'border-color 0.3s ease'
                            }}
                        />
                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            style={{
                                background: isMobile ? '#CC0000' : 'transparent',
                                border: isMobile ? 'none' : '1px solid #333',
                                color: isMobile ? '#FFF' : (email ? '#CC0000' : '#555'),
                                padding: isMobile ? '16px 30px' : '10px 20px',
                                cursor: 'pointer',
                                fontWeight: '700',
                                fontSize: '13px',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {status === 'loading' ? '...' : 'SUBSCRIBE'}
                        </button>
                    </div>
                </form>

                {message && (
                    <div style={{ marginTop: '15px', fontSize: '13px', fontFamily: 'monospace', color: status === 'success' ? '#00AA00' : '#CC0000' }}>
                        {status === 'success' ? '✓' : '✗'} {message}
                    </div>
                )}

                {/* Footer Links with Larger Social Icons */}
                <div style={{
                    marginTop: isMobile ? '50px' : '80px',
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: isMobile ? '25px' : '20px',
                    textAlign: 'center'
                }}>
                    <div style={{ fontSize: '12px', color: '#555', letterSpacing: '1px' }}>© 2024 SEA</div>
                    <div style={{ fontSize: '12px', color: '#555', letterSpacing: '1px' }}>University of Birmingham</div>

                    {/* Social Icons - Larger */}
                    <div style={{ display: 'flex', gap: '20px' }}>
                        {socialLinks.map(social => (
                            <a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.name}
                                style={{
                                    color: '#666',
                                    transition: 'all 0.3s ease',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    background: 'transparent',
                                    border: '1px solid #333'
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.color = '#FFF';
                                    e.currentTarget.style.background = '#CC0000';
                                    e.currentTarget.style.borderColor = '#CC0000';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.color = '#666';
                                    e.currentTarget.style.background = 'transparent';
                                    e.currentTarget.style.borderColor = '#333';
                                }}
                                onFocus={e => {
                                    e.currentTarget.style.color = '#FFF';
                                    e.currentTarget.style.background = '#CC0000';
                                    e.currentTarget.style.borderColor = '#CC0000';
                                }}
                                onBlur={e => {
                                    e.currentTarget.style.color = '#666';
                                    e.currentTarget.style.background = 'transparent';
                                    e.currentTarget.style.borderColor = '#333';
                                }}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d={social.icon} />
                                </svg>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TerminalFooter;
