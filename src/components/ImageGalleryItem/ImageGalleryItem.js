import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ imageUrl, alt, onImageClick }) => (
  <li className={styles.ImageGalleryItem}>
    <img
      className={styles.ImageGalleryItemImage}
      src={imageUrl}
      alt={alt}
      onClick={onImageClick}
    />
  </li>
);

ImageGalleryItem.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem ;
