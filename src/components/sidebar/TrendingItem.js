export default function TrendingItem({ index, text }) {
  return (
    <div className="tr-item">
      <span className="tr-num">0{index+1}</span>
      <span className="tr-txt">{text}</span>
    </div>
  );
}
