export default function Newsletter({ onSubscribe }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    if (email && email.includes('@')) {
      onSubscribe(email);
      e.target.email.value = '';
    } else {
      alert('Please enter a valid email');
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #1a1814, #2a2620)',
      borderRadius: '24px',
      padding: '2rem',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '1.5rem',
      flexWrap: 'wrap'
    }}>
      <div style={{ flex: 1 }}>
        <h2 style={{
          fontFamily: 'Playfair Display, Georgia',
          fontSize: '1.3rem',
          fontWeight: '700',
          color: '#f0ede6',
          marginBottom: '0.2rem'
        }}>📬 Stay in the loop</h2>
        <p style={{ color: '#9a9690', fontSize: '0.75rem' }}>Weekly discoveries. No noise, just signal.</p>
      </div>
      <div style={{ flex: 1 }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type="email"
            name="email"
            placeholder="your@email.com"
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: '60px',
              border: '1px solid #3a3630',
              background: '#161512',
              color: '#f0ede6',
              fontSize: '0.8rem',
              outline: 'none'
            }}
          />
          <button
            type="submit"
            style={{
              padding: '12px 20px',
              borderRadius: '60px',
              background: 'var(--accent)',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >Subscribe ✨</button>
        </form>
      </div>
    </div>
  );
}
