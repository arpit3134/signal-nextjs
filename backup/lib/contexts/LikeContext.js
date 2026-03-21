'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const LikeContext = createContext();

export function LikeProvider({ children }) {
  const [likes, setLikes] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem('likedArticles');
    if (saved) setLikes(JSON.parse(saved));
  }, []);

  const toggleLike = (id) => {
    setLikes(prev => {
      const newState = { ...prev };
      if (newState[id]) {
        delete newState[id];
      } else {
        newState[id] = true;
      }
      localStorage.setItem('likedArticles', JSON.stringify(newState));
      return newState;
    });
  };

  const isLiked = (id) => !!likes[id];

  return (
    <LikeContext.Provider value={{ likes, toggleLike, isLiked }}>
      {children}
    </LikeContext.Provider>
  );
}

export const useLikes = () => useContext(LikeContext);
