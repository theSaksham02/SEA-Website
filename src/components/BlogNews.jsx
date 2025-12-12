import React, { useState, useRef, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const BlogNews = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const sectionRef = useRef(null);

    // Fallback posts if database is empty
    const fallbackPosts = [
        {
            id: 1,
            category: "ANNOUNCEMENT",
            title: "SEA Expo 2025 Registration Now Open",
            excerpt: "Join us for the biggest student entrepreneurship event of the year.",
            content: "The SEA Expo 2025 is set to be our largest event yet...",
            image_url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
            author: "SEA Team",
            created_at: new Date().toISOString()
        },
        {
            id: 2,
            category: "B-LABS",
            title: "Cohort 3 Applications Open",
            excerpt: "Ready to turn your idea into a startup? Apply for our next cohort.",
            content: "B-Labs Cohort 3 is officially accepting applications...",
            image_url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800",
            author: "B-Labs Team",
            created_at: new Date().toISOString()
        },
        {
            id: 3,
            category: "SUCCESS STORY",
            title: "How DormMe Raised Their Pre-Seed",
            excerpt: "From B-Labs to funded startup: the journey of our first cohort's success story.",
            content: "DormMe has successfully closed their pre-seed funding...",
            image_url: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800",
            author: "SEA Editorial",
            created_at: new Date().toISOString()
        },
        {
            id: 4,
            category: "EVENT RECAP",
            title: "AI Genesis x SEA Highlights",
            excerpt: "A look back at our collaboration with AI Genesis.",
            content: "SEA partnered with AI Genesis for an unforgettable evening...",
            image_url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800",
            author: "Events Team",
            created_at: new Date().toISOString()
        }
    ];

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data, error } = await supabase
                    .from('blog_posts')
                    .select('*')
                    .order('created_at', { ascending: false })
                    .limit(4);

                if (error) throw error;
                setPosts(data && data.length > 0 ? data : fallbackPosts);
            } catch (err) {
                console.log('Using fallback posts');
                setPosts(fallbackPosts);
            }
            setLoading(false);
        };
        fetchPosts();
    }, []);

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
    // Prevent body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, []);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

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
                {/* Header Image */}
                {post.image_url && (
                    <div style={{
                        width: '100%',
                        height: isMobile ? '250px' : '400px',
                        backgroundImage: `url(${post.image_url})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        position: 'relative'
                    }}>
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
                )}

                {/* Content */}
                <div style={{ padding: isMobile ? '30px 25px 50px' : '50px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px', color: '#666', fontSize: '12px' }}>
                        <span>{formatDate(post.created_at)}</span>
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

