import React, { useEffect, useState } from 'react';
import { submitHackathonSignup } from '../lib/supabase';

const DISMISSED_KEY = 'sea-hacks-2026-signup-dismissed';

function isStagingHost() {
  if (typeof window === 'undefined') return false;

  const { hostname } = window.location;

  return (
    hostname.includes('staging') ||
    hostname.includes('git-staging') ||
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname === 'seauobd.me' ||
    hostname === 'www.seauobd.me'
  );
}

const THEMES = [
  'Biomed',
  'CS',
  'Robotics',
  'Fintech/business',
];

function FormField({ label, name, value, onChange, type = 'text', placeholder, required = true }) {
  return (
    <div className="sea-hacks-field">
      <label className="sea-hacks-label" htmlFor={name}>
        {label}{required ? ' *' : ''}
      </label>
      <input
        className="sea-hacks-input"
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        autoComplete={name === 'leaderName' ? 'name' : name === 'leaderEmail' ? 'email' : undefined}
      />
    </div>
  );
}

export default function SeaHacksSignup({ ready = true }) {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [teamSize, setTeamSize] = useState('1');
  const [theme, setTheme] = useState('');
  const [message, setMessage] = useState('');

  const [form, setForm] = useState({
    leaderName: '',
    leaderEmail: '',
    phone: '',
    university: '',
    teamName: '',
  });

  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    setEnabled(isStagingHost());
  }, []);

  // Allow the SEA HACKATHON banner button to open this same signup popup.
  // The staging-host check keeps this trigger disabled on production.
  useEffect(() => {
    function handleOpenSignup() {
      if (!isStagingHost()) return;

      // A manual button click should work even if the visitor dismissed
      // the automatic popup earlier in this session.
      try {
        sessionStorage.removeItem(DISMISSED_KEY);
      } catch {
        // The popup can still be opened if session storage is unavailable.
      }

      setEnabled(true);
      setVisible(true);
    }

    window.addEventListener('sea-hacks-open-signup', handleOpenSignup);
    return () => window.removeEventListener('sea-hacks-open-signup', handleOpenSignup);
  }, []);

  useEffect(() => {
    if (!enabled || !ready) return undefined;

    try {
      if (sessionStorage.getItem(DISMISSED_KEY) === '1') return undefined;
    } catch {
      // If session storage is unavailable, still allow the popup to open.
    }

    const timer = window.setTimeout(() => setVisible(true), 1000);
    return () => window.clearTimeout(timer);
  }, [enabled, ready]);

  useEffect(() => {
    const number = Number(teamSize);
    const additionalMembers = Number.isInteger(number) && number >= 1 && number <= 4
      ? number - 1
      : 0;

    setParticipants((current) =>
      Array.from(
        { length: additionalMembers },
        (_, index) => current[index] || { name: '', email: '' }
      )
    );
  }, [teamSize]);

  useEffect(() => {
    if (!visible) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') dismiss();
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [visible]);

  const updateForm = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
    setMessage('');
  };

  const updateParticipant = (index, field, value) => {
    setParticipants((current) =>
      current.map((participant, i) =>
        i === index ? { ...participant, [field]: value } : participant
      )
    );
    setMessage('');
  };

  function dismiss() {
    setVisible(false);
    try {
      sessionStorage.setItem(DISMISSED_KEY, '1');
    } catch {
      // Dismissal still works for the current render.
    }
  }

  async function handleSubmit(event) {
  event.preventDefault();

  try {
    setMessage('Submitting...');

    await submitHackathonSignup({
      name: form.leaderName,
      email: form.leaderEmail,
      phoneNumber: form.phone,
      university: form.university,
      teamSize,
      teamName: form.teamName,
      teamParticipants: participants,
      theme,
    });

    setMessage('Registration submitted successfully!');
  } catch (error) {
    console.error('Hackathon signup error:', error);
    setMessage('Something went wrong. Please try again.');
  }
}
  if (!enabled || !visible) return null;

  const validTeamSize =
    teamSize.trim() !== '' &&
    Number.isInteger(Number(teamSize)) &&
    Number(teamSize) >= 1 &&
    Number(teamSize) <= 4;

  return (
    <>
      <div
        className="sea-hacks-overlay"
        role="presentation"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) dismiss();
        }}
      >
        <section
          className="sea-hacks-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="sea-hacks-title"
        >
          <button
            className="sea-hacks-close"
            type="button"
            onClick={dismiss}
            aria-label="Close registration form"
          >
            ×
          </button>

          <div className="sea-hacks-header">
            <p className="sea-hacks-kicker">HACKATHON REGISTRATION</p>
            <h2 id="sea-hacks-title">SEA HACKS 2026</h2>
            <h3>BUILD WHAT'S NEXT</h3>
            <p className="sea-hacks-intro">Register your team to take part.</p>
            <div className="sea-hacks-red-rule" />
          </div>

          <form className="sea-hacks-form" onSubmit={handleSubmit}>
            <div className="sea-hacks-section-title">01 / TEAM LEADER</div>

            <FormField
              label="Full name"
              name="leaderName"
              value={form.leaderName}
              onChange={updateForm('leaderName')}
              placeholder="Enter your full name"
            />

            <FormField
              label="Email address"
              name="leaderEmail"
              type="email"
              value={form.leaderEmail}
              onChange={updateForm('leaderEmail')}
              placeholder="you@example.com"
            />

            <FormField
              label="Phone number"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={updateForm('phone')}
              placeholder="Enter your phone number"
            />

            <FormField
              label="Name of university"
              name="university"
              value={form.university}
              onChange={updateForm('university')}
              placeholder="Enter your university"
            />

            <div className="sea-hacks-section-title">02 / YOUR TEAM</div>

            <FormField
              label="Team name"
              name="teamName"
              value={form.teamName}
              onChange={updateForm('teamName')}
              placeholder="Enter your team name"
            />

            <div className="sea-hacks-field">
              <label className="sea-hacks-label" htmlFor="teamSize">
                Number of people (1–4 max) *
              </label>
              <input
                className="sea-hacks-input"
                id="teamSize"
                name="teamSize"
                type="number"
                min="1"
                max="4"
                step="1"
                inputMode="numeric"
                value={teamSize}
                onChange={(event) => {
                  setTeamSize(event.target.value);
                  setMessage('');
                }}
                required
                aria-describedby="team-size-help"
              />
              <p className="sea-hacks-help" id="team-size-help">
                Includes you, the team leader. Maximum 4 people per team.
              </p>
              {!validTeamSize && (
                <p className="sea-hacks-error">Enter a whole number from 1 to 4.</p>
              )}
            </div>

            {validTeamSize && Number(teamSize) > 1 && (
              <>
                <div className="sea-hacks-participants-heading">
                  PARTICIPANT DETAILS
                  <span>
                    {Number(teamSize) - 1} additional{' '}
                    {Number(teamSize) === 2 ? 'member' : 'members'}
                  </span>
                </div>

                {participants.map((participant, index) => (
                  <div className="sea-hacks-participant" key={index}>
                    <p className="sea-hacks-participant-title">
                      PARTICIPANT {index + 1}
                    </p>

                    <FormField
                      label="Full name"
                      name={`participant-${index + 1}-name`}
                      value={participant.name}
                      onChange={(event) =>
                        updateParticipant(index, 'name', event.target.value)
                      }
                      placeholder="Participant's full name"
                    />

                    <FormField
                      label="Email address"
                      name={`participant-${index + 1}-email`}
                      type="email"
                      value={participant.email}
                      onChange={(event) =>
                        updateParticipant(index, 'email', event.target.value)
                      }
                      placeholder="participant@example.com"
                    />
                  </div>
                ))}
              </>
            )}

            {validTeamSize && Number(teamSize) === 1 && (
              <p className="sea-hacks-help">
                You're registering solo. No additional participant details are needed.
              </p>
            )}

            <div className="sea-hacks-section-title">03 / CHOOSE YOUR THEME</div>

            <div className="sea-hacks-field">
              <label className="sea-hacks-label" htmlFor="hackathonTheme">
                Hackathon theme *
              </label>
              <select
                className="sea-hacks-input sea-hacks-select"
                id="hackathonTheme"
                name="hackathonTheme"
                value={theme}
                onChange={(event) => {
                  setTheme(event.target.value);
                  setMessage('');
                }}
                required
              >
                <option value="" disabled>
                  Select your preferred theme
                </option>
                {THEMES.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {message && (
              <p className="sea-hacks-message" role="status">
                {message}
              </p>
            )}

            <button
              className="sea-hacks-submit"
              type="submit"
              disabled={!validTeamSize}
            >
              REGISTER TEAM
            </button>

            <p className="sea-hacks-footnote">
              * Required fields. Registration will be connected after the database is ready.
            </p>
          </form>
        </section>
      </div>

      <style>{`
        .sea-hacks-overlay {
          position: fixed;
          inset: 0;
          z-index: 12000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          background: rgba(0, 0, 0, 0.78);
          backdrop-filter: blur(5px);
          -webkit-backdrop-filter: blur(5px);
        }

        .sea-hacks-modal {
          position: relative;
          width: 100%;
          max-width: 540px;
          max-height: min(90vh, 850px);
          overflow-y: auto;
          overscroll-behavior: contain;
          background: #0A0A0A;
          color: #FFF;
          border: 1px solid rgba(255,255,255,0.15);
          border-top: 4px solid #CC0000;
          box-shadow: 0 28px 80px rgba(0,0,0,0.55);
          padding: 28px 30px 24px;
          scrollbar-color: #CC0000 #171717;
          scrollbar-width: thin;
        }

        .sea-hacks-close {
          position: absolute;
          top: 10px;
          right: 10px;
          z-index: 2;
          width: 42px;
          height: 42px;
          border: 1px solid rgba(255,255,255,0.2);
          background: transparent;
          color: #FFF;
          font-size: 28px;
          line-height: 1;
          cursor: pointer;
        }

        .sea-hacks-close:hover {
          background: #CC0000;
          border-color: #CC0000;
        }

        .sea-hacks-header {
          text-align: center;
          padding: 4px 28px 22px;
        }

        .sea-hacks-kicker {
          margin: 0 0 12px;
          color: #CC0000;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.18em;
        }

        .sea-hacks-header h2 {
          margin: 0;
          font-size: clamp(30px, 6vw, 42px);
          line-height: 1;
          letter-spacing: -0.045em;
          font-weight: 900;
        }

        .sea-hacks-header h3 {
          margin: 10px 0 8px;
          font-size: clamp(16px, 3vw, 20px);
          line-height: 1.2;
          font-weight: 800;
          letter-spacing: -0.015em;
        }

        .sea-hacks-intro {
          margin: 0;
          color: rgba(255,255,255,0.65);
          font-size: 13px;
          line-height: 1.5;
        }

        .sea-hacks-red-rule {
          height: 3px;
          width: 100%;
          margin-top: 20px;
          background: #CC0000;
        }

        .sea-hacks-form {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .sea-hacks-section-title {
          margin-top: 4px;
          padding-bottom: 8px;
          border-bottom: 1px solid rgba(255,255,255,0.16);
          color: #FFF;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.12em;
        }

        .sea-hacks-field {
          min-width: 0;
        }

        .sea-hacks-label {
          display: block;
          margin-bottom: 6px;
          color: rgba(255,255,255,0.78);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .sea-hacks-input {
          width: 100%;
          box-sizing: border-box;
          min-height: 44px;
          padding: 11px 12px;
          border: 1px solid #444;
          border-radius: 0;
          background: #151515;
          color: #FFF;
          font-size: 14px;
          font-family: inherit;
        }

        .sea-hacks-input::placeholder {
          color: #858585;
        }

        .sea-hacks-input:focus-visible,
        .sea-hacks-close:focus-visible,
        .sea-hacks-submit:focus-visible {
          outline: 2px solid #CC0000;
          outline-offset: 2px;
        }

        .sea-hacks-select {
          cursor: pointer;
        }

        .sea-hacks-select option {
          background: #151515;
          color: #FFF;
        }

        .sea-hacks-help {
          margin: 6px 0 0;
          color: rgba(255,255,255,0.55);
          font-size: 11px;
          line-height: 1.5;
        }

        .sea-hacks-error {
          margin: 6px 0 0;
          color: #FF7777;
          font-size: 12px;
        }

        .sea-hacks-participants-heading {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 6px;
          color: #FFF;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.1em;
        }

        .sea-hacks-participants-heading span {
          color: rgba(255,255,255,0.55);
          font-size: 10px;
          letter-spacing: 0;
          font-weight: 500;
        }

        .sea-hacks-participant {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 14px;
          border: 1px solid #363636;
          background: #101010;
        }

        .sea-hacks-participant-title {
          margin: 0;
          color: #CC0000;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.14em;
        }

        .sea-hacks-submit {
          width: 100%;
          min-height: 48px;
          padding: 14px 18px;
          border: 0;
          border-radius: 0;
          background: #CC0000;
          color: #FFF;
          font-family: inherit;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 0.1em;
          cursor: pointer;
          transition: background 160ms ease, transform 160ms ease;
        }

        .sea-hacks-submit:hover:not(:disabled) {
          background: #E00000;
          transform: translateY(-1px);
        }

        .sea-hacks-submit:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .sea-hacks-message {
          margin: 0;
          padding: 12px;
          border-left: 3px solid #CC0000;
          background: #1A1A1A;
          color: #FFF;
          font-size: 12px;
          line-height: 1.5;
        }

        .sea-hacks-footnote {
          margin: -4px 0 0;
          color: rgba(255,255,255,0.45);
          font-size: 10px;
          line-height: 1.5;
        }

        @media (max-width: 600px) {
          .sea-hacks-overlay {
            align-items: center;
            padding: 10px;
          }

          .sea-hacks-modal {
            max-height: 92dvh;
            padding: 24px 18px 20px;
          }

          .sea-hacks-header {
            padding: 8px 20px 18px;
          }

          .sea-hacks-close {
            top: 7px;
            right: 7px;
            width: 40px;
            height: 40px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .sea-hacks-submit {
            transition: none;
          }
        }
      `}</style>
    </>
  );
}