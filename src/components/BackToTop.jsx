import React, { useState, useEffect } from 'react';

const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.scrollY > 500);
        };
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button
            onClick={scrollToTop}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onFocus={() => setIsHovered(true)}
            onBlur={() => setIsHovered(false)}
            aria-label="Back to top"
            style={{
                position: 'fixed',
                bottom: '30px',
                right: '30px',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: isHovered ? '#CC0000' : '#000',
                color: '#FFF',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                zIndex: 100,
                opacity: isVisible ? 1 : 0,
                transform: isVisible
                    ? (isHovered ? 'translateY(-5px) scale(1.1)' : 'translateY(0) scale(1)')
                    : 'translateY(20px) scale(0.8)',
                pointerEvents: isVisible ? 'auto' : 'none',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: isHovered
                    ? '0 10px 30px rgba(204, 0, 0, 0.4)'
                    : '0 5px 20px rgba(0, 0, 0, 0.3)',
                outline: 'none'
            }}
        >
            ↑
        </button>
    );
};

export default BackToTop;
