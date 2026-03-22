import { useState } from 'react';

export default function CommentForm({ onSubmit }) {
  const [text, setText] = useState('');
  
  const handleSubmit = () => {
    if (text.trim()) {
      onSubmit(text);
      setText('');
    }
  };
  
  return (
    <div className="cmt-ir">
      <div className="cmt-av">Y</div>
      <div style={{ flex: 1 }}>
        <textarea 
          className="cmt-in" 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          placeholder="Share your thoughts…"
        />
        <button className="cmt-sb" onClick={handleSubmit}>
          Publish
        </button>
      </div>
    </div>
  );
}
