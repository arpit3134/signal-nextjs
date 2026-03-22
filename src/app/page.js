'use client';

import { useState, useEffect, useRef } from 'react';
import { articles, categories, trending, tickerData } from '@/lib/data';
import ArticleCard from '@/components/articles/ArticleCard';
import CategoryFilter from '@/components/articles/CategoryFilter';
import TrendingList from '@/components/sidebar/TrendingList';
import QuickTools from '@/components/sidebar/QuickTools';
import BrowseTopics from '@/components/sidebar/BrowseTopics';
import ReadingStats from '@/components/sidebar/ReadingStats';
import SearchBar from '@/components/shared/SearchBar';
import Newsletter from '@/components/shared/Newsletter';
import Toast from '@/components/ui/Toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Modal from '@/components/modal/Modal';

export default function Home() {
  const [displayArts, setDisplayArts] = useState(articles);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(false);
  const [liveCount, setLiveCount] = useState(3241);
  const [isDark, setIsDark] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [likedArticles, setLikedArticles] = useState({});
  const [readCount, setReadCount] = useState(0);
  const [toast, setToast] = useState({ show: false, message: '' });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [windowWidth, setWindowWidth] = useState(1200);
  const [curLikeCount, setCurLikeCount] = useState(0);

  const cDRef = useRef(null);
  const cRRef = useRef(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const ringX = useRef(0);
  const ringY = useRef(0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  // Custom cursor
  useEffect(() => {
    if (isMobile) return;
    const onMove = (e) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
      if (cDRef.current) {
        cDRef.current.style.left = mouseX.current + 'px';
        cDRef.current.style.top = mouseY.current + 'px';
      }
    };
    const animate = () => {
      ringX.current += (mouseX.current - ringX.current) * 0.12;
      ringY.current += (mouseY.current - ringY.current) * 0.12;
      if (cRRef.current) {
        cRRef.current.style.left = ringX.current + 'px';
        cRRef.current.style.top = ringY.current + 'px';
      }
      requestAnimationFrame(animate);
    };
    document.addEventListener('mousemove', onMove);
    animate();
    return () => document.removeEventListener('mousemove', onMove);
  }, [isMobile]);

  // Scroll progress
  useEffect(() => {
    const onScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress((winScroll / height) * 100);
      const prog = document.getElementById('prog');
      if (prog) prog.style.width = ((winScroll / height) * 100) + '%';
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

  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);
  
  useEffect(() => {
    localStorage.setItem('likedArticles', JSON.stringify(likedArticles));
  }, [likedArticles]);

  // Live counter
  useEffect(() => {
    const interval = setInterval(() => setLiveCount(prev => prev + Math.floor(Math.random() * 40) - 20), 4000);
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
        setDisplayArts(articles);
      } else {
        setDisplayArts(articles.filter(a => a.cat === catId));
      }
      setLoading(false);
    }, 300);
  };

  const openArticle = (article) => {
    setSelectedArticle(article);
    setCurLikeCount(article.likes + (likedArticles[article.id] ? 1 : 0));
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
        showToastMsg('🤍 Like removed');
        setCurLikeCount(prev => prev - 1);
      } else {
        newState[id] = true;
        showToastMsg('❤️ Liked!');
        setCurLikeCount(prev => prev + 1);
      }
      return newState;
    });
  };

  const toggleBookmark = (id) => {
    setBookmarks(prev => {
      if (prev.includes(id)) {
        showToastMsg('🗑 Removed');
        return prev.filter(i => i !== id);
      } else {
        showToastMsg('📌 Bookmarked!');
        return [...prev, id];
      }
    });
  };

  const handleSubscribe = () => showToastMsg('🎉 Welcome to Signal!');

  // Featured articles
  const featured = articles.slice(0, 3);
  const mainFeatured = featured[0];
  const sideFeatured = featured.slice(1);

  return (
    <div>
      {!isMobile && (
        <>
          <div ref={cDRef} className="cur cur-d" style={{ position: 'fixed' }}></div>
          <div ref={cRRef} className="cur cur-r" style={{ position: 'fixed' }}></div>
        </>
      )}
      <div id="prog"></div>

      <Navbar 
        isDark={isDark} 
        onToggleTheme={toggleTheme} 
        onBookmark={() => showToastMsg(`📌 ${bookmarks.length} bookmarks`)} 
        bookmarkCount={bookmarks.length} 
        onHome={() => filterByCategory('all')} 
      />

      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="live-dot"></span>
            <span>Live — {liveCount.toLocaleString()} readers online</span>
          </div>
          <h1>The signal for<br /><em>what's next</em></h1>
          <p>Discover articles, ideas, and insights across every topic that matters.</p>
          <SearchBar articles={articles} onSelect={openArticle} />
          <div className="hero-stats">
            <div><div className="stat-num">{articles.length}</div><div className="stat-lbl">ARTICLES</div></div>
            <div><div className="stat-num">{readCount}</div><div className="stat-lbl">READ TODAY</div></div>
            <div><div className="stat-num">{bookmarks.length}</div><div className="stat-lbl">BOOKMARKS</div></div>
          </div>
        </div>
        <div className="scroll-cta">
          <span>Scroll to explore</span>
          <div className="s-arr">↓</div>
        </div>
      </section>

      {/* Ticker */}
      <div className="ticker-wrap">
        <div className="ticker-inner">
          {[...tickerData, ...tickerData].map((d, i) => (
            <div key={i} className="t-item">
              <span className={`t-tag ${d.tp}`}>{d.tp === 't-hot' ? '🔥 Hot' : d.tp === 't-new' ? '✦ New' : '↑ Trend'}</span>
              <span>{d.t}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="wrap" style={{ paddingTop: '2rem' }}>
        <div className="sec-head">
          <span className="sec-label">Featured Stories</span>
          <a className="sec-link">View all →</a>
        </div>
        
        <CategoryFilter categories={categories} active={activeCategory} onSelect={filterByCategory} />
        
        {/* Featured Grid */}
        <div className="feat-grid">
          {/* Main Featured */}
          {mainFeatured && (
            <div className="feat-main" onClick={() => openArticle(mainFeatured)}>
              <img src={mainFeatured.image} alt={mainFeatured.title} />
              <div className="feat-main-content">
                <span className="tag" style={{ background: 'rgba(255,255,255,0.95)', display: 'inline-flex', marginBottom: '0.5rem' }}>{mainFeatured.lbl}</span>
                <h2 className="card-title">{mainFeatured.title}</h2>
                <p className="card-desc">{mainFeatured.desc}</p>
                <div className="card-meta">
                  <span>{mainFeatured.author}</span>
                  <span className="dot"></span>
                  <span>{mainFeatured.date}</span>
                  <span className="read-time">{mainFeatured.read}</span>
                </div>
              </div>
            </div>
          )}
          
          {/* Side Featured */}
          <div className="feat-side">
            {sideFeatured.map(article => (
              <div key={article.id} className="feat-side-item" onClick={() => openArticle(article)}>
                <img src={article.image} alt={article.title} className="feat-side-img" />
                <div className="feat-side-content">
                  <span className="tag" style={{ display: 'inline-flex', padding: '2px 8px', fontSize: '0.6rem', marginBottom: '0.3rem' }}>{article.lbl}</span>
                  <h3 className="card-title">{article.title}</h3>
                  <div className="card-meta">
                    <span>{article.author}</span>
                    <span className="dot"></span>
                    <span>{article.date}</span>
                    <span className="read-time">{article.read}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Two Column Layout */}
        <div className="two-col">
          <div>
            <div className="sec-label" style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              Latest <span style={{ flex: 1, height: '1px', background: 'var(--border)' }}></span>
            </div>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>
            ) : (
              <div className="articles-grid">
                {displayArts.map(article => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    onClick={() => openArticle(article)}
                    isLiked={likedArticles[article.id]}
                    isBookmarked={bookmarks.includes(article.id)}
                    onLike={() => toggleLike(article.id)}
                    onBookmark={() => toggleBookmark(article.id)}
                  />
                ))}
              </div>
            )}
          </div>
          
          <aside className="sidebar">
            <TrendingList trends={trending} />
            <QuickTools />
            <BrowseTopics categories={categories} onSelect={filterByCategory} />
            <ReadingStats readCount={readCount} />
          </aside>
        </div>
      </div>

      <Newsletter onSubscribe={handleSubscribe} />
      <Footer categories={categories} onCategoryClick={filterByCategory} />
      
      {/* Article Modal */}
      <Modal 
        article={selectedArticle}
        isOpen={!!selectedArticle}
        onClose={closeModal}
        isLiked={selectedArticle ? likedArticles[selectedArticle.id] : false}
        isBookmarked={selectedArticle ? bookmarks.includes(selectedArticle.id) : false}
        likeCount={curLikeCount}
        onLike={() => selectedArticle && toggleLike(selectedArticle.id)}
        onBookmark={() => selectedArticle && toggleBookmark(selectedArticle.id)}
      />
      
      <Toast message={toast.message} show={toast.show} />
    </div>
  );
}
