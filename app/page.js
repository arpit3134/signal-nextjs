'use client';

import { useState, useEffect } from 'react';
import { articles, categories, trending } from '../lib/data';

export default function Home() {
  const [displayArticles, setDisplayArticles] = useState(articles);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(false);
  const [liveCount, setLiveCount] = useState(3241);
  const [isDark, setIsDark] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [likedArticles, setLikedArticles] = useState({});
  const [readCount, setReadCount] = useState(0);
  const [toast, setToast] = useState({ show: false, message: '' });

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
    const savedBookmarks = localStorage.getItem('bookmarks');
    if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));
  }, []);

  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveCount(prev => prev + Math.floor(Math.random() * 40) - 20);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const showToast = (msg) => {
    setToast({ show: true, message: msg });
    setTimeout(() => setToast({ show: false, message: '' }), 2800);
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  };

  const filterByCategory = (catId) => {
    setActiveCategory(catId);
    setLoading(true);
    setTimeout(() => {
      if (catId === 'all') {
        setDisplayArticles(articles);
      } else {
        setDisplayArticles(articles.filter(a => a.cat === catId));
      }
      setLoading(false);
    }, 300);
  };

  const openArticle = (article) => {
    setSelectedArticle(article);
    setReadCount(prev => prev + 1);
  };

  const closeModal = () => {
    setSelectedArticle(null);
  };

  const toggleLike = (id) => {
    setLikedArticles(prev => {
      const newState = { ...prev };
      if (newState[id]) {
        delete newState[id];
        showToast('🤍 Like removed');
      } else {
        newState[id] = true;
        showToast('❤️ Liked!');
      }
      return newState;
    });
  };

  const toggleBookmark = (id) => {
    setBookmarks(prev => {
      if (prev.includes(id)) {
        showToast('🗑 Removed');
        return prev.filter(i => i !== id);
      } else {
        showToast('📌 Saved!');
        return [...prev, id];
      }
    });
  };

  const getTagStyle = (cat) => {
    const styles = {
      ai: { background: '#fde8e8', color: '#b02020' },
      tech: { background: '#e8f2fd', color: '#1a52a0' },
      finance: { background: '#e8fde8', color: '#1d7a3a' },
      sports: { background: '#fdf5e8', color: '#8b5e1d' },
      farming: { background: '#edfde8', color: '#3a7a1d' },
      health: { background: '#e8fdf5', color: '#1d7a6a' },
      business: { background: '#fde8f0', color: '#8b1d3a' },
      trends: { background: '#fdeee8', color: '#8b3a1d' },
      travel: { background: '#e8f0fd', color: '#1d3a8b' }
    };
    return styles[cat] || { background: '#f0ede6', color: '#4a4640' };
  };

  return (
    <div>
      {/* Navbar */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        background: 'rgba(249,248,245,0.92)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border)', height: '60px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', height: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }} onClick={() => filterByCategory('all')}>
            <div style={{ width: '8px', height: '8px', background: 'var(--accent)', borderRadius: '50%', animation: 'pulse 2s infinite' }}></div>
            <span style={{ fontFamily: 'Playfair Display, Georgia', fontSize: '1.4rem', fontWeight: '700' }}>Signal</span>
          </div>
          <div style={{ display: 'flex', gap: '0.8rem' }}>
            <button onClick={toggleTheme} style={{
              width: '36px', height: '36px', borderRadius: '10px', border: '1px solid var(--border)',
              background: 'var(--card)', cursor: 'pointer', fontSize: '1.2rem'
            }}>{isDark ? '☀️' : '🌙'}</button>
            <button onClick={() => showToast(`📌 ${bookmarks.length} bookmarks`)} style={{
              width: '36px', height: '36px', borderRadius: '10px', border: '1px solid var(--border)',
              background: 'var(--card)', cursor: 'pointer', fontSize: '1.2rem'
            }}>📌</button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', textAlign: 'center', padding: '80px 2rem 3rem'
      }}>
        <div style={{ maxWidth: '700px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '5px 14px',
            borderRadius: '50px', border: '1px solid var(--border)', background: 'var(--card)',
            marginBottom: '2rem'
          }}>
            <span style={{ width: '6px', height: '6px', background: '#22c55e', borderRadius: '50%', animation: 'pulse 1.5s infinite' }}></span>
            <span>⚡ LIVE · {liveCount.toLocaleString()} readers online</span>
          </div>
          <h1 style={{
            fontFamily: 'Playfair Display, Georgia', fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
            fontWeight: '900', lineHeight: '1.1', marginBottom: '1.5rem'
          }}>The signal for<br /><span style={{ color: 'var(--accent)' }}>what's next</span></h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--ink2)', marginBottom: '2rem' }}>Discover articles, ideas, and insights across every topic that matters.</p>
          
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginTop: '2rem' }}>
            <div><div style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--accent)' }}>{articles.length}</div><div style={{ fontSize: '0.7rem', color: 'var(--ink3)' }}>ARTICLES</div></div>
            <div><div style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--accent)' }}>{readCount}</div><div style={{ fontSize: '0.7rem', color: 'var(--ink3)' }}>READ TODAY</div></div>
            <div><div style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--accent)' }}>{bookmarks.length}</div><div style={{ fontSize: '0.7rem', color: 'var(--ink3)' }}>BOOKMARKS</div></div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '2rem' }}>
          {categories.map(cat => (
            <button key={cat.id} onClick={() => filterByCategory(cat.id)} style={{
              flexShrink: 0, padding: '8px 18px', borderRadius: '50px', border: `1.5px solid ${activeCategory === cat.id ? 'var(--ink)' : 'var(--border)'}`,
              background: activeCategory === cat.id ? 'var(--ink)' : 'var(--card)',
              color: activeCategory === cat.id ? 'var(--bg)' : 'var(--ink2)',
              cursor: 'pointer', fontSize: '0.8rem', fontWeight: '500'
            }}>{cat.icon} {cat.name}</button>
          ))}
        </div>

        {/* Articles Grid */}
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>Loading...</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem', paddingBottom: '4rem' }}>
            {displayArticles.map(article => {
              const isLiked = likedArticles[article.id];
              const isBookmarked = bookmarks.includes(article.id);
              const tagStyle = getTagStyle(article.cat);
              return (
                <div key={article.id} onClick={() => openArticle(article)} style={{
                  background: 'var(--card)', borderRadius: '16px', border: '1px solid var(--border)',
                  overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.2s'
                }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                   onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'>
                  <div style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                      <span style={{ padding: '4px 10px', borderRadius: '50px', fontSize: '0.7rem', fontWeight: '600', ...tagStyle }}>{article.lbl}</span>
                      <span style={{ fontSize: '1.4rem' }}>{article.em}</span>
                    </div>
                    <h3 style={{ fontFamily: 'Playfair Display, Georgia', fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem' }}>{article.title}</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--ink2)', marginBottom: '1rem' }}>{article.desc}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', color: 'var(--ink3)' }}>
                      <span>{article.author}</span><span>•</span><span>{article.date}</span>
                      <span style={{ marginLeft: 'auto', padding: '2px 8px', borderRadius: '50px', border: '1px solid var(--border)' }}>{article.read}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', borderTop: '1px solid var(--border)', padding: '0.6rem 1.2rem', gap: '1rem' }}>
                    <button onClick={(e) => { e.stopPropagation(); toggleLike(article.id); }} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.75rem', color: isLiked ? 'var(--accent)' : 'var(--ink3)' }}>❤️ {article.likes + (isLiked ? 1 : 0)}</button>
                    <button onClick={(e) => { e.stopPropagation(); toggleBookmark(article.id); }} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.75rem', color: isBookmarked ? 'var(--accent)' : 'var(--ink3)' }}>🔖 {isBookmarked ? 'Saved' : 'Save'}</button>
                    <button onClick={(e) => { e.stopPropagation(); openArticle(article); }} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.75rem', color: 'var(--accent)', marginLeft: 'auto' }}>Read →</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedArticle && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(12px)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'
        }} onClick={closeModal}>
          <div style={{ background: 'var(--card)', borderRadius: '24px', maxWidth: '700px', width: '100%', maxHeight: '85vh', overflow: 'auto' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ position: 'sticky', top: 0, background: 'var(--card)', borderBottom: '1px solid var(--border)', padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between' }}>
              <h2 style={{ fontFamily: 'Playfair Display, Georgia', fontSize: '1.1rem', fontWeight: '700' }}>{selectedArticle.title}</h2>
              <button onClick={closeModal} style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid var(--border)', background: 'none', cursor: 'pointer' }}>✕</button>
            </div>
            <div style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <span style={{ padding: '4px 10px', borderRadius: '50px', fontSize: '0.7rem', ...getTagStyle(selectedArticle.cat) }}>{selectedArticle.lbl}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--ink2)' }}>{selectedArticle.author}</span><span>•</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--ink3)' }}>{selectedArticle.date}</span>
              </div>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '1rem' }}>{selectedArticle.desc}</p>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.7' }}>{selectedArticle.body}</p>
              <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
                <span>❤️ {selectedArticle.likes + (likedArticles[selectedArticle.id] ? 1 : 0)} likes</span>
                <span>👁️ {selectedArticle.views} views</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', padding: '3rem 2rem 1.5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
            <div><div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}><div style={{ width: '8px', height: '8px', background: 'var(--accent)', borderRadius: '50%' }}></div><span style={{ fontFamily: 'Playfair Display, Georgia', fontSize: '1.3rem', fontWeight: '700' }}>Signal</span></div><p style={{ fontSize: '0.8rem', color: 'var(--ink2)' }}>Discover articles, ideas, and insights across every topic that matters.</p></div>
            <div><h4 style={{ fontSize: '0.7rem', marginBottom: '0.8rem' }}>CATEGORIES</h4>{categories.slice(1, 6).map(c => <button key={c.id} onClick={() => filterByCategory(c.id)} style={{ fontSize: '0.8rem', color: 'var(--ink2)', background: 'none', border: 'none', cursor: 'pointer', padding: '0.3rem 0', display: 'block' }}>{c.icon} {c.name}</button>)}</div>
            <div><h4 style={{ fontSize: '0.7rem', marginBottom: '0.8rem' }}>COMPANY</h4>{['About', 'Contact', 'Privacy', 'Terms'].map(item => <button key={item} onClick={() => showToast('Coming soon')} style={{ fontSize: '0.8rem', color: 'var(--ink2)', background: 'none', border: 'none', cursor: 'pointer', padding: '0.3rem 0', display: 'block' }}>{item}</button>)}</div>
          </div>
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', textAlign: 'center' }}><span style={{ fontSize: '0.7rem', color: 'var(--ink3)' }}>© 2025 Signal. All rights reserved.</span></div>
        </div>
      </footer>

      {toast.show && <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', background: 'var(--ink)', color: '#fff', padding: '0.6rem 1.2rem', borderRadius: '50px', fontSize: '0.8rem', zIndex: 1000 }}>{toast.message}</div>}
    </div>
  );
}
