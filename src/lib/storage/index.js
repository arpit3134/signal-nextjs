// GitHub Storage URLs
const REPO_OWNER = 'arpit3134';
const REPO_NAME = 'signal-nextjs';
const BRANCH = 'main';

// CDN URLs (faster)
const CDN_BASE = `https://cdn.jsdelivr.net/gh/${REPO_OWNER}/${REPO_NAME}@${BRANCH}`;
const RAW_BASE = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${BRANCH}`;

export const storage = {
  // Get image from GitHub
  image: (path) => `${CDN_BASE}/${path}`,
  
  // Get raw file
  file: (path) => `${RAW_BASE}/${path}`,
  
  // Get article image
  articleImage: (id) => {
    const images = {
      0: `${CDN_BASE}/public/images/articles/article-0.jpg`,
      1: `${CDN_BASE}/public/images/articles/article-1.jpg`,
      2: `${CDN_BASE}/public/images/articles/article-2.jpg`,
      3: `${CDN_BASE}/public/images/articles/article-3.jpg`,
      4: `${CDN_BASE}/public/images/articles/article-4.jpg`,
      5: `${CDN_BASE}/public/images/articles/article-5.jpg`,
      6: `${CDN_BASE}/public/images/articles/article-6.jpg`,
      7: `${CDN_BASE}/public/images/articles/article-7.jpg`,
      8: `${CDN_BASE}/public/images/articles/article-8.jpg`
    };
    return images[id] || `${CDN_BASE}/public/images/placeholder.svg`;
  },
  
  // Get author avatar
  authorAvatar: (authorId) => `${CDN_BASE}/public/images/avatars/author-${authorId}.jpg`,
  
  // Default images
  defaultImage: `${CDN_BASE}/public/images/placeholder.svg`,
  logo: `${CDN_BASE}/public/images/icons/logo.svg`
};

export const assets = {
  logo: storage.logo,
  defaultAvatar: storage.defaultImage
};
