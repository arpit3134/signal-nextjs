export default function Ticker({ data }) {
  const getTypeStyle = (type) => {
    if (type === 'hot') return { text: '🔥 Hot', color: '#ff9070', bg: 'rgba(232,66,10,0.3)' };
    if (type === 'new') return { text: '✨ New', color: '#6ddfa0', bg: 'rgba(45,106,79,0.3)' };
    return { text: '📈 Trend', color: '#ffd070', bg: 'rgba(245,166,35,0.3)' };
  };

  return (
    <div style={{ background: 'var(--ink)', padding: '0.7rem 0', overflow: 'hidden' }}>
      <div style={{
        display: 'flex',
        gap: '2rem',
        animation: 'ticker 30s linear infinite',
        whiteSpace: 'nowrap',
        width: 'max-content'
      }}>
        {[...data, ...data].map((item, i) => {
          const type = getTypeStyle(item.type);
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.8rem' }}>
              <span style={{
                padding: '2px 8px',
                borderRadius: '50px',
                fontSize: '0.6rem',
                background: type.bg,
                color: type.color
              }}>{type.text}</span>
              <span style={{ color: '#f0ede6' }}>{item.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
