export default function HeroBadge({ liveCount }) {
  return (
    <div className="hero-badge">
      <span className="live-dot"></span>
      <span>Live — {liveCount.toLocaleString()} readers online</span>
    </div>
  );
}
