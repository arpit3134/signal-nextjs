import TopicTag from './TopicTag';

export default function BrowseTopics({ categories, onSelect }) {
  return (
    <div className="sw">
      <div className="sw-h"><span className="sw-t">Browse Topics</span></div>
      <div className="sw-b" style={{ display: 'flex', flexWrap: 'wrap', gap: '.4rem' }}>
        {categories.slice(1).map(cat => (
          <TopicTag key={cat.id} category={cat} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
}
