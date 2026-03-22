export default function TickerItem({ item }) {
  const getLabel = () => {
    if (item.tp === 't-hot') return '🔥 Hot';
    if (item.tp === 't-new') return '✦ New';
    return '↑ Trend';
  };
  return (
    <div className="t-item">
      <span className={`t-tag ${item.tp}`}>{getLabel()}</span>
      <span>{item.t}</span>
    </div>
  );
}
