export default function CommentItem({ comment }) {
  return (
    <div style={{ display: 'flex', gap: '0.8rem' }}>
      <div style={{
        width: '34px',
        height: '34px',
        borderRadius: '50%',
        background: comment.color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontWeight: '600'
      }}>{comment.avatar}</div>
      <div>
        <div>
          <span style={{ fontWeight: '600', color: 'var(--ink)' }}>{comment.name}</span>
          <span style={{ fontSize: '0.65rem', marginLeft: '0.5rem', color: 'var(--ink3)' }}>{comment.time}</span>
        </div>
        <div style={{ fontSize: '0.8rem', marginTop: '0.2rem', color: 'var(--ink2)' }}>{comment.text}</div>
      </div>
    </div>
  );
}
