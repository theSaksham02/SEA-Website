import React, { useState, useRef, useEffect } from 'react';

const MasonryTeam = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const team = [
        { name: "Saksham Mishra", role: "President", img: "/team/Prez-§-Saksham.jpeg", linkedin: "" },
        { name: "Hiva Vadoodi", role: "Vice President", img: "/team/Hiva.png", linkedin: "" },
        { name: "Roza Dehestany", role: "B-Labs Chair", img: "/team/Roza.png", linkedin: "" },
        { name: "Dev Malhotra", role: "Chief of Staff", img: "/team/Dev.jpg", linkedin: "" },
        { name: "Simran Patidar", role: "Sr. B-Labs Analyst", img: "/team/Simran.png", linkedin: "" },
        { name: "Marufjon Isomadinov", role: "Jr. B-Labs Analyst", img: "/team/Maruf.png", linkedin: "" },
        { name: "Abdulmumin Dagazau", role: "Chief of Marketing", img: "/team/Abdul.png", linkedin: "" },
        { name: "Lakshya Arora", role: "Creative Brand Director", img: "/team/Lakshya.png", linkedin: "" },
        { name: "Venya Mongia", role: "Marketing & Creative Coordinator", img: "/team/Venya.jpg", linkedin: "" },
        { name: "Hayaa Pardasani", role: "Co-Chair Event", img: "/team/Hayaa.png", linkedin: "" },
        { name: "Manasi", role: "Co-Chair Events", img: "/team/Manasi.png", linkedin: "" },
        { name: "Bhavika Grover", role: "Co-Chair Partnership and Outreach", img: "/team/Bhavika.png", linkedin: "" },
        { name: "Shrey Baherwani", role: "Brand & Outreach Coordinator", img: "/team/Shrey.png", linkedin: "" },
        { name: "Kartik Gupta", role: "Chief of Technology", img: "/team/Kartik.png", linkedin: "" },
        { name: "Hunaid", role: "Technical Coordinator", img: "/team/Hunaid.png", linkedin: "" }
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.1 });
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
    }, []);

    const columns = isMobile ? 2 : (window.innerWidth < 1024 ? 3 : 4);

    return (
        <section id="team" ref={sectionRef} style={{ background: '#000', padding: '0' }}>
            <div style={{
                padding: isMobile ? '50px 25px 30px' : '60px 50px 40px',
                color: '#FFF',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                transition: 'all 0.8s ease'
            }}>
                <span style={{ fontSize: '11px', color: '#CC0000', fontWeight: 'bold', letterSpacing: '2px' }}>THE FACES OF SEA</span>
                <h2 style={{
                    fontSize: isMobile ? '28px' : 'clamp(36px, 5vw, 56px)',
                    fontWeight: '900',
                    marginTop: '12px',
                    color: '#FFF'
                }}>MEET THE <span style={{ color: '#CC0000' }}>TEAM.</span></h2>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                gap: '2px'
            }}>
                {team.map((member, i) => (
                    <TeamCard key={i} member={member} delay={i * 0.04} isVisible={isVisible} isMobile={isMobile} />
                ))}
            </div>
        </section>
    );
};

const TeamCard = ({ member, delay, isVisible, isMobile }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [showInfo, setShowInfo] = useState(false);

    const handleClick = () => {
        if (isMobile) {
            if (showInfo && member.linkedin) {
                // Second tap opens LinkedIn
                window.open(member.linkedin, '_blank', 'noopener,noreferrer');
            } else {
                // First tap shows info
                setShowInfo(true);
            }
        }
    };

    const handleNameClick = (e) => {
        e.stopPropagation();
        if (member.linkedin) {
            window.open(member.linkedin, '_blank', 'noopener,noreferrer');
        }
    };

    const showOverlay = isMobile ? showInfo : isHovered;

    return (
        <div
            style={{
                position: 'relative',
                paddingBottom: '120%',
                overflow: 'hidden',
                cursor: 'pointer',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'scale(1)' : 'scale(0.95)',
                transition: `all 0.5s ease ${delay}s`
            }}
            onMouseEnter={() => !isMobile && setIsHovered(true)}
            onMouseLeave={() => !isMobile && setIsHovered(false)}
            onClick={handleClick}
        >
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `url(${member.img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center top',
                filter: showOverlay ? 'grayscale(0%)' : 'grayscale(100%)',
                transform: showOverlay ? 'scale(1.05)' : 'scale(1)',
                transition: 'all 0.4s ease'
            }} />

            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                background: showOverlay ? 'rgba(204, 0, 0, 0.95)' : 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                padding: isMobile ? '15px 12px' : '20px 15px',
                transition: 'background 0.3s ease',
                color: '#FFF'
            }}>
                <div
                    onClick={handleNameClick}
                    style={{
                        fontWeight: '800',
                        fontSize: isMobile ? '13px' : '15px',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                    }}
                >
                    {member.name}
                    {member.linkedin && (
                        <svg style={{ width: '14px', height: '14px', opacity: 0.8 }} viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                    )}
                </div>
                <div style={{ fontSize: isMobile ? '11px' : '12px', marginTop: '3px', opacity: 0.85 }}>{member.role}</div>
            </div>
        </div>
    );
};

export default MasonryTeam;

