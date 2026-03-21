import ArticleCard from './ArticleCard';

export default function ArticleList({ articles, onOpenArticle, likedArticles, bookmarks, onLike, onBookmark }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
      {articles.map(article => (
        <ArticleCard
          key={article.id}
          article={article}
          onClick={onOpenArticle}
          isLiked={likedArticles[article.id]}
          isBookmarked={bookmarks.includes(article.id)}
          onLike={onLike}
          onBookmark={onBookmark}
        />
      ))}
    </div>
  );
}
