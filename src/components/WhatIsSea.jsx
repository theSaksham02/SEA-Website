import React, { useState, useEffect } from 'react';

const WhatIsSea = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <section
            aria-labelledby="what-is-sea-title"
            style={{
                background: '#FFF',
                color: '#000',
                borderTop: '1px solid #E5E5E5',
                borderBottom: '1px solid #E5E5E5',
                padding: isMobile ? '48px 25px' : '72px 50px',
            }}
        >
            <div style={{ maxWidth: '820px' }}>
                <p style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '2px', color: '#CC0000', margin: 0 }}>
                    UNIVERSITY OF BIRMINGHAM DUBAI
                </p>
                <h2
                    id="what-is-sea-title"
                    style={{
                        fontSize: isMobile ? '28px' : '40px',
                        fontWeight: 900,
                        letterSpacing: '-0.03em',
                        lineHeight: 1.05,
                        margin: '12px 0 16px',
                    }}
                >
                    What is SEA?
                </h2>
                <p style={{ fontSize: isMobile ? '16px' : '18px', lineHeight: 1.65, color: '#333', margin: 0, maxWidth: '62ch' }}>
                    The Student Entrepreneurship Association (SEA) is the student founder community at the University of Birmingham Dubai.
                    B-Labs is our incubator. Students can join a startup team, apply with an idea, or come to the events listed on this page.
                    The official site is seauobd.me.
                </p>
            </div>
        </section>
    );
};

export default WhatIsSea;
