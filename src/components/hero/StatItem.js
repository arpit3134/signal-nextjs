export default function StatItem({ number, label }) {
  return (
    <div>
      <div className="stat-num">{number}</div>
      <div className="stat-lbl">{label}</div>
    </div>
  );
}
