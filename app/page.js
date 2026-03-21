'use client';

import { useState, useEffect, useRef } from 'react';
import { articles, categories, trending, tickerData, tools, comments } from '../lib/data';

export default function Home() {
  // State variables
  const [displayArticles, setDisplayArticles] = useState(articles);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(false);
  const [liveCount, setLiveCount] = useState(3241);
  const [isDark, setIsDark] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [likedArticles, setLikedArticles] = useState({});
  const [readCount, setReadCount] = useState(0);
  const [toast, setToast] = useState({ show: false, message: '' });
  const [showShare, setShowShare] = useState(false);
  const [userComments, setUserComments] = useState(comments);
  const [newComment, setNewComment] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [windowWidth, setWindowWidth] = useState(1200);
  
  const cDRef = useRef(null);
  const cRRef = useRef(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const ringX = useRef(0);
  const ringY = useRef(0);

  // Window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  // Custom cursor (desktop only)
  useEffect(() => {
    if (isMobile) return;
    
    const onMouseMove = (e) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
      if (cDRef.current) {
        cDRef.current.style.left = mouseX.current + 'px';
        cDRef.current.style.top = mouseY.current + 'px';
      }
    };
    const animateRing = () => {
      ringX.current += (mouseX.current - ringX.current) * 0.12;
      ringY.current += (mouseY.current - ringY.current) * 0.12;
      if (cRRef.current) {
        cRRef.current.style.left = ringX.current + 'px';
        cRRef.current.style.top = ringY.current + 'px';
      }
      requestAnimationFrame(animateRing);
    };
    document.addEventListener('mousemove', onMouseMove);
    animateRing();
    return () => document.removeEventListener('mousemove', onMouseMove);
  }, [isMobile]);

  // Scroll progress
  useEffect(() => {
    const onScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress((winScroll / height) * 100);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Load saved data
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
    const savedBookmarks = localStorage.getItem('bookmarks');
    if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));
    const savedLikes = localStorage.getItem('likedArticles');
    if (savedLikes) setLikedArticles(JSON.parse(savedLikes));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);
  
  useEffect(() => {
    localStorage.setItem('likedArticles', JSON.stringify(likedArticles));
  }, [likedArticles]);

  // Live counter
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveCount(prev => prev + Math.floor(Math.random() * 40) - 20);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const showToastMsg = (msg) => {
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
    showToastMsg(isDark ? '☀️ Light mode' : '🌙 Dark mode');
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

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    if (term.length > 0) {
      const results = articles.filter(a => 
        a.title.toLowerCase().includes(term) ||
        a.desc.toLowerCase().includes(term) ||
        a.author.toLowerCase().includes(term) ||
        a.lbl.toLowerCase().includes(term)
      );
      setSearchResults(results);
      setShowSearch(true);
    } else {
      setShowSearch(false);
      setSearchResults([]);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setShowSearch(false);
    setSearchResults([]);
  };

  const openArticle = (article) => {
    setSelectedArticle(article);
    setShowShare(false);
    setReadCount(prev => prev + 1);
  };

  const closeModal = () => {
    setSelectedArticle(null);
    setShowShare(false);
  };

  const toggleLike = (id) => {
    setLikedArticles(prev => {
      const newState = { ...prev };
      if (newState[id]) {
        delete newState[id];
        showToastMsg('🤍 Like removed');
      } else {
        newState[id] = true;
        showToastMsg('❤️ Liked!');
      }
      return newState;
    });
  };

  const toggleBookmark = (id) => {
    setBookmarks(prev => {
      if (prev.includes(id)) {
        showToastMsg('🗑 Removed from bookmarks');
        return prev.filter(i => i !== id);
      } else {
        showToastMsg('📌 Bookmarked!');
        return [...prev, id];
      }
    });
  };

  const toggleShare = () => {
    setShowShare(!showShare);
  };

  const copyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    showToastMsg('🔗 Link copied!');
  };

  const doShare = (platform) => {
    const url = window.location.href;
    const title = selectedArticle?.title || 'Signal';
    const links = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`
    };
    window.open(links[platform], '_blank');
    showToastMsg(`Opening ${platform}...`);
  };

  const submitComment = () => {
    if (newComment.trim()) {
      const newCmt = {
        name: 'You',
        time: 'just now',
        text: newComment,
        avatar: 'Y',
        color: '#e8420a',
        likes: 0
      };
      setUserComments([newCmt, ...userComments]);
      setNewComment('');
      showToastMsg('💬 Comment published!');
    }
  };

  const subscribeNewsletter = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    if (email && email.includes('@')) {
      showToastMsg('🎉 Welcome to Signal!');
      e.target.email.value = '';
    } else {
      showToastMsg('Please enter a valid email');
    }
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

  const getTickerType = (type) => {
    if (type === 'hot') return { text: '🔥 Hot', color: '#ff9070' };
    if (type === 'new') return { text: '✨ New', color: '#6ddfa0' };
    return { text: '📈 Trend', color: '#ffd070' };
  };

  return (
    <div style={{ cursor: isMobile ? 'auto' : 'none', background: 'var(--bg, #f9f8f5)', minHeight: '100vh' }}>
      <style>{`
        :root {
          --bg: #f9f8f5;
          --bg2: #f0ede6;
          --ink: #1a1814;
          --ink2: #4a4640;
          --ink3: #9a9690;
          --accent: #e8420a;
          --accent2: #f5a623;
          --border: #e0ddd6;
          --card: #fff;
        }
        [data-theme="dark"] {
          --bg: #0d0c0a;
          --bg2: #161512;
          --ink: #f0ede6;
          --ink2: #a0ada8;
          --ink3: #5a5650;
          --border: #262420;
          --card: #161512;
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.5); opacity: 0.6; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(5px); }
        }
        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .ticker-inner {
          display: flex;
          gap: 2rem;
          animation: ticker 30s linear infinite;
          white-space: nowrap;
          width: max-content;
        }
        .ticker-wrap:hover .ticker-inner {
          animation-play-state: paused;
        }
        .reveal {
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      {/* Custom Cursor */}
      {!isMobile && (
        <>
          <div ref={cDRef} style={{ position: 'fixed', width: '8px', height: '8px', background: '#fff', borderRadius: '50%', pointerEvents: 'none', zIndex: 9999, mixBlendMode: 'difference', top: 0, left: 0, transform: 'translate(-50%,-50%)' }}></div>
          <div ref={cRRef} style={{ position: 'fixed', width: '36px', height: '36px', border: '1.5px solid rgba(255,255,255,0.5)', borderRadius: '50%', pointerEvents: 'none', zIndex: 9999, mixBlendMode: 'difference', top: 0, left: 0, transform: 'translate(-50%,-50%)', transition: 'width 0.3s, height 0.3s' }}></div>
        </>
      )}

      {/* Scroll Progress Bar */}
      <div style={{ position: 'fixed', top: 0, left: 0, zIndex: 500, height: '3px', background: 'linear-gradient(90deg, var(--accent), var(--accent2))', width: `${scrollProgress}%`, boxShadow: '0 0 8px var(--accent)' }}></div>

      {/* Navbar */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200, height: isMobile ? '60px' : '70px',
        padding: isMobile ? '0 1rem' : '0 clamp(1rem,5vw,3rem)', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', background: 'rgba(249,248,245,0.95)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }} onClick={() => filterByCategory('all')}>
          <div style={{ width: isMobile ? '8px' : '10px', height: isMobile ? '8px' : '10px', background: 'var(--accent)', borderRadius: '50%', animation: 'pulse 2s infinite' }}></div>
          <span style={{ fontFamily: 'Playfair Display, Georgia', fontSize: isMobile ? '1.3rem' : '1.5rem', fontWeight: '800', color: 'var(--ink)' }}>Signal</span>
        </div>
        <div style={{ display: 'flex', gap: '0.8rem' }}>
          <button onClick={toggleTheme} style={{ width: '40px', height: '40px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--card)', cursor: 'pointer', fontSize: '1.2rem' }}>
            {isDark ? '☀️' : '🌙'}
          </button>
          <button onClick={() => showToastMsg(`${bookmarks.length} bookmarks saved`)} style={{ width: '40px', height: '40px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--card)', cursor: 'pointer', fontSize: '1.2rem', position: 'relative' }}>
            🔖
            {bookmarks.length > 0 && (
              <span style={{ position: 'absolute', top: '-5px', right: '-5px', background: 'var(--accent)', color: 'white', borderRadius: '50%', width: '18px', height: '18px', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{bookmarks.length}</span>
            )}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', textAlign: 'center', padding: isMobile ? '80px 1rem 3rem' : '100px clamp(1rem,5vw,3rem) 4rem'
      }}>
        <div style={{ maxWidth: isMobile ? '100%' : '800px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.6rem', padding: isMobile ? '6px 14px' : '8px 20px',
            borderRadius: '100px', border: '1px solid var(--border)', background: 'var(--card)', marginBottom: '2rem'
          }}>
            <span style={{ width: '8px', height: '8px', background: '#22c55e', borderRadius: '50%', animation: 'pulse 1.5s infinite' }}></span>
            <span>⚡ LIVE · {liveCount.toLocaleString()} readers online</span>
          </div>
          <h1 style={{
            fontFamily: 'Playfair Display, Georgia', fontSize: isMobile ? '2.5rem' : 'clamp(3rem, 8vw, 5rem)',
            fontWeight: '900', lineHeight: '1.1', marginBottom: '1.5rem', color: 'var(--ink)'
          }}>The signal for<br /><span style={{ color: 'var(--accent)' }}>what's next</span></h1>
          <p style={{ fontSize: isMobile ? '1rem' : '1.2rem', color: 'var(--ink2)', marginBottom: '2rem' }}>Discover articles, ideas, and insights across every topic that matters.</p>
          
          {/* Search Bar */}
          <div style={{ position: 'relative', maxWidth: isMobile ? '100%' : '550px', margin: '0 auto' }}>
            <input type="text" placeholder="🔍 Search articles, topics, resources..." value={searchTerm} onChange={handleSearch}
              style={{ width: '100%', padding: isMobile ? '14px 20px 14px 48px' : '16px 24px 16px 52px', borderRadius: '60px', border: '1.5px solid var(--border)', background: 'var(--card)', fontSize: isMobile ? '0.9rem' : '1rem', outline: 'none' }} />
            <span style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)' }}>🔍</span>
            {searchTerm && (
              <button onClick={clearSearch} style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}>✕</button>
            )}
            {showSearch && searchResults.length > 0 && (
              <div style={{ position: 'absolute', top: 'calc(100% + 12px)', left: 0, right: 0, background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '20px', overflow: 'hidden', zIndex: 50 }}>
                {searchResults.slice(0, 5).map(a => (
                  <div key={a.id} onClick={() => openArticle(a)} style={{ padding: isMobile ? '12px 16px' : '14px 20px', display: 'flex', gap: '12px', alignItems: 'center', cursor: 'pointer', borderBottom: '1px solid var(--border)' }}>
                    <span style={{ fontSize: '1.3rem', width: '40px', height: '40px', background: 'var(--bg2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{a.em}</span>
                    <div style={{ flex: 1 }}><div style={{ fontWeight: '600' }}>{a.title}</div><div style={{ fontSize: '0.7rem', color: 'var(--ink3)' }}>{a.lbl} · {a.author}</div></div>
                    <span style={{ color: 'var(--accent)' }}>→</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Stats */}
          <div style={{ display: 'flex', gap: isMobile ? '1.5rem' : '3rem', justifyContent: 'center', marginTop: '3rem', flexWrap: 'wrap' }}>
            <div><div style={{ fontFamily: 'Playfair Display, Georgia', fontSize: isMobile ? '1.6rem' : '2rem', fontWeight: '800', color: 'var(--accent)' }}>{articles.length}</div><div style={{ fontSize: '0.7rem', color: 'var(--ink3)' }}>📄 ARTICLES</div></div>
            <div><div style={{ fontFamily: 'Playfair Display, Georgia', fontSize: isMobile ? '1.6rem' : '2rem', fontWeight: '800', color: 'var(--accent)' }}>{readCount}</div><div style={{ fontSize: '0.7rem', color: 'var(--ink3)' }}>📖 READ TODAY</div></div>
            <div><div style={{ fontFamily: 'Playfair Display, Georgia', fontSize: isMobile ? '1.6rem' : '2rem', fontWeight: '800', color: 'var(--accent)' }}>{bookmarks.length}</div><div style={{ fontSize: '0.7rem', color: 'var(--ink3)' }}>🔖 BOOKMARKS</div></div>
            <div><div style={{ fontFamily: 'Playfair Display, Georgia', fontSize: isMobile ? '1.6rem' : '2rem', fontWeight: '800', color: 'var(--accent)' }}>∞</div><div style={{ fontSize: '0.7rem', color: 'var(--ink3)' }}>💡 INSIGHTS</div></div>
          </div>
        </div>
        
        <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--ink3)' }}>Scroll to explore</span>
          <div style={{ width: '36px', height: '36px', border: '1.5px solid var(--border)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'bounce 2s infinite' }}>↓</div>
        </div>
      </section>

      {/* Ticker */}
      <div className="ticker-wrap" style={{ background: 'var(--ink)', padding: isMobile ? '0.5rem 0' : '0.7rem 0', overflow: 'hidden' }}>
        <div className="ticker-inner">
          {[...tickerData, ...tickerData].map((item, i) => {
            const type = getTickerType(item.type);
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: isMobile ? '0.7rem' : '0.8rem' }}>
                <span style={{ padding: '2px 8px', borderRadius: '50px', fontSize: '0.6rem', background: 'rgba(255,255,255,0.2)', color: type.color }}>{type.text}</span>
                <span style={{ color: '#f0ede6' }}>{item.text}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: isMobile ? '2rem 1rem 3rem' : '3rem clamp(1rem,5vw,3rem) 4rem' }}>
        {/* Featured Stories */}
        <div className="reveal">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink3)' }}>✨ Featured Stories</span>
            <a style={{ fontSize: '0.75rem', color: 'var(--accent)', cursor: 'pointer' }}>View all →</a>
          </div>
          
          {/* Categories Filter */}
          <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
            {categories.map(cat => (
              <button key={cat.id} onClick={() => filterByCategory(cat.id)} style={{
                flexShrink: 0, padding: isMobile ? '8px 16px' : '10px 22px', borderRadius: '50px',
                border: `1.5px solid ${activeCategory === cat.id ? 'var(--ink)' : 'var(--border)'}`,
                background: activeCategory === cat.id ? 'var(--ink)' : 'var(--card)',
                color: activeCategory === cat.id ? 'var(--bg)' : 'var(--ink2)',
                cursor: 'pointer', fontSize: '0.8rem', fontWeight: '500', whiteSpace: 'nowrap'
              }}>{cat.icon} {cat.name}</button>
            ))}
          </div>
          
          {/* Featured Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.7fr 1fr', gap: '1rem' }}>
            {articles[0] && (
              <div onClick={() => openArticle(articles[0])} style={{
                gridRow: isMobile ? 'auto' : 'span 2', borderRadius: '20px', border: '1px solid var(--border)',
                background: 'linear-gradient(135deg, #fffcf7, #fdf0dc)', padding: isMobile ? '1.5rem' : '2rem',
                cursor: 'pointer', position: 'relative', overflow: 'hidden'
              }}>
                <span style={{ position: 'absolute', top: '1rem', right: '1.5rem', fontFamily: 'Playfair Display', fontSize: isMobile ? '6rem' : '9rem', fontWeight: '900', color: 'var(--accent2)', opacity: 0.1 }}>01</span>
                <span style={{ display: 'inline-flex', padding: '4px 12px', borderRadius: '50px', fontSize: '0.7rem', fontWeight: '600', ...getTagStyle(articles[0].cat), marginBottom: '1rem' }}>{articles[0].lbl}</span>
                <h2 style={{ fontFamily: 'Playfair Display, Georgia', fontSize: isMobile ? '1.3rem' : '1.8rem', fontWeight: '700', marginBottom: '0.8rem', color: 'var(--ink)' }}>{articles[0].title}</h2>
                <p style={{ fontSize: isMobile ? '0.85rem' : '0.9rem', color: 'var(--ink2)', marginBottom: '1rem' }}>{articles[0].desc}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.7rem', color: 'var(--ink3)' }}>
                  <span>👤 {articles[0].author}</span><span>•</span><span>📅 {articles[0].date}</span>
                  <span style={{ marginLeft: 'auto', padding: '3px 10px', borderRadius: '50px', border: '1px solid var(--border)' }}>⏱️ {articles[0].read}</span>
                </div>
              </div>
            )}
            {articles[1] && (
              <div onClick={() => openArticle(articles[1])} style={{
                borderRadius: '20px', border: '1px solid var(--border)', background: 'var(--card)',
                padding: isMobile ? '1.2rem' : '1.5rem', cursor: 'pointer'
              }}>
                <span style={{ display: 'inline-flex', padding: '4px 10px', borderRadius: '50px', fontSize: '0.65rem', fontWeight: '600', ...getTagStyle(articles[1].cat), marginBottom: '0.8rem' }}>{articles[1].lbl}</span>
                <h3 style={{ fontFamily: 'Playfair Display, Georgia', fontSize: isMobile ? '1rem' : '1.1rem', fontWeight: '700', marginBottom: '0.6rem', color: 'var(--ink)' }}>{articles[1].title}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.65rem', color: 'var(--ink3)' }}>
                  <span>👤 {articles[1].author}</span><span>•</span><span>{articles[1].date}</span>
                  <span style={{ marginLeft: 'auto', padding: '2px 8px', borderRadius: '50px', border: '1px solid var(--border)' }}>{articles[1].read}</span>
                </div>
              </div>
            )}
            {articles[4] && (
              <div onClick={() => openArticle(articles[4])} style={{
                borderRadius: '20px', border: '1px solid var(--border)', background: 'var(--card)',
                padding: isMobile ? '1.2rem' : '1.5rem', cursor: 'pointer'
              }}>
                <span style={{ display: 'inline-flex', padding: '4px 10px', borderRadius: '50px', fontSize: '0.65rem', fontWeight: '600', ...getTagStyle(articles[4].cat), marginBottom: '0.8rem' }}>{articles[4].lbl}</span>
                <h3 style={{ fontFamily: 'Playfair Display, Georgia', fontSize: isMobile ? '1rem' : '1.1rem', fontWeight: '700', marginBottom: '0.6rem', color: 'var(--ink)' }}>{articles[4].title}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.65rem', color: 'var(--ink3)' }}>
                  <span>👤 {articles[4].author}</span><span>•</span><span>{articles[4].date}</span>
                  <span style={{ marginLeft: 'auto', padding: '2px 8px', borderRadius: '50px', border: '1px solid var(--border)' }}>{articles[4].read}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Two Column Layout */}
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '2rem' : '2.5rem', marginTop: '3rem' }}>
          {/* Articles List */}
          <div style={{ flex: 1 }}>
            <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--ink3)' }}>📰 Latest</span>
              <span style={{ flex: 1, height: '1px', background: 'var(--border)' }}></span>
            </div>
            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>Loading...</div>
            ) : (
              displayArticles.map((article, idx) => {
                const isLiked = likedArticles[article.id];
                const isBookmarked = bookmarks.includes(article.id);
                const tagStyle = getTagStyle(article.cat);
                return (
                  <div key={article.id} onClick={() => openArticle(article)} style={{
                    display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 90px',
                    gap: isMobile ? '1rem' : '1.5rem', alignItems: 'start',
                    padding: isMobile ? '1.2rem 0' : '1.5rem 0', borderBottom: '1px solid var(--border)',
                    cursor: 'pointer', transition: 'padding-left 0.2s'
                  }} onMouseEnter={(e) => !isMobile && (e.currentTarget.style.paddingLeft = '0.8rem')}
                     onMouseLeave={(e) => !isMobile && (e.currentTarget.style.paddingLeft = '0')}>
                    <div>
                      <div style={{ fontFamily: 'monospace', fontSize: '0.6rem', color: 'var(--ink3)', marginBottom: '0.3rem' }}>0{idx + 1}</div>
                      <span style={{ display: 'inline-flex', padding: '3px 10px', borderRadius: '50px', fontSize: '0.65rem', fontWeight: '600', ...tagStyle, marginBottom: '0.6rem' }}>{article.lbl}</span>
                      <h3 style={{ fontFamily: 'Playfair Display, Georgia', fontSize: isMobile ? '1rem' : '1.05rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--ink)' }}>{article.title}</h3>
                      <p style={{ fontSize: isMobile ? '0.8rem' : '0.85rem', color: 'var(--ink2)', marginBottom: '0.8rem' }}>{article.desc}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', color: 'var(--ink3)' }}>
                        <span>👤 {article.author}</span><span>•</span><span>📅 {article.date}</span>
                        <span style={{ marginLeft: 'auto', padding: '2px 8px', borderRadius: '50px', border: '1px solid var(--border)' }}>⏱️ {article.read}</span>
                      </div>
                    </div>
                    {!isMobile && (
                      <div style={{ width: '90px', height: '70px', background: 'var(--bg2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>{article.em}</div>
                    )}
                  </div>
                );
              })
            )}
          </div>
          
          {/* Sidebar */}
          {!isMobile && (
            <aside style={{ width: '320px', flexShrink: 0 }}>
              {/* Trending */}
              <div style={{ border: '1px solid var(--border)', borderRadius: '20px', overflow: 'hidden', marginBottom: '1.5rem', background: 'var(--card)' }}>
                <div style={{ padding: '0.8rem 1rem', borderBottom: '1px solid var(--border)', background: 'var(--bg2)', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: '600', textTransform: 'uppercase' }}>🔥 Trending Now</span>
                  <span style={{ fontSize: '0.6rem', color: 'var(--accent)' }}>↑ Live</span>
                </div>
                <div style={{ padding: '0.8rem 1rem' }}>
                  {trending.map((t, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: '0.8rem', padding: '0.6rem 0', borderBottom: i < trending.length - 1 ? '1px solid var(--border)' : 'none' }}>
                      <span style={{ fontFamily: 'Playfair Display, Georgia', fontSize: '1.2rem', fontWeight: '700', color: 'var(--border)', minWidth: '28px' }}>0{i+1}</span>
                      <span style={{ fontSize: '0.8rem', fontWeight: '500', color: 'var(--ink)' }}>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Quick Tools */}
              <div style={{ border: '1px solid var(--border)', borderRadius: '20px', overflow: 'hidden', marginBottom: '1.5rem', background: 'var(--card)' }}>
                <div style={{ padding: '0.8rem 1rem', borderBottom: '1px solid var(--border)', background: 'var(--bg2)' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: '600', textTransform: 'uppercase' }}>🛠️ Quick Tools</span>
                </div>
                <div style={{ padding: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                  {tools.slice(0, 4).map((tool, i) => (
                    <div key={i} style={{ padding: '0.8rem', borderRadius: '12px', background: 'var(--bg2)', cursor: 'pointer' }}>
                      <div style={{ width: '36px', height: '36px', background: '#f0ede6', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', marginBottom: '0.5rem' }}>{tool.icon}</div>
                      <div style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--ink)' }}>{tool.name}</div>
                      <div style={{ fontSize: '0.65rem', color: 'var(--ink3)' }}>{tool.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Browse Topics */}
              <div style={{ border: '1px solid var(--border)', borderRadius: '20px', overflow: 'hidden', marginBottom: '1.5rem', background: 'var(--card)' }}>
                <div style={{ padding: '0.8rem 1rem', borderBottom: '1px solid var(--border)', background: 'var(--bg2)' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: '600', textTransform: 'uppercase' }}>📚 Browse Topics</span>
                </div>
                <div style={{ padding: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {categories.slice(1).map(cat => (
                    <span key={cat.id} onClick={() => filterByCategory(cat.id)} style={{
                      display: 'inline-flex', padding: '5px 12px', borderRadius: '50px', fontSize: '0.7rem', fontWeight: '500',
                      background: getTagStyle(cat.id).background, color: getTagStyle(cat.id).color, cursor: 'pointer'
                    }}>{cat.icon} {cat.name}</span>
                  ))}
                </div>
              </div>
              
              {/* Reading Stats */}
              <div style={{ border: '1px solid var(--border)', borderRadius: '20px', overflow: 'hidden', background: 'var(--card)' }}>
                <div style={{ padding: '0.8rem 1rem', borderBottom: '1px solid var(--border)', background: 'var(--bg2)' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: '600', textTransform: 'uppercase' }}>📖 Your Reading</span>
                </div>
                <div style={{ padding: '1rem' }}>
                  {readCount === 0 ? (
                    <div style={{ fontSize: '0.8rem', color: 'var(--ink2)' }}>Start reading to track progress.</div>
                  ) : (
                    <>
                      <div style={{ fontSize: '0.8rem', marginBottom: '0.5rem' }}>📚 <strong>{readCount}</strong> article{readCount > 1 ? 's' : ''} read today</div>
                      <div style={{ background: 'var(--bg2)', borderRadius: '50px', height: '6px', overflow: 'hidden' }}>
                        <div style={{ width: `${Math.min(readCount * 20, 100)}%`, height: '100%', background: 'linear-gradient(90deg, var(--accent), var(--accent2))', borderRadius: '50px' }}></div>
                      </div>
                      <div style={{ fontSize: '0.65rem', marginTop: '0.5rem', color: 'var(--ink3)' }}>
                        {readCount >= 5 ? '🏆 Daily goal reached!' : `${5 - readCount} more to reach daily goal`}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>

      {/* Newsletter */}
      <div style={{ padding: isMobile ? '0 1rem 2.5rem' : '0 clamp(1rem,5vw,3rem) 3rem', maxWidth: '1240px', margin: '0 auto' }}>
        <div style={{
          background: 'linear-gradient(135deg, #1a1814, #2a2620)', borderRadius: '24px', padding: isMobile ? '1.5rem' : '2rem',
          display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', gap: '1.5rem'
        }}>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontFamily: 'Playfair Display, Georgia', fontSize: isMobile ? '1.2rem' : '1.3rem', fontWeight: '700', color: '#f0ede6', marginBottom: '0.2rem' }}>📬 Stay in the loop</h2>
            <p style={{ color: '#9a9690', fontSize: '0.75rem' }}>Weekly discoveries. No noise, just signal.</p>
          </div>
          <div style={{ flex: 1 }}>
            <form onSubmit={subscribeNewsletter} style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '0.5rem' }}>
              <input type="email" name="email" placeholder="your@email.com" style={{
                flex: 1, padding: '12px 16px', borderRadius: '60px', border: '1px solid #3a3630',
                background: '#161512', color: '#f0ede6', fontSize: '0.8rem', outline: 'none'
              }} />
              <button type="submit" style={{ padding: '12px 20px', borderRadius: '60px', background: 'var(--accent)', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: '600' }}>Subscribe ✨</button>
            </form>
          </div>
        </div>
      </div>

      {/* Article Modal */}
      {selectedArticle && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(10,9,8,0.85)', backdropFilter: 'blur(16px)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.8rem'
        }} onClick={closeModal}>
          <div style={{
            background: 'var(--card)', borderRadius: '28px', maxWidth: isMobile ? '95%' : '760px',
            width: '100%', maxHeight: '90vh', display: 'flex', flexDirection: 'column', overflow: 'hidden'
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: isMobile ? '0.9rem 1rem' : '1rem 1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div><span style={{ fontFamily: 'Playfair Display, Georgia', fontSize: '0.9rem', fontWeight: '700', color: 'var(--ink)' }}>Signal</span><span style={{ fontSize: '0.7rem', marginLeft: '0.3rem', color: 'var(--ink3)' }}>› {selectedArticle.lbl}</span></div>
              <button onClick={closeModal} style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid var(--border)', background: 'none', cursor: 'pointer' }}>✕</button>
            </div>
            <div style={{ overflowY: 'auto', flex: 1, padding: isMobile ? '1rem' : '2rem' }}>
              <span style={{ display: 'inline-flex', padding: '4px 12px', borderRadius: '50px', fontSize: '0.7rem', fontWeight: '600', ...getTagStyle(selectedArticle.cat), marginBottom: '1rem' }}>{selectedArticle.lbl}</span>
              <h2 style={{ fontFamily: 'Playfair Display, Georgia', fontSize: isMobile ? '1.3rem' : '1.8rem', fontWeight: '700', marginBottom: '0.8rem', color: 'var(--ink)' }}>{selectedArticle.title}</h2>
              <p style={{ fontSize: isMobile ? '0.85rem' : '0.9rem', color: 'var(--ink2)', marginBottom: '1rem' }}>{selectedArticle.desc}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: `linear-gradient(135deg, var(--accent), var(--accent2))`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '600' }}>{selectedArticle.author.charAt(0)}</div>
                <div><div style={{ fontWeight: '600', color: 'var(--ink)' }}>{selectedArticle.author}</div><div style={{ fontSize: '0.7rem', color: 'var(--ink3)' }}>{selectedArticle.date} · {selectedArticle.read} read</div></div>
                <div style={{ marginLeft: 'auto' }}><span style={{ fontSize: '0.7rem', padding: '3px 10px', borderRadius: '50px', border: '1px solid var(--border)' }}>👁️ {selectedArticle.views}</span></div>
              </div>
              <div style={{ fontSize: isMobile ? '0.9rem' : '1rem', lineHeight: '1.7', color: 'var(--ink2)' }}>
                {selectedArticle.body.split('\n\n').map((para, i) => (
                  <p key={i} style={{ marginBottom: '1.2rem' }}>{para}</p>
                ))}
              </div>
              
              {/* Engagement Bar */}
              <div style={{ display: 'flex', justifyContent: 'space-around', padding: '1rem', border: '1px solid var(--border)', borderRadius: '20px', margin: '1.5rem 0', background: 'var(--bg2)' }}>
                <button onClick={() => toggleLike(selectedArticle.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem', color: likedArticles[selectedArticle.id] ? 'var(--accent)' : 'var(--ink2)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>❤️ {selectedArticle.likes + (likedArticles[selectedArticle.id] ? 1 : 0)}</button>
                <button onClick={() => toggleBookmark(selectedArticle.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem', color: bookmarks.includes(selectedArticle.id) ? 'var(--accent)' : 'var(--ink2)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>🔖 {bookmarks.includes(selectedArticle.id) ? 'Saved' : 'Save'}</button>
                <button onClick={toggleShare} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem', color: 'var(--ink2)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>🔗 Share</button>
              </div>
              
              {/* Share Panel */}
              {showShare && (
                <div style={{ padding: '1rem', border: '1px solid var(--border)', borderRadius: '16px', marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--ink3)', marginBottom: '0.8rem' }}>Share this article</div>
                  <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                    <button onClick={() => doShare('twitter')} style={{ padding: '6px 14px', borderRadius: '50px', border: '1px solid var(--border)', background: 'none', cursor: 'pointer' }}>🐦 X</button>
                    <button onClick={() => doShare('linkedin')} style={{ padding: '6px 14px', borderRadius: '50px', border: '1px solid var(--border)', background: 'none', cursor: 'pointer' }}>💼 LinkedIn</button>
                    <button onClick={() => doShare('whatsapp')} style={{ padding: '6px 14px', borderRadius: '50px', border: '1px solid var(--border)', background: 'none', cursor: 'pointer' }}>📱 WhatsApp</button>
                    <button onClick={copyLink} style={{ padding: '6px 14px', borderRadius: '50px', border: '1px solid var(--border)', background: 'none', cursor: 'pointer' }}>🔗 Copy Link</button>
                  </div>
                </div>
              )}
              
              {/* Comments */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                  <span style={{ fontFamily: 'Playfair Display, Georgia', fontSize: '1rem', fontWeight: '700', color: 'var(--ink)' }}>💬 Responses</span>
                  <span style={{ fontSize: '0.7rem', background: 'var(--bg2)', padding: '2px 8px', borderRadius: '50px' }}>{userComments.length}</span>
                </div>
                <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '1.2rem' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent), var(--accent2))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>Y</div>
                  <div style={{ flex: 1 }}>
                    <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Share your thoughts..." style={{ width: '100%', padding: '10px 14px', borderRadius: '16px', border: '1px solid var(--border)', background: 'var(--bg2)', fontSize: '0.8rem', height: '70px', outline: 'none', resize: 'none' }} />
                    <button onClick={submitComment} style={{ float: 'right', marginTop: '0.5rem', padding: '6px 16px', borderRadius: '50px', background: 'var(--ink)', color: '#fff', border: 'none', cursor: 'pointer' }}>Publish</button>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                  {userComments.map((c, i) => (
                    <div key={i} style={{ display: 'flex', gap: '0.8rem' }}>
                      <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '600' }}>{c.avatar}</div>
                      <div><div><span style={{ fontWeight: '600', color: 'var(--ink)' }}>{c.name}</span><span style={{ fontSize: '0.65rem', marginLeft: '0.5rem', color: 'var(--ink3)' }}>{c.time}</span></div><div style={{ fontSize: '0.8rem', marginTop: '0.2rem', color: 'var(--ink2)' }}>{c.text}</div></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', padding: isMobile ? '2rem 1rem 1rem' : '3rem clamp(1rem,5vw,3rem) 1rem' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', gap: '2rem', marginBottom: '2rem', textAlign: 'left' }}>
            <div><div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}><div style={{ width: '8px', height: '8px', background: 'var(--accent)', borderRadius: '50%' }}></div><span style={{ fontFamily: 'Playfair Display, Georgia', fontSize: '1.2rem', fontWeight: '700', color: 'var(--ink)' }}>Signal</span></div><p style={{ fontSize: '0.75rem', color: 'var(--ink3)' }}>Discover articles, ideas, and insights across every topic that matters. No noise, just signal.</p></div>
            <div><h4 style={{ fontSize: '0.65rem', marginBottom: '0.8rem', textTransform: 'uppercase', color: 'var(--accent)' }}>Categories</h4>{categories.slice(1, 6).map(c => <button key={c.id} onClick={() => filterByCategory(c.id)} style={{ fontSize: '0.75rem', color: 'var(--ink2)', background: 'none', border: 'none', cursor: 'pointer', padding: '0.3rem 0', display: 'block' }}>{c.icon} {c.name}</button>)}</div>
            <div><h4 style={{ fontSize: '0.65rem', marginBottom: '0.8rem', textTransform: 'uppercase', color: 'var(--accent)' }}>Tools</h4>{['Finance Tools', 'Health Tools', 'AI Tools', 'Tech Tools'].map(t => <button key={t} onClick={() => showToastMsg('Coming soon')} style={{ fontSize: '0.75rem', color: 'var(--ink2)', background: 'none', border: 'none', cursor: 'pointer', padding: '0.3rem 0', display: 'block' }}>{t}</button>)}</div>
            <div><h4 style={{ fontSize: '0.65rem', marginBottom: '0.8rem', textTransform: 'uppercase', color: 'var(--accent)' }}>Company</h4>{['About', 'Contact', 'Privacy', 'Terms'].map(item => <button key={item} onClick={() => showToastMsg('Coming soon')} style={{ fontSize: '0.75rem', color: 'var(--ink2)', background: 'none', border: 'none', cursor: 'pointer', padding: '0.3rem 0', display: 'block' }}>{item}</button>)}</div>
          </div>
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
            <span style={{ fontSize: '0.65rem', color: 'var(--ink3)' }}>© 2025 Signal Media. All rights reserved. Made with ✨ for curious minds.</span>
          </div>
        </div>
      </footer>

      {/* Toast */}
      {toast.show && (
        <div style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 1000, background: 'var(--ink)', color: '#fff', padding: '0.6rem 1.2rem', borderRadius: '50px', fontSize: '0.8rem', boxShadow: '0 8px 20px rgba(0,0,0,0.2)' }}>
          {toast.message}
        </div>
      )}
    </div>
  );
}
