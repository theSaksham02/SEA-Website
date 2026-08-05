import React, { useState, useEffect } from 'react';

const POPUP_DISMISSED_KEY = 'sea-cohort3-popup-dismissed';
const OPEN_DELAY_MS = 2500;

function isStagingHost() {
    if (typeof window === 'undefined') return false;
    const host = window.location.hostname;
    return (
        host.includes('staging') ||
        host.includes('git-staging') ||
        host === 'localhost' ||
        host === '127.0.0.1'
    );
}

/** Opens the same Join modal as the B-Labs “JOIN A STARTUP” CTA. */
export function openJoinStartupModal() {
    window.dispatchEvent(
        new CustomEvent('sea-open-join-modal', { detail: { type: 'startup' } })
    );
}

/**
 * Staging-only Cohort 3 opening experience:
 * 1) ~2.5s after the site is ready → modal popup
 * 2) Dismiss keeps a floating launcher (mobile + desktop)
 * 3) CTA opens the Join a Startup application modal
 */
const OpeningNotification = ({ ready = true }) => {
    const [enabled, setEnabled] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [showLauncher, setShowLauncher] = useState(false);
    const [isNarrow, setIsNarrow] = useState(false);

    useEffect(() => {
        setEnabled(isStagingHost());
        const check = () => setIsNarrow(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    useEffect(() => {
        if (!enabled || !ready) return undefined;

        // Always keep the floating launcher available on staging once ready
        setShowLauncher(true);

        const dismissed = sessionStorage.getItem(POPUP_DISMISSED_KEY) === '1';
        if (dismissed) return undefined;

        const timer = window.setTimeout(() => {
            setShowPopup(true);
        }, OPEN_DELAY_MS);

        return () => window.clearTimeout(timer);
    }, [enabled, ready]);

    if (!enabled) return null;

    const dismissPopup = () => {
        sessionStorage.setItem(POPUP_DISMISSED_KEY, '1');
        setShowPopup(false);
        setShowLauncher(true);
    };

    const applyNow = () => {
        sessionStorage.setItem(POPUP_DISMISSED_KEY, '1');
        setShowPopup(false);
        setShowLauncher(true);
        window.setTimeout(() => openJoinStartupModal(), 50);
    };

    return (
        <>
            {showPopup && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="cohort3-popup-title"
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 12000,
                        background: 'rgba(0,0,0,0.72)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: isNarrow ? '16px' : '24px',
                        WebkitOverflowScrolling: 'touch',
                    }}
                    onClick={dismissPopup}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            position: 'relative',
                            width: '100%',
                            maxWidth: isNarrow ? '100%' : '420px',
                            background: '#FFF',
                            color: '#000',
                            boxShadow: '0 24px 60px rgba(0,0,0,0.45)',
                            maxHeight: '90vh',
                            overflowY: 'auto',
                        }}
                    >
                        <div style={{ background: '#CC0000', color: '#FFF', padding: isNarrow ? '28px 22px' : '36px 32px' }}>
                            <p style={{ fontSize: '11px', letterSpacing: '2px', fontWeight: 700, opacity: 0.85, margin: 0 }}>
                                B-LABS · COHORT 3
                            </p>
                            <h2
                                id="cohort3-popup-title"
                                style={{
                                    fontSize: isNarrow ? '26px' : '32px',
                                    fontWeight: 900,
                                    margin: '10px 0 0',
                                    lineHeight: 1.15,
                                }}
                            >
                                Cohort 3 applications are now out
                            </h2>
                        </div>

                        <div style={{ padding: isNarrow ? '22px' : '28px 32px' }}>
                            <p style={{ fontSize: isNarrow ? '15px' : '16px', color: '#444', lineHeight: 1.55, margin: '0 0 22px' }}>
                                Applications for the next B-Labs wave are open. Join a startup team — or come back anytime via the Cohort 3 button on this page.
                            </p>

                            <button
                                type="button"
                                onClick={applyNow}
                                style={{
                                    width: '100%',
                                    background: '#CC0000',
                                    color: '#FFF',
                                    border: 'none',
                                    padding: isNarrow ? '16px' : '18px',
                                    fontSize: '13px',
                                    fontWeight: 800,
                                    letterSpacing: '1px',
                                    cursor: 'pointer',
                                    minHeight: '48px',
                                    touchAction: 'manipulation',
                                }}
                            >
                                JOIN A STARTUP →
                            </button>

                            <button
                                type="button"
                                onClick={dismissPopup}
                                style={{
                                    width: '100%',
                                    background: 'transparent',
                                    color: '#888',
                                    border: 'none',
                                    padding: '14px',
                                    marginTop: '8px',
                                    fontSize: '12px',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    minHeight: '44px',
                                    touchAction: 'manipulation',
                                }}
                            >
                                Not now
                            </button>
                        </div>

                        <button
                            type="button"
                            onClick={dismissPopup}
                            aria-label="Close notification"
                            style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                width: '40px',
                                height: '40px',
                                border: 'none',
                                background: 'rgba(0,0,0,0.2)',
                                color: '#FFF',
                                fontSize: '22px',
                                lineHeight: 1,
                                cursor: 'pointer',
                                touchAction: 'manipulation',
                            }}
                        >
                            ×
                        </button>
                    </div>
                </div>
            )}

            {showLauncher && !showPopup && (
                <button
                    type="button"
                    onClick={applyNow}
                    aria-label="Cohort 3 applications — Join a Startup"
                    style={{
                        position: 'fixed',
                        zIndex: 11000,
                        right: isNarrow ? '14px' : '22px',
                        bottom: isNarrow ? '88px' : '28px',
                        left: 'auto',
                        background: '#CC0000',
                        color: '#FFF',
                        border: 'none',
                        borderRadius: '999px',
                        padding: isNarrow ? '12px 16px' : '14px 20px',
                        fontSize: isNarrow ? '12px' : '13px',
                        fontWeight: 800,
                        letterSpacing: '0.04em',
                        cursor: 'pointer',
                        boxShadow: '0 8px 28px rgba(204,0,0,0.45)',
                        maxWidth: isNarrow ? 'calc(100vw - 28px)' : 'none',
                        minHeight: '44px',
                        touchAction: 'manipulation',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                    }}
                >
                    <span
                        style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: '#FFF',
                            flexShrink: 0,
                            animation: 'sea-pulse 1.6s ease-in-out infinite',
                        }}
                    />
                    Cohort 3 apps open
                </button>
            )}

            <style>{`
                @keyframes sea-pulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.45; transform: scale(0.85); }
                }
            `}</style>
        </>
    );
};

export default OpeningNotification;
