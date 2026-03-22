export default function ArticleList({ articles, onOpen }) {
  const getTagClass = (cat) => {
    const classes = { ai: 'tag-ai', tech: 'tag-tech', finance: 'tag-finance', sports: 'tag-sports', farming: 'tag-farming', health: 'tag-health' };
    return classes[cat] || 'tag-tech';
  };
  return (
    <>
      {articles.map((a, i) => (
        <div key={a.id} className="a-card" onClick={() => onOpen(a.id)}>
          <div>
            <div className="a-num">0{i+1}</div>
            <span className={`tag ${getTagClass(a.cat)}`}>{a.lbl}</span>
            <h3 className="card-title" style={{ fontSize: '.97rem' }}>{a.title}</h3>
            <p className="card-desc">{a.desc}</p>
            <div className="card-meta">
              <span>{a.author}</span><span className="dot"></span><span>{a.date}</span>
              <span className="read-time">{a.read}</span>
            </div>
          </div>
          <div className="a-img">{a.em}</div>
        </div>
      ))}
    </>
  );
}
