import TrendingItem from './TrendingItem';

export default function TrendingList({ trends }) {
  return (
    <div className="sw">
      <div className="sw-h">
        <span className="sw-t">Trending Now</span>
        <span style={{ fontSize: '.62rem', color: 'var(--accent)' }}>↑ Live</span>
      </div>
      <div className="sw-b">
        {trends.map((t, i) => (
          <TrendingItem key={i} index={i} text={t} />
        ))}
      </div>
    </div>
  );
}
