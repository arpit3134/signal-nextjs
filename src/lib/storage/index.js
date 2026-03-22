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
  articleImage: (id) => `${CDN_BASE}/public/images/articles/article-${id}.jpg`,
  
  // Get avatar
  avatar: (name) => `${CDN_BASE}/public/images/avatars/${name}.svg`,
  
  // Default images
  defaultImage: `${CDN_BASE}/public/images/placeholder.svg`
};

// Export individual assets
export const assets = {
  logo: storage.image('public/images/logo.svg'),
  favicon: storage.image('public/favicon.ico'),
  defaultAvatar: storage.image('public/images/avatars/default.svg')
};
