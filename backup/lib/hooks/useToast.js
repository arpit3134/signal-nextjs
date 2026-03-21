import { useState, useCallback } from 'react';

export function useToast(duration = 2800) {
  const [toast, setToast] = useState({ show: false, message: '' });

  const showToast = useCallback((message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), duration);
  }, [duration]);

  const hideToast = useCallback(() => {
    setToast({ show: false, message: '' });
  }, []);

  return { toast, showToast, hideToast };
}
