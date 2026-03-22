export default function Hero({ liveCount }) {
  return (
    <section className="hero">
      <div className="hero-bg"></div>
      <div className="hero-grid"></div>
      <div className="hero-content">
        <div className="hero-badge">
          <span className="live-dot"></span>
          <span>Live — {liveCount.toLocaleString()} readers online</span>
        </div>
        <h1>The signal for<br /><em>what's next</em></h1>
        <p>Discover articles, ideas, tools, and insights<br />across every topic that matters.</p>
      </div>
      <div className="scroll-cta">
        <span>Scroll to explore</span>
        <div className="s-arr">↓</div>
      </div>
    </section>
  );
}
