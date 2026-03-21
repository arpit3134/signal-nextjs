export default function CategoryFilter({ categories, activeCategory, onSelect }) {
  return (
    <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '2rem' }}>
      {categories.map(cat => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          style={{
            flexShrink: 0,
            padding: '8px 18px',
            borderRadius: '50px',
            border: `1.5px solid ${activeCategory === cat.id ? '#1a1814' : '#e0ddd6'}`,
            background: activeCategory === cat.id ? '#1a1814' : '#fff',
            color: activeCategory === cat.id ? '#fff' : '#4a4640',
            cursor: 'pointer',
            fontSize: '0.8rem',
            fontWeight: '500',
            whiteSpace: 'nowrap'
          }}
        >
          {cat.icon} {cat.name}
        </button>
      ))}
    </div>
  );
}
