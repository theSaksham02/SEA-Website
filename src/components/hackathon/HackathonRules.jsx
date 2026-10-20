import React from 'react';
import { RULES } from './hackathonData';

const HackathonRules = () => (
    <section className="sea-hack__section section-animate" aria-labelledby="hack-rules-title">
        <div className="sea-hack__inner">
            <p className="sea-hack__index">10 / Rules</p>
            <h2 id="hack-rules-title" className="sea-hack__h2">HOW IT RUNS.</h2>
            <ol className="sea-hack__rules" style={{ marginTop: 28 }}>
                {RULES.map((rule, index) => (
                    <li key={rule}>
                        <span>0{index + 1}</span>
                        {rule}
                    </li>
                ))}
            </ol>
        </div>
    </section>
);

export default HackathonRules;
