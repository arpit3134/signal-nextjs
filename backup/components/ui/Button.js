export default function Button({ children, onClick, variant = 'primary', size = 'md', className = '' }) {
  const variants = {
    primary: { background: '#e8420a', color: '#fff' },
    secondary: { background: '#fff', color: '#1a1814', border: '1px solid #e0ddd6' },
    ghost: { background: 'none', color: '#4a4640' }
  };
  
  const sizes = {
    sm: { padding: '4px 12px', fontSize: '0.7rem' },
    md: { padding: '8px 18px', fontSize: '0.8rem' },
    lg: { padding: '12px 24px', fontSize: '0.9rem' }
  };
  
  return (
    <button
      onClick={onClick}
      style={{
        border: 'none',
        borderRadius: '50px',
        cursor: 'pointer',
        fontWeight: '500',
        transition: 'all 0.2s',
        ...variants[variant],
        ...sizes[size]
      }}
      className={className}
    >
      {children}
    </button>
  );
}
