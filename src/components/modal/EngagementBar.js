export default function EngagementBar({ onShare }) {
  return (
    <div className="eng-bar">
      <button className="e-btn">❤️ <span>48</span></button>
      <div className="e-sep"></div>
      <button className="e-btn">📌 <span>Save</span></button>
      <div className="e-sep"></div>
      <button className="e-btn" onClick={onShare}>🔗 <span>Share</span></button>
    </div>
  );
}
