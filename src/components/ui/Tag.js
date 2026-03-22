export default function Tag({ children, category }) {
  const styles = {
    ai: { background: '#fde8e8', color: '#b02020' },
    tech: { background: '#e8f2fd', color: '#1a52a0' },
    finance: { background: '#e8fde8', color: '#1d7a3a' },
    sports: { background: '#fdf5e8', color: '#8b5e1d' },
    farming: { background: '#edfde8', color: '#3a7a1d' },
    health: { background: '#e8fdf5', color: '#1d7a6a' }
  };
  const style = styles[category] || { background: '#f0ede6', color: '#4a4640' };
  
  return (
    <span style={{
      display: 'inline-flex',
      padding: '4px 12px',
      borderRadius: '50px',
      fontSize: '0.7rem',
      fontWeight: '600',
      ...style
    }}>
      {children}
    </span>
  );
}
