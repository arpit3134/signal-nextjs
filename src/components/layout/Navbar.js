'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';

export default function Navbar({ isDark, onToggleTheme, bookmarksCount, onFilterAll }) {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  
  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 200,
      height: '70px',
      padding: '0 clamp(1rem,5vw,3rem)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: 'rgba(249,248,245,0.95)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid #e0ddd6',
      transition: 'all 0.3s',
      boxShadow: isScrolled ? '0 4px 20px rgba(0,0,0,0.05)' : 'none'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }} onClick={onFilterAll}>
        <div style={{ width: '10px', height: '10px', background: '#e8420a', borderRadius: '50%', animation: 'pulse 2s infinite' }}></div>
        <span style={{ fontFamily: 'Playfair Display, Georgia', fontSize: '1.5rem', fontWeight: '800', color: '#1a1814' }}>Signal</span>
      </div>
      <div style={{ display: 'flex', gap: '0.8rem' }}>
        <Button onClick={onToggleTheme} variant="secondary" size="sm">{isDark ? '☀️' : '🌙'}</Button>
        <Button onClick={() => {}} variant="secondary" size="sm">🔖 {bookmarksCount > 0 && bookmarksCount}</Button>
      </div>
    </nav>
  );
}
