import React, { useEffect, useCallback } from 'react';
import styles from './Modal.module.css';

const Modal = ({ largeImageURL, altText, onClose }) => {
  const handleEscapeKey = useCallback(
    (event) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    },
    []
  );

  const handleClose = useCallback(() => {
    document.removeEventListener('keydown', handleEscapeKey);
    onClose();
  }, [handleEscapeKey, onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      handleClose();
    };
  }, [handleClose, handleEscapeKey]);

  return (
    <div className={styles.Overlay} onClick={handleClose}>
      <div className={styles.Modal}>
        <img src={largeImageURL} alt={altText} />
      </div>
    </div>
  );
};

export default Modal;
