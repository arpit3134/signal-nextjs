export default function Newsletter({ onSubscribe }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    if (email && email.includes('@')) {
      onSubscribe(email);
      e.target.email.value = '';
    }
  };
  return (
    <div className="nl-wrap">
      <div className="nl-box">
        <div className="nl-left"><h2>Stay in the loop</h2><p>Weekly discoveries. No noise, just signal.</p></div>
        <div className="nl-right">
          <form onSubmit={handleSubmit} className="nl-form">
            <input type="email" placeholder="your@email.com" name="email" />
            <button type="submit" className="btn-sub">Subscribe →</button>
          </form>
        </div>
      </div>
    </div>
  );
}
