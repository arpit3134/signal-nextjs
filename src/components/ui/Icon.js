export default function Icon({ name }) {
  const icons = {
    like: '❤️',
    unlike: '🤍',
    bookmark: '🔖',
    save: '📌',
    share: '🔗',
    comment: '💬',
    view: '👁️',
    time: '⏱️',
    author: '👤',
    date: '📅'
  };
  
  return <span>{icons[name] || name}</span>;
}
