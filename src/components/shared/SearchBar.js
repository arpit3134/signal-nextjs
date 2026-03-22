import { useState } from 'react';

export default function SearchBar({ articles, onSelect }) {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]);
  const [show, setShow] = useState(false);

  const handleSearch = (e) => {
    const val = e.target.value.toLowerCase();
    setTerm(val);
    if (val.length > 0) {
      const filtered = articles.filter(a => a.title.toLowerCase().includes(val) || a.desc.toLowerCase().includes(val) || a.author.toLowerCase().includes(val));
      setResults(filtered);
      setShow(true);
    } else setShow(false);
  };

  const clear = () => { setTerm(''); setShow(false); };

  return (
    <div className="search-wrap">
      <span className="s-icon">🔍</span>
      <input type="text" placeholder="Search articles, topics, resources…" value={term} onChange={handleSearch} />
      {term && <button className="s-clear" onClick={clear}>✕</button>}
      {show && results.length > 0 && (
        <div className="s-drop open">
          {results.slice(0, 5).map(a => (
            <div key={a.id} className="s-item" onClick={() => { onSelect(a.id); clear(); }}>
              <span className="s-ico">{a.em}</span>
              <div><div className="s-ttl">{a.title}</div><div className="s-cat">{a.lbl} · {a.read}</div></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
