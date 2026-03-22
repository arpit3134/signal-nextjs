export default function CommentItem({ comment }) {
  return (
    <div className="cmt-it">
      <div className="ca" style={{ background: comment.bg }}>
        {comment.n.charAt(0)}
      </div>
      <div>
        <span className="cb-n">{comment.n}</span>
        <span className="cb-ti">{comment.t}</span>
        <div className="cb-tx">{comment.tx}</div>
        <div className="cb-ac">
          <button className="cb-a">♡ {Math.floor(Math.random() * 15) + 1}</button>
          <button className="cb-a">↩ Reply</button>
        </div>
      </div>
    </div>
  );
}
