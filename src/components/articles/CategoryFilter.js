export default function CategoryFilter({ categories, active, onSelect }) {
  return (
    <div className="cf-row">
      {categories.map(cat => (
        <button 
          key={cat.id} 
          className={`cf ${active === cat.id ? 'active' : ''}`} 
          onClick={() => onSelect(cat.id)}
        >
          {cat.icon} {cat.name}
        </button>
      ))}
    </div>
  );
}
