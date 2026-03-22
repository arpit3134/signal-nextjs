export default function FooterLinks({ categories, onCategoryClick }) {
  return (
    <>
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
        <ul>
          <li><a>📈 Finance Tools</a></li>
          <li><a>💚 Health Tools</a></li>
          <li><a>🤖 AI Tools</a></li>
          <li><a>💻 Tech Tools</a></li>
        </ul>
      </div>
      <div className="ft-col">
        <h4>Company</h4>
        <ul>
          <li><a>About Us</a></li>
          <li><a>Write for Us</a></li>
          <li><a>Newsletter</a></li>
          <li><a>Contact</a></li>
        </ul>
      </div>
    </>
  );
}
