export default function Hero({ liveCount }) {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '100px 2rem 3rem',
      position: 'relative'
    }}>
      <div style={{ maxWidth: '700px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '5px 14px',
          borderRadius: '50px',
          border: '1px solid var(--border)',
          background: 'var(--card)',
          marginBottom: '2rem'
        }}>
          <span style={{ width: '6px', height: '6px', background: '#22c55e', borderRadius: '50%', animation: 'pulse 1.5s infinite' }}></span>
          <span>⚡ LIVE · {liveCount.toLocaleString()} readers online</span>
        </div>
        <h1 style={{
          fontFamily: 'Playfair Display, Georgia',
          fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
          fontWeight: '900',
          lineHeight: '1.1',
          marginBottom: '1.5rem',
          color: 'var(--ink)'
        }}>
          The signal for<br /><span style={{ color: 'var(--accent)' }}>what's next</span>
        </h1>
        <p style={{
          fontSize: '1.1rem',
          color: 'var(--ink2)',
          marginBottom: '2rem'
        }}>
          Discover articles, ideas, and insights across every topic that matters.
        </p>
      </div>
      <div style={{
        position: 'absolute',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
        cursor: 'pointer'
      }}>
        <span style={{ fontSize: '0.7rem', color: 'var(--ink3)' }}>Scroll to explore</span>
        <div style={{
          width: '36px',
          height: '36px',
          border: '1.5px solid var(--border)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'bounce 2s infinite'
        }}>↓</div>
      </div>
    </section>
  );
}
