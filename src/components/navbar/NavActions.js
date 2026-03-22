export default function NavActions({ isDark, onToggleTheme, onBookmark, bookmarkCount }) {
  return (
    <div className="nav-right">
      <div className="nav-icon" onClick={onToggleTheme}>{isDark ? '☀️' : '🌙'}</div>
      <div className="nav-icon" onClick={onBookmark}>📌{bookmarkCount > 0 && <span style={{ fontSize: '10px', marginLeft: '2px' }}>{bookmarkCount}</span>}</div>
    </div>
  );
}
