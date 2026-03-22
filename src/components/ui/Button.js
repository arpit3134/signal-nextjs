export default function Button({ children, onClick, variant = 'primary' }) {
  const variants = {
    primary: { background: 'var(--accent)', color: '#fff' },
    secondary: { background: 'var(--card)', color: 'var(--ink)', border: '1px solid var(--border)' }
  };
  
  return (
    <button 
      onClick={onClick} 
      style={{ 
        padding: '8px 16px', 
        borderRadius: '50px', 
        cursor: 'pointer',
        ...variants[variant]
      }}
    >
      {children}
    </button>
  );
}
