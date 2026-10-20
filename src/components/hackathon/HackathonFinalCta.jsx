import React from 'react';

const HackathonFinalCta = ({ onRegister }) => (
    <section className="sea-hack__final section-animate" aria-labelledby="hack-final-title">
        <div className="sea-hack__inner">
            <p className="sea-hack__index">12 / Register</p>
            <h2 id="hack-final-title">OTHERS LIKE TO DREAM. WE LIKE TO BUILD.</h2>
            <button type="button" className="sea-hack__btn" onClick={onRegister}>
                Register now ↗
            </button>
        </div>
    </section>
);

export default HackathonFinalCta;
