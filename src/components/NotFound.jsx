import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div style={{
            minHeight: '100vh',
            background: '#000',
            color: '#FFF',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '40px',
            textAlign: 'center'
        }}>
            {/* Glitchy 404 */}
            <div style={{
                fontSize: 'clamp(100px, 20vw, 300px)',
                fontWeight: '900',
                color: '#CC0000',
                letterSpacing: '-10px',
                lineHeight: '0.9',
                position: 'relative',
                marginBottom: '40px'
            }}>
                <span style={{
                    position: 'relative',
                    display: 'inline-block',
                    animation: 'glitch 2s infinite'
                }}>
                    404
                </span>
            </div>

            <h1 style={{
                fontSize: '24px',
                fontWeight: '800',
                marginBottom: '20px',
                letterSpacing: '2px'
            }}>
                PAGE NOT FOUND
            </h1>

            <p style={{
                fontSize: '14px',
                color: '#666',
                maxWidth: '400px',
                lineHeight: '1.6',
                marginBottom: '40px'
            }}>
                Looks like this startup idea didn't make it past the incubator.
                Let's get you back to building.
            </p>

            <Link to="/" style={{
                background: '#CC0000',
                color: '#FFF',
                padding: '15px 40px',
                fontSize: '12px',
                fontWeight: '800',
                letterSpacing: '2px',
                textDecoration: 'none',
                transition: 'all 0.3s ease'
            }}>
                BACK TO HOME →
            </Link>

            {/* Decorative grid lines */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `
                    linear-gradient(rgba(204,0,0,0.03) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(204,0,0,0.03) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px',
                pointerEvents: 'none'
            }} />

            <style>{`
                @keyframes glitch {
                    0%, 100% { transform: translate(0); }
                    20% { transform: translate(-2px, 2px); }
                    40% { transform: translate(2px, -2px); }
                    60% { transform: translate(-1px, 1px); }
                    80% { transform: translate(1px, -1px); }
                }
            `}</style>
        </div>
    );
};

export default NotFound;
