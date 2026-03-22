export default function ModalHeader({ article, onClose }) {
  return (
    <div className="m-nav">
      <div>
        <span className="m-nlo">Signal</span>
        <span className="m-ns">›</span>
        <span className="m-nc">{article.lbl}</span>
      </div>
      <button className="m-cls" onClick={onClose}>✕</button>
    </div>
  );
}
