import React, { useState, useRef, useEffect } from 'react';

const BlogNews = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);
    const sectionRef = useRef(null);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const posts = [
        {
            id: 1,
            category: "ANNOUNCEMENT",
            title: "SEA Expo 2025 Registration Now Open",
            excerpt: "Join us for the biggest student entrepreneurship event of the year. Connect with investors, mentors, and fellow founders.",
            date: "Feb 2025",
            featured: true,
            content: `The SEA Expo 2025 is set to be our largest event yet, bringing together student entrepreneurs, industry leaders, investors, and mentors from across the globe.

**What to Expect:**
- Keynote speeches from successful founders
- Pitch competition with £5,000 in prizes
- Networking sessions with VCs and angel investors
- Workshop tracks on fundraising, product, and growth
- Demo booths from B-Labs startups

**Who Should Attend:**
Whether you're just starting with an idea or already building your startup, SEA Expo offers something for everyone. Meet potential co-founders, get feedback on your pitch, and learn from those who've been there.

Registration is now open and spots are limited. Early bird tickets available until January 15th.`,
            images: [
                "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
                "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800",
                "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800"
            ],
            author: "SEA Team"
        },
        {
            id: 2,
            category: "B-LABS",
            title: "Cohort 3 Applications Open",
            excerpt: "Ready to turn your idea into a startup? Apply for our next cohort and get hands-on support.",
            date: "Jan 2025",
            featured: false,
            content: `B-Labs Cohort 3 is officially accepting applications! Our 12-week incubator program has helped launch some of the most promising student startups, and now it's your turn.

**What You'll Get:**
- Weekly mentorship sessions with industry experts
- £500 initial grant to kickstart your venture
- Access to co-working space and resources
- Legal and accounting support
- Demo Day pitch to real investors

**Program Timeline:**
- Applications Open: January 2025
- Application Deadline: February 15th
- Cohort Starts: March 2025
- Demo Day: June 2025

**Eligibility:**
- Current UoB students or recent graduates (within 2 years)
- Have a startup idea or early-stage venture
- Commitment to attend weekly sessions

Don't miss your chance to be part of the next cohort of student founders.`,
            images: [
                "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800",
                "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800"
            ],
            author: "B-Labs Team"
        },
        {
            id: 3,
            category: "SUCCESS STORY",
            title: "How DormMe Raised Their Pre-Seed",
            excerpt: "From B-Labs to funded startup: the journey of our first cohort's success story.",
            date: "Dec 2024",
            featured: false,
            content: `DormMe, a student housing marketplace that emerged from B-Labs Cohort 1, has successfully closed their pre-seed funding round of £150,000.

**The Journey:**
When Alex Chen and Maya Patel joined B-Labs with just an idea, they had no idea they'd be raising funding within a year. "The mentorship was invaluable," says Alex. "We went from a rough concept to a validated product with real users."

**Key Milestones:**
- 500+ verified listings on platform
- 2,000+ active student users
- Partnerships with 3 major letting agencies
- Featured in TechCrunch and The Guardian

**Advice for Future Founders:**
"Start before you're ready," Maya advises. "The B-Labs program gave us the structure we needed, but the real learning happened when we started talking to users."

DormMe is now expanding to 5 additional UK universities and hiring their first employees.`,
            images: [
                "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800",
                "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=800"
            ],
            author: "SEA Editorial"
        },
        {
            id: 4,
            category: "EVENT RECAP",
            title: "AI Genesis x SEA Highlights",
            excerpt: "A look back at our collaboration with AI Genesis and the innovations showcased.",
            date: "Dec 2024",
            featured: false,
            content: `Last month, SEA partnered with AI Genesis for an unforgettable evening of innovation, featuring cutting-edge AI demos and thought-provoking discussions on the future of technology.

**Event Highlights:**
Over 200 attendees gathered to witness student-built AI projects, network with industry professionals, and explore the intersection of entrepreneurship and artificial intelligence.

**Featured Demos:**
- AI-powered tutoring assistant by NavAI
- Automated research tool by Kejue.ai
- Natural language processing app for accessibility

**Keynote Speakers:**
- Dr. Sarah Mitchell on "AI in Healthcare Startups"
- James Rodriguez on "Building AI Products That Scale"

**Community Feedback:**
"This was exactly what the student tech community needed," said one attendee. "Seeing what other students are building with AI was incredibly inspiring."

Stay tuned for more AI-focused events in 2025!`,
            images: [
                "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800",
                "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
                "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800"
            ],
            author: "Events Team"
        }
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.1 });
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
    }, []);

    return (
        <section id="news" ref={sectionRef} style={{ padding: isMobile ? '50px 20px' : '80px 50px', background: '#000', color: '#FFF' }}>
            {/* Header */}
            <div style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                justifyContent: 'space-between',
                alignItems: isMobile ? 'flex-start' : 'flex-end',
                marginBottom: isMobile ? '40px' : '60px',
                gap: '20px',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
            }}>
                <div>
                    <span style={{ fontSize: '11px', color: '#CC0000', fontWeight: 'bold', letterSpacing: '2px' }}>LATEST UPDATES</span>
                    <h1 style={{ fontSize: isMobile ? '28px' : 'clamp(36px, 5vw, 56px)', fontWeight: '900', marginTop: '12px' }}>
                        NEWS & <span style={{ color: '#CC0000' }}>BLOG.</span>
                    </h1>
                </div>
                <button
                    style={{
                        background: 'transparent',
                        border: '1px solid #333',
                        color: '#FFF',
                        padding: '12px 25px',
                        fontSize: '11px',
                        fontWeight: '700',
                        letterSpacing: '1px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={e => { e.target.style.borderColor = '#CC0000'; e.target.style.color = '#CC0000'; }}
                    onMouseLeave={e => { e.target.style.borderColor = '#333'; e.target.style.color = '#FFF'; }}
                >
                    VIEW ALL →
                </button>
            </div>

            {/* Posts Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                gap: isMobile ? '20px' : '30px'
            }}>
                {posts.map((post, i) => (
                    <article
                        key={post.id}
                        onClick={() => setSelectedPost(post)}
                        onMouseEnter={() => setHoveredIndex(i)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && setSelectedPost(post)}
                        style={{
                            background: hoveredIndex === i ? '#111' : 'transparent',
                            border: '1px solid #222',
                            padding: isMobile ? '25px' : '35px',
                            cursor: 'pointer',
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                            transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.1}s`,
                            outline: 'none'
                        }}
                        onFocus={() => setHoveredIndex(i)}
                        onBlur={() => setHoveredIndex(null)}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                            <span style={{
                                fontSize: '10px',
                                fontWeight: '700',
                                letterSpacing: '1px',
                                color: post.category === 'ANNOUNCEMENT' ? '#CC0000' : '#666',
                                background: post.category === 'ANNOUNCEMENT' ? 'rgba(204,0,0,0.15)' : 'transparent',
                                padding: post.category === 'ANNOUNCEMENT' ? '4px 8px' : '0'
                            }}>
                                {post.category}
                            </span>
                            <span style={{ fontSize: '11px', color: '#555' }}>{post.date}</span>
                        </div>
                        <h3 style={{
                            fontSize: isMobile ? '18px' : '22px',
                            fontWeight: '800',
                            marginBottom: '12px',
                            color: hoveredIndex === i ? '#FFF' : '#CCC',
                            transition: 'color 0.3s ease'
                        }}>
                            {post.title}
                        </h3>
                        <p style={{
                            fontSize: '14px',
                            color: '#666',
                            lineHeight: '1.6',
                            marginBottom: '20px'
                        }}>
                            {post.excerpt}
                        </p>
                        <div style={{
                            fontSize: '12px',
                            fontWeight: '700',
                            color: hoveredIndex === i ? '#CC0000' : '#555',
                            transition: 'color 0.3s ease'
                        }}>
                            READ MORE →
                        </div>
                    </article>
                ))}
            </div>

            {/* Article Modal */}
            {selectedPost && (
                <ArticleModal
                    post={selectedPost}
                    onClose={() => setSelectedPost(null)}
                    isMobile={isMobile}
                />
            )}
        </section>
    );
};

