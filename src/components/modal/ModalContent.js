export default function ModalContent({ article }) {
  const paragraphs = article.body.split('\n\n');
  const midIndex = Math.floor(paragraphs.length / 2);
  
  return (
    <div className="m-art" style={{
      padding: '2rem 2.5rem',
      maxWidth: '700px',
      margin: '0 auto'
    }}>
      {paragraphs.map((para, i) => (
        <div key={i}>
          <p style={{
            fontSize: '1rem',
            lineHeight: '1.8',
            color: 'var(--ink2)',
            marginBottom: '1.2rem',
            fontFamily: 'var(--sans)'
          }}>{para}</p>
          
          {i === 1 && (
            <div className="a-dv" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              margin: '2rem 0',
              color: 'var(--ink3)'
            }}>
              <span style={{
                fontFamily: 'var(--mono)',
                fontSize: '0.7rem',
                letterSpacing: '0.1em',
                whiteSpace: 'nowrap'
              }}>· · ·</span>
            </div>
          )}
          
          {i === midIndex && (
            <div className="pull-q" style={{
              borderLeft: '4px solid var(--accent)',
              margin: '2rem 0',
              padding: '1rem 1.5rem',
              background: 'linear-gradient(135deg, var(--bg2), transparent)',
              borderRadius: '0 16px 16px 0'
            }}>
              <p style={{
                fontFamily: 'var(--serif)',
                fontSize: '1.1rem',
                fontStyle: 'italic',
                color: 'var(--ink)',
                margin: 0,
                lineHeight: '1.6'
              }}>"{para.split('.')[0]}."</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
