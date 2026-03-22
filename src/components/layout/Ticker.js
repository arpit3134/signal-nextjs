export default function Ticker({ data }) {
  return (
    <div className="ticker-wrap">
      <div className="ticker-inner">
        {[...data, ...data].map((d, i) => (
          <div key={i} className="t-item">
            <span className={`t-tag ${d.tp}`}>{d.tp === 't-hot' ? '🔥 Hot' : d.tp === 't-new' ? '✦ New' : '↑ Trend'}</span>
            <span>{d.t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
