import TrendingList from './TrendingList';
import QuickTools from './QuickTools';
import BrowseTopics from './BrowseTopics';
import ReadingStats from './ReadingStats';

export default function Sidebar({ trending, tools, categories, readCount, onCategorySelect }) {
  return (
    <aside style={{ width: '320px', flexShrink: 0 }}>
      <TrendingList trending={trending} />
      <QuickTools tools={tools} />
      <BrowseTopics categories={categories} onSelect={onCategorySelect} />
      <ReadingStats readCount={readCount} />
    </aside>
  );
}
