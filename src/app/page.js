'use client';

import { useState } from 'react';
import { articles, categories, trending, tools, tickerData, initialComments } from '@/lib/data';
import { useLiveCounter, useScrollProgress, useTheme, useToast } from '@/lib/hooks';
import { getTagColor } from '@/lib/utils/colors';

// Layout Components
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/layout/Hero';
import Ticker from '@/components/layout/Ticker';

// Article Components
import ArticleCard from '@/components/articles/ArticleCard';
import ArticleModal from '@/components/articles/ArticleModal';
import CategoryFilter from '@/components/articles/CategoryFilter';
import FeaturedGrid from '@/components/articles/FeaturedGrid';

// Sidebar Components
import Sidebar from '@/components/sidebar/Sidebar';

// Shared Components
import SearchBar from '@/components/shared/SearchBar';
import Newsletter from '@/components/shared/Newsletter';

// UI Components
import Toast from '@/components/ui/Toast';
import Loader from '@/components/ui/Loader';
import ProgressBar from '@/components/ui/ProgressBar';

export default function Home() {
  const [displayArticles, setDisplayArticles] = useState(articles);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [likedArticles, setLikedArticles] = useState({});
  const [readCount, setReadCount] = useState(0);
  
  const liveCount = useLiveCounter();
  const scrollProgress = useScrollProgress();
  const { isDark, toggleTheme } = useTheme();
  const { toast, showToast, hideToast } = useToast();

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
      localStorage.setItem('likedArticles', JSON.stringify(newState));
      return newState;
    });
  };

  const toggleBookmark = (id) => {
    setBookmarks(prev => {
      if (prev.includes(id)) {
        showToast('🗑 Removed from bookmarks');
        const newBookmarks = prev.filter(i => i !== id);
        localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
        return newBookmarks;
      } else {
        showToast('📌 Bookmarked!');
        const newBookmarks = [...prev, id];
        localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
        return newBookmarks;
      }
    });
  };

  const handleSubscribe = (email) => {
    showToast(`🎉 Welcome to Signal! Check your inbox at ${email}`);
  };

  return (
    <div>
      <ProgressBar progress={scrollProgress} />
      <Navbar 
        isDark={isDark} 
        onToggleTheme={toggleTheme} 
        bookmarksCount={bookmarks.length}
        onFilterAll={() => filterByCategory('all')}
      />
      
      <Hero liveCount={liveCount} />
      <Ticker data={tickerData} />
      
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '3rem clamp(1rem,5vw,3rem) 4rem' }}>
        <SearchBar articles={articles} onSelect={openArticle} />
        
        <div style={{ marginTop: '3rem' }}>
          <CategoryFilter 
            categories={categories} 
            activeCategory={activeCategory} 
            onSelect={filterByCategory} 
          />
          
          <FeaturedGrid articles={articles} onOpenArticle={openArticle} />
          
          {loading ? (
            <Loader />
          ) : (
            <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap' }}>
              <div style={{ flex: 1 }}>
                <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--ink3)' }}>📰 Latest</span>
                  <span style={{ flex: 1, height: '1px', background: 'var(--border)' }}></span>
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
              
              <Sidebar 
                trending={trending}
                tools={tools}
                categories={categories}
                readCount={readCount}
                onCategorySelect={filterByCategory}
              />
            </div>
          )}
        </div>
        
        <div style={{ marginTop: '4rem' }}>
          <Newsletter onSubscribe={handleSubscribe} />
        </div>
      </div>
      
      <Footer />
      
      <ArticleModal 
        article={selectedArticle}
        isOpen={!!selectedArticle}
        onClose={closeModal}
        isLiked={selectedArticle ? likedArticles[selectedArticle.id] : false}
        isBookmarked={selectedArticle ? bookmarks.includes(selectedArticle.id) : false}
        onLike={toggleLike}
        onBookmark={toggleBookmark}
      />
      
      <Toast message={toast.message} show={toast.show} onClose={hideToast} />
    </div>
  );
}
