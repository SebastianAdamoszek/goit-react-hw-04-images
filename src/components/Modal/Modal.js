import { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

const Modal = ({ showModal, onModalClose, imageUrl }) => {
  const handleModalClose = event => {
    if (event.target === event.currentTarget) {
      onModalClose();
    }
  };

  useEffect(() => {
    const handleKeyUp = event => {
      if (event.key === 'Escape' && showModal) {
        onModalClose();
      }
    };
    const keyListener = window.addEventListener('keydown', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', keyListener);
    };
  }, [showModal, onModalClose]);

  return (
    <div className={styles.Overlay} onClick={handleModalClose}>
      <div className={styles.Modal}>
        <img className={styles.ModalImage} src={imageUrl} alt="Large" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  onModalClose: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
};

export default Modal;
