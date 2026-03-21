export default function SharePanel({ title, url, onClose }) {
  const copyLink = () => {
    navigator.clipboard.writeText(url);
    alert('Link copied!');
  };

  const shareOnSocial = (platform) => {
    const links = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`
    };
    window.open(links[platform], '_blank');
  };

  return (
    <div style={{ padding: '1rem', border: '1px solid var(--border)', borderRadius: '16px', marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
        <div style={{ fontSize: '0.7rem', color: 'var(--ink3)' }}>Share this article</div>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem' }}>✕</button>
      </div>
      <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
        <button onClick={() => shareOnSocial('twitter')} style={{ padding: '6px 14px', borderRadius: '50px', border: '1px solid var(--border)', background: 'none', cursor: 'pointer' }}>🐦 X</button>
        <button onClick={() => shareOnSocial('linkedin')} style={{ padding: '6px 14px', borderRadius: '50px', border: '1px solid var(--border)', background: 'none', cursor: 'pointer' }}>💼 LinkedIn</button>
        <button onClick={() => shareOnSocial('whatsapp')} style={{ padding: '6px 14px', borderRadius: '50px', border: '1px solid var(--border)', background: 'none', cursor: 'pointer' }}>📱 WhatsApp</button>
        <button onClick={copyLink} style={{ padding: '6px 14px', borderRadius: '50px', border: '1px solid var(--border)', background: 'none', cursor: 'pointer' }}>🔗 Copy Link</button>
      </div>
    </div>
  );
}
