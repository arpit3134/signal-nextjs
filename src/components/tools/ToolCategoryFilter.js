export default function ToolCategoryFilter({ categories, activeCategory, onSelect }) {
  const getCategoryIcon = (cat) => {
    const icons = {
      all: '📰',
      finance: '📈',
      health: '💚',
      ai: '🤖',
      tech: '💻'
    };
    return icons[cat] || '🛠️';
  };

  const getCategoryName = (cat) => {
    const names = {
      all: 'All',
      finance: 'Finance',
      health: 'Health',
      ai: 'AI',
      tech: 'Tech'
    };
    return names[cat] || cat;
  };

  return (
    <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '4px', marginBottom: '2rem' }}>
      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
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
  );
}
