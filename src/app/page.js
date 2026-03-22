'use client';

import { useState, useEffect, useRef } from 'react';
import { articles, categories, trending, tickerData, initialComments } from '@/lib/data';

// Components
import Navbar from '@/components/navbar/Navbar';
import Hero from '@/components/hero/Hero';
import Ticker from '@/components/ticker/Ticker';
import Footer from '@/components/footer/Footer';
import CategoryFilter from '@/components/articles/CategoryFilter';
import FeaturedGrid from '@/components/articles/FeaturedGrid';
import ArticleList from '@/components/articles/ArticleList';
import SearchBar from '@/components/search/SearchBar';
import Newsletter from '@/components/newsletter/Newsletter';
import Toast from '@/components/ui/Toast';
import TrendingList from '@/components/sidebar/TrendingList';
import QuickTools from '@/components/sidebar/QuickTools';
import BrowseTopics from '@/components/sidebar/BrowseTopics';
import ReadingStats from '@/components/sidebar/ReadingStats';
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
      if (cDRef.current) { cDRef.current.style.left = mouseX.current + 'px'; cDRef.current.style.top = mouseY.current + 'px'; }
    };
    const animate = () => {
      ringX.current += (mouseX.current - ringX.current) * 0.12;
      ringY.current += (mouseY.current - ringY.current) * 0.12;
      if (cRRef.current) { cRRef.current.style.left = ringX.current + 'px'; cRRef.current.style.top = ringY.current + 'px'; }
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
    if (savedTheme === 'dark') { setIsDark(true); document.documentElement.setAttribute('data-theme', 'dark'); }
    const savedBookmarks = localStorage.getItem('bookmarks');
    if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));
    const savedLikes = localStorage.getItem('likedArticles');
    if (savedLikes) setLikedArticles(JSON.parse(savedLikes));
  }, []);

  useEffect(() => { localStorage.setItem('bookmarks', JSON.stringify(bookmarks)); }, [bookmarks]);
  useEffect(() => { localStorage.setItem('likedArticles', JSON.stringify(likedArticles)); }, [likedArticles]);

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
    if (!isDark) { document.documentElement.setAttribute('data-theme', 'dark'); localStorage.setItem('theme', 'dark'); }
    else { document.documentElement.removeAttribute('data-theme'); localStorage.setItem('theme', 'light'); }
    showToastMsg(isDark ? '☀️ Light mode' : '🌙 Dark mode');
  };

  const filterByCategory = (catId) => {
    setActiveCategory(catId);
    setLoading(true);
    setTimeout(() => {
      if (catId === 'all') setDisplayArts(articles);
      else setDisplayArts(articles.filter(a => a.cat === catId));
      setLoading(false);
    }, 300);
  };

  const openArt = (id) => {
    const a = articles[id];
    if (!a) return;
    setSelectedArticle(a);
    setReadCount(prev => prev + 1);
  };

  const closeModal = () => setSelectedArticle(null);

  const subscribe = () => showToastMsg('🎉 Welcome to Signal!');

  return (
    <div>
      {!isMobile && (
        <>
          <div ref={cDRef} className="cur cur-d" style={{ position: 'fixed' }}></div>
          <div ref={cRRef} className="cur cur-r" style={{ position: 'fixed' }}></div>
        </>
      )}
      <div id="prog"></div>

      <Navbar isDark={isDark} onToggleTheme={toggleTheme} onBookmark={() => showToastMsg(`📌 ${bookmarks.length} bookmarks`)} bookmarkCount={bookmarks.length} onHome={() => filterByCategory('all')} />
      <Hero liveCount={liveCount} articlesCount={articles.length} readCount={readCount} bookmarkCount={bookmarks.length} />
      <Ticker data={tickerData} />

      <div className="wrap" style={{ paddingTop: '3rem' }}>
        <div className="sec-head"><span className="sec-label">Featured Stories</span><a className="sec-link">View all →</a></div>
        <CategoryFilter categories={categories} active={activeCategory} onSelect={filterByCategory} />
        <FeaturedGrid articles={articles} onOpen={openArt} />
      </div>

      <div className="wrap" style={{ paddingTop: '2rem' }}>
        <div className="two-col">
          <div>
            <div className="sec-label" style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '.5rem' }}>
              Latest <span style={{ flex: 1, height: '1px', background: 'var(--border)' }}></span>
            </div>
            <SearchBar articles={articles} onSelect={openArt} />
            {loading ? <div style={{ padding: '3rem', textAlign: 'center' }}>Loading...</div> : <ArticleList articles={displayArts} onOpen={openArt} />}
          </div>
          <aside className="sidebar">
            <TrendingList trends={trending} />
            <QuickTools />
            <BrowseTopics categories={categories} onSelect={filterByCategory} />
            <ReadingStats readCount={readCount} />
          </aside>
        </div>
      </div>

      <Newsletter onSubscribe={subscribe} />
      <Footer categories={categories} onCategoryClick={filterByCategory} />
      <Modal article={selectedArticle} isOpen={!!selectedArticle} onClose={closeModal} />
      <Toast message={toast.message} show={toast.show} />
    </div>
  );
}
