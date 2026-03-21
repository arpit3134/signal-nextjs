import { useState, useEffect } from 'react';

export function useLiveCounter(initialCount = 3241) {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => prev + Math.floor(Math.random() * 40) - 20);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return count;
}
