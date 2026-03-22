export default function StatsProgress({ readCount }) {
  const width = Math.min(readCount * 20, 100);
  return (
    <div style={{ background: 'var(--bg2)', borderRadius: '50px', height: '5px', overflow: 'hidden' }}>
      <div style={{ width: `${width}%`, height: '100%', background: 'linear-gradient(90deg, var(--accent), var(--accent2))', borderRadius: '50px' }}></div>
    </div>
  );
}
