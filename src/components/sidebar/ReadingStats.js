import StatsProgress from './StatsProgress';
import StatsGoal from './StatsGoal';

export default function ReadingStats({ readCount }) {
  if (readCount === 0) {
    return (
      <div className="sw">
        <div className="sw-h"><span className="sw-t">Your Reading</span></div>
        <div className="sw-b">
          <div style={{ fontSize: '.78rem', color: 'var(--ink2)' }}>Start reading to track progress.</div>
        </div>
      </div>
    );
  }
  return (
    <div className="sw">
      <div className="sw-h"><span className="sw-t">Your Reading</span></div>
      <div className="sw-b">
        <div style={{ marginBottom: '.5rem' }}>📚 <strong>{readCount}</strong> article{readCount > 1 ? 's' : ''} read today</div>
        <StatsProgress readCount={readCount} />
        <StatsGoal readCount={readCount} />
      </div>
    </div>
  );
}
