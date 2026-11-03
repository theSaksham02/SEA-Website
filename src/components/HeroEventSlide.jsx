import React, { useState, useRef, useEffect } from 'react';
import { hasRealUrl } from '../data/heroEvents';

const copyText = async (text) => {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch {
        // Older iOS Safari / non-secure contexts: fall back to a hidden textarea.
        try {
            const field = document.createElement('textarea');
            field.value = text;
            field.setAttribute('readonly', '');
            field.style.cssText = 'position:fixed;top:0;left:0;opacity:0;font-size:16px;';
            document.body.appendChild(field);
            field.select();
            field.setSelectionRange(0, text.length);
            const ok = document.execCommand('copy');
            document.body.removeChild(field);
            return ok;
        } catch {
            return false;
        }
    }
};

const PromoCode = ({ code }) => {
    const [copied, setCopied] = useState(false);
    const timer = useRef(null);
    const codeRef = useRef(null);

    useEffect(() => () => clearTimeout(timer.current), []);

    const handleCopy = async () => {
        if (!(await copyText(code))) {
            // Copy blocked: select the code so it can be copied by hand.
            const range = document.createRange();
            range.selectNodeContents(codeRef.current);
            window.getSelection()?.removeAllRanges();
            window.getSelection()?.addRange(range);
            return;
        }
        setCopied(true);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="sea-hero-event-code">
            <span className="sea-hero-event-code-label">Code <strong ref={codeRef}>{code}</strong></span>
            <button
                type="button"
                className="sea-hero-event-code-copy"
                onClick={handleCopy}
                aria-label={`Copy code ${code}`}
            >
                {copied ? 'Copied' : 'Copy'}
            </button>
            <span className="sea-hero-event-sr" aria-live="polite">{copied ? `Code ${code} copied` : ''}</span>
        </div>
    );
};

const HeroEventSlide = ({ event, active, isMobile, loadImage, eager }) => {
    const [imageFailed, setImageFailed] = useState(false);
    const canVolunteer = hasRealUrl(event.volunteerUrl);
    const notes = [event.volunteerNote, event.note].filter(Boolean);

    const volunteer = canVolunteer && (
        <a
            key="volunteer"
            className="sea-hero-event-btn sea-hero-event-btn--ghost"
            href={event.volunteerUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Volunteer for ${event.name} (opens in a new tab)`}
        >
            Volunteer <span aria-hidden="true">↗</span>
        </a>
    );
    const tickets = (
        <a
            key="tickets"
            className="sea-hero-event-btn sea-hero-event-btn--solid"
            href={event.ticketsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Buy tickets for ${event.name} (opens in a new tab)`}
        >
            Buy tickets <span aria-hidden="true">↗</span>
        </a>
    );

    return (
        <div
            role="group"
            aria-roledescription="slide"
            aria-label={event.ariaLabel}
            className="sea-hero-event"
            inert={!active}
            style={{
                opacity: active ? 1 : 0,
                zIndex: active ? 1 : 0,
                pointerEvents: active ? 'auto' : 'none',
            }}
        >
            <div
                className="sea-hero-event-media"
                style={{ transform: active ? 'scale(1.1)' : 'scale(1.0)' }}
            >
                {imageFailed && (
                    <span className="sea-hero-event-mark" aria-hidden="true">
                        {event.dateLabel.split(' ')[0]}
                    </span>
                )}
                {loadImage && !imageFailed && (
                    <img
                        src={event.image}
                        alt=""
                        loading={eager ? 'eager' : 'lazy'}
                        fetchPriority={eager ? 'high' : 'auto'}
                        decoding="async"
                        onError={() => setImageFailed(true)}
                    />
                )}
            </div>
            <div className="sea-hero-event-shade" aria-hidden="true" />

            <div className="sea-hero-event-body">
                <span className="sea-hero-event-tag">Register now</span>
                <p className="sea-hero-event-badge">{event.badge}</p>
                <h2 className="sea-hero-event-title">{event.title}</h2>
                {!isMobile && <p className="sea-hero-event-sub">{event.subtitle}</p>}
                <p className="sea-hero-event-meta">{event.dateLabel} · {event.location}</p>

                <div className="sea-hero-event-actions">
                    {isMobile ? [tickets, volunteer] : [volunteer, tickets]}
                </div>

                {event.promoCode && <PromoCode code={event.promoCode} />}
                {notes.length > 0 && <p className="sea-hero-event-note">{notes.join(' · ')}</p>}
            </div>
        </div>
    );
};

