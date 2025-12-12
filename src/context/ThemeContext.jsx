import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(() => {
        const saved = localStorage.getItem('sea-theme');
        return saved ? saved === 'dark' : false; // Default to light
    });

    useEffect(() => {
        localStorage.setItem('sea-theme', isDark ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    }, [isDark]);

    const toggleTheme = () => setIsDark(prev => !prev);

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Theme Toggle Button Component
export const ThemeToggle = () => {
    const { isDark, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            style={{
                position: 'fixed',
                bottom: '30px',
                right: '30px',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                border: '2px solid',
                borderColor: isDark ? '#FFF' : '#000',
                background: isDark ? '#000' : '#FFF',
                color: isDark ? '#FFF' : '#000',
                cursor: 'pointer',
                fontSize: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
                transition: 'all 0.3s ease',
                boxShadow: isDark ? '0 0 20px rgba(255,255,255,0.1)' : '0 0 20px rgba(0,0,0,0.1)'
            }}
        >
            {isDark ? '☀️' : '🌙'}
        </button>
    );
};
