export default function FeaturedGrid({ articles, onOpen }) {
  const getTagClass = (cat) => {
    const classes = { ai: 'tag-ai', tech: 'tag-tech', finance: 'tag-finance', sports: 'tag-sports', farming: 'tag-farming', health: 'tag-health' };
    return classes[cat] || 'tag-tech';
  };
  return (
    <div className="feat-grid">
      {articles[0] && (
        <div className="feat-card feat-main" onClick={() => onOpen(0)}>
          <span className="feat-bg-num">01</span>
          <span className={`tag ${getTagClass(articles[0].cat)}`}>{articles[0].lbl}</span>
          <h2 className="card-title">{articles[0].title}</h2>
          <p className="card-desc">{articles[0].desc}</p>
          <div className="card-meta">
            <span>{articles[0].author}</span><span className="dot"></span><span>{articles[0].date}</span>
            <span className="read-time">{articles[0].read}</span>
          </div>
        </div>
      )}
      <div className="feat-side">
        {articles[1] && (
          <div className="feat-card" onClick={() => onOpen(1)} style={{ padding: '1.6rem', marginBottom: '1rem' }}>
            <span className={`tag ${getTagClass(articles[1].cat)}`}>{articles[1].lbl}</span>
            <h3 className="card-title" style={{ fontSize: '1rem' }}>{articles[1].title}</h3>
            <div className="card-meta">
              <span>{articles[1].author}</span><span className="dot"></span><span>{articles[1].date}</span>
              <span className="read-time">{articles[1].read}</span>
            </div>
          </div>
        )}
        {articles[4] && (
          <div className="feat-card" onClick={() => onOpen(4)} style={{ padding: '1.6rem' }}>
            <span className={`tag ${getTagClass(articles[4].cat)}`}>{articles[4].lbl}</span>
            <h3 className="card-title" style={{ fontSize: '1rem' }}>{articles[4].title}</h3>
            <div className="card-meta">
              <span>{articles[4].author}</span><span className="dot"></span><span>{articles[4].date}</span>
              <span className="read-time">{articles[4].read}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
