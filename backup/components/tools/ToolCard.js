export default function ToolCard({ tool }) {
  return (
    <div style={{
      background: 'var(--card)',
      border: '1.5px solid var(--border)',
      borderRadius: '14px',
      padding: '1.3rem',
      transition: 'all 0.25s',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-3px)';
      e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.12)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '0.6rem' }}>
        <div style={{
          width: '38px',
          height: '38px',
          borderRadius: '10px',
          background: '#f0ede6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.1rem'
        }}>{tool.icon}</div>
        <span style={{ fontSize: '0.88rem', fontWeight: '600', color: 'var(--ink)' }}>{tool.name}</span>
        <span style={{
          marginLeft: 'auto',
          fontSize: '0.6rem',
          fontWeight: '600',
          padding: '2px 7px',
          borderRadius: '50px',
          background: tool.free ? '#e8fde8' : 'var(--bg2)',
          color: tool.free ? '#1d7a3a' : 'var(--ink3)'
        }}>{tool.free ? 'Free' : 'Pro'}</span>
      </div>
      <div style={{ fontSize: '0.76rem', color: 'var(--ink2)', lineHeight: '1.5', marginBottom: '0.6rem' }}>{tool.desc}</div>
      <button style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.3rem',
        padding: '6px 14px',
        borderRadius: '50px',
        background: 'var(--ink)',
        color: 'var(--bg)',
        border: 'none',
        fontSize: '0.7rem',
        fontWeight: '600',
        cursor: 'pointer'
      }}>Visit Tool →</button>
    </div>
  );
}
