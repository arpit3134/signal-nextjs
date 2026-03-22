import TickerItem from './TickerItem';

export default function Ticker({ data }) {
  return (
    <div className="ticker-wrap">
      <div className="ticker-inner">
        {[...data, ...data].map((d, i) => (
          <TickerItem key={i} item={d} />
        ))}
      </div>
    </div>
  );
}
