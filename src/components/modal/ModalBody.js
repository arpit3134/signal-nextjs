import ModalBan from './ModalBan';
import ModalContent from './ModalContent';

export default function ModalBody({ article }) {
  return (
    <div className="m-sc">
      <ModalBan article={article} />
      <ModalContent article={article} />
    </div>
  );
}
