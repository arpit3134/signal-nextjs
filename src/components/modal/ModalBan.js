export default function ModalBan({ article }) {
  return (
    <div className="m-ban" style={{
      position: 'relative',
      padding: '2.5rem 2.5rem 2rem',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderBottom: '1px solid var(--border)',
      overflow: 'hidden'
    }}>
      {/* Animated Background */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        right: '-30%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 8s ease-in-out infinite'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '-40%',
        left: '-20%',
        width: '250px',
        height: '250px',
        background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 10s ease-in-out infinite reverse'
      }}></div>
      
      <div className="m-ban-n" style={{
        position: 'absolute',
        right: '2rem',
        top: '50%',
        transform: 'translateY(-50%)',
        fontFamily: 'var(--serif)',
        fontSize: '7rem',
        fontWeight: '900',
        color: 'rgba(255,255,255,0.1)',
        lineHeight: 1,
        userSelect: 'none'
      }}>0{article.id + 1}</div>
      
      <div className="m-ban-c" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ marginBottom: '1rem' }}>
          <span className="tag" style={{
            display: 'inline-flex',
            padding: '6px 14px',
            borderRadius: '50px',
            fontSize: '0.7rem',
            fontWeight: '600',
            background: 'rgba(255,255,255,0.2)',
            backdropFilter: 'blur(10px)',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.3)'
          }}>{article.lbl}</span>
        </div>
        <h2 className="m-ttl" style={{
          fontFamily: 'var(--serif)',
          fontSize: 'clamp(1.4rem, 3vw, 2rem)',
          fontWeight: '900',
          lineHeight: 1.2,
          marginBottom: '1rem',
          color: '#fff',
          textShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>{article.title}</h2>
        <p className="m-dsc" style={{
          fontSize: '0.95rem',
          color: 'rgba(255,255,255,0.9)',
          lineHeight: 1.6,
          marginBottom: '1.5rem'
        }}>{article.desc}</p>
        <div className="m-mr" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          <div className="m-av" style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #fff, rgba(255,255,255,0.5))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
            fontWeight: '700',
            color: '#667eea',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
          }}>{article.author.charAt(0)}</div>
          <div>
            <div className="m-au" style={{
              fontSize: '0.9rem',
              fontWeight: '600',
              color: '#fff'
            }}>{article.author}</div>
            <div className="m-dt" style={{
              fontSize: '0.75rem',
              color: 'rgba(255,255,255,0.7)',
              fontFamily: 'var(--mono)'
            }}>{article.date} · {article.read} read</div>
          </div>
          <div className="m-cps" style={{
            display: 'flex',
            gap: '0.5rem',
            marginLeft: 'auto'
          }}>
            <span className="m-cp" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '5px 12px',
              borderRadius: '50px',
              background: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)',
              fontSize: '0.7rem',
              color: '#fff'
            }}>
              <span>⏱️</span> {article.read}
            </span>
            <span className="m-cp" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '5px 12px',
              borderRadius: '50px',
              background: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)',
              fontSize: '0.7rem',
              color: '#fff'
            }}>
              <span>👁️</span> {article.views}
            </span>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
      `}</style>
    </div>
  );
}
