import React from 'react';
import { TRACKS, TRACKS_NOTE } from './hackathonData';

const HackathonTracks = () => (
    <section className="sea-hack__section section-animate" aria-labelledby="hack-tracks-title">
        <div className="sea-hack__inner">
            <p className="sea-hack__index">03 / Tracks</p>
            <h2 id="hack-tracks-title" className="sea-hack__h2">WHAT YOU&apos;LL BUILD.</h2>
            <div className="sea-hack__cards" style={{ marginTop: 28 }}>
                {TRACKS.map((track) => (
                    <article className="sea-hack__card" key={track.number}>
                        <span className="sea-hack__card-no">{track.number}</span>
                        <h3>{track.title}</h3>
                        {track.by && <p className="sea-hack__by">{track.by}</p>}
                        <p>{track.body}</p>
                        {track.prize && <p className="sea-hack__prize">{track.prize}</p>}
                    </article>
                ))}
            </div>
            <p className="sea-hack__note">{TRACKS_NOTE}</p>
        </div>
    </section>
);

export default HackathonTracks;
