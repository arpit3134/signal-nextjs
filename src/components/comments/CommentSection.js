'use client';

import { useState } from 'react';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';

const defaultComments = [
  { n: 'Priya M.', t: '2h ago', tx: 'Incredibly well-written. Something I\'ve been trying to articulate for years.', bg: '#e8420a' },
  { n: 'Tom K.', t: '5h ago', tx: 'Bookmarked immediately. Would love a follow-up on professional applications.', bg: '#2d6a4f' },
  { n: 'Aiko S.', t: '1d ago', tx: 'The research links are gold. Thank you for citing actual studies.', bg: '#7b2d8b' }
];

export default function CommentSection() {
  const [comments, setComments] = useState(defaultComments);
  
  const addComment = (text) => {
    const newComment = {
      n: 'You',
      t: 'just now',
      tx: text,
      bg: '#e8420a'
    };
    setComments([newComment, ...comments]);
  };
  
  return (
    <div className="cmt-s">
      <div className="cmt-t">
        Responses <span className="cmt-cn">{comments.length}</span>
      </div>
      <CommentForm onSubmit={addComment} />
      <div className="cmt-li">
        {comments.map((c, i) => (
          <CommentItem key={i} comment={c} />
        ))}
      </div>
    </div>
  );
}
