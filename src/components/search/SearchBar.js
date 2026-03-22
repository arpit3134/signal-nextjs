import { useState } from 'react';
import SearchInput from './SearchInput';
import SearchResults from './SearchResults';

export default function SearchBar({ articles, onSelect }) {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]);
  const [show, setShow] = useState(false);

  const handleSearch = (val) => {
    setTerm(val);
    if (val.length > 0) {
      const filtered = articles.filter(a => 
        a.title.toLowerCase().includes(val) || 
        a.desc.toLowerCase().includes(val) || 
        a.author.toLowerCase().includes(val)
      );
      setResults(filtered);
      setShow(true);
    } else setShow(false);
  };

  const clear = () => { setTerm(''); setShow(false); };
  const select = (id) => { onSelect(id); clear(); };

  return (
    <div className="search-wrap">
      <SearchInput value={term} onChange={handleSearch} onClear={clear} />
      {show && results.length > 0 && <SearchResults results={results} onSelect={select} />}
    </div>
  );
}
