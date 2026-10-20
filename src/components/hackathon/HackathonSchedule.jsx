import React from 'react';
import { SCHEDULE } from './hackathonData';

const HackathonSchedule = () => (
    <section id="schedule" className="sea-hack__section section-animate" aria-labelledby="hack-schedule-title">
        <div className="sea-hack__inner">
            <p className="sea-hack__index">04 / Schedule</p>
            <h2 id="hack-schedule-title" className="sea-hack__h2">THE 24 HOURS.</h2>
            <div className="sea-hack__days" style={{ marginTop: 32 }}>
                {SCHEDULE.map((day) => (
                    <div className="sea-hack__day" key={day.day}>
                        <h3>{day.day}</h3>
                        <p>{day.date}</p>
                        {day.rows.map((row) => (
                            <div className="sea-hack__slot" key={row.time}>
                                <time>{row.time}</time>
                                <span><i className="sea-hack__dot" aria-hidden="true" />{row.label}</span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default HackathonSchedule;
