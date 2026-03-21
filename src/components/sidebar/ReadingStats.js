export default function ReadingStats({ readCount }) {
  return (
    <div style={{ border: '1px solid #e0ddd6', borderRadius: '20px', overflow: 'hidden', background: '#fff' }}>
      <div style={{ padding: '0.8rem 1rem', borderBottom: '1px solid #e0ddd6', background: '#f0ede6' }}>
        <span style={{ fontSize: '0.7rem', fontWeight: '600', textTransform: 'uppercase' }}>📖 Your Reading</span>
      </div>
      <div style={{ padding: '1rem' }}>
        {readCount === 0 ? (
          <div style={{ fontSize: '0.8rem', color: '#4a4640' }}>Start reading to track progress.</div>
        ) : (
          <>
            <div style={{ fontSize: '0.8rem', marginBottom: '0.5rem' }}>📚 <strong>{readCount}</strong> article{readCount > 1 ? 's' : ''} read today</div>
            <div style={{ background: '#f0ede6', borderRadius: '50px', height: '6px', overflow: 'hidden' }}>
              <div style={{ width: `${Math.min(readCount * 20, 100)}%`, height: '100%', background: 'linear-gradient(90deg, #e8420a, #f5a623)', borderRadius: '50px' }}></div>
            </div>
            <div style={{ fontSize: '0.65rem', marginTop: '0.5rem', color: '#9a9690' }}>
              {readCount >= 5 ? '🏆 Daily goal reached!' : `${5 - readCount} more to reach daily goal`}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
