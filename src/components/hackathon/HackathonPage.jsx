import React from 'react';
import Navbar from '../Navbar';
import TerminalFooter from '../TerminalFooter';
import '../../styles/hackathon.css';

const HackathonPage = () => {
    return (
        <div className="sea-hack sea-hack--coming-soon">
            <Navbar />

            <main className="sea-hack__coming-soon">
                <div className="sea-hack__inner">
                    <p className="sea-hack__eyebrow">
                        <span />
                        SEA HACKS
                    </p>

                    <h1>
                        COMING
                        <br />
                        <em>SOON.</em>
                    </h1>

                    <p className="sea-hack__coming-copy">
                        SEA Hacks has been postponed.
                        New dates and details will be announced soon.
                    </p>
                </div>
            </main>

            <TerminalFooter />
        </div>
    );
};

export default HackathonPage;