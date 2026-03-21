export default function Footer() {
  return (
    <footer style={{
      background: '#f0ede6',
      borderTop: '1px solid #e0ddd6',
      padding: '3rem clamp(1rem,5vw,3rem) 1.5rem'
    }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '2rem', textAlign: 'left' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <div style={{ width: '8px', height: '8px', background: '#e8420a', borderRadius: '50%' }}></div>
              <span style={{ fontFamily: 'Playfair Display, Georgia', fontSize: '1.2rem', fontWeight: '700' }}>Signal</span>
            </div>
            <p style={{ fontSize: '0.75rem', color: '#4a4640' }}>Discover articles, ideas, and insights across every topic that matters. No noise, just signal.</p>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #e0ddd6', paddingTop: '1rem' }}>
          <span style={{ fontSize: '0.65rem', color: '#9a9690' }}>© 2025 Signal Media. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
