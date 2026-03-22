import Logo from './Logo';
import NavActions from './NavActions';

export default function Navbar({ isDark, onToggleTheme, onBookmark, bookmarkCount, onHome }) {
  return (
    <nav>
      <Logo onClick={onHome} />
      <NavActions isDark={isDark} onToggleTheme={onToggleTheme} onBookmark={onBookmark} bookmarkCount={bookmarkCount} />
    </nav>
  );
}
