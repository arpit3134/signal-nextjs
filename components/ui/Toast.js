import { useEffect } from 'react';

export default function Toast({ message, show, onClose }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 2800);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '1.5rem',
      right: '1.5rem',
      zIndex: 1000,
      background: 'var(--ink)',
      color: '#fff',
      padding: '0.6rem 1.2rem',
      borderRadius: '50px',
      fontSize: '0.8rem',
      boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
      animation: 'fadeUp 0.2s ease'
    }}>
      {message}
    </div>
  );
}
