import { useState } from 'react';

export default function SearchBar({ articles, onSelect }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term.length > 0) {
      const filtered = articles.filter(a =>
        a.title.toLowerCase().includes(term.toLowerCase()) ||
        a.desc.toLowerCase().includes(term.toLowerCase()) ||
        a.author.toLowerCase().includes(term.toLowerCase())
      );
      setResults(filtered);
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setShowResults(false);
  };

  return (
    <div style={{ position: 'relative', maxWidth: '550px', margin: '0 auto' }}>
      <input
        type="text"
        placeholder="🔍 Search articles, topics, resources..."
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        style={{
          width: '100%',
          padding: '16px 24px 16px 52px',
          borderRadius: '60px',
          border: '1.5px solid var(--border)',
          background: 'var(--card)',
          fontSize: '1rem',
          outline: 'none'
        }}
      />
      <span style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)' }}>🔍</span>
      {searchTerm && (
        <button
          onClick={clearSearch}
          style={{
            position: 'absolute',
            right: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            cursor: 'pointer'
          }}
        >✕</button>
      )}
      {showResults && results.length > 0 && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 12px)',
          left: 0,
          right: 0,
          background: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: '20px',
          overflow: 'hidden',
          zIndex: 50
        }}>
          {results.slice(0, 5).map(article => (
            <div
              key={article.id}
              onClick={() => {
                onSelect(article);
                clearSearch();
              }}
              style={{
                padding: '14px 20px',
                display: 'flex',
                gap: '12px',
                alignItems: 'center',
                cursor: 'pointer',
                borderBottom: '1px solid var(--border)'
              }}
            >
              <span style={{ fontSize: '1.3rem' }}>{article.em}</span>
              <div>
                <div style={{ fontWeight: '600' }}>{article.title}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--ink3)' }}>{article.lbl} · {article.author}</div>
              </div>
              <span style={{ color: 'var(--accent)', marginLeft: 'auto' }}>→</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
