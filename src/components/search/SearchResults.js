import SearchResultItem from './SearchResultItem';

export default function SearchResults({ results, onSelect }) {
  return (
    <div className="s-drop open">
      {results.slice(0, 5).map(a => (
        <SearchResultItem key={a.id} article={a} onSelect={onSelect} />
      ))}
    </div>
  );
}
