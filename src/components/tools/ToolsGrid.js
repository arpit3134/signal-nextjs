import ToolCard from './ToolCard';

export default function ToolsGrid({ tools }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
      {tools.map((tool, idx) => (
        <ToolCard key={idx} tool={tool} />
      ))}
    </div>
  );
}
