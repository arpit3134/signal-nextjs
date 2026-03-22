export default function ModalBan({ article }) {
  return (
    <div className="m-ban">
      <div className="m-ban-n">0{article.id + 1}</div>
      <div className="m-ban-c">
        <h2 className="m-ttl">{article.title}</h2>
        <p className="m-dsc">{article.desc}</p>
        <div className="m-mr">
          <div className="m-av">{article.author.charAt(0)}</div>
          <div>
            <div className="m-au">{article.author}</div>
            <div className="m-dt">{article.date} · Signal</div>
          </div>
          <div className="m-cps">
            <span className="m-cp">⏱️ {article.read}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
