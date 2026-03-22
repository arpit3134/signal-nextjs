export default function ArticleCard({ article, onClick, isLiked, isBookmarked, onLike, onBookmark }) {
  const getTagStyle = (cat) => {
    const styles = {
      ai: { background: '#fde8e8', color: '#b02020' },
      tech: { background: '#e8f2fd', color: '#1a52a0' },
      finance: { background: '#e8fde8', color: '#1d7a3a' },
      sports: { background: '#fdf5e8', color: '#8b5e1d' },
      farming: { background: '#edfde8', color: '#3a7a1d' },
      health: { background: '#e8fdf5', color: '#1d7a6a' },
      business: { background: '#fde8f0', color: '#8b1d3a' },
      trends: { background: '#fdeee8', color: '#8b3a1d' },
      travel: { background: '#e8f0fd', color: '#1d3a8b' }
    };
    return styles[cat] || { background: '#f0ede6', color: '#4a4640' };
  };
  
  const tagStyle = getTagStyle(article.cat);
  
  return (
    <div className="article-card" onClick={onClick}>
      <div className="article-img">
        <img src={article.image} alt={article.title} />
      </div>
      <div className="article-content">
        <span className="article-tag" style={tagStyle}>{article.lbl}</span>
        <h3 className="article-title">{article.title}</h3>
        <p className="article-desc">{article.desc}</p>
        <div className="article-meta">
          <span>{article.author}</span>
          <span>•</span>
          <span>{article.date}</span>
          <span className="read-time" style={{ marginLeft: 'auto' }}>{article.read}</span>
        </div>
      </div>
      <div className="article-actions">
        <button onClick={(e) => { e.stopPropagation(); onLike(); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: isLiked ? 'var(--accent)' : 'var(--ink3)' }}>
          ❤️ {article.likes + (isLiked ? 1 : 0)}
        </button>
        <button onClick={(e) => { e.stopPropagation(); onBookmark(); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: isBookmarked ? 'var(--accent)' : 'var(--ink3)' }}>
          🔖 {isBookmarked ? 'Saved' : 'Save'}
        </button>
        <button onClick={(e) => { e.stopPropagation(); onClick(); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent)', marginLeft: 'auto' }}>
          Read →
        </button>
      </div>
    </div>
  );
}
