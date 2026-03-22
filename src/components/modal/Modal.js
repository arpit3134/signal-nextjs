'use client';

import { useState, useEffect } from 'react';
import { articles } from '@/lib/data';

export default function Modal({ article, isOpen, onClose, isLiked, isBookmarked, likeCount, onLike, onBookmark }) {
  const [showShare, setShowShare] = useState(false);
  const [comments, setComments] = useState([
    { id: 1, name: 'Priya M.', time: '2h ago', text: 'Incredibly well-written. Something I\'ve been trying to articulate for years.', avatar: 'P', color: '#e8420a', likes: 12 },
    { id: 2, name: 'Tom K.', time: '5h ago', text: 'Bookmarked immediately. Would love a follow-up on professional applications.', avatar: 'T', color: '#2d6a4f', likes: 8 },
    { id: 3, name: 'Aiko S.', time: '1d ago', text: 'The research links are gold. Thank you for citing actual studies.', avatar: 'A', color: '#7b2d8b', likes: 15 }
  ]);
  const [newComment, setNewComment] = useState('');
  const [readingProgress, setReadingProgress] = useState(0);
  
  // Reading progress
  useEffect(() => {
    if (!isOpen) return;
    const handleScroll = () => {
      const scrollContainer = document.querySelector('.modal-scroll');
      if (scrollContainer) {
        const scrollTop = scrollContainer.scrollTop;
        const scrollHeight = scrollContainer.scrollHeight - scrollContainer.clientHeight;
        const progress = (scrollTop / scrollHeight) * 100;
        setReadingProgress(progress);
      }
    };
    const scrollContainer = document.querySelector('.modal-scroll');
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, [isOpen]);
  
  if (!isOpen || !article) return null;
  
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('🔗 Link copied!');
  };
  
  const shareToSocial = (platform) => {
    const url = window.location.href;
    const title = article.title;
    const links = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      reddit: `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`
    };
    window.open(links[platform], '_blank');
  };
  
  const addComment = () => {
    if (newComment.trim()) {
      const newCommentObj = {
        id: Date.now(),
        name: 'You',
        time: 'just now',
        text: newComment,
        avatar: 'Y',
        color: '#e8420a',
        likes: 0
      };
      setComments([newCommentObj, ...comments]);
      setNewComment('');
    }
  };
  
  const relatedArticles = articles?.filter(a => a.id !== article.id).slice(0, 3) || [];
  
  const formatNumber = (num) => {
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toString();
  };
  
  return (
    <div className="modal-ov open" onClick={onClose} style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.85)',
      backdropFilter: 'blur(12px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div className="modal" onClick={(e) => e.stopPropagation()} style={{
        maxWidth: '900px',
        width: '100%',
        maxHeight: '90vh',
        background: 'var(--card)',
        borderRadius: '24px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
      }}>
        {/* Progress Bar */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, var(--accent), var(--accent2))',
          width: `${readingProgress}%`,
          zIndex: 20
        }} />
        
        {/* Header */}
        <div style={{
          padding: '1rem 1.5rem',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'var(--card)',
          flexShrink: 0
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <div style={{
              width: '36px',
              height: '36px',
              background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span>📖</span>
            </div>
            <div>
              <span style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--ink)' }}>Signal</span>
              <span style={{ fontSize: '0.7rem', color: 'var(--ink3)', marginLeft: '0.3rem' }}>• {article.lbl}</span>
            </div>
          </div>
          <button onClick={onClose} style={{
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            border: '1px solid var(--border)',
            background: 'none',
            cursor: 'pointer',
            fontSize: '1.1rem'
          }}>✕</button>
        </div>
        
        {/* Scrollable Content */}
        <div className="modal-scroll" style={{
          overflowY: 'auto',
          flex: 1,
          padding: '0'
        }}>
          {/* Hero Image */}
          {article.image && (
            <div style={{
              position: 'relative',
              height: '280px',
              overflow: 'hidden'
            }}>
              <img 
                src={article.image} 
                alt={article.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '2rem',
                background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.6))'
              }}>
                <span style={{
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '0.7rem',
                  fontWeight: '600',
                  background: 'rgba(255,255,255,0.9)',
                  color: '#1a1814'
                }}>{article.lbl}</span>
              </div>
            </div>
          )}
          
          {/* Content */}
          <div style={{ padding: '1.5rem 2rem' }}>
            <h1 style={{
              fontFamily: 'Playfair Display, Georgia',
              fontSize: '1.8rem',
              fontWeight: '700',
              marginBottom: '1rem',
              lineHeight: '1.3',
              color: 'var(--ink)'
            }}>{article.title}</h1>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.5rem',
              paddingBottom: '1rem',
              borderBottom: '1px solid var(--border)',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  color: '#fff'
                }}>{article.author.charAt(0)}</div>
                <div>
                  <div style={{ fontWeight: '600', color: 'var(--ink)' }}>{article.author}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--ink3)' }}>
                    {article.date} • {article.read} read
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: 'var(--ink3)' }}>
                <span>👁️ {formatNumber(parseInt(article.views) + (isLiked ? 1 : 0))} views</span>
                <span>❤️ {formatNumber(likeCount)} likes</span>
                <span>💬 {comments.length} comments</span>
              </div>
            </div>
            
            <div style={{
              fontSize: '1rem',
              lineHeight: '1.8',
              color: 'var(--ink2)',
              marginBottom: '2rem'
            }}>
              {article.body.split('\n\n').map((para, i) => {
                const isMiddle = i === Math.floor(article.body.split('\n\n').length / 2);
                return (
                  <div key={i}>
                    <p style={{ marginBottom: '1.2rem' }}>{para}</p>
                    {isMiddle && (
                      <div style={{
                        margin: '2rem 0',
                        padding: '1.2rem 1.5rem',
                        background: 'linear-gradient(135deg, var(--bg2), transparent)',
                        borderRadius: '12px',
                        borderLeft: '4px solid var(--accent)'
                      }}>
                        <p style={{
                          fontFamily: 'Playfair Display, Georgia',
                          fontSize: '1rem',
                          fontStyle: 'italic',
                          color: 'var(--ink)',
                          margin: 0,
                          lineHeight: '1.6'
                        }}>"{para.split('.')[0]}."</p>
                        <p style={{
                          fontSize: '0.7rem',
                          color: 'var(--ink3)',
                          marginTop: '0.5rem'
                        }}>— Highlighted by Signal</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            
            {/* Engagement Bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              marginBottom: '1.5rem',
              padding: '1rem 0',
              borderTop: '1px solid var(--border)',
              borderBottom: '1px solid var(--border)'
            }}>
              <div style={{ display: 'flex', gap: '0.8rem' }}>
                <button onClick={onLike} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '8px 16px',
                  borderRadius: '30px',
                  border: `1px solid ${isLiked ? 'var(--accent)' : 'var(--border)'}`,
                  background: isLiked ? 'rgba(232,66,10,0.1)' : 'transparent',
                  cursor: 'pointer',
                  color: isLiked ? 'var(--accent)' : 'var(--ink2)'
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                  <span>{formatNumber(likeCount)}</span>
                </button>
                
                <button onClick={onBookmark} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '8px 16px',
                  borderRadius: '30px',
                  border: `1px solid ${isBookmarked ? '#1d7a3a' : 'var(--border)'}`,
                  background: isBookmarked ? 'rgba(29,122,58,0.1)' : 'transparent',
                  cursor: 'pointer',
                  color: isBookmarked ? '#1d7a3a' : 'var(--ink2)'
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill={isBookmarked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                  </svg>
                  <span>{isBookmarked ? 'Saved' : 'Save'}</span>
                </button>
                
                <button onClick={() => setShowShare(!showShare)} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '8px 16px',
                  borderRadius: '30px',
                  border: '1px solid var(--border)',
                  background: 'transparent',
                  cursor: 'pointer',
                  color: 'var(--ink2)'
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="18" cy="5" r="3"/>
                    <circle cx="6" cy="12" r="3"/>
                    <circle cx="18" cy="19" r="3"/>
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                  </svg>
                  <span>Share</span>
                </button>
              </div>
              
              <button onClick={copyLink} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '8px 16px',
                borderRadius: '30px',
                border: '1px solid var(--border)',
                background: 'transparent',
                cursor: 'pointer',
                color: 'var(--ink2)'
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                </svg>
                <span>Copy Link</span>
              </button>
            </div>
            
            {/* Share Panel */}
            {showShare && (
              <div style={{
                marginBottom: '1.5rem',
                padding: '1rem',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                background: 'var(--bg2)'
              }}>
                <div style={{ fontSize: '0.7rem', marginBottom: '0.8rem', color: 'var(--ink3)' }}>Share this article</div>
                <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                  <button onClick={() => shareToSocial('twitter')} style={{ padding: '6px 14px', borderRadius: '30px', border: '1px solid var(--border)', background: 'var(--card)', cursor: 'pointer', fontSize: '0.75rem' }}>🐦 X</button>
                  <button onClick={() => shareToSocial('facebook')} style={{ padding: '6px 14px', borderRadius: '30px', border: '1px solid var(--border)', background: 'var(--card)', cursor: 'pointer', fontSize: '0.75rem' }}>📘 Facebook</button>
                  <button onClick={() => shareToSocial('linkedin')} style={{ padding: '6px 14px', borderRadius: '30px', border: '1px solid var(--border)', background: 'var(--card)', cursor: 'pointer', fontSize: '0.75rem' }}>💼 LinkedIn</button>
                  <button onClick={() => shareToSocial('whatsapp')} style={{ padding: '6px 14px', borderRadius: '30px', border: '1px solid var(--border)', background: 'var(--card)', cursor: 'pointer', fontSize: '0.75rem' }}>📱 WhatsApp</button>
                  <button onClick={() => shareToSocial('reddit')} style={{ padding: '6px 14px', borderRadius: '30px', border: '1px solid var(--border)', background: 'var(--card)', cursor: 'pointer', fontSize: '0.75rem' }}>🤖 Reddit</button>
                  <button onClick={copyLink} style={{ padding: '6px 14px', borderRadius: '30px', border: '1px solid var(--border)', background: 'var(--card)', cursor: 'pointer', fontSize: '0.75rem' }}>🔗 Copy</button>
                </div>
              </div>
            )}
            
            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
                <h3 style={{
                  fontFamily: 'Playfair Display, Georgia',
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span>📚</span> Continue Reading
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
                  {relatedArticles.map(rel => (
                    <div key={rel.id} onClick={() => { window.location.href = `/articles/${rel.id}`; }} style={{
                      padding: '1rem',
                      borderRadius: '12px',
                      border: '1px solid var(--border)',
                      background: 'var(--bg2)',
                      cursor: 'pointer'
                    }}>
                      <div style={{ fontSize: '1.2rem', marginBottom: '0.3rem' }}>{rel.em}</div>
                      <div style={{ fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.2rem', color: 'var(--ink)' }}>{rel.title}</div>
                      <div style={{ fontSize: '0.65rem', color: 'var(--ink3)' }}>{rel.author} • {rel.read}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Comments */}
            <div style={{ marginTop: '2rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                marginBottom: '1rem'
              }}>
                <span style={{ fontFamily: 'Playfair Display, Georgia', fontSize: '1.1rem', fontWeight: '700' }}>💬 Discussion ({comments.length})</span>
              </div>
              
              <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '1.5rem' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: 'bold'
                }}>Y</div>
                <div style={{ flex: 1 }}>
                  <textarea 
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="What are your thoughts?"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '16px',
                      border: '1px solid var(--border)',
                      background: 'var(--bg2)',
                      fontSize: '0.85rem',
                      resize: 'none',
                      height: '80px',
                      outline: 'none'
                    }}
                  />
                  <button onClick={addComment} style={{
                    float: 'right',
                    marginTop: '0.5rem',
                    padding: '6px 20px',
                    borderRadius: '30px',
                    background: 'var(--accent)',
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                    fontWeight: '600'
                  }}>
                    Post Comment
                  </button>
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginTop: '1rem' }}>
                {comments.map(comment => (
                  <div key={comment.id} style={{ display: 'flex', gap: '0.8rem' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: comment.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontWeight: 'bold',
                      fontSize: '0.8rem'
                    }}>{comment.avatar}</div>
                    <div style={{ flex: 1 }}>
                      <div>
                        <span style={{ fontWeight: '600', fontSize: '0.85rem', color: 'var(--ink)' }}>{comment.name}</span>
                        <span style={{ fontSize: '0.65rem', marginLeft: '0.5rem', color: 'var(--ink3)' }}>{comment.time}</span>
                      </div>
                      <div style={{ fontSize: '0.8rem', marginTop: '0.2rem', color: 'var(--ink2)' }}>{comment.text}</div>
                      <div style={{ display: 'flex', gap: '1rem', marginTop: '0.4rem' }}>
                        <button style={{ fontSize: '0.65rem', color: 'var(--ink3)', background: 'none', border: 'none', cursor: 'pointer' }}>❤️ {comment.likes}</button>
                        <button style={{ fontSize: '0.65rem', color: 'var(--ink3)', background: 'none', border: 'none', cursor: 'pointer' }}>↩ Reply</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div style={{
              marginTop: '2rem',
              paddingTop: '1rem',
              textAlign: 'center',
              fontSize: '0.7rem',
              color: 'var(--ink3)',
              borderTop: '1px solid var(--border)'
            }}>
              <span>📖 {article.read} read • 👁️ {formatNumber(parseInt(article.views) + (isLiked ? 1 : 0))} views • ❤️ {formatNumber(likeCount)} likes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
