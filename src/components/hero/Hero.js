import HeroBadge from './HeroBadge';
import HeroTitle from './HeroTitle';
import HeroSubtitle from './HeroSubtitle';
import HeroStats from './HeroStats';
import ScrollCTA from './ScrollCTA';

export default function Hero({ liveCount, articlesCount, readCount, bookmarkCount }) {
  return (
    <section className="hero">
      <div className="hero-bg"></div>
      <div className="hero-grid"></div>
      <div className="hero-content">
        <HeroBadge liveCount={liveCount} />
        <HeroTitle />
        <HeroSubtitle />
        <HeroStats articlesCount={articlesCount} readCount={readCount} bookmarkCount={bookmarkCount} />
      </div>
      <ScrollCTA />
    </section>
  );
}
