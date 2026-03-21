import Tag from '../ui/Tag';
import Icon from '../ui/Icon';

export default function ArticleCard({ article, onClick, isLiked, isBookmarked, onLike, onBookmark }) {
  return (
    <div 
      onClick={() => onClick(article)}
      style={{
        background: '#fff',
        borderRadius: '16px',
        border: '1px solid #e0ddd6',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
          <Tag category={article.cat}>{article.lbl}</Tag>
          <span style={{ fontSize: '1.4rem' }}>{article.em}</span>
        </div>
        <h3 style={{ fontFamily: 'Playfair Display, Georgia', fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem', color: '#1a1814' }}>
          {article.title}
        </h3>
        <p style={{ fontSize: '0.85rem', color: '#4a4640', marginBottom: '1rem' }}>{article.desc}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', color: '#9a9690' }}>
          <Icon name="author" size="sm" /> {article.author}
          <span>•</span>
          <Icon name="date" size="sm" /> {article.date}
          <span style={{ marginLeft: 'auto', padding: '2px 8px', borderRadius: '50px', border: '1px solid #e0ddd6' }}>
            <Icon name="time" size="sm" /> {article.read}
          </span>
        </div>
      </div>
      <div style={{ display: 'flex', borderTop: '1px solid #e0ddd6', padding: '0.6rem 1.2rem', gap: '1rem' }}>
        <button onClick={(e) => { e.stopPropagation(); onLike(article.id); }} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.75rem', color: isLiked ? '#e8420a' : '#9a9690', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <Icon name={isLiked ? 'like' : 'unlike'} size="sm" /> {article.likes + (isLiked ? 1 : 0)}
        </button>
        <button onClick={(e) => { e.stopPropagation(); onBookmark(article.id); }} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.75rem', color: isBookmarked ? '#e8420a' : '#9a9690', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <Icon name={isBookmarked ? 'bookmark' : 'save'} size="sm" /> {isBookmarked ? 'Saved' : 'Save'}
        </button>
        <button onClick={(e) => { e.stopPropagation(); onClick(article); }} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.75rem', color: '#e8420a', marginLeft: 'auto' }}>
          Read →
        </button>
      </div>
    </div>
  );
}
