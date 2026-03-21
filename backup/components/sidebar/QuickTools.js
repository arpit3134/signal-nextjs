export default function QuickTools({ tools }) {
  return (
    <div style={{ border: '1px solid #e0ddd6', borderRadius: '20px', overflow: 'hidden', background: '#fff', marginBottom: '1.5rem' }}>
      <div style={{ padding: '0.8rem 1rem', borderBottom: '1px solid #e0ddd6', background: '#f0ede6' }}>
        <span style={{ fontSize: '0.7rem', fontWeight: '600', textTransform: 'uppercase' }}>🛠️ Quick Tools</span>
      </div>
      <div style={{ padding: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
        {tools.slice(0, 4).map((tool, i) => (
          <div key={i} style={{ padding: '0.8rem', borderRadius: '12px', background: '#f0ede6', cursor: 'pointer' }}>
            <div style={{ width: '36px', height: '36px', background: '#e0ddd6', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', marginBottom: '0.5rem' }}>{tool.icon}</div>
            <div style={{ fontSize: '0.8rem', fontWeight: '600', color: '#1a1814' }}>{tool.name}</div>
            <div style={{ fontSize: '0.65rem', color: '#9a9690' }}>{tool.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
