import Tag from '../ui/Tag';

export default function BrowseTopics({ categories, onSelect }) {
  return (
    <div style={{
      border: '1px solid var(--border)',
      borderRadius: '20px',
      overflow: 'hidden',
      background: 'var(--card)',
      marginBottom: '1.5rem'
    }}>
      <div style={{
        padding: '0.8rem 1rem',
        borderBottom: '1px solid var(--border)',
        background: 'var(--bg2)'
      }}>
        <span style={{ fontSize: '0.7rem', fontWeight: '600', textTransform: 'uppercase' }}>📚 Browse Topics</span>
      </div>
      <div style={{ padding: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {categories.slice(1).map(cat => (
          <Tag key={cat.id} category={cat.id} onClick={() => onSelect(cat.id)}>
            {cat.icon} {cat.name}
          </Tag>
        ))}
      </div>
    </div>
  );
}
