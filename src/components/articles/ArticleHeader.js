export default function ArticleHeader({ article }) {
  const getTagClass = (cat) => {
    const classes = { ai: 'tag-ai', tech: 'tag-tech', finance: 'tag-finance', sports: 'tag-sports', farming: 'tag-farming', health: 'tag-health' };
    return classes[cat] || 'tag-tech';
  };
  return (
    <div style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
        <span className={`tag ${getTagClass(article.cat)}`}>{article.lbl}</span>
        <span style={{ fontSize: '1.4rem' }}>{article.em}</span>
      </div>
    </div>
  );
}
