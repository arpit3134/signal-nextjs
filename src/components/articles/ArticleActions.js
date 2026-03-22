export default function ArticleActions({ isLiked, isBookmarked, onLike, onBookmark, onRead }) {
  return (
    <div style={{ display: 'flex', borderTop: '1px solid var(--border)', padding: '0.6rem 1.2rem', gap: '1rem' }}>
      <button onClick={(e) => { e.stopPropagation(); onLike(); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: isLiked ? 'var(--accent)' : 'var(--ink3)' }}>❤️ {isLiked ? 'Liked' : 'Like'}</button>
      <button onClick={(e) => { e.stopPropagation(); onBookmark(); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: isBookmarked ? 'var(--accent)' : 'var(--ink3)' }}>🔖 {isBookmarked ? 'Saved' : 'Save'}</button>
      <button onClick={(e) => { e.stopPropagation(); onRead(); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent)', marginLeft: 'auto' }}>Read →</button>
    </div>
  );
}
