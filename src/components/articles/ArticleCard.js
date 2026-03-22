export default function ArticleCard({ article, onClick, isLiked, isBookmarked, onLike, onBookmark }) {
  const getTagClass = (cat) => {
    const classes = { ai: 'tag-ai', tech: 'tag-tech', finance: 'tag-finance', sports: 'tag-sports', farming: 'tag-farming', health: 'tag-health' };
    return classes[cat] || 'tag-tech';
  };
  return (
    <div className="feat-card" onClick={onClick}>
      <div style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
          <span className={`tag ${getTagClass(article.cat)}`}>{article.lbl}</span>
          <span style={{ fontSize: '1.4rem' }}>{article.em}</span>
        </div>
        <h3 className="card-title" style={{ fontSize: '1rem' }}>{article.title}</h3>
        <p className="card-desc" style={{ fontSize: '0.8rem' }}>{article.desc}</p>
        <div className="card-meta">
          <span>{article.author}</span><span className="dot"></span><span>{article.date}</span>
          <span className="read-time">{article.read}</span>
        </div>
      </div>
      <div style={{ display: 'flex', borderTop: '1px solid var(--border)', padding: '0.6rem 1.2rem', gap: '1rem' }}>
        <button onClick={(e) => { e.stopPropagation(); onLike(); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: isLiked ? 'var(--accent)' : 'var(--ink3)' }}>❤️ {isLiked ? 'Liked' : 'Like'}</button>
        <button onClick={(e) => { e.stopPropagation(); onBookmark(); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: isBookmarked ? 'var(--accent)' : 'var(--ink3)' }}>🔖 {isBookmarked ? 'Saved' : 'Save'}</button>
        <button onClick={(e) => { e.stopPropagation(); onClick(); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent)', marginLeft: 'auto' }}>Read →</button>
      </div>
    </div>
  );
}
