import React, { useState } from 'react';

const JoinStartup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', skills: '', linkedin: '', why: '' });
    const [status, setStatus] = useState('idle');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        try {
            const response = await fetch('https://formspree.io/f/xpwzgkjv', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, type: 'join_startup', timestamp: new Date().toISOString() })
            });
            if (response.ok) { setStatus('success'); }
            else throw new Error();
        } catch { setStatus('error'); }
    };

    return (
        <section id="join-startup" className="section-padding" style={{ minHeight: '100vh', background: '#000', color: '#FFF', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ maxWidth: '600px', margin: '0 auto', width: '100%' }}>
                <span style={{ fontSize: '12px', color: '#CC0000', fontWeight: '800', letterSpacing: '2px' }}>TALENT PORTAL</span>
                <h1 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: '900', marginTop: '15px', marginBottom: '20px' }}>JOIN A STARTUP.</h1>
                <p style={{ fontSize: '16px', color: '#888', marginBottom: '50px', lineHeight: '1.6' }}>
                    Looking for your next role? Join one of our portfolio startups as a co-founder, engineer, designer, or operator.
                </p>

                {status === 'success' ? (
                    <div style={{ textAlign: 'center', padding: '60px 0' }}>
                        <div style={{ fontSize: '60px', marginBottom: '20px' }}>✓</div>
                        <h3 style={{ fontSize: '24px', marginBottom: '15px' }}>Application Received</h3>
                        <p style={{ color: '#888' }}>We'll be in touch soon with matching opportunities.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '25px' }}>
                            <label style={{ fontSize: '11px', color: '#666', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>FULL NAME *</label>
                            <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} style={{ width: '100%', padding: '15px', background: 'transparent', border: '1px solid #333', color: '#FFF', fontSize: '16px', outline: 'none' }} />
                        </div>
                        <div style={{ marginBottom: '25px' }}>
                            <label style={{ fontSize: '11px', color: '#666', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>EMAIL *</label>
                            <input type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} style={{ width: '100%', padding: '15px', background: 'transparent', border: '1px solid #333', color: '#FFF', fontSize: '16px', outline: 'none' }} />
                        </div>
                        <div style={{ marginBottom: '25px' }}>
                            <label style={{ fontSize: '11px', color: '#666', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>SKILLS (e.g. React, Python, Design)</label>
                            <input type="text" value={formData.skills} onChange={e => setFormData({ ...formData, skills: e.target.value })} style={{ width: '100%', padding: '15px', background: 'transparent', border: '1px solid #333', color: '#FFF', fontSize: '16px', outline: 'none' }} />
                        </div>
                        <div style={{ marginBottom: '25px' }}>
                            <label style={{ fontSize: '11px', color: '#666', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>LINKEDIN URL</label>
                            <input type="url" value={formData.linkedin} onChange={e => setFormData({ ...formData, linkedin: e.target.value })} style={{ width: '100%', padding: '15px', background: 'transparent', border: '1px solid #333', color: '#FFF', fontSize: '16px', outline: 'none' }} />
                        </div>
                        <div style={{ marginBottom: '30px' }}>
                            <label style={{ fontSize: '11px', color: '#666', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>WHY STARTUPS?</label>
                            <textarea value={formData.why} onChange={e => setFormData({ ...formData, why: e.target.value })} rows="3" style={{ width: '100%', padding: '15px', background: 'transparent', border: '1px solid #333', color: '#FFF', fontSize: '16px', outline: 'none', resize: 'vertical' }} />
                        </div>
                        <button type="submit" disabled={status === 'loading'} style={{ width: '100%', background: '#CC0000', color: '#FFF', border: 'none', padding: '20px', fontSize: '14px', fontWeight: '800', cursor: 'pointer', letterSpacing: '1px' }}>
                            {status === 'loading' ? 'SUBMITTING...' : 'SUBMIT APPLICATION'}
                        </button>
                        {status === 'error' && <p style={{ color: '#CC0000', marginTop: '15px', textAlign: 'center' }}>Something went wrong. Try again.</p>}
                    </form>
                )}
            </div>
        </section>
    );
};

export default JoinStartup;
