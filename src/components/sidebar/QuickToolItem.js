export default function QuickToolItem({ tool }) {
  return (
    <div className="qt">
      <div className="qt-ic" style={{ background: tool.bg }}>{tool.icon}</div>
      <div className="qt-n">{tool.name}</div>
      <div className="qt-d">{tool.desc}</div>
    </div>
  );
}
