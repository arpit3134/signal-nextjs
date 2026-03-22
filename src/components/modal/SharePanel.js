export default function SharePanel({ onClose }) {
  return (
    <div className="sh-pan open">
      <div className="sp-t">Share this article</div>
      <div className="sp-bs">
        <button className="sp-b tw">🐦 X</button>
        <button className="sp-b li">💼 LinkedIn</button>
        <button className="sp-b wa">📱 WhatsApp</button>
        <button className="sp-b cp">🔗 Copy</button>
      </div>
    </div>
  );
}
