import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, ThemeToggle } from './context/ThemeContext';
import LoadingScreen from './components/LoadingScreen';
import CursorTrail from './components/CursorTrail';
import BackToTop from './components/BackToTop';
import Navbar from './components/Navbar';
import SwissHero from './components/SwissHero';
import ProcessAbout from './components/ProcessAbout';
import FoundersNote from './components/FoundersNote';
import MasonryTeam from './components/MasonryTeam';
import TimelineEvents from './components/TimelineEvents';
import CohortTicker from './components/CohortTicker';
import Partners from './components/Partners';
import BlogNews from './components/BlogNews';
import TerminalFooter from './components/TerminalFooter';
import NotFound from './components/NotFound';
import AdminDashboard from './components/AdminDashboard';
import './styles/index.css';

const HomePage = () => {
  return (
    <>
      {/* Skip to content link for accessibility */}
      <a href="#about" className="skip-link">Skip to content</a>

      <Navbar />
      <main>
        <SwissHero />
        <ProcessAbout />
        <FoundersNote />
        <MasonryTeam />
        <TimelineEvents />
        <CohortTicker />
        <Partners />
        <BlogNews />
      </main>
      <TerminalFooter />
    </>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    if (isLoading) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    setTimeout(() => {
      document.querySelectorAll('.section-animate, .fade-in-section').forEach(el => observer.observe(el));
    }, 100);
    return () => observer.disconnect();
  }, [isLoading]);

  return (
    <ThemeProvider>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      <div style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.5s ease', minHeight: '100vh' }}>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>

        {/* Back to top button */}
        <BackToTop />

        {/* Cursor trail - desktop only */}
        {!isMobile && <CursorTrail />}
      </div>

      {/* Google Analytics - replace UA-XXXXX with your tracking ID */}
      {/* 
      <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'GA_MEASUREMENT_ID');
      </script>
      */}
    </ThemeProvider>
  );
}

export default App;
