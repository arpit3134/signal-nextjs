export default function FooterBrand() {
  return (
    <div className="ft-brand">
      <span className="ft-logo">Signal</span>
      <p className="ft-p">Discover articles, ideas, and tools across every topic that matters. No noise, just signal.</p>
      <div className="socials">
        {['🐦', '📷', '💼', '📺', '💬'].map((icon, i) => (
          <div key={i} className="soc">{icon}</div>
        ))}
      </div>
    </div>
  );
}
