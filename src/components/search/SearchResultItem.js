export default function SearchResultItem({ article, onSelect }) {
  return (
    <div className="s-item" onClick={() => onSelect(article.id)}>
      <span className="s-ico">{article.em}</span>
      <div>
        <div className="s-ttl">{article.title}</div>
        <div className="s-cat">{article.lbl} · {article.read}</div>
      </div>
    </div>
  );
}
