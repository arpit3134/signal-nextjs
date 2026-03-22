import { useState } from 'react';
import EngagementBar from './EngagementBar';
import SharePanel from './SharePanel';
import CommentSection from '@/components/comments/CommentSection';

export default function ModalActions() {
  const [showShare, setShowShare] = useState(false);
  return (
    <>
      <EngagementBar onShare={() => setShowShare(!showShare)} />
      {showShare && <SharePanel onClose={() => setShowShare(false)} />}
      <CommentSection />
    </>
  );
}
