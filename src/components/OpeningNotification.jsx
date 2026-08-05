import React, { useState, useEffect } from 'react';

const STORAGE_KEY = 'sea-dismiss-cohort3-apps-banner';

function isStagingHost() {
    if (typeof window === 'undefined') return false;
    const host = window.location.hostname;
    return host.includes('staging') || host === 'localhost' || host === '127.0.0.1';
}

/**
 * Staging-only opening banner for Cohort 3 applications.
 * Does not render on production hostnames.
 */
const OpeningNotification = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!isStagingHost()) return;
        if (sessionStorage.getItem(STORAGE_KEY) === '1') return;
        setVisible(true);
        document.documentElement.style.setProperty('--opening-banner-height', '44px');
        return () => {
            document.documentElement.style.setProperty('--opening-banner-height', '0px');
        };
    }, []);

    if (!visible) return null;

    const dismiss = () => {
        sessionStorage.setItem(STORAGE_KEY, '1');
        document.documentElement.style.setProperty('--opening-banner-height', '0px');
        setVisible(false);
    };

    const goToPortfolio = (e) => {
        e.preventDefault();
        const el = document.querySelector('#ventures');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div
            role="status"
            aria-live="polite"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1100,
                background: '#CC0000',
                color: '#FFF',
                padding: '10px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                flexWrap: 'wrap',
                fontFamily: 'inherit',
                boxShadow: '0 2px 12px rgba(0,0,0,0.25)',
            }}
        >
            <span style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.04em', textAlign: 'center' }}>
                Cohort 3 applications are now out
            </span>
            <a
                href="#ventures"
                onClick={goToPortfolio}
                style={{
                    fontSize: '12px',
                    fontWeight: 800,
                    color: '#FFF',
                    textDecoration: 'underline',
                    textUnderlineOffset: '3px',
                    whiteSpace: 'nowrap',
                }}
            >
                View portfolio →
            </a>
            <button
                type="button"
                onClick={dismiss}
                aria-label="Dismiss notification"
                style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    border: 'none',
                    color: '#FFF',
                    fontSize: '18px',
                    lineHeight: 1,
                    cursor: 'pointer',
                    padding: '4px 8px',
                    opacity: 0.9,
                }}
            >
                ×
            </button>
        </div>
    );
};

export default OpeningNotification;
