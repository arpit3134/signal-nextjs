'use client';

import { useState } from 'react';

export default function CommentSection() {
  const [comments, setComments] = useState([
    { id: 1, name: 'Priya M.', time: '2h ago', text: 'Incredibly well-written. Something I\'ve been trying to articulate for years.', avatar: 'P', color: '#e8420a', likes: 12 },
    { id: 2, name: 'Tom K.', time: '5h ago', text: 'Bookmarked immediately. Would love a follow-up on professional applications.', avatar: 'T', color: '#2d6a4f', likes: 8 },
    { id: 3, name: 'Aiko S.', time: '1d ago', text: 'The research links are gold. Thank you for citing actual studies.', avatar: 'A', color: '#7b2d8b', likes: 15 }
  ]);
  const [newComment, setNewComment] = useState('');
  
  const addComment = () => {
    if (newComment.trim()) {
      setComments([{
        id: Date.now(),
        name: 'You',
        time: 'just now',
        text: newComment,
        avatar: 'Y',
        color: '#e8420a',
        likes: 0
      }, ...comments]);
      setNewComment('');
    }
  };
  
  return (
    <div className="cmt-s" style={{
      padding: '1.5rem 2.5rem',
      borderTop: '1px solid var(--border)'
    }}>
      <div className="cmt-t" style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.6rem',
        marginBottom: '1.5rem'
      }}>
        <span style={{
          fontFamily: 'var(--serif)',
          fontSize: '1.2rem',
          fontWeight: '700'
        }}>💬 Responses</span>
        <span className="cmt-cn" style={{
          fontFamily: 'var(--mono)',
          fontSize: '0.7rem',
          background: 'var(--bg2)',
          padding: '3px 10px',
          borderRadius: '50px',
          color: 'var(--ink3)'
        }}>{comments.length}</span>
      </div>
      
      <div className="cmt-ir" style={{
        display: 'flex',
        gap: '1rem',
        alignItems: 'flex-start',
        marginBottom: '1.5rem'
      }}>
        <div className="cmt-av" style={{
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1rem',
          fontWeight: '700',
          color: '#fff',
          flexShrink: 0
        }}>Y</div>
        <div style={{ flex: 1 }}>
          <textarea 
            className="cmt-in" 
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts…"
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '20px',
              border: '1.5px solid var(--border)',
              background: 'var(--bg2)',
              fontSize: '0.9rem',
              resize: 'none',
              height: '80px',
              outline: 'none',
              transition: 'all 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
          />
          <button 
            className="cmt-sb" 
            onClick={addComment}
            style={{
              float: 'right',
              marginTop: '0.6rem',
              padding: '8px 20px',
              borderRadius: '40px',
              background: 'var(--accent)',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: '600',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-1px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            Publish
          </button>
        </div>
      </div>
      
      <div className="cmt-li" style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.2rem',
        marginTop: '2rem'
      }}>
        {comments.map((c) => (
          <div key={c.id} className="cmt-it" style={{
            display: 'flex',
            gap: '1rem'
          }}>
            <div className="ca" style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: c.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.9rem',
              fontWeight: '700',
              color: '#fff',
              flexShrink: 0
            }}>{c.avatar}</div>
            <div style={{ flex: 1 }}>
              <div>
                <span className="cb-n" style={{
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: 'var(--ink)'
                }}>{c.name}</span>
                <span className="cb-ti" style={{
                  fontSize: '0.7rem',
                  color: 'var(--ink3)',
                  marginLeft: '0.5rem'
                }}>{c.time}</span>
              </div>
              <div className="cb-tx" style={{
                fontSize: '0.9rem',
                color: 'var(--ink2)',
                lineHeight: '1.5',
                marginTop: '0.3rem'
              }}>{c.text}</div>
              <div className="cb-ac" style={{
                display: 'flex',
                gap: '1rem',
                marginTop: '0.5rem'
              }}>
                <button className="cb-a" style={{
                  fontSize: '0.7rem',
                  color: 'var(--ink3)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}>
                  ❤️ {c.likes}
                </button>
                <button className="cb-a" style={{
                  fontSize: '0.7rem',
                  color: 'var(--ink3)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}>
                  ↩ Reply
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
