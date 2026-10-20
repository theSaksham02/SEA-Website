import React, { useEffect, useState } from 'react';
import '../../styles/hackathon.css';
import { submitEventRegistration } from '../../lib/supabase';
import {
    HACKATHON_EVENT_NAME,
    PARTICIPATION_OPTIONS,
    TRACK_OPTIONS,
} from './hackathonData';

const EMPTY = {
    name: '',
    email: '',
    university: '',
    participation: '',
    track: '',
};

const HackathonRegister = ({ open, onClose }) => {
    const [form, setForm] = useState(EMPTY);
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState('');

    useEffect(() => {
        if (!open) return undefined;
        const onKey = (event) => {
            if (event.key === 'Escape' && status !== 'loading') onClose();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open, onClose, status]);

    if (!open) return null;

    const update = (event) => {
        const { name, value } = event.target;
        setForm((current) => ({ ...current, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (status === 'loading') return;
        setStatus('loading');
        setError('');
        try {
            await submitEventRegistration({
                name: form.name.trim(),
                email: form.email.trim(),
                university: form.university.trim(),
                participation: form.participation,
                track: form.track,
                eventName: HACKATHON_EVENT_NAME,
            });
            setStatus('success');
        } catch {
            setStatus('error');
            setError('Could not save that. Check the fields and try again.');
        }
    };

    return (
        <div
            className="sea-hack__modal-backdrop"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget && status !== 'loading') onClose();
            }}
        >
            <section
                className="sea-hack__modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="sea-hack-register-title"
            >
                <div className="sea-hack__modal-top">
                    <span>SEA HACKS 2026 / REGISTER</span>
                    <button type="button" className="sea-hack__close" onClick={onClose} aria-label="Close registration">
                        ×
                    </button>
                </div>
                <h2 id="sea-hack-register-title">
                    REGISTER FOR
                    <br />
                    <em>SEA HACKS.</em>
                </h2>
                {status === 'success' ? (
                    <p className="sea-hack__success" role="status">You’re in. Check your email for details.</p>
                ) : (
                    <form className="sea-hack__form" onSubmit={handleSubmit}>
                        <label>
                            FULL NAME
                            <input name="name" value={form.name} onChange={update} autoComplete="name" required />
                        </label>
                        <label>
                            EMAIL
                            <input name="email" type="email" value={form.email} onChange={update} autoComplete="email" required />
                        </label>
                        <label>
                            UNIVERSITY
                            <input name="university" value={form.university} onChange={update} required />
                        </label>
                        <label>
                            PARTICIPATION
                            <select name="participation" value={form.participation} onChange={update} required>
                                <option value="">Select</option>
                                {PARTICIPATION_OPTIONS.map((option) => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </label>
                        <label>
                            TRACK INTEREST
                            <select name="track" value={form.track} onChange={update} required>
                                <option value="">Select</option>
                                {TRACK_OPTIONS.map((option) => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </label>
                        {error && <p className="sea-hack__error" role="alert">{error}</p>}
                        <button className="sea-hack__btn sea-hack__btn--on-light" type="submit" disabled={status === 'loading'}>
                            {status === 'loading' ? 'SAVING…' : 'REGISTER FOR SEA HACKS ↗'}
                        </button>
                    </form>
                )}
            </section>
        </div>
    );
};

export default HackathonRegister;
