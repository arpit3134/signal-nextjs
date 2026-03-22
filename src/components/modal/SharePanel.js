export default function SharePanel({ onClose, onShare }) {
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied!');
  };
  
  const shareToSocial = (platform) => {
    const url = window.location.href;
    const title = document.title;
    const links = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`
    };
    window.open(links[platform], '_blank');
  };
  
  return (
    <div className="sh-pan open" style={{
      margin: '0 2rem 1.5rem',
      padding: '1.5rem',
      border: '1px solid var(--border)',
      borderRadius: '20px',
      background: 'var(--card)',
      animation: 'fadeUp 0.3s ease'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem'
      }}>
        <div className="sp-t" style={{
          fontFamily: 'var(--mono)',
          fontSize: '0.7rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--ink3)'
        }}>Share this article</div>
        <button onClick={onClose} style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '1.2rem',
          color: 'var(--ink3)'
        }}>✕</button>
      </div>
      
      <div className="sp-bs" style={{
        display: 'flex',
        gap: '0.8rem',
        flexWrap: 'wrap',
        marginBottom: '1rem'
      }}>
        <button onClick={() => shareToSocial('twitter')} className="sp-b tw" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '10px 20px',
          borderRadius: '50px',
          border: '1px solid var(--border)',
          background: 'var(--card)',
          cursor: 'pointer',
          fontSize: '0.85rem',
          fontWeight: '500',
          transition: 'all 0.2s'
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          X (Twitter)
        </button>
        
        <button onClick={() => shareToSocial('linkedin')} className="sp-b li" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '10px 20px',
          borderRadius: '50px',
          border: '1px solid var(--border)',
          background: 'var(--card)',
          cursor: 'pointer',
          fontSize: '0.85rem',
          fontWeight: '500',
          transition: 'all 0.2s'
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
            <circle cx="4" cy="4" r="2"/>
          </svg>
          LinkedIn
        </button>
        
        <button onClick={() => shareToSocial('whatsapp')} className="sp-b wa" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '10px 20px',
          borderRadius: '50px',
          border: '1px solid var(--border)',
          background: 'var(--card)',
          cursor: 'pointer',
          fontSize: '0.85rem',
          fontWeight: '500',
          transition: 'all 0.2s'
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
          </svg>
          WhatsApp
        </button>
        
        <button onClick={copyLink} className="sp-b cp" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '10px 20px',
          borderRadius: '50px',
          border: '1px solid var(--border)',
          background: 'var(--card)',
          cursor: 'pointer',
          fontSize: '0.85rem',
          fontWeight: '500',
          transition: 'all 0.2s'
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
          </svg>
          Copy Link
        </button>
      </div>
    </div>
  );
}
