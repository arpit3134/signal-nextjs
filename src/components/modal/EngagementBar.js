export default function EngagementBar({ onLike, onBookmark, onShare, isLiked, isBookmarked, likeCount }) {
  return (
    <div className="eng-bar" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0.8rem 1.5rem',
      border: '1px solid var(--border)',
      borderRadius: '60px',
      background: 'var(--bg2)',
      margin: '1.5rem 2rem',
      gap: '1rem'
    }}>
      <button 
        onClick={onLike} 
        className={`e-btn ${isLiked ? 'liked' : ''}`}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '8px 18px',
          borderRadius: '40px',
          border: 'none',
          background: isLiked ? 'rgba(192,32,32,0.1)' : 'transparent',
          cursor: 'pointer',
          fontSize: '0.85rem',
          fontWeight: '500',
          color: isLiked ? '#e8420a' : 'var(--ink2)',
          transition: 'all 0.2s'
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill={isLiked ? '#e8420a' : 'none'} stroke="currentColor" strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
        <span>{likeCount}</span>
      </button>
      
      <button 
        onClick={onBookmark} 
        className={`e-btn ${isBookmarked ? 'saved' : ''}`}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '8px 18px',
          borderRadius: '40px',
          border: 'none',
          background: isBookmarked ? 'rgba(29,122,58,0.1)' : 'transparent',
          cursor: 'pointer',
          fontSize: '0.85rem',
          fontWeight: '500',
          color: isBookmarked ? '#1d7a3a' : 'var(--ink2)',
          transition: 'all 0.2s'
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill={isBookmarked ? '#1d7a3a' : 'none'} stroke="currentColor" strokeWidth="2">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
        </svg>
        <span>{isBookmarked ? 'Saved' : 'Save'}</span>
      </button>
      
      <button 
        onClick={onShare} 
        className="e-btn"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '8px 18px',
          borderRadius: '40px',
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
          fontSize: '0.85rem',
          fontWeight: '500',
          color: 'var(--ink2)',
          transition: 'all 0.2s'
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="18" cy="5" r="3"/>
          <circle cx="6" cy="12" r="3"/>
          <circle cx="18" cy="19" r="3"/>
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
        </svg>
        <span>Share</span>
      </button>
    </div>
  );
}
