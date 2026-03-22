export default function SearchInput({ value, onChange, onClear }) {
  return (
    <>
      <span className="s-icon">🔍</span>
      <input 
        type="text" 
        placeholder="Search articles, topics, resources…" 
        value={value} 
        onChange={(e) => onChange(e.target.value.toLowerCase())} 
      />
      {value && <button className="s-clear" onClick={onClear}>✕</button>}
    </>
  );
}
