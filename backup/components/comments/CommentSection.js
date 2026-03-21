import { useState } from 'react';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';

export default function CommentSection({ initialComments, onAddComment }) {
  const [comments, setComments] = useState(initialComments);

  const addComment = (text) => {
    const newComment = {
      name: 'You',
      time: 'just now',
      text: text,
      avatar: 'Y',
      color: '#e8420a',
      likes: 0
    };
    setComments([newComment, ...comments]);
    if (onAddComment) onAddComment(newComment);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
        <span style={{ fontFamily: 'Playfair Display, Georgia', fontSize: '1rem', fontWeight: '700', color: 'var(--ink)' }}>💬 Responses</span>
        <span style={{ fontSize: '0.7rem', background: 'var(--bg2)', padding: '2px 8px', borderRadius: '50px' }}>{comments.length}</span>
      </div>
      <CommentForm onSubmit={addComment} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
        {comments.map((comment, i) => (
          <CommentItem key={i} comment={comment} />
        ))}
      </div>
    </div>
  );
}
