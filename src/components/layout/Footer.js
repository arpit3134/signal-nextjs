export default function Footer({ categories, onCategoryClick }) {
  return (
    <footer>
      <div className="ft-in">
        <div className="ft-top">
          <div className="ft-brand">
            <span className="ft-logo">Signal</span>
            <p className="ft-p">Discover articles, ideas, and tools across every topic that matters. No noise, just signal.</p>
            <div className="socials">
              {['🐦', '📷', '💼', '📺', '💬'].map((icon, i) => (
                <div key={i} className="soc">{icon}</div>
              ))}
            </div>
          </div>
          <div className="ft-col">
            <h4>Blog Categories</h4>
            <ul>
              {categories.slice(1, 6).map(cat => (
                <li key={cat.id}><a onClick={() => onCategoryClick(cat.id)}>{cat.icon} {cat.name}</a></li>
              ))}
            </ul>
          </div>
          <div className="ft-col">
            <h4>Tools</h4>
            <ul><li><a>📈 Finance Tools</a></li><li><a>💚 Health Tools</a></li><li><a>🤖 AI Tools</a></li><li><a>💻 Tech Tools</a></li></ul>
          </div>
          <div className="ft-col">
            <h4>Company</h4>
            <ul><li><a>About Us</a></li><li><a>Write for Us</a></li><li><a>Newsletter</a></li><li><a>Contact</a></li></ul>
          </div>
        </div>
        <div className="ft-bot">
          <span className="ft-copy">© 2025 Signal Media. All rights reserved.</span>
          <div className="ft-leg"><a>Privacy</a><a>Terms</a><a>Cookies</a></div>
        </div>
      </div>
    </footer>
  );
}
