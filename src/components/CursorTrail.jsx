import React, { useState, useEffect } from 'react';

const CursorTrail = () => {
    const [trails, setTrails] = useState([]);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });

            // Add new trail dot
            const newTrail = {
                id: Date.now(),
                x: e.clientX,
                y: e.clientY
            };

            setTrails(prev => [...prev.slice(-8), newTrail]); // Keep last 8 dots
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Clean up old trails
    useEffect(() => {
        const cleanup = setInterval(() => {
            setTrails(prev => prev.slice(1));
        }, 100);
        return () => clearInterval(cleanup);
    }, []);

    return (
        <>
            {/* Main cursor dot */}
            <div style={{
                position: 'fixed',
                left: mousePos.x - 5,
                top: mousePos.y - 5,
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: '#CC0000',
                pointerEvents: 'none',
                zIndex: 9999,
                transition: 'transform 0.1s ease',
                mixBlendMode: 'difference'
            }} />

            {/* Trail dots */}
            {trails.map((trail, index) => (
                <div
                    key={trail.id}
                    style={{
                        position: 'fixed',
                        left: trail.x - 3,
                        top: trail.y - 3,
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: '#CC0000',
                        opacity: (index + 1) / trails.length * 0.5,
                        pointerEvents: 'none',
                        zIndex: 9998,
                        transform: `scale(${(index + 1) / trails.length})`
                    }}
                />
            ))}
        </>
    );
};

export default CursorTrail;
