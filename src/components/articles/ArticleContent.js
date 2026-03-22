export default function ArticleContent({ article }) {
  return (
    <div style={{ padding: '0 1.5rem' }}>
      <h3 className="card-title" style={{ fontSize: '1rem' }}>{article.title}</h3>
      <p className="card-desc" style={{ fontSize: '0.8rem' }}>{article.desc}</p>
      <div className="card-meta">
        <span>{article.author}</span><span className="dot"></span><span>{article.date}</span>
        <span className="read-time">{article.read}</span>
      </div>
    </div>
  );
}
