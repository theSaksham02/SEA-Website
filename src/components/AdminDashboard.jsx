import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AdminDashboard = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authChecking, setAuthChecking] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [loginLoading, setLoginLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('newsletter');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let mounted = true;

        const initAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (mounted) {
                setIsAuthenticated(!!session);
                setAuthChecking(false);
            }
        };

        initAuth();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (mounted) {
                setIsAuthenticated(!!session);
                setAuthChecking(false);
            }
        });

        return () => {
            mounted = false;
            subscription.unsubscribe();
        };
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginError('');
        setLoginLoading(true);

        const { error } = await supabase.auth.signInWithPassword({
            email: email.trim(),
            password,
        });

        if (error) {
            setLoginError(error.message || 'Sign-in failed');
            setLoginLoading(false);
            return;
        }

        setLoginLoading(false);
        // isAuthenticated updates via onAuthStateChange
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setIsAuthenticated(false);
        setEmail('');
        setPassword('');
    };

    const tabs = [
        { id: 'newsletter', label: 'Newsletter', table: 'newsletter_subscribers' },
        { id: 'eventRegs', label: 'Event Registrations', table: 'event_registrations' },
        { id: 'timeline', label: 'Events Timeline', table: null },
        { id: 'team', label: 'Join Team', table: 'startup_team_applications' },
        { id: 'startups', label: 'Startup Applications', table: 'startup_applications' },
        { id: 'sponsors', label: 'Sponsor Inquiries', table: 'sponsor_inquiries' },
        { id: 'blog', label: 'Blog CMS', table: 'blog_posts' },
    ];

    useEffect(() => {
        if (isAuthenticated && activeTab !== 'blog' && activeTab !== 'timeline') {
            fetchData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated, activeTab]);

    const fetchData = async () => {
        setLoading(true);
        const table = tabs.find(t => t.id === activeTab)?.table;
        if (!table) {
            setLoading(false);
            return;
        }

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

    if (authChecking) {
        return (
            <div style={{ minHeight: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>
                Checking session…
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div style={{ minHeight: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                <form onSubmit={handleLogin} style={{ background: '#111', padding: '50px', maxWidth: '400px', width: '100%' }}>
                    <h1 style={{ color: '#FFF', fontSize: '28px', fontWeight: '900', marginBottom: '10px' }}>SEA Admin</h1>
                    <p style={{ color: '#666', marginBottom: '30px' }}>Sign in with your Supabase admin account</p>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                        autoComplete="username"
                        style={{ width: '100%', padding: '16px', background: '#222', border: '1px solid #333', color: '#FFF', fontSize: '16px', marginBottom: '15px' }}
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                        autoComplete="current-password"
                        style={{ width: '100%', padding: '16px', background: '#222', border: '1px solid #333', color: '#FFF', fontSize: '16px', marginBottom: '15px' }}
                    />
                    {loginError && (
                        <p style={{ color: '#CC0000', fontSize: '13px', marginBottom: '15px' }}>{loginError}</p>
                    )}
                    <button
                        type="submit"
                        disabled={loginLoading}
                        style={{ width: '100%', padding: '16px', background: '#CC0000', color: '#FFF', border: 'none', fontSize: '14px', fontWeight: '800', cursor: loginLoading ? 'wait' : 'pointer', opacity: loginLoading ? 0.7 : 1 }}
                    >
                        {loginLoading ? 'SIGNING IN…' : 'LOGIN'}
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
                    <BlogCMS />
                ) : activeTab === 'timeline' ? (
                    <EventsTimelineCMS />
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

const BlogCMS = () => {
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
    const [saveError, setSaveError] = useState('');

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
        setSaveError('');

        let error;
        if (editingPost) {
            ({ error } = await supabase.from('blog_posts').update(formData).eq('id', editingPost.id));
        } else {
            ({ error } = await supabase.from('blog_posts').insert([formData]));
        }

        if (error) {
            setSaveError(error.message || 'Failed to save post');
            return;
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
                    {saveError && (
                        <p style={{ color: '#C00', fontSize: '13px', marginBottom: '15px' }}>{saveError}</p>
                    )}
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button type="submit" style={{ padding: '14px 30px', background: '#CC0000', color: '#FFF', border: 'none', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>
                            {editingPost ? 'Update Post' : 'Publish Post'}
                        </button>
                        <button type="button" onClick={() => { setShowEditor(false); setEditingPost(null); setSaveError(''); }} style={{ padding: '14px 30px', background: '#EEE', color: '#333', border: 'none', fontSize: '14px', cursor: 'pointer' }}>
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

const emptyEventForm = {
    title: '',
    date_label: '',
    location: '',
    status: 'upcoming',
    sort_order: 0,
    description: '',
    image_url_1: '',
    image_url_2: '',
    image_url_3: '',
};

const EventsTimelineCMS = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showEditor, setShowEditor] = useState(false);
    const [editing, setEditing] = useState(null);
    const [formData, setFormData] = useState(emptyEventForm);
    const [saveError, setSaveError] = useState('');

    const fetchEvents = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('timeline_events')
            .select('*')
            .order('sort_order', { ascending: true });
        if (!error) setEvents(data || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const openNew = () => {
        const nextOrder = events.length ? Math.max(...events.map(e => e.sort_order || 0)) + 1 : 1;
        setEditing(null);
        setFormData({ ...emptyEventForm, sort_order: nextOrder });
        setSaveError('');
        setShowEditor(true);
    };

    const openEdit = (ev) => {
        setEditing(ev);
        setFormData({
            title: ev.title || '',
            date_label: ev.date_label || '',
            location: ev.location || '',
            status: ev.status || 'upcoming',
            sort_order: ev.sort_order ?? 0,
            description: ev.description || '',
            image_url_1: ev.image_url_1 || '',
            image_url_2: ev.image_url_2 || '',
            image_url_3: ev.image_url_3 || '',
        });
        setSaveError('');
        setShowEditor(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaveError('');
        const payload = {
            ...formData,
            sort_order: Number(formData.sort_order) || 0,
            updated_at: new Date().toISOString(),
        };

        let error;
        if (editing) {
            ({ error } = await supabase.from('timeline_events').update(payload).eq('id', editing.id));
        } else {
            ({ error } = await supabase.from('timeline_events').insert([payload]));
        }

        if (error) {
            setSaveError(error.message || 'Failed to save event');
            return;
        }

        setShowEditor(false);
        setEditing(null);
        setFormData(emptyEventForm);
        fetchEvents();
    };

    const deleteEvent = async (id) => {
        if (!confirm('Delete this timeline event?')) return;
        await supabase.from('timeline_events').delete().eq('id', id);
        fetchEvents();
    };

    const statusLabel = {
        past: 'Past',
        upcoming: 'Upcoming (featured / red)',
        future: 'Open (register, not featured)',
    };

    if (showEditor) {
        return (
            <div style={{ background: '#FFF', padding: '30px', maxWidth: '640px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '10px' }}>
                    {editing ? 'Edit Timeline Event' : 'New Timeline Event'}
                </h2>
                <p style={{ color: '#888', fontSize: '13px', marginBottom: '25px' }}>
                    These cards power the Events Ecosystem section on the homepage.
                </p>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '8px', color: '#666' }}>TITLE</label>
                        <input type="text" required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="SEA Expo" style={{ width: '100%', padding: '12px', border: '1px solid #DDD', fontSize: '16px' }} />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '8px', color: '#666' }}>DATE LABEL</label>
                        <input type="text" required value={formData.date_label} onChange={e => setFormData({ ...formData, date_label: e.target.value })} placeholder="Feb '25" style={{ width: '100%', padding: '12px', border: '1px solid #DDD', fontSize: '16px' }} />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '8px', color: '#666' }}>LOCATION</label>
                        <input type="text" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} placeholder="Campus Center" style={{ width: '100%', padding: '12px', border: '1px solid #DDD', fontSize: '16px' }} />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '8px', color: '#666' }}>SHORT DESCRIPTION</label>
                        <textarea
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Shown when visitors click View More…"
                            rows={4}
                            style={{ width: '100%', padding: '12px', border: '1px solid #DDD', fontSize: '16px', resize: 'vertical' }}
                        />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '8px', color: '#666' }}>IMAGE URL 1</label>
                        <input type="url" value={formData.image_url_1} onChange={e => setFormData({ ...formData, image_url_1: e.target.value })} placeholder="https://…" style={{ width: '100%', padding: '12px', border: '1px solid #DDD', fontSize: '16px' }} />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '8px', color: '#666' }}>IMAGE URL 2</label>
                        <input type="url" value={formData.image_url_2} onChange={e => setFormData({ ...formData, image_url_2: e.target.value })} placeholder="https://…" style={{ width: '100%', padding: '12px', border: '1px solid #DDD', fontSize: '16px' }} />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '8px', color: '#666' }}>IMAGE URL 3</label>
                        <input type="url" value={formData.image_url_3} onChange={e => setFormData({ ...formData, image_url_3: e.target.value })} placeholder="https://…" style={{ width: '100%', padding: '12px', border: '1px solid #DDD', fontSize: '16px' }} />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '8px', color: '#666' }}>STATUS</label>
                        <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} style={{ width: '100%', padding: '12px', border: '1px solid #DDD', fontSize: '16px' }}>
                            <option value="past">Past (faded, no register)</option>
                            <option value="upcoming">Upcoming (featured red card)</option>
                            <option value="future">Open for registration (dark card)</option>
                        </select>
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '8px', color: '#666' }}>SORT ORDER</label>
                        <input type="number" value={formData.sort_order} onChange={e => setFormData({ ...formData, sort_order: e.target.value })} style={{ width: '100%', padding: '12px', border: '1px solid #DDD', fontSize: '16px' }} />
                        <p style={{ fontSize: '12px', color: '#999', marginTop: '6px' }}>Lower numbers appear first (left → right).</p>
                    </div>
                    {saveError && <p style={{ color: '#C00', fontSize: '13px', marginBottom: '15px' }}>{saveError}</p>}
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button type="submit" style={{ padding: '14px 30px', background: '#CC0000', color: '#FFF', border: 'none', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>
                            {editing ? 'Update Event' : 'Add Event'}
                        </button>
                        <button type="button" onClick={() => { setShowEditor(false); setEditing(null); setSaveError(''); }} style={{ padding: '14px 30px', background: '#EEE', color: '#333', border: 'none', fontSize: '14px', cursor: 'pointer' }}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                    <h2 style={{ fontSize: '20px', fontWeight: '800' }}>Events Timeline</h2>
                    <p style={{ fontSize: '13px', color: '#888', marginTop: '6px' }}>
                        Edit past / upcoming cards shown on the homepage Events Ecosystem section.
                    </p>
                </div>
                <button type="button" onClick={openNew} style={{ padding: '12px 24px', background: '#CC0000', color: '#FFF', border: 'none', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>
                    + Add Event
                </button>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : events.length === 0 ? (
                <div style={{ background: '#FFF', padding: '50px', textAlign: 'center', color: '#888' }}>
                    No timeline events yet. Click “Add Event” to create one.
                </div>
            ) : (
                <div style={{ display: 'grid', gap: '12px' }}>
                    {events.map(ev => (
                        <div key={ev.id} style={{ background: '#FFF', padding: '18px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap', borderLeft: ev.status === 'upcoming' ? '4px solid #CC0000' : '4px solid #DDD' }}>
                            <div>
                                <div style={{ fontSize: '11px', fontWeight: '700', color: '#CC0000', letterSpacing: '0.5px' }}>
                                    {ev.date_label} · #{ev.sort_order} · {statusLabel[ev.status] || ev.status}
                                </div>
                                <h3 style={{ fontSize: '16px', fontWeight: '800', marginTop: '4px' }}>{ev.title}</h3>
                                <p style={{ fontSize: '13px', color: '#888', marginTop: '4px' }}>{ev.location || 'No location'}</p>
                            </div>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button type="button" onClick={() => openEdit(ev)} style={{ padding: '8px 16px', background: '#EEE', border: 'none', fontSize: '12px', cursor: 'pointer' }}>Edit</button>
                                <button type="button" onClick={() => deleteEvent(ev.id)} style={{ padding: '8px 16px', background: '#FEE', color: '#C00', border: 'none', fontSize: '12px', cursor: 'pointer' }}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
