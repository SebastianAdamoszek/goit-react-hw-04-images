import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar.js';
import ImageGallery from './ImageGallery/ImageGallery.js';
import Loader from './Loader/Loader.js';
import Button from './Button/Button.js';
import Modal from './Modal/Modal.js';

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [page, setPage] = useState(1);
  const perPage = 12;

  useEffect(() => {
    if (query.trim().length > 0) {
      fetchData();
    }
  }, [query, page,]);

  const fetchData = async () => {
    setLoading(true);

    try {
      const API_KEY = '39753662-13b05df2e1b75c8b2e28e56d6';
      const response = await fetch(
        `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
      );

      if (!response.ok) {
        throw new Error('Error fetching images');
      }

      const data = await response.json();
      const formattedImages = data.hits.map((image) => ({
        id: image.id,
        webformatURL: image.webformatURL.replace(/^http:/, 'https:'),
        largeImageURL: image.largeImageURL.replace(/^http:/, 'https:'),
        altText: image.altText,
      }));

      setImages((prevImages) => [...prevImages, ...formattedImages]);
    } catch (error) {
      console.error('Error fetching images', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (newQuery) => {
    const trimmedQuery = newQuery.trim();

    if (trimmedQuery.length > 0 && trimmedQuery !== query) {
      setQuery(trimmedQuery);
      setPage(1);
      setImages([]);
      setLoading(true);
    }
  };

  const handleLoadMore = () => {
    if (images.length > 0 && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleImageClick = (selectedImage) => {
    setSelectedImage(selectedImage);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <Searchbar onSubmit={handleSearch} />
      <ImageGallery images={images} onImageClick={handleImageClick} />
      <Loader isLoading={loading} />
      <Button onClick={handleLoadMore} hasMore={images.length > 0} />

      {selectedImage && (
        <Modal
          largeImageURL={selectedImage.largeImageURL}
          altText={selectedImage.altText}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default App;
