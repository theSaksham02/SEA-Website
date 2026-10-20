import React, { useState } from 'react';
import { FAQ } from './hackathonData';

const HackathonFaq = () => {
    const [open, setOpen] = useState(null);

    return (
        <section className="sea-hack__section section-animate" aria-labelledby="hack-faq-title">
            <div className="sea-hack__inner">
                <p className="sea-hack__index">11 / FAQ</p>
                <h2 id="hack-faq-title" className="sea-hack__h2">BEFORE YOU ASK.</h2>
                <div className="sea-hack__faq" style={{ marginTop: 28 }}>
                    {FAQ.map((item, index) => {
                        const isOpen = open === index;
                        return (
                            <div className={`sea-hack__faq-item${isOpen ? ' is-open' : ''}`} key={item.q}>
                                <button
                                    type="button"
                                    aria-expanded={isOpen}
                                    onClick={() => setOpen(isOpen ? null : index)}
                                >
                                    <span>{item.q}</span>
                                    <span aria-hidden="true">{isOpen ? '–' : '+'}</span>
                                </button>
                                {isOpen && (
                                    <div className="sea-hack__faq-panel">
                                        <p>{item.a}</p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default HackathonFaq;
