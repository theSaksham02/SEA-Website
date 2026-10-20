import React from 'react';
import { PLATFORMS } from './hackathonData';

const HackathonPlatforms = () => (
    <section className="sea-hack__section section-animate" aria-labelledby="hack-platforms-title">
        <div className="sea-hack__inner">
            <p className="sea-hack__index">06 / Platforms</p>
            <h2 id="hack-platforms-title" className="sea-hack__h2">PLATFORMS YOU GET.</h2>
            <div className="sea-hack__tiles" style={{ marginTop: 28 }}>
                {PLATFORMS.map((item) => (
                    <article className="sea-hack__tile" key={item.name}>
                        <h3>{item.name}</h3>
                        <p>{item.detail}</p>
                    </article>
                ))}
            </div>
        </div>
    </section>
);

export default HackathonPlatforms;
