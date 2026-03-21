'use client';

import { useState, useEffect } from 'react';
import { articles, categories, trending, tools } from '../lib/data';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ArticleCard from '../components/articles/ArticleCard';
import CategoryFilter from '../components/articles/CategoryFilter';
import TrendingList from '../components/sidebar/TrendingList';
import QuickTools from '../components/sidebar/QuickTools';
import ReadingStats from '../components/sidebar/ReadingStats';

export default function Home() {
  const [displayArticles, setDisplayArticles] = useState(articles);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(false);
  const [liveCount, setLiveCount] = useState(3241);
  const [isDark, setIsDark] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [likedArticles, setLikedArticles] = useState({});
  const [readCount, setReadCount] = useState(0);
  const [toast, setToast] = useState({ show: false, message: '' });

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') setIsDark(true);
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
    setReadCount(prev => prev + 1);
    showToast(`📖 Reading: ${article.title}`);
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
        showToast('📌 Bookmarked!');
        return [...prev, id];
      }
    });
  };

  return (
    <div style={{ background: '#f9f8f5', minHeight: '100vh' }}>
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.5); opacity: 0.6; }
        }
      `}</style>
      
      <Navbar 
        isDark={isDark} 
        onToggleTheme={toggleTheme} 
        bookmarksCount={bookmarks.length}
        onFilterAll={() => filterByCategory('all')}
      />
      
      {/* Hero Section */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '100px 2rem 3rem'
      }}>
        <div style={{ maxWidth: '700px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '5px 14px',
            borderRadius: '50px',
            border: '1px solid #e0ddd6',
            background: '#fff',
            marginBottom: '2rem'
          }}>
            <span style={{ width: '6px', height: '6px', background: '#22c55e', borderRadius: '50%', animation: 'pulse 1.5s infinite' }}></span>
            <span>Live — {liveCount.toLocaleString()} readers online</span>
          </div>
          <h1 style={{
            fontFamily: 'Playfair Display, Georgia',
            fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
            fontWeight: '900',
            lineHeight: '1.1',
            marginBottom: '1.5rem',
            color: '#1a1814'
          }}>
            The signal for<br /><span style={{ color: '#e8420a' }}>what's next</span>
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#4a4640', marginBottom: '2rem' }}>
            Discover articles, ideas, and insights across every topic that matters.
          </p>
          
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginTop: '2rem' }}>
            <div><div style={{ fontSize: '1.8rem', fontWeight: '700', color: '#e8420a' }}>{articles.length}</div><div>ARTICLES</div></div>
            <div><div style={{ fontSize: '1.8rem', fontWeight: '700', color: '#e8420a' }}>{readCount}</div><div>READ TODAY</div></div>
            <div><div style={{ fontSize: '1.8rem', fontWeight: '700', color: '#e8420a' }}>{bookmarks.length}</div><div>BOOKMARKS</div></div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem 4rem' }}>
        <CategoryFilter 
          categories={categories} 
          activeCategory={activeCategory} 
          onSelect={filterByCategory} 
        />
        
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>Loading...</div>
        ) : (
          <div style={{ display: 'flex', gap: '2.5rem' }}>
            <div style={{ flex: 1 }}>
              <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase' }}>📰 Latest</span>
                <span style={{ flex: 1, height: '1px', background: '#e0ddd6' }}></span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
                {displayArticles.map(article => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    onClick={openArticle}
                    isLiked={likedArticles[article.id]}
                    isBookmarked={bookmarks.includes(article.id)}
                    onLike={toggleLike}
                    onBookmark={toggleBookmark}
                  />
                ))}
              </div>
            </div>
            
            <aside style={{ width: '320px', flexShrink: 0 }}>
              <TrendingList trending={trending} />
              <QuickTools tools={tools} />
              <ReadingStats readCount={readCount} />
            </aside>
          </div>
        )}
      </div>
      
      <Footer />
      
      {toast.show && (
        <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', background: '#1a1814', color: '#fff', padding: '0.6rem 1.2rem', borderRadius: '50px', fontSize: '0.8rem', zIndex: 1000 }}>
          {toast.message}
        </div>
      )}
    </div>
  );
}
