import QuickToolItem from './QuickToolItem';

const tools = [
  { icon: '🤖', name: 'AI Tools', desc: 'Prompts, images', bg: '#fde8e8' },
  { icon: '📊', name: 'Finance', desc: 'Stocks, budgets', bg: '#e8f2fd' },
  { icon: '💚', name: 'Health', desc: 'BMI, calories', bg: '#e8fde8' },
  { icon: '🌾', name: 'Farming', desc: 'Crops, weather', bg: '#edfde8' }
];

export default function QuickTools() {
  return (
    <div className="sw">
      <div className="sw-h"><span className="sw-t">Quick Tools</span></div>
      <div className="sw-b">
        <div className="qt-g">
          {tools.map((t, i) => (
            <QuickToolItem key={i} tool={t} />
          ))}
        </div>
      </div>
    </div>
  );
}
