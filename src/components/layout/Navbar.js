export default function Navbar({ isDark, onToggleTheme, onBookmarkClick, bookmarkCount, onFilterAll }) {
  return (
    <nav>
      <div className="nav-logo" onClick={onFilterAll}>
        <span className="logo-dot"></span>Signal
      </div>
      <div className="nav-right">
        <div className="nav-icon" onClick={onToggleTheme}>{isDark ? '☀️' : '🌙'}</div>
        <div className="nav-icon" onClick={onBookmarkClick}>📌{bookmarkCount > 0 && <span style={{ fontSize: '10px', marginLeft: '2px' }}>{bookmarkCount}</span>}</div>
      </div>
    </nav>
  );
}