export const HeroEventStyles = ({ isMobile }) => (
    <style>{`
        .sea-hero-event {
            position: absolute;
            inset: 0;
            overflow: hidden;
            color: #FFF;
            transition: opacity 1.5s ease;
        }
        .sea-hero-event-media {
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, #000 0%, #000 38%, #B3120E 100%);
            transition: transform 8s ease-out;
        }
        .sea-hero-event-media img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }
        .sea-hero-event-mark {
            position: absolute;
            right: ${isMobile ? '-4px' : '-10px'};
            top: ${isMobile ? '84px' : '90px'};
            font-size: ${isMobile ? '110px' : 'clamp(140px, 16vw, 240px)'};
            font-weight: 900;
            line-height: 0.8;
            letter-spacing: -0.06em;
            color: rgba(255, 255, 255, 0.07);
            white-space: nowrap;
            user-select: none;
        }
        .sea-hero-event-shade {
            position: absolute;
            inset: 0;
            background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.78) 40%, rgba(0,0,0,0.35) 75%, rgba(0,0,0,0.1) 100%);
        }
        .sea-hero-event-body {
            position: absolute;
            left: ${isMobile ? '20px' : '50px'};
            right: ${isMobile ? '20px' : '50px'};
            bottom: ${isMobile ? '74px' : '105px'};
            max-width: 600px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }
        .sea-hero-event-tag {
            background: #CC0000;
            color: #FFF;
            font-size: 10px;
            font-weight: 800;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            padding: 6px 10px;
            margin-bottom: ${isMobile ? '10px' : '14px'};
        }
        .sea-hero-event-badge {
            font-size: ${isMobile ? '10px' : '11px'};
            font-weight: 700;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: rgba(255,255,255,0.85);
            margin-bottom: ${isMobile ? '10px' : '14px'};
        }
        .sea-hero-event-title {
            font-size: ${isMobile ? '34px' : 'clamp(40px, 4.4vw, 68px)'};
            font-weight: 900;
            line-height: 0.95;
            letter-spacing: ${isMobile ? '-1px' : '-2px'};
            text-transform: uppercase;
            margin-bottom: ${isMobile ? '10px' : '14px'};
        }
        .sea-hero-event-sub {
            font-size: 16px;
            font-weight: 500;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 100%;
            margin-bottom: 6px;
        }
        .sea-hero-event-meta {
            font-size: ${isMobile ? '12px' : '13px'};
            font-weight: 700;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            color: rgba(255,255,255,0.85);
            line-height: 1.5;
        }
        .sea-hero-event-actions {
            display: flex;
            flex-direction: ${isMobile ? 'column' : 'row'};
            align-self: stretch;
            gap: ${isMobile ? '8px' : '12px'};
            margin-top: ${isMobile ? '16px' : '24px'};
        }
        .sea-hero-event-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            min-height: 48px;
            padding: 0 26px;
            border: 2px solid;
            font-size: 12px;
            font-weight: 800;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            white-space: nowrap;
            touch-action: manipulation;
            transition: background 220ms cubic-bezier(0.25, 1, 0.5, 1), color 220ms cubic-bezier(0.25, 1, 0.5, 1), border-color 220ms cubic-bezier(0.25, 1, 0.5, 1), transform 220ms cubic-bezier(0.25, 1, 0.5, 1);
        }
        .sea-hero-event-btn--ghost {
            border-color: #FFF;
            color: #FFF;
            background: transparent;
        }
        .sea-hero-event-btn--ghost:hover {
            background: #FFF;
            color: #000;
            transform: translateY(-2px);
        }
        .sea-hero-event-btn--solid {
            border-color: #CC0000;
            background: #CC0000;
            color: #FFF;
        }
        .sea-hero-event-btn--solid:hover {
            border-color: #A30000;
            background: #A30000;
            transform: translateY(-2px);
        }
        .sea-hero-event-btn:focus-visible,
        .sea-hero-event-code-copy:focus-visible {
            outline: 2px solid #FFF;
            outline-offset: 3px;
        }
        .sea-hero-event-code {
            display: flex;
            align-items: stretch;
            margin-top: 12px;
            border: 1px dashed rgba(255,255,255,0.55);
            background: rgba(0,0,0,0.35);
        }
        .sea-hero-event-code-label {
            display: flex;
            align-items: center;
            padding: 0 12px;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            color: rgba(255,255,255,0.85);
        }
        .sea-hero-event-code-label strong {
            color: #FFF;
            font-weight: 900;
            margin-left: 6px;
        }
        .sea-hero-event-code-copy {
            min-height: ${isMobile ? '44px' : '36px'};
            min-width: 76px;
            padding: 0 14px;
            border: none;
            border-left: 1px dashed rgba(255,255,255,0.55);
            background: transparent;
            color: #FFF;
            font-size: 11px;
            font-weight: 800;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            touch-action: manipulation;
        }
        .sea-hero-event-code-copy:hover {
            background: #FFF;
            color: #000;
        }
        .sea-hero-event-note {
            margin-top: 10px;
            font-size: 12px;
            line-height: 1.5;
            color: rgba(255,255,255,0.8);
            max-width: 460px;
        }
        .sea-hero-event-sr {
            position: absolute;
            width: 1px;
            height: 1px;
            overflow: hidden;
            clip: rect(0 0 0 0);
            white-space: nowrap;
        }
        @media (prefers-reduced-motion: reduce) {
            .sea-hero-event,
            .sea-hero-event-media,
            .sea-hero-event-btn {
                transition: none !important;
                transform: none !important;
            }
        }
    `}</style>
);

export default HeroEventSlide;
