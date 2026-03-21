import Tag from '../ui/Tag';

export default function FeaturedGrid({ articles, onOpenArticle }) {
  const featured = articles.slice(0, 3);
  
  if (featured.length < 3) return null;
  
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: '1rem', marginBottom: '3rem' }}>
      <div 
        onClick={() => onOpenArticle(featured[0])}
        style={{
          gridRow: 'span 2',
          borderRadius: '20px',
          border: '1px solid var(--border)',
          background: 'linear-gradient(135deg, #fffcf7, #fdf0dc)',
          padding: '2rem',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <span style={{
          position: 'absolute',
          top: '1rem',
          right: '1.5rem',
          fontFamily: 'Playfair Display',
          fontSize: '7rem',
          fontWeight: '900',
          color: 'var(--accent2)',
          opacity: 0.1
        }}>01</span>
        <Tag category={featured[0].cat}>{featured[0].lbl}</Tag>
        <h2 style={{ fontFamily: 'Playfair Display, Georgia', fontSize: '1.8rem', fontWeight: '700', marginTop: '1rem', marginBottom: '0.8rem' }}>
          {featured[0].title}
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--ink2)', marginBottom: '1rem' }}>{featured[0].desc}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', color: 'var(--ink3)' }}>
          <span>{featured[0].author}</span>
          <span>•</span>
          <span>{featured[0].date}</span>
          <span style={{ marginLeft: 'auto', padding: '2px 8px', borderRadius: '50px', border: '1px solid var(--border)' }}>{featured[0].read}</span>
        </div>
      </div>
      
      <div 
        onClick={() => onOpenArticle(featured[1])}
        style={{
          borderRadius: '20px',
          border: '1px solid var(--border)',
          background: 'var(--card)',
          padding: '1.5rem',
          cursor: 'pointer'
        }}
      >
        <Tag category={featured[1].cat}>{featured[1].lbl}</Tag>
        <h3 style={{ fontFamily: 'Playfair Display, Georgia', fontSize: '1.1rem', fontWeight: '700', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
          {featured[1].title}
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', color: 'var(--ink3)' }}>
          <span>{featured[1].author}</span>
          <span>•</span>
          <span>{featured[1].date}</span>
          <span style={{ marginLeft: 'auto', padding: '2px 8px', borderRadius: '50px', border: '1px solid var(--border)' }}>{featured[1].read}</span>
        </div>
      </div>
      
      <div 
        onClick={() => onOpenArticle(featured[2])}
        style={{
          borderRadius: '20px',
          border: '1px solid var(--border)',
          background: 'var(--card)',
          padding: '1.5rem',
          cursor: 'pointer'
        }}
      >
        <Tag category={featured[2].cat}>{featured[2].lbl}</Tag>
        <h3 style={{ fontFamily: 'Playfair Display, Georgia', fontSize: '1.1rem', fontWeight: '700', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
          {featured[2].title}
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', color: 'var(--ink3)' }}>
          <span>{featured[2].author}</span>
          <span>•</span>
          <span>{featured[2].date}</span>
          <span style={{ marginLeft: 'auto', padding: '2px 8px', borderRadius: '50px', border: '1px solid var(--border)' }}>{featured[2].read}</span>
        </div>
      </div>
    </div>
  );
}
