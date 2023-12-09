import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Searchbar.module.css';

const Searchbar = ({ onSubmit, setPage }) => {
  const [searchInputTerm, setSearchInputTerm] = useState('');

  useEffect(() => {
    setPage(1);
  }, [searchInputTerm, setPage]);

  const handleInputChange = event => {
    setSearchInputTerm(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    onSubmit(searchInputTerm);
  };

  return (
    <header className={styles.Searchbar}>
      <form className={styles.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={styles.SearchFormButton}>
          <span className={styles.SearchFormButtonLabel}></span>
        </button>
        <input
          className={styles.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          id="searchInput"
          name="searchInput"
          value={searchInputTerm}
          onChange={handleInputChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
