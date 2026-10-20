import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import TerminalFooter from '../TerminalFooter';
import HackathonHero from './HackathonHero';
import HackathonTicker from './HackathonTicker';
import HackathonTracks from './HackathonTracks';
import HackathonSchedule from './HackathonSchedule';
import HackathonAwards from './HackathonAwards';
import HackathonPlatforms from './HackathonPlatforms';
import HackathonPartners from './HackathonPartners';
import HackathonSpeakers from './HackathonSpeakers';
import HackathonVenue from './HackathonVenue';
import HackathonRules from './HackathonRules';
import HackathonFaq from './HackathonFaq';
import HackathonFinalCta from './HackathonFinalCta';
import HackathonRegister from './HackathonRegister';
import { PAGE_DESCRIPTION, PAGE_TITLE } from './hackathonData';
import '../../styles/hackathon.css';

const HackathonPage = () => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const previousTitle = document.title;
        const meta = document.querySelector('meta[name="description"]');
        const previousDescription = meta?.getAttribute('content');
        document.title = PAGE_TITLE;
        meta?.setAttribute('content', PAGE_DESCRIPTION);
        window.scrollTo(0, 0);
        return () => {
            document.title = previousTitle;
            if (previousDescription) meta?.setAttribute('content', previousDescription);
        };
    }, []);

    useEffect(() => {
        const root = document.querySelector('.sea-hack');
        if (!root) return undefined;
        const nodes = root.querySelectorAll('.section-animate');
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduce || typeof IntersectionObserver === 'undefined') {
            nodes.forEach((node) => node.classList.add('visible'));
            return undefined;
        }
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        nodes.forEach((node) => observer.observe(node));
        return () => observer.disconnect();
    }, []);

    return (
        <div className="sea-hack">
            <Navbar />
            <main>
                <HackathonHero onRegister={() => setOpen(true)} />
                <HackathonTicker />
                <HackathonTracks />
                <HackathonSchedule />
                <HackathonAwards />
                <HackathonPlatforms />
                <HackathonPartners />
                <HackathonSpeakers />
                <HackathonVenue />
                <HackathonRules />
                <HackathonFaq />
                <HackathonFinalCta onRegister={() => setOpen(true)} />
            </main>
            <TerminalFooter />
            <HackathonRegister open={open} onClose={() => setOpen(false)} />
        </div>
    );
};

export default HackathonPage;
