export default function Tag({ children, category, onClick }) {
  const getStyle = (cat) => {
    const styles = {
      ai: { background: '#fde8e8', color: '#b02020' },
      tech: { background: '#e8f2fd', color: '#1a52a0' },
      finance: { background: '#e8fde8', color: '#1d7a3a' },
      sports: { background: '#fdf5e8', color: '#8b5e1d' },
      farming: { background: '#edfde8', color: '#3a7a1d' },
      health: { background: '#e8fdf5', color: '#1d7a6a' },
      business: { background: '#fde8f0', color: '#8b1d3a' },
      trends: { background: '#fdeee8', color: '#8b3a1d' },
      travel: { background: '#e8f0fd', color: '#1d3a8b' }
    };
    return styles[cat] || { background: '#f0ede6', color: '#4a4640' };
  };
  
  const style = getStyle(category);
  
  return (
    <span
      onClick={onClick}
      style={{
        display: 'inline-flex',
        padding: '4px 12px',
        borderRadius: '50px',
        fontSize: '0.7rem',
        fontWeight: '600',
        cursor: onClick ? 'pointer' : 'default',
        ...style
      }}
    >
      {children}
    </span>
  );
}
