import React from 'react';
import { VENUE } from './hackathonData';

const HackathonVenue = () => (
    <section className="sea-hack__section section-animate" aria-labelledby="hack-venue-title">
        <div className="sea-hack__inner">
            <p className="sea-hack__index">09 / Venue</p>
            <h2 id="hack-venue-title" className="sea-hack__h2">WHERE TO GO.</h2>
            <div className="sea-hack__venue-grid" style={{ marginTop: 28 }}>
                {VENUE.rooms.map((room) => (
                    <article className="sea-hack__venue-card" key={room.place}>
                        <p className="sea-hack__index">{room.use}</p>
                        <h3>{room.place}</h3>
                    </article>
                ))}
            </div>
            <ul className="sea-hack__bring">
                {VENUE.bring.map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
            <p className="sea-hack__note">{VENUE.note}</p>
        </div>
    </section>
);

export default HackathonVenue;
