import PropTypes from 'prop-types';
import styles from './Button.module.css';

const Button = ({ onClick, hasMore }) => (
  <div className={styles.ButtonBox}>
    <button className={styles.Button} onClick={onClick} hasMore={hasMore}>
      Load more
    </button>
  </div>
);

Button.prototype = {
  onClick: PropTypes.func.isRequired,
  hasMore: PropTypes.bool,
};

export default Button;
