import { useState } from 'react';
import fetchImageGallery from '../Api/ImagesApi';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import Notiflix from 'notiflix';


const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalImages, setTotalImages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const handleSearch = async searchTerm => {
    setIsLoading(true);
    setImages([]);
    setPage(1);

    if (searchTerm.trim() === '') {
      setIsLoading(false);
      Notiflix.info('Enter a name in the search box');
      return;
    }
    try {
      const data = await fetchImageGallery(searchTerm, page);

      if (data.hits) {
        setImages(data.hits);
        setSearchTerm(searchTerm);
        setPage(1);
        setTotalImages(data.totalHits);

        if (data.totalHits === 0) {
          setImages([]);
          Notiflix.failure(
            `Sorry, There are no images with the name "${searchTerm.toUpperCase()}. Change search!" `
          );
        } else if (data.totalHits <= 12) {
          Notiflix.success(
            `We have found ${
              data.totalHits
            } images for "${searchTerm.toUpperCase()}" `
          );
        } else {
          Notiflix.success(
            `We have found ${
              data.totalHits
            } images for "${searchTerm.toUpperCase()}". You can LOAD MORE!`
          );
        }
      }
    } catch (error) {
      Notiflix.failure('Oops! Something went wrong while fetching images.');
      console.log('Error fetching images:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreImages = async () => {
    setIsLoading(true);
    try {
      const nextPage = page + 1;
      const data = await fetchImageGallery(searchTerm, nextPage);

      if (data.hits) {
        setImages(prevImages => [...prevImages, ...data.hits]);
        setPage(nextPage);
      }
    } catch (error) {
      Notiflix.failure('Oops! Something went wrong while fetching images.');
      console.log('Error fetching more images:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageClick = imageUrl => {
    setShowModal(true);
    setSelectedImage(imageUrl);
  };
  const handleModalClose = () => {
    setShowModal(false);
    setSelectedImage('');
  };

  const hasMoreImages = images.length < totalImages;

  const largedSearchTerm = searchTerm.toUpperCase();

  return (
    <div className="App">
      <Searchbar onSubmit={handleSearch} setPage={setPage} />
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {isLoading && <Loader />}

      {hasMoreImages && (
        <>
         
          <Button onClick={loadMoreImages} disabled={false} />
          <p className="message">{`Downloaded ${images.length} "${largedSearchTerm}" images from ${totalImages} available.`}</p>
        </>
      )}
     
      {showModal && (
        <Modal
          imageUrl={selectedImage}
          onModalClose={handleModalClose}
          showModal={showModal}
        />
      )}
    </div>
  );
};

export default App;
