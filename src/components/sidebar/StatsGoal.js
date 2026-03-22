export default function StatsGoal({ readCount }) {
  const remaining = 5 - readCount;
  const text = readCount >= 5 ? '🏆 Daily goal reached!' : `${remaining} more to reach daily goal`;
  return (
    <div style={{ fontSize: '.67rem', color: 'var(--ink3)', marginTop: '.4rem' }}>{text}</div>
  );
}
