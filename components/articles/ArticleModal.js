import { useState } from 'react';
import Tag from '../ui/Tag';
import Icon from '../ui/Icon';

export default function ArticleModal({ article, isOpen, onClose, isLiked, isBookmarked, onLike, onBookmark }) {
  const [showShare, setShowShare] = useState(false);

  if (!isOpen || !article) return null;

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied!');
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(10,9,8,0.85)',
      backdropFilter: 'blur(16px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0.8rem'
    }} onClick={onClose}>
      <div style={{
        background: 'var(--card)',
        borderRadius: '28px',
        maxWidth: '760px',
        width: '100%',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }} onClick={(e) => e.stopPropagation()}>
        <div style={{
          padding: '1rem 1.5rem',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <span style={{ fontFamily: 'Playfair Display, Georgia', fontSize: '0.9rem', fontWeight: '700', color: 'var(--ink)' }}>Signal</span>
            <span style={{ fontSize: '0.7rem', marginLeft: '0.3rem', color: 'var(--ink3)' }}>› {article.lbl}</span>
          </div>
          <button onClick={onClose} style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            border: '1px solid var(--border)',
            background: 'none',
            cursor: 'pointer'
          }}>✕</button>
        </div>
        <div style={{ overflowY: 'auto', flex: 1, padding: '2rem' }}>
          <Tag category={article.cat}>{article.lbl}</Tag>
          <h2 style={{ fontFamily: 'Playfair Display, Georgia', fontSize: '1.8rem', fontWeight: '700', marginTop: '1rem', marginBottom: '0.8rem', color: 'var(--ink)' }}>
            {article.title}
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--ink2)', marginBottom: '1rem' }}>{article.desc}</p>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.8rem',
            marginBottom: '1.5rem',
            paddingBottom: '1rem',
            borderBottom: '1px solid var(--border)'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: `linear-gradient(135deg, var(--accent), var(--accent2))`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: '600'
            }}>{article.author.charAt(0)}</div>
            <div>
              <div style={{ fontWeight: '600', color: 'var(--ink)' }}>{article.author}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--ink3)' }}>{article.date} · {article.read} read</div>
            </div>
            <div style={{ marginLeft: 'auto' }}>
              <span style={{ fontSize: '0.7rem', padding: '3px 10px', borderRadius: '50px', border: '1px solid var(--border)' }}>
                <Icon name="view" size="sm" /> {article.views}
              </span>
            </div>
          </div>
          <div style={{ fontSize: '1rem', lineHeight: '1.7', color: 'var(--ink2)' }}>
            {article.body.split('\n\n').map((para, i) => (
              <p key={i} style={{ marginBottom: '1.2rem' }}>{para}</p>
            ))}
          </div>
          
          {/* Engagement Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            padding: '1rem',
            border: '1px solid var(--border)',
            borderRadius: '20px',
            margin: '1.5rem 0',
            background: 'var(--bg2)'
          }}>
            <button onClick={() => onLike(article.id)} style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.8rem',
              color: isLiked ? 'var(--accent)' : 'var(--ink2)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem'
            }}>
              <Icon name={isLiked ? 'like' : 'unlike'} size="sm" /> {article.likes + (isLiked ? 1 : 0)}
            </button>
            <button onClick={() => onBookmark(article.id)} style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.8rem',
              color: isBookmarked ? 'var(--accent)' : 'var(--ink2)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem'
            }}>
              <Icon name={isBookmarked ? 'bookmark' : 'save'} size="sm" /> {isBookmarked ? 'Saved' : 'Save'}
            </button>
            <button onClick={() => setShowShare(!showShare)} style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.8rem',
              color: 'var(--ink2)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem'
            }}>
              <Icon name="share" size="sm" /> Share
            </button>
          </div>
          
          {/* Share Panel */}
          {showShare && (
            <div style={{ padding: '1rem', border: '1px solid var(--border)', borderRadius: '16px', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--ink3)', marginBottom: '0.8rem' }}>Share this article</div>
              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                <button onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.href)}`, '_blank')} style={{ padding: '6px 14px', borderRadius: '50px', border: '1px solid var(--border)', background: 'none', cursor: 'pointer' }}>🐦 X</button>
                <button onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')} style={{ padding: '6px 14px', borderRadius: '50px', border: '1px solid var(--border)', background: 'none', cursor: 'pointer' }}>💼 LinkedIn</button>
                <button onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(article.title + ' ' + window.location.href)}`, '_blank')} style={{ padding: '6px 14px', borderRadius: '50px', border: '1px solid var(--border)', background: 'none', cursor: 'pointer' }}>📱 WhatsApp</button>
                <button onClick={copyLink} style={{ padding: '6px 14px', borderRadius: '50px', border: '1px solid var(--border)', background: 'none', cursor: 'pointer' }}>🔗 Copy Link</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
