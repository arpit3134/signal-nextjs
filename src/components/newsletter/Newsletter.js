import NewsletterForm from './NewsletterForm';

export default function Newsletter({ onSubscribe }) {
  return (
    <div className="nl-wrap">
      <div className="nl-box">
        <div className="nl-left">
          <h2>Stay in the loop</h2>
          <p>Weekly discoveries. No noise, just signal.</p>
        </div>
        <NewsletterForm onSubscribe={onSubscribe} />
      </div>
    </div>
  );
}
