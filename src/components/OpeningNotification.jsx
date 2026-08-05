import React, { useState, useEffect } from 'react';

const POPUP_DISMISSED_KEY = 'sea-cohort3-popup-dismissed';
const OPEN_DELAY_MS = 2500;
const EXIT_MS = 220;

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

function prefersReducedMotion() {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Opens the same Join modal as the B-Labs “JOIN A STARTUP” CTA. */
export function openJoinStartupModal() {
    window.dispatchEvent(
        new CustomEvent('sea-open-join-modal', { detail: { type: 'startup' } })
    );
}

/**
 * Staging-only Cohort 3 opening experience — editorial intake board.
 * Delayed modal → dismiss keeps a sharp floating launcher → opens Join a Startup.
 */
const OpeningNotification = ({ ready = true }) => {
    const [enabled, setEnabled] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [popupPhase, setPopupPhase] = useState('in'); // in | out
    const [showLauncher, setShowLauncher] = useState(false);
    const [launcherIn, setLauncherIn] = useState(false);
    const [isNarrow, setIsNarrow] = useState(false);
    const [reduceMotion, setReduceMotion] = useState(false);

    useEffect(() => {
        setEnabled(isStagingHost());
        setReduceMotion(prefersReducedMotion());
        const check = () => setIsNarrow(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        const onMq = () => setReduceMotion(mq.matches);
        mq.addEventListener?.('change', onMq);
        return () => {
            window.removeEventListener('resize', check);
            mq.removeEventListener?.('change', onMq);
        };
    }, []);

    useEffect(() => {
        if (!enabled || !ready) return undefined;

        setShowLauncher(true);
        // Next frame so CSS entrance can run
        const frame = window.requestAnimationFrame(() => setLauncherIn(true));

        const dismissed = sessionStorage.getItem(POPUP_DISMISSED_KEY) === '1';
        if (dismissed) return () => window.cancelAnimationFrame(frame);

        const timer = window.setTimeout(() => {
            setPopupPhase('in');
            setShowPopup(true);
        }, OPEN_DELAY_MS);

        return () => {
            window.cancelAnimationFrame(frame);
            window.clearTimeout(timer);
        };
    }, [enabled, ready]);

    if (!enabled) return null;

    const finishDismiss = () => {
        sessionStorage.setItem(POPUP_DISMISSED_KEY, '1');
        setShowPopup(false);
        setShowLauncher(true);
        setLauncherIn(true);
    };

    const dismissPopup = () => {
        if (reduceMotion) {
            finishDismiss();
            return;
        }
        setPopupPhase('out');
        window.setTimeout(finishDismiss, EXIT_MS);
    };

    const applyNow = () => {
        sessionStorage.setItem(POPUP_DISMISSED_KEY, '1');
        const open = () => {
            setShowPopup(false);
            setShowLauncher(true);
            setLauncherIn(true);
            window.setTimeout(() => openJoinStartupModal(), 40);
        };
        if (reduceMotion) {
            open();
            return;
        }
        setPopupPhase('out');
        window.setTimeout(open, EXIT_MS);
    };

    return (
        <>
            {showPopup && (
                <div
                    className={`sea-c3-overlay sea-c3-overlay--${popupPhase}${reduceMotion ? ' sea-c3--static' : ''}`}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="cohort3-popup-title"
                    onClick={dismissPopup}
                >
                    <div
                        className={`sea-c3-board sea-c3-board--${popupPhase}${reduceMotion ? ' sea-c3--static' : ''}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <span className="sea-c3-watermark" aria-hidden="true">03</span>
                        <span className="sea-c3-slash" aria-hidden="true" />

                        <button
                            type="button"
                            className="sea-c3-close"
                            onClick={dismissPopup}
                            aria-label="Close notification"
                        >
                            ×
                        </button>

                        <div className="sea-c3-meta sea-c3-stagger" style={{ '--d': '0ms' }}>
                            <span className="sea-c3-live">
                                <span className="sea-c3-live-dot" />
                                LIVE
                            </span>
                            <span className="sea-c3-meta-sep">/</span>
                            <span>B-LABS INTAKE</span>
                        </div>

                        <h2
                            id="cohort3-popup-title"
                            className="sea-c3-title sea-c3-stagger"
                            style={{ '--d': '90ms' }}
                        >
                            Cohort 3
                            <br />
                            <em>applications</em>
                            <br />
                            are now out.
                        </h2>

                        <p className="sea-c3-copy sea-c3-stagger" style={{ '--d': '160ms' }}>
                            The next B-Labs wave is open. Join a founding team — or reopen this anytime from the launcher on the page.
                        </p>

                        <div className="sea-c3-actions sea-c3-stagger" style={{ '--d': '230ms' }}>
                            <button type="button" className="sea-c3-cta" onClick={applyNow}>
                                <span>Join a startup</span>
                                <span className="sea-c3-cta-arrow" aria-hidden="true">→</span>
                            </button>
                            <button type="button" className="sea-c3-ghost" onClick={dismissPopup}>
                                Not now
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showLauncher && !showPopup && (
                <button
                    type="button"
                    className={`sea-c3-launcher${launcherIn ? ' sea-c3-launcher--in' : ''}${reduceMotion ? ' sea-c3--static' : ''}`}
                    onClick={applyNow}
                    aria-label="Cohort 3 applications — Join a Startup"
                    style={{
                        bottom: isNarrow ? '88px' : '28px',
                        right: isNarrow ? '14px' : '22px',
                    }}
                >
                    <span className="sea-c3-launcher-bar" aria-hidden="true" />
                    <span className="sea-c3-launcher-body">
                        <span className="sea-c3-launcher-kicker">COHORT 3</span>
                        <span className="sea-c3-launcher-label">Apps open</span>
                    </span>
                    <span className="sea-c3-launcher-go" aria-hidden="true">→</span>
                </button>
            )}

            <style>{`
                .sea-c3-overlay {
                    position: fixed;
                    inset: 0;
                    z-index: 12000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: ${isNarrow ? '16px' : '24px'};
                    background: rgba(5, 5, 5, 0.78);
                    backdrop-filter: blur(6px);
                    -webkit-backdrop-filter: blur(6px);
                    -webkit-overflow-scrolling: touch;
                }
                .sea-c3-overlay--in {
                    animation: seaC3OverlayIn 320ms cubic-bezier(0.16, 1, 0.3, 1) both;
                }
                .sea-c3-overlay--out {
                    animation: seaC3OverlayOut 200ms cubic-bezier(0.25, 1, 0.5, 1) both;
                }

                .sea-c3-board {
                    position: relative;
                    width: 100%;
                    max-width: ${isNarrow ? '100%' : '460px'};
                    max-height: 90vh;
                    overflow: hidden;
                    background: #0A0A0A;
                    color: #FFF;
                    border: 1px solid rgba(255,255,255,0.12);
                    box-shadow: 0 30px 80px rgba(0,0,0,0.55);
                    padding: ${isNarrow ? '28px 22px 24px' : '36px 34px 30px'};
                }
                .sea-c3-board--in {
                    animation: seaC3BoardIn 480ms cubic-bezier(0.16, 1, 0.3, 1) both;
                }
                .sea-c3-board--out {
                    animation: seaC3BoardOut 200ms cubic-bezier(0.25, 1, 0.5, 1) both;
                }

                .sea-c3-watermark {
                    position: absolute;
                    right: -8px;
                    top: 40%;
                    transform: translateY(-50%);
                    font-size: ${isNarrow ? '140px' : '180px'};
                    font-weight: 900;
                    line-height: 0.8;
                    letter-spacing: -0.06em;
                    color: rgba(255,255,255,0.04);
                    pointer-events: none;
                    user-select: none;
                }

                .sea-c3-slash {
                    position: absolute;
                    left: 0;
                    top: 0;
                    bottom: 0;
                    width: 5px;
                    background: #CC0000;
                }

                .sea-c3-close {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    width: 40px;
                    height: 40px;
                    border: 1px solid rgba(255,255,255,0.18);
                    background: transparent;
                    color: #FFF;
                    font-size: 22px;
                    line-height: 1;
                    cursor: pointer;
                    touch-action: manipulation;
                    transition: background 180ms cubic-bezier(0.25, 1, 0.5, 1), border-color 180ms cubic-bezier(0.25, 1, 0.5, 1);
                }
                .sea-c3-close:hover {
                    background: rgba(255,255,255,0.08);
                    border-color: rgba(255,255,255,0.4);
                }

                .sea-c3-meta {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-size: 11px;
                    font-weight: 800;
                    letter-spacing: 0.16em;
                    color: rgba(255,255,255,0.55);
                    margin-bottom: 18px;
                    padding-right: 40px;
                }
                .sea-c3-meta-sep { opacity: 0.35; }
                .sea-c3-live {
                    display: inline-flex;
                    align-items: center;
                    gap: 7px;
                    color: #CC0000;
                }
                .sea-c3-live-dot {
                    width: 7px;
                    height: 7px;
                    border-radius: 50%;
                    background: #CC0000;
                    box-shadow: 0 0 0 0 rgba(204,0,0,0.55);
                    animation: seaC3Pulse 1.7s cubic-bezier(0.25, 1, 0.5, 1) infinite;
                }

                .sea-c3-title {
                    font-size: ${isNarrow ? '34px' : '44px'};
                    font-weight: 900;
                    line-height: 0.95;
                    letter-spacing: -0.03em;
                    margin: 0 0 16px;
                    position: relative;
                    z-index: 1;
                }
                .sea-c3-title em {
                    font-style: normal;
                    color: #CC0000;
                }

                .sea-c3-copy {
                    font-size: ${isNarrow ? '14px' : '15px'};
                    line-height: 1.6;
                    color: rgba(255,255,255,0.62);
                    margin: 0 0 26px;
                    max-width: 34ch;
                    position: relative;
                    z-index: 1;
                }

                .sea-c3-actions {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    position: relative;
                    z-index: 1;
                }

                .sea-c3-cta {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: 100%;
                    min-height: 52px;
                    padding: 14px 18px;
                    border: none;
                    background: #CC0000;
                    color: #FFF;
                    font-size: 13px;
                    font-weight: 800;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    cursor: pointer;
                    touch-action: manipulation;
                    transition: transform 160ms cubic-bezier(0.25, 1, 0.5, 1), background 160ms cubic-bezier(0.25, 1, 0.5, 1);
                }
                .sea-c3-cta:hover {
                    background: #E00000;
                    transform: translateY(-1px);
                }
                .sea-c3-cta:active {
                    transform: scale(0.985);
                }
                .sea-c3-cta-arrow {
                    transition: transform 180ms cubic-bezier(0.25, 1, 0.5, 1);
                }
                .sea-c3-cta:hover .sea-c3-cta-arrow {
                    transform: translateX(4px);
                }

                .sea-c3-ghost {
                    width: 100%;
                    min-height: 44px;
                    padding: 12px;
                    border: none;
                    background: transparent;
                    color: rgba(255,255,255,0.45);
                    font-size: 12px;
                    font-weight: 600;
                    letter-spacing: 0.04em;
                    cursor: pointer;
                    touch-action: manipulation;
                    transition: color 160ms cubic-bezier(0.25, 1, 0.5, 1);
                }
                .sea-c3-ghost:hover { color: rgba(255,255,255,0.85); }

                .sea-c3-stagger {
                    animation: seaC3Rise 520ms cubic-bezier(0.16, 1, 0.3, 1) both;
                    animation-delay: var(--d, 0ms);
                }
                .sea-c3-board--out .sea-c3-stagger {
                    animation: none;
                    opacity: 1;
                }

                .sea-c3-launcher {
                    position: fixed;
                    z-index: 11000;
                    display: flex;
                    align-items: stretch;
                    gap: 0;
                    max-width: calc(100vw - 28px);
                    min-height: 52px;
                    padding: 0;
                    border: 1px solid rgba(255,255,255,0.12);
                    background: #0A0A0A;
                    color: #FFF;
                    cursor: pointer;
                    touch-action: manipulation;
                    box-shadow: 0 14px 40px rgba(0,0,0,0.4);
                    opacity: 0;
                    transform: translate3d(18px, 12px, 0);
                    transition:
                        opacity 360ms cubic-bezier(0.16, 1, 0.3, 1),
                        transform 360ms cubic-bezier(0.16, 1, 0.3, 1),
                        border-color 180ms cubic-bezier(0.25, 1, 0.5, 1);
                }
                .sea-c3-launcher--in {
                    opacity: 1;
                    transform: translate3d(0, 0, 0);
                }
                .sea-c3-launcher:hover {
                    border-color: rgba(204,0,0,0.7);
                    transform: translate3d(0, -2px, 0);
                }
                .sea-c3-launcher-bar {
                    width: 5px;
                    flex-shrink: 0;
                    background: #CC0000;
                }
                .sea-c3-launcher-body {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: flex-start;
                    padding: 10px 12px 10px 14px;
                    text-align: left;
                }
                .sea-c3-launcher-kicker {
                    font-size: 9px;
                    font-weight: 800;
                    letter-spacing: 0.18em;
                    color: #CC0000;
                    line-height: 1;
                    margin-bottom: 4px;
                }
                .sea-c3-launcher-label {
                    font-size: 13px;
                    font-weight: 800;
                    letter-spacing: 0.02em;
                    line-height: 1.1;
                }
                .sea-c3-launcher-go {
                    display: flex;
                    align-items: center;
                    padding: 0 14px 0 4px;
                    font-size: 16px;
                    color: rgba(255,255,255,0.55);
                    transition: transform 180ms cubic-bezier(0.25, 1, 0.5, 1), color 180ms cubic-bezier(0.25, 1, 0.5, 1);
                }
                .sea-c3-launcher:hover .sea-c3-launcher-go {
                    color: #FFF;
                    transform: translateX(3px);
                }

                @keyframes seaC3OverlayIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes seaC3OverlayOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }
                @keyframes seaC3BoardIn {
                    from { opacity: 0; transform: translate3d(0, 28px, 0) scale(0.97); }
                    to { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
                }
                @keyframes seaC3BoardOut {
                    from { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
                    to { opacity: 0; transform: translate3d(0, 12px, 0) scale(0.98); }
                }
                @keyframes seaC3Rise {
                    from { opacity: 0; transform: translate3d(0, 14px, 0); }
                    to { opacity: 1; transform: translate3d(0, 0, 0); }
                }
                @keyframes seaC3Pulse {
                    0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(204,0,0,0.5); }
                    50% { opacity: 0.55; box-shadow: 0 0 0 6px rgba(204,0,0,0); }
                }

                .sea-c3--static,
                .sea-c3--static .sea-c3-stagger,
                .sea-c3--static .sea-c3-live-dot {
                    animation: none !important;
                    transition: none !important;
                    opacity: 1 !important;
                    transform: none !important;
                }

                @media (prefers-reduced-motion: reduce) {
                    .sea-c3-overlay,
                    .sea-c3-board,
                    .sea-c3-stagger,
                    .sea-c3-live-dot,
                    .sea-c3-launcher,
                    .sea-c3-cta,
                    .sea-c3-cta-arrow,
                    .sea-c3-close,
                    .sea-c3-ghost,
                    .sea-c3-launcher-go {
                        animation: none !important;
                        transition: none !important;
                    }
                    .sea-c3-launcher {
                        opacity: 1 !important;
                        transform: none !important;
                    }
                }
            `}</style>
        </>
    );
};

export default OpeningNotification;
