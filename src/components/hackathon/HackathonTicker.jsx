import React from 'react';
import { TICKER } from './hackathonData';

const HackathonTicker = () => (
    <div className="sea-hack__ticker" aria-hidden="true">
        <div className="sea-hack__marquee-track">
            <span>{TICKER}&nbsp;</span>
            <span aria-hidden="true">{TICKER}&nbsp;</span>
        </div>
    </div>
);

export default HackathonTicker;
