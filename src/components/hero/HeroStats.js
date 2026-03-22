import StatItem from './StatItem';

export default function HeroStats({ articlesCount, readCount, bookmarkCount }) {
  return (
    <div className="hero-stats">
      <StatItem number={articlesCount} label="Articles" />
      <StatItem number={readCount} label="Read today" />
      <StatItem number={bookmarkCount} label="Bookmarks" />
      <StatItem number={9} label="Categories" />
    </div>
  );
}
