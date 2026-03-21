'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const BookmarkContext = createContext();

export function BookmarkProvider({ children }) {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('bookmarks');
    if (saved) setBookmarks(JSON.parse(saved));
  }, []);

  const addBookmark = (id) => {
    setBookmarks(prev => [...prev, id]);
    localStorage.setItem('bookmarks', JSON.stringify([...bookmarks, id]));
  };

  const removeBookmark = (id) => {
    const newBookmarks = bookmarks.filter(i => i !== id);
    setBookmarks(newBookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
  };

  const toggleBookmark = (id) => {
    if (bookmarks.includes(id)) {
      removeBookmark(id);
    } else {
      addBookmark(id);
    }
  };

  return (
    <BookmarkContext.Provider value={{ bookmarks, toggleBookmark, addBookmark, removeBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
}

export const useBookmarks = () => useContext(BookmarkContext);
