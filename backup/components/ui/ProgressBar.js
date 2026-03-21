export default function ProgressBar({ progress }) {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 500,
      height: '3px',
      background: 'linear-gradient(90deg, var(--accent), var(--accent2))',
      width: `${progress}%`,
      boxShadow: '0 0 8px var(--accent)'
    }} />
  );
}
