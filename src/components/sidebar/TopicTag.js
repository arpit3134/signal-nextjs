export default function TopicTag({ category, onSelect }) {
  const getClass = (cat) => {
    const classes = { 
      ai: 'tag-ai', tech: 'tag-tech', finance: 'tag-finance',
      sports: 'tag-sports', farming: 'tag-farming', health: 'tag-health',
      business: 'tag-business', trends: 'tag-trends', travel: 'tag-travel'
    };
    return classes[cat] || 'tag-tech';
  };
  return (
    <span className={`tag ${getClass(category.id)}`} style={{ cursor: 'pointer' }} onClick={() => onSelect(category.id)}>
      {category.icon} {category.name}
    </span>
  );
}
