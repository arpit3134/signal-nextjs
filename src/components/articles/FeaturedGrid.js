export default function FeaturedGrid({ articles, onOpen }) {
  const getTagClass = (cat) => {
    const classes = { ai: 'tag-ai', tech: 'tag-tech', finance: 'tag-finance', sports: 'tag-sports', farming: 'tag-farming', health: 'tag-health', business: 'tag-business', trends: 'tag-trends', travel: 'tag-travel' };
    return classes[cat] || 'tag-tech';
  };
  
  return (
    <div className="feat-grid" style={{
      display: 'grid',
      gridTemplateColumns: '1.7fr 1fr',
      gap: '1.2rem',
      minHeight: '420px'
    }}>
      {/* Main Featured */}
      {articles[0] && (
        <div className="feat-card feat-main" onClick={() => onOpen(0)} style={{
          gridRow: 'span 2',
          borderRadius: '20px',
          border: '1px solid var(--border)',
          background: 'var(--card)',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
          height: '420px'
        }}>
          <img 
            src={articles[0].image} 
            alt={articles[0].title}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 0
            }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.7) 100%)',
            zIndex: 1
          }}></div>
          
          <div style={{
            position: 'relative',
            zIndex: 2,
            padding: '1.8rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            height: '100%'
          }}>
            <span className="feat-bg-num" style={{
              position: 'absolute',
              top: '1rem',
              right: '1.2rem',
              fontFamily: 'var(--serif)',
              fontSize: '5rem',
              fontWeight: '900',
              color: 'rgba(255,255,255,0.1)',
              opacity: 0.3
            }}>01</span>
            <span className={`tag ${getTagClass(articles[0].cat)}`} style={{
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(4px)',
              display: 'inline-flex',
              width: 'fit-content',
              padding: '4px 12px',
              fontSize: '0.7rem',
              marginBottom: '0.8rem'
            }}>{articles[0].lbl}</span>
            <h2 className="card-title" style={{
              fontFamily: 'var(--serif)',
              fontSize: '1.3rem',
              fontWeight: '700',
              marginBottom: '0.5rem',
              color: '#fff',
              textShadow: '0 2px 4px rgba(0,0,0,0.2)',
              lineHeight: '1.3',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>{articles[0].title}</h2>
            <p className="card-desc" style={{
              fontSize: '0.8rem',
              color: 'rgba(255,255,255,0.9)',
              marginBottom: '0.8rem',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>{articles[0].desc}</p>
            <div className="card-meta" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.65rem',
              color: 'rgba(255,255,255,0.8)'
            }}>
              <span>{articles[0].author}</span>
              <span className="dot"></span>
              <span>{articles[0].date}</span>
              <span className="read-time" style={{ marginLeft: 'auto', background: 'rgba(255,255,255,0.2)', border: 'none', padding: '2px 6px' }}>{articles[0].read}</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Side Featured */}
      <div className="feat-side" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {articles[1] && (
          <div className="feat-card" onClick={() => onOpen(1)} style={{
            borderRadius: '20px',
            border: '1px solid var(--border)',
            background: 'var(--card)',
            cursor: 'pointer',
            overflow: 'hidden',
            display: 'flex',
            height: '200px'
          }}>
            <img 
              src={articles[1].image} 
              alt={articles[1].title}
              style={{
                width: '100px',
                height: '100%',
                objectFit: 'cover'
              }}
            />
            <div style={{ padding: '0.8rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span className={`tag ${getTagClass(articles[1].cat)}`} style={{
                  display: 'inline-flex',
                  padding: '2px 8px',
                  fontSize: '0.6rem',
                  marginBottom: '0.4rem'
                }}>{articles[1].lbl}</span>
                <h3 className="card-title" style={{
                  fontFamily: 'var(--serif)',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  marginBottom: '0.3rem',
                  lineHeight: '1.3',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>{articles[1].title}</h3>
              </div>
              <div className="card-meta" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                fontSize: '0.6rem',
                color: 'var(--ink3)',
                flexWrap: 'wrap'
              }}>
                <span>{articles[1].author}</span>
                <span className="dot"></span>
                <span>{articles[1].date}</span>
                <span className="read-time" style={{ marginLeft: 'auto', padding: '2px 5px', fontSize: '0.55rem' }}>{articles[1].read}</span>
              </div>
            </div>
          </div>
        )}
        
        {articles[4] && (
          <div className="feat-card" onClick={() => onOpen(4)} style={{
            borderRadius: '20px',
            border: '1px solid var(--border)',
            background: 'var(--card)',
            cursor: 'pointer',
            overflow: 'hidden',
            display: 'flex',
            height: '200px'
          }}>
            <img 
              src={articles[4].image} 
              alt={articles[4].title}
              style={{
                width: '100px',
                height: '100%',
                objectFit: 'cover'
              }}
            />
            <div style={{ padding: '0.8rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span className={`tag ${getTagClass(articles[4].cat)}`} style={{
                  display: 'inline-flex',
                  padding: '2px 8px',
                  fontSize: '0.6rem',
                  marginBottom: '0.4rem'
                }}>{articles[4].lbl}</span>
                <h3 className="card-title" style={{
                  fontFamily: 'var(--serif)',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  marginBottom: '0.3rem',
                  lineHeight: '1.3',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>{articles[4].title}</h3>
              </div>
              <div className="card-meta" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                fontSize: '0.6rem',
                color: 'var(--ink3)',
                flexWrap: 'wrap'
              }}>
                <span>{articles[4].author}</span>
                <span className="dot"></span>
                <span>{articles[4].date}</span>
                <span className="read-time" style={{ marginLeft: 'auto', padding: '2px 5px', fontSize: '0.55rem' }}>{articles[4].read}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