const ArticleModal = ({ post, onClose, isMobile }) => {
    const [currentImage, setCurrentImage] = useState(0);

    // Prevent body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, []);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') setCurrentImage(prev => (prev + 1) % post.images.length);
            if (e.key === 'ArrowLeft') setCurrentImage(prev => (prev - 1 + post.images.length) % post.images.length);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose, post.images.length]);

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                background: 'rgba(0,0,0,0.95)',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                zIndex: 1000,
                padding: isMobile ? '0' : '40px',
                overflowY: 'auto'
            }}
            onClick={onClose}
        >
            <article
                style={{
                    background: '#111',
                    maxWidth: '900px',
                    width: '100%',
                    margin: isMobile ? '0' : '20px',
                    minHeight: isMobile ? '100vh' : 'auto'
                }}
                onClick={e => e.stopPropagation()}
            >
                {/* Header Image Carousel */}
                <div style={{ position: 'relative', width: '100%', height: isMobile ? '250px' : '400px', overflow: 'hidden' }}>
                    {post.images.map((img, i) => (
                        <div
                            key={i}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                backgroundImage: `url(${img})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                opacity: currentImage === i ? 1 : 0,
                                transition: 'opacity 0.5s ease'
                            }}
                        />
                    ))}

                    {/* Image navigation */}
                    {post.images.length > 1 && (
                        <>
                            <button
                                onClick={(e) => { e.stopPropagation(); setCurrentImage(prev => (prev - 1 + post.images.length) % post.images.length); }}
                                style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.7)', color: '#FFF', border: 'none', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', fontSize: '18px' }}
                            >←</button>
                            <button
                                onClick={(e) => { e.stopPropagation(); setCurrentImage(prev => (prev + 1) % post.images.length); }}
                                style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.7)', color: '#FFF', border: 'none', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', fontSize: '18px' }}
                            >→</button>
                        </>
                    )}

                    {/* Image dots */}
                    <div style={{ position: 'absolute', bottom: '15px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px' }}>
                        {post.images.map((_, i) => (
                            <button
                                key={i}
                                onClick={(e) => { e.stopPropagation(); setCurrentImage(i); }}
                                style={{
                                    width: currentImage === i ? '20px' : '8px',
                                    height: '8px',
                                    borderRadius: '4px',
                                    background: currentImage === i ? '#CC0000' : 'rgba(255,255,255,0.5)',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease'
                                }}
                            />
                        ))}
                    </div>

                    {/* Close button */}
                    <button
                        onClick={onClose}
                        style={{
                            position: 'absolute',
                            top: '15px',
                            right: '15px',
                            background: 'rgba(0,0,0,0.7)',
                            color: '#FFF',
                            border: 'none',
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            cursor: 'pointer',
                            fontSize: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >×</button>

                    {/* Category badge */}
                    <div style={{
                        position: 'absolute',
                        top: '15px',
                        left: '15px',
                        background: post.category === 'ANNOUNCEMENT' ? '#CC0000' : '#000',
                        color: '#FFF',
                        padding: '6px 12px',
                        fontSize: '10px',
                        fontWeight: '700',
                        letterSpacing: '1px'
                    }}>
                        {post.category}
                    </div>
                </div>

                {/* Content */}
                <div style={{ padding: isMobile ? '30px 25px 50px' : '50px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px', color: '#666', fontSize: '12px' }}>
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>By {post.author}</span>
                    </div>

                    <h1 style={{
                        fontSize: isMobile ? '26px' : '36px',
                        fontWeight: '900',
                        marginBottom: '30px',
                        color: '#FFF',
                        lineHeight: '1.2'
                    }}>
                        {post.title}
                    </h1>

                    <div style={{
                        fontSize: '16px',
                        color: '#AAA',
                        lineHeight: '1.8',
                        whiteSpace: 'pre-line'
                    }}>
                        {post.content}
                    </div>

                    {/* Image Gallery */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                        gap: '10px',
                        marginTop: '40px'
                    }}>
                        {post.images.map((img, i) => (
                            <div
                                key={i}
                                onClick={() => setCurrentImage(i)}
                                style={{
                                    aspectRatio: '16/10',
                                    backgroundImage: `url(${img})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    cursor: 'pointer',
                                    opacity: currentImage === i ? 1 : 0.6,
                                    border: currentImage === i ? '2px solid #CC0000' : '2px solid transparent',
                                    transition: 'all 0.3s ease'
                                }}
                            />
                        ))}
                    </div>

                    {/* Back button */}
                    <button
                        onClick={onClose}
                        style={{
                            marginTop: '40px',
                            background: 'transparent',
                            border: '1px solid #333',
                            color: '#FFF',
                            padding: '15px 30px',
                            fontSize: '12px',
                            fontWeight: '700',
                            letterSpacing: '1px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={e => { e.target.style.borderColor = '#CC0000'; e.target.style.color = '#CC0000'; }}
                        onMouseLeave={e => { e.target.style.borderColor = '#333'; e.target.style.color = '#FFF'; }}
                    >
                        ← BACK TO NEWS
                    </button>
                </div>
            </article>
        </div>
    );
};

export default BlogNews;
