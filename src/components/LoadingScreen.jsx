import React, { useState, useEffect } from 'react';

const LoadingScreen = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [phase, setPhase] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setPhase(1), 200);
                    setTimeout(() => { setPhase(2); onComplete(); }, 1200);
                    return 100;
                }
                return prev + Math.random() * 15 + 5;
            });
        }, 80);
        return () => clearInterval(interval);
    }, [onComplete]);

    if (phase === 2) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: '#000',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: phase === 1 ? 0 : 1,
            transform: phase === 1 ? 'scale(1.1)' : 'scale(1)',
            transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
            padding: '20px'
        }}>
            {/* Animated Logo with Glow */}
            <div style={{
                position: 'relative',
                opacity: progress > 20 ? 1 : 0,
                transform: progress > 20 ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.9)',
                transition: 'all 0.6s ease'
            }}>
                {/* Glow effect */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: isMobile ? '120px' : '180px',
                    height: isMobile ? '120px' : '180px',
                    background: 'radial-gradient(circle, rgba(204, 0, 0, 0.4) 0%, transparent 70%)',
                    borderRadius: '50%',
                    animation: 'pulse-glow 2s ease-in-out infinite',
                    filter: 'blur(20px)'
                }} />
                <img
                    src="/logo-transparent.png"
                    alt="SEA"
                    style={{
                        height: isMobile ? '80px' : '120px',
                        position: 'relative',
                        zIndex: 1,
                        animation: progress > 50 ? 'logo-pulse 2s ease-in-out infinite' : 'none'
                    }}
                />
            </div>

            {/* Progress Bar */}
            <div style={{
                width: isMobile ? '150px' : '200px',
                height: '2px',
                background: '#222',
                overflow: 'hidden',
                borderRadius: '1px',
                marginTop: '50px'
            }}>
                <div style={{
                    width: `${Math.min(progress, 100)}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #CC0000, #FF3333)',
                    transition: 'width 0.1s ease',
                    boxShadow: '0 0 10px rgba(204, 0, 0, 0.5)'
                }} />
            </div>

            {/* Loading Text */}
            <div style={{
                marginTop: '20px',
                fontSize: isMobile ? '10px' : '11px',
                letterSpacing: '3px',
                color: '#555',
                fontFamily: 'monospace'
            }}>
                {progress < 100 ? 'INITIALIZING' : 'READY'}
            </div>

            {/* Bottom Decorations */}
            <div style={{
                position: 'absolute',
                bottom: '30px',
                left: '0',
                right: '0',
                display: 'flex',
                justifyContent: 'space-between',
                padding: isMobile ? '0 20px' : '0 40px',
                fontSize: isMobile ? '9px' : '10px',
                color: '#333',
                letterSpacing: '1px'
            }}>
                <span>SEA</span>
                <span>BIRMINGHAM © 2024</span>
            </div>

            {/* Keyframes */}
            <style>{`
                @keyframes pulse-glow {
                    0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
                    50% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
                }
                @keyframes logo-pulse {
                    0%, 100% { transform: scale(1); filter: brightness(1); }
                    50% { transform: scale(1.05); filter: brightness(1.1); }
                }
            `}</style>
        </div>
    );
};

export default LoadingScreen;
