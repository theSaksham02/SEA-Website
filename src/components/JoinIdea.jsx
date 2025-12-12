import React, { useState } from 'react';

const JoinIdea = () => {
    const [formData, setFormData] = useState({ name: '', email: '', idea: '', stage: '', team: '', pitch: '' });
    const [status, setStatus] = useState('idle');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        try {
            const response = await fetch('https://formspree.io/f/xpwzgkjv', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, type: 'join_with_idea', timestamp: new Date().toISOString() })
            });
            if (response.ok) { setStatus('success'); }
            else throw new Error();
        } catch { setStatus('error'); }
    };

    return (
        <section id="join-idea" className="section-padding" style={{ minHeight: '100vh', background: '#CC0000', color: '#FFF', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ maxWidth: '600px', margin: '0 auto', width: '100%' }}>
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', fontWeight: '800', letterSpacing: '2px' }}>B-LABS COHORT 3</span>
                <h1 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: '900', marginTop: '15px', marginBottom: '20px' }}>JOIN WITH AN IDEA.</h1>
                <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.8)', marginBottom: '50px', lineHeight: '1.6' }}>
                    Have a startup idea? Apply to B-Labs Cohort 3 and get mentorship, funding, and resources to turn your vision into reality.
                </p>

                {status === 'success' ? (
                    <div style={{ textAlign: 'center', padding: '60px 0' }}>
                        <div style={{ fontSize: '60px', marginBottom: '20px' }}>🚀</div>
                        <h3 style={{ fontSize: '24px', marginBottom: '15px' }}>Application Submitted</h3>
                        <p style={{ opacity: 0.8 }}>We'll review your application and reach out within 5 business days.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ fontSize: '11px', opacity: 0.7, letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>FULL NAME *</label>
                                <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} style={{ width: '100%', padding: '15px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', color: '#FFF', fontSize: '16px', outline: 'none' }} />
                            </div>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ fontSize: '11px', opacity: 0.7, letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>EMAIL *</label>
                                <input type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} style={{ width: '100%', padding: '15px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', color: '#FFF', fontSize: '16px', outline: 'none' }} />
                            </div>
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ fontSize: '11px', opacity: 0.7, letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>STARTUP IDEA (One-liner) *</label>
                            <input type="text" required placeholder="e.g. Uber for laundry" value={formData.idea} onChange={e => setFormData({ ...formData, idea: e.target.value })} style={{ width: '100%', padding: '15px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', color: '#FFF', fontSize: '16px', outline: 'none' }} />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ fontSize: '11px', opacity: 0.7, letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>CURRENT STAGE</label>
                                <select value={formData.stage} onChange={e => setFormData({ ...formData, stage: e.target.value })} style={{ width: '100%', padding: '15px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', color: '#FFF', fontSize: '16px', outline: 'none' }}>
                                    <option value="" style={{ color: '#000' }}>Select...</option>
                                    <option value="idea" style={{ color: '#000' }}>Just an idea</option>
                                    <option value="prototype" style={{ color: '#000' }}>Prototype</option>
                                    <option value="mvp" style={{ color: '#000' }}>MVP</option>
                                    <option value="revenue" style={{ color: '#000' }}>Generating revenue</option>
                                </select>
                            </div>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ fontSize: '11px', opacity: 0.7, letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>TEAM SIZE</label>
                                <select value={formData.team} onChange={e => setFormData({ ...formData, team: e.target.value })} style={{ width: '100%', padding: '15px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', color: '#FFF', fontSize: '16px', outline: 'none' }}>
                                    <option value="" style={{ color: '#000' }}>Select...</option>
                                    <option value="solo" style={{ color: '#000' }}>Solo founder</option>
                                    <option value="2" style={{ color: '#000' }}>2 people</option>
                                    <option value="3-5" style={{ color: '#000' }}>3-5 people</option>
                                    <option value="5+" style={{ color: '#000' }}>5+ people</option>
                                </select>
                            </div>
                        </div>
                        <div style={{ marginBottom: '25px' }}>
                            <label style={{ fontSize: '11px', opacity: 0.7, letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>PITCH (What problem are you solving?)</label>
                            <textarea value={formData.pitch} onChange={e => setFormData({ ...formData, pitch: e.target.value })} rows="4" style={{ width: '100%', padding: '15px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', color: '#FFF', fontSize: '16px', outline: 'none', resize: 'vertical' }} />
                        </div>
                        <button type="submit" disabled={status === 'loading'} style={{ width: '100%', background: '#000', color: '#FFF', border: 'none', padding: '20px', fontSize: '14px', fontWeight: '800', cursor: 'pointer', letterSpacing: '1px' }}>
                            {status === 'loading' ? 'SUBMITTING...' : 'APPLY TO COHORT 3'}
                        </button>
                        {status === 'error' && <p style={{ color: '#000', marginTop: '15px', textAlign: 'center', fontWeight: 'bold' }}>Something went wrong. Try again.</p>}
                    </form>
                )}
            </div>
        </section>
    );
};

export default JoinIdea;
