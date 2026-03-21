export default function Icon({ name, size = 'md' }) {
  const icons = {
    like: '❤️', unlike: '🤍', bookmark: '🔖', save: '📌',
    share: '🔗', comment: '💬', view: '👁️', time: '⏱️',
    author: '👤', date: '📅'
  };
  
  const sizes = {
    sm: { fontSize: '0.7rem' },
    md: { fontSize: '1rem' },
    lg: { fontSize: '1.2rem' }
  };
  
  return <span style={sizes[size]}>{icons[name] || name}</span>;
}
