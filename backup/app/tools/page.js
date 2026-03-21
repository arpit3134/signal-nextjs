'use client';

import { useState, useEffect } from 'react';
import { tools } from '../../lib/data';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import Toast from '../../components/ui/Toast';

export default function ToolsPage() {
  const [displayTools, setDisplayTools] = useState(tools);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isDark, setIsDark] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [toast, setToast] = useState({ show: false, message: '' });

  const categories = ['all', ...new Set(tools.map(t => t.cat))];

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

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

  const filterByCategory = (catId) => {
    setActiveCategory(catId);
    if (catId === 'all') {
      setDisplayTools(tools);
    } else {
      setDisplayTools(tools.filter(t => t.cat === catId));
    }
  };

  const getCategoryIcon = (cat) => {
    const icons = { all: '📰', finance: '📈', health: '💚', ai: '🤖', tech: '💻' };
    return icons[cat] || '🛠️';
  };

  const getCategoryName = (cat) => {
    const names = { all: 'All', finance: 'Finance', health: 'Health', ai: 'AI', tech: 'Tech' };
    return names[cat] || cat;
  };

  return (
    <div>
      <Navbar isDark={isDark} onToggleTheme={toggleTheme} bookmarksCount={bookmarks.length} onFilterAll={() => {}} />
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '100px 2rem 4rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontFamily: 'Playfair Display, Georgia', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '900' }}>🛠 Tools Directory</h1>
          <p style={{ color: 'var(--ink2)', fontSize: '0.95rem' }}>Curated tools by category — finance, health, AI, tech and more.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '4px', marginBottom: '2rem' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => filterByCategory(cat)}
              style={{
                flexShrink: 0,
                padding: '7px 16px',
                borderRadius: '50px',
                border: `1.5px solid ${activeCategory === cat ? 'var(--ink)' : 'var(--border)'}`,
                background: activeCategory === cat ? 'var(--ink)' : 'var(--card)',
                color: activeCategory === cat ? 'var(--bg)' : 'var(--ink2)',
                cursor: 'pointer',
                fontSize: '0.78rem',
                fontWeight: '500',
                whiteSpace: 'nowrap'
              }}
            >
              {getCategoryIcon(cat)} {getCategoryName(cat)}
            </button>
          ))}
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
          {displayTools.map((tool, idx) => (
            <div key={idx} style={{
              background: 'var(--card)',
              border: '1.5px solid var(--border)',
              borderRadius: '14px',
              padding: '1.3rem',
              transition: 'all 0.25s',
              cursor: 'pointer'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '0.6rem' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: '#f0ede6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.1rem'
                }}>{tool.icon}</div>
                <span style={{ fontSize: '0.88rem', fontWeight: '600', color: 'var(--ink)' }}>{tool.name}</span>
                <span style={{
                  marginLeft: 'auto',
                  fontSize: '0.6rem',
                  fontWeight: '600',
                  padding: '2px 7px',
                  borderRadius: '50px',
                  background: tool.free ? '#e8fde8' : 'var(--bg2)',
                  color: tool.free ? '#1d7a3a' : 'var(--ink3)'
                }}>{tool.free ? 'Free' : 'Pro'}</span>
              </div>
              <div style={{ fontSize: '0.76rem', color: 'var(--ink2)', lineHeight: '1.5', marginBottom: '0.6rem' }}>{tool.desc}</div>
              <button style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                padding: '6px 14px',
                borderRadius: '50px',
                background: 'var(--ink)',
                color: 'var(--bg)',
                border: 'none',
                fontSize: '0.7rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}>Visit Tool →</button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
      <Toast message={toast.message} show={toast.show} onClose={hideToast} />
    </div>
  );
}
