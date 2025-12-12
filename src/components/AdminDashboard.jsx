import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AdminDashboard = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState('newsletter');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Simple password protection (change this!)
    const ADMIN_PASSWORD = 'sea2024admin';

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
        // Check if already logged in
        if (sessionStorage.getItem('sea_admin') === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            sessionStorage.setItem('sea_admin', 'true');
        } else {
            alert('Incorrect password');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        sessionStorage.removeItem('sea_admin');
    };

    const tabs = [
        { id: 'newsletter', label: 'Newsletter', table: 'newsletter_subscribers' },
        { id: 'events', label: 'Event Registrations', table: 'event_registrations' },
        { id: 'team', label: 'Join Team', table: 'startup_team_applications' },
        { id: 'startups', label: 'Startup Applications', table: 'startup_applications' },
        { id: 'sponsors', label: 'Sponsor Inquiries', table: 'sponsor_inquiries' },
        { id: 'blog', label: '📝 Blog CMS', table: 'blog_posts' },
    ];

    useEffect(() => {
        if (isAuthenticated) {
            fetchData();
        }
    }, [isAuthenticated, activeTab]);

    const fetchData = async () => {
        setLoading(true);
        const table = tabs.find(t => t.id === activeTab)?.table;
        if (!table) return;

        const { data: result, error } = await supabase
            .from(table)
            .select('*')
            .order('created_at', { ascending: false });

        if (!error) setData(result || []);
        setLoading(false);
    };

    const deleteItem = async (id) => {
        if (!confirm('Are you sure you want to delete this?')) return;
        const table = tabs.find(t => t.id === activeTab)?.table;
        await supabase.from(table).delete().eq('id', id);
        fetchData();
    };

    if (!isAuthenticated) {
        return (
            <div style={{ minHeight: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                <form onSubmit={handleLogin} style={{ background: '#111', padding: '50px', maxWidth: '400px', width: '100%' }}>
                    <h1 style={{ color: '#FFF', fontSize: '28px', fontWeight: '900', marginBottom: '10px' }}>SEA Admin</h1>
                    <p style={{ color: '#666', marginBottom: '30px' }}>Enter password to continue</p>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Password"
                        style={{ width: '100%', padding: '16px', background: '#222', border: '1px solid #333', color: '#FFF', fontSize: '16px', marginBottom: '15px' }}
                    />
                    <button type="submit" style={{ width: '100%', padding: '16px', background: '#CC0000', color: '#FFF', border: 'none', fontSize: '14px', fontWeight: '800', cursor: 'pointer' }}>
                        LOGIN
                    </button>
                    <a href="/" style={{ display: 'block', textAlign: 'center', marginTop: '20px', color: '#666', fontSize: '13px' }}>← Back to website</a>
                </form>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: '#F5F5F5' }}>
            {/* Header */}
            <div style={{ background: '#000', color: '#FFF', padding: '20px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <span style={{ fontSize: '11px', color: '#CC0000', fontWeight: '700' }}>SEA</span>
                    <h1 style={{ fontSize: '18px', fontWeight: '800' }}>Admin Dashboard</h1>
                </div>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                    <a href="/" style={{ color: '#888', fontSize: '13px' }}>View Site →</a>
                    <button onClick={handleLogout} style={{ background: '#333', border: 'none', color: '#FFF', padding: '8px 16px', fontSize: '12px', cursor: 'pointer' }}>Logout</button>
                </div>
            </div>

            {/* Tabs */}
            <div style={{ background: '#FFF', borderBottom: '1px solid #EEE', padding: '0 30px', overflowX: 'auto' }}>
                <div style={{ display: 'flex', gap: '5px' }}>
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                padding: '15px 20px',
                                background: 'transparent',
                                border: 'none',
                                borderBottom: activeTab === tab.id ? '3px solid #CC0000' : '3px solid transparent',
                                color: activeTab === tab.id ? '#000' : '#888',
                                fontWeight: '600',
                                fontSize: '13px',
                                cursor: 'pointer',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div style={{ padding: '30px' }}>
                {activeTab === 'blog' ? (
                    <BlogCMS onRefresh={fetchData} />
                ) : (
                    <>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h2 style={{ fontSize: '20px', fontWeight: '800' }}>{tabs.find(t => t.id === activeTab)?.label}</h2>
                            <span style={{ color: '#888', fontSize: '13px' }}>{data.length} records</span>
                        </div>

                        {loading ? (
                            <p>Loading...</p>
                        ) : data.length === 0 ? (
                            <div style={{ background: '#FFF', padding: '50px', textAlign: 'center', color: '#888' }}>
                                No submissions yet
                            </div>
                        ) : (
                            <div style={{ background: '#FFF', overflow: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                                    <thead>
                                        <tr style={{ background: '#F9F9F9' }}>
                                            {Object.keys(data[0] || {}).filter(k => k !== 'id').map(key => (
                                                <th key={key} style={{ padding: '12px 15px', textAlign: 'left', fontWeight: '700', borderBottom: '1px solid #EEE', whiteSpace: 'nowrap' }}>
                                                    {key.replace(/_/g, ' ').toUpperCase()}
                                                </th>
                                            ))}
                                            <th style={{ padding: '12px 15px', textAlign: 'right', borderBottom: '1px solid #EEE' }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map(row => (
                                            <tr key={row.id} style={{ borderBottom: '1px solid #EEE' }}>
                                                {Object.entries(row).filter(([k]) => k !== 'id').map(([key, value]) => (
                                                    <td key={key} style={{ padding: '12px 15px', color: '#333' }}>
                                                        {key === 'created_at' ? new Date(value).toLocaleDateString() : String(value || '-')}
                                                    </td>
                                                ))}
                                                <td style={{ padding: '12px 15px', textAlign: 'right' }}>
                                                    <button onClick={() => deleteItem(row.id)} style={{ background: '#FEE', color: '#C00', border: 'none', padding: '6px 12px', fontSize: '11px', cursor: 'pointer' }}>Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

const BlogCMS = ({ onRefresh }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showEditor, setShowEditor] = useState(false);
    const [editingPost, setEditingPost] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        category: 'ANNOUNCEMENT',
        author: 'SEA Team',
        image_url: ''
    });

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error) setPosts(data || []);
        setLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editingPost) {
            await supabase.from('blog_posts').update(formData).eq('id', editingPost.id);
        } else {
            await supabase.from('blog_posts').insert([formData]);
        }

        setShowEditor(false);
        setEditingPost(null);
        setFormData({ title: '', excerpt: '', content: '', category: 'ANNOUNCEMENT', author: 'SEA Team', image_url: '' });
        fetchPosts();
    };

    const editPost = (post) => {
        setEditingPost(post);
        setFormData({
            title: post.title,
            excerpt: post.excerpt,
            content: post.content,
            category: post.category,
            author: post.author,
            image_url: post.image_url || ''
        });
        setShowEditor(true);
    };

    const deletePost = async (id) => {
        if (!confirm('Delete this post?')) return;
        await supabase.from('blog_posts').delete().eq('id', id);
        fetchPosts();
    };

    const categories = ['ANNOUNCEMENT', 'B-LABS', 'SUCCESS STORY', 'EVENT RECAP', 'NEWS'];

    if (showEditor) {
        return (
            <div style={{ background: '#FFF', padding: '30px', maxWidth: '800px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '25px' }}>{editingPost ? 'Edit Post' : 'New Post'}</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '8px', color: '#666' }}>CATEGORY</label>
                        <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} style={{ width: '100%', padding: '12px', border: '1px solid #DDD', fontSize: '16px' }}>
                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '8px', color: '#666' }}>TITLE</label>
                        <input type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required placeholder="Post title..." style={{ width: '100%', padding: '12px', border: '1px solid #DDD', fontSize: '16px' }} />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '8px', color: '#666' }}>EXCERPT (Short description)</label>
                        <input type="text" value={formData.excerpt} onChange={e => setFormData({ ...formData, excerpt: e.target.value })} required placeholder="Brief description..." style={{ width: '100%', padding: '12px', border: '1px solid #DDD', fontSize: '16px' }} />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '8px', color: '#666' }}>CONTENT</label>
                        <textarea value={formData.content} onChange={e => setFormData({ ...formData, content: e.target.value })} required placeholder="Full article content..." rows={10} style={{ width: '100%', padding: '12px', border: '1px solid #DDD', fontSize: '16px', resize: 'vertical' }} />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '8px', color: '#666' }}>IMAGE URL (optional)</label>
                        <input type="url" value={formData.image_url} onChange={e => setFormData({ ...formData, image_url: e.target.value })} placeholder="https://..." style={{ width: '100%', padding: '12px', border: '1px solid #DDD', fontSize: '16px' }} />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '8px', color: '#666' }}>AUTHOR</label>
                        <input type="text" value={formData.author} onChange={e => setFormData({ ...formData, author: e.target.value })} style={{ width: '100%', padding: '12px', border: '1px solid #DDD', fontSize: '16px' }} />
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button type="submit" style={{ padding: '14px 30px', background: '#CC0000', color: '#FFF', border: 'none', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>
                            {editingPost ? 'Update Post' : 'Publish Post'}
                        </button>
                        <button type="button" onClick={() => { setShowEditor(false); setEditingPost(null); }} style={{ padding: '14px 30px', background: '#EEE', color: '#333', border: 'none', fontSize: '14px', cursor: 'pointer' }}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '800' }}>Blog Posts</h2>
                <button onClick={() => setShowEditor(true)} style={{ padding: '12px 24px', background: '#CC0000', color: '#FFF', border: 'none', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>
                    + New Post
                </button>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : posts.length === 0 ? (
                <div style={{ background: '#FFF', padding: '50px', textAlign: 'center', color: '#888' }}>
                    No blog posts yet. Click "New Post" to create one.
                </div>
            ) : (
                <div style={{ display: 'grid', gap: '15px' }}>
                    {posts.map(post => (
                        <div key={post.id} style={{ background: '#FFF', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <span style={{ fontSize: '10px', fontWeight: '700', color: '#CC0000', letterSpacing: '1px' }}>{post.category}</span>
                                <h3 style={{ fontSize: '16px', fontWeight: '700', marginTop: '5px' }}>{post.title}</h3>
                                <p style={{ fontSize: '13px', color: '#888', marginTop: '5px' }}>{post.author} • {new Date(post.created_at).toLocaleDateString()}</p>
                            </div>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button onClick={() => editPost(post)} style={{ padding: '8px 16px', background: '#EEE', border: 'none', fontSize: '12px', cursor: 'pointer' }}>Edit</button>
                                <button onClick={() => deletePost(post.id)} style={{ padding: '8px 16px', background: '#FEE', color: '#C00', border: 'none', fontSize: '12px', cursor: 'pointer' }}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
