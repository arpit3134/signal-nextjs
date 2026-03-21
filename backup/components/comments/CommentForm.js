import { useState } from 'react';
import Button from '../ui/Button';

export default function CommentForm({ onSubmit }) {
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    if (comment.trim()) {
      onSubmit(comment);
      setComment('');
    }
  };

  return (
    <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '1.2rem' }}>
      <div style={{
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff'
      }}>Y</div>
      <div style={{ flex: 1 }}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your thoughts..."
          style={{
            width: '100%',
            padding: '10px 14px',
            borderRadius: '16px',
            border: '1px solid var(--border)',
            background: 'var(--bg2)',
            fontSize: '0.8rem',
            height: '70px',
            outline: 'none',
            resize: 'none'
          }}
        />
        <Button onClick={handleSubmit} variant="primary" size="sm" style={{ float: 'right', marginTop: '0.5rem' }}>
          Publish
        </Button>
      </div>
    </div>
  );
}
