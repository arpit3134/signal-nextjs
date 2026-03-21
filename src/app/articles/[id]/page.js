'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { articles } from '@/lib/data';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Tag from '@/components/ui/Tag';
import Toast from '@/components/ui/Toast';
import Loader from '@/components/ui/Loader';

export default function ArticlePage() {
  const params = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [likedArticles, setLikedArticles] = useState({});
  const [toast, setToast] = useState({ show: false, message: '' });

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
    const id = parseInt(params.id);
    const found = articles.find(a => a.id === id);
    setArticle(found);
    setLoading(false);
  }, [params.id]);

  const showToast = (msg) => {
    setToast({ show: true, message: msg });
  };

  const hideToast = () => {
    setToast({ show: false, message: '' });
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

  if (loading) {
    return (
      <div>
        <Navbar isDark={isDark} onToggleTheme={toggleTheme} bookmarksCount={bookmarks.length} onFilterAll={() => {}} />
        <Loader />
      </div>
    );
  }

  if (!article) {
    return (
      <div>
        <Navbar isDark={isDark} onToggleTheme={toggleTheme} bookmarksCount={bookmarks.length} onFilterAll={() => {}} />
        <div style={{ textAlign: 'center', padding: '100px' }}>
          <h1>Article not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar isDark={isDark} onToggleTheme={toggleTheme} bookmarksCount={bookmarks.length} onFilterAll={() => {}} />
      <div style={{ maxWidth: '800px', margin: '100px auto 0', padding: '2rem' }}>
        <Tag category={article.cat}>{article.lbl}</Tag>
        <h1 style={{ fontFamily: 'Playfair Display, Georgia', fontSize: '2.5rem', fontWeight: '700', marginTop: '1rem', marginBottom: '1rem' }}>
          {article.title}
        </h1>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', color: 'var(--ink3)' }}>
          <span>{article.author}</span>
          <span>{article.date}</span>
          <span>{article.read}</span>
        </div>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '2rem', color: 'var(--ink2)' }}>{article.desc}</p>
        <div style={{ fontSize: '1rem', lineHeight: '1.7', color: 'var(--ink2)' }}>
          {article.body.split('\n\n').map((para, i) => (
            <p key={i} style={{ marginBottom: '1.2rem' }}>{para}</p>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
          <button onClick={() => toggleLike(article.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.9rem', color: likedArticles[article.id] ? 'var(--accent)' : 'var(--ink3)' }}>
            ❤️ {article.likes + (likedArticles[article.id] ? 1 : 0)}
          </button>
          <button onClick={() => toggleBookmark(article.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.9rem', color: bookmarks.includes(article.id) ? 'var(--accent)' : 'var(--ink3)' }}>
            🔖 {bookmarks.includes(article.id) ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>
      <Footer />
      <Toast message={toast.message} show={toast.show} onClose={hideToast} />
    </div>
  );
}
