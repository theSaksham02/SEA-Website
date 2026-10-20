import React from 'react';
import { AWARDS } from './hackathonData';

const HackathonAwards = () => (
    <section className="sea-hack__section sea-hack__awards section-animate" aria-labelledby="hack-awards-title">
        <div className="sea-hack__inner">
            <p className="sea-hack__index">05 / Awards</p>
            <h2 id="hack-awards-title" className="sea-hack__h2">WHAT&apos;S ON THE TABLE.</h2>
            <p className="sea-hack__total">{AWARDS.total}</p>
            {AWARDS.rows.map((row) => (
                <div className="sea-hack__award-row" key={row.label}>
                    <span>{row.label}</span>
                    <strong>{row.value}</strong>
                </div>
            ))}
        </div>
    </section>
);

export default HackathonAwards;
