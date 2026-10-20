import React from 'react';
import { SPEAKERS } from './hackathonData';

const HackathonSpeakers = () => (
    <section className="sea-hack__section section-animate" aria-labelledby="hack-speakers-title">
        <div className="sea-hack__inner">
            <p className="sea-hack__index">08 / Speakers</p>
            <h2 id="hack-speakers-title" className="sea-hack__h2">SPEAKERS &amp; JUDGES.</h2>
            <div className="sea-hack__speaker-grid" style={{ marginTop: 28 }}>
                {SPEAKERS.map((person) => (
                    <article className="sea-hack__speaker" key={person.name}>
                        <p className="sea-hack__index">Panel / Judge</p>
                        <h3>{person.name}</h3>
                        <p>{person.role}</p>
                        <p style={{ marginTop: 8 }}>{person.detail}</p>
                    </article>
                ))}
            </div>
        </div>
    </section>
);

export default HackathonSpeakers;
