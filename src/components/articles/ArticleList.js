export default function ArticleList({ articles, onOpen }) {
  const getTagClass = (cat) => {
    const classes = { ai: 'tag-ai', tech: 'tag-tech', finance: 'tag-finance', sports: 'tag-sports', farming: 'tag-farming', health: 'tag-health', business: 'tag-business', trends: 'tag-trends', travel: 'tag-travel' };
    return classes[cat] || 'tag-tech';
  };
  
  return (
    <>
      {articles.map((a, i) => (
        <div key={a.id} className="a-card" onClick={() => onOpen(a.id)} style={{
          display: 'grid',
          gridTemplateColumns: '1fr 80px',
          gap: '1rem',
          alignItems: 'center',
          padding: '1rem 0',
          borderBottom: '1px solid var(--border)',
          cursor: 'pointer',
          position: 'relative',
          transition: 'all 0.2s'
        }}>
          <div>
            <div className="a-num" style={{
              fontFamily: 'var(--mono)',
              fontSize: '0.55rem',
              color: 'var(--ink3)',
              marginBottom: '0.2rem'
            }}>0{i+1}</div>
            <span className={`tag ${getTagClass(a.cat)}`} style={{
              display: 'inline-flex',
              padding: '2px 8px',
              borderRadius: '50px',
              fontSize: '0.6rem',
              fontWeight: '600',
              marginBottom: '0.4rem'
            }}>{a.lbl}</span>
            <h3 className="card-title" style={{
              fontFamily: 'var(--serif)',
              fontSize: '0.9rem',
              fontWeight: '700',
              marginBottom: '0.3rem',
              lineHeight: '1.3',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>{a.title}</h3>
            <p className="card-desc" style={{
              fontSize: '0.7rem',
              color: 'var(--ink2)',
              marginBottom: '0.4rem',
              lineHeight: '1.4',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>{a.desc}</p>
            <div className="card-meta" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              fontSize: '0.6rem',
              color: 'var(--ink3)'
            }}>
              <span>{a.author}</span>
              <span className="dot"></span>
              <span>{a.date}</span>
              <span className="read-time" style={{ marginLeft: 'auto', padding: '2px 5px', fontSize: '0.55rem' }}>{a.read}</span>
            </div>
          </div>
          <div className="a-img" style={{
            width: '80px',
            height: '60px',
            borderRadius: '10px',
            background: 'var(--bg2)',
            overflow: 'hidden',
            flexShrink: 0
          }}>
            <img 
              src={a.image || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=80&h=60&fit=crop'} 
              alt={a.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>
        </div>
      ))}
    </>
  );
}
