export default function ModalContent({ article }) {
  return (
    <div className="m-art">
      {article.body.split('\n\n').map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}
