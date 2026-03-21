export default function TrendingList({ trending }) {
  return (
    <div style={{ border: '1px solid #e0ddd6', borderRadius: '20px', overflow: 'hidden', background: '#fff', marginBottom: '1.5rem' }}>
      <div style={{ padding: '0.8rem 1rem', borderBottom: '1px solid #e0ddd6', background: '#f0ede6', display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '0.7rem', fontWeight: '600', textTransform: 'uppercase' }}>🔥 Trending Now</span>
        <span style={{ fontSize: '0.6rem', color: '#e8420a' }}>↑ Live</span>
      </div>
      <div style={{ padding: '0.8rem 1rem' }}>
        {trending.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: '0.8rem', padding: '0.6rem 0', borderBottom: i < trending.length - 1 ? '1px solid #e0ddd6' : 'none' }}>
            <span style={{ fontFamily: 'Playfair Display, Georgia', fontSize: '1.2rem', fontWeight: '700', color: '#e0ddd6', minWidth: '28px' }}>0{i+1}</span>
            <span style={{ fontSize: '0.8rem', fontWeight: '500', color: '#1a1814' }}>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
