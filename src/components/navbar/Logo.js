export default function Logo({ onClick }) {
  return (
    <div className="nav-logo" onClick={onClick}>
      <span className="logo-dot"></span>Signal
    </div>
  );
}
