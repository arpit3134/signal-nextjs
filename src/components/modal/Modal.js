'use client';

import ModalHeader from './ModalHeader';
import ModalBody from './ModalBody';

export default function Modal({ article, isOpen, onClose }) {
  if (!isOpen || !article) return null;
  
  return (
    <div className="modal-ov open" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <ModalHeader article={article} onClose={onClose} />
        <ModalBody article={article} />
      </div>
    </div>
  );
}
