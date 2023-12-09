import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '39753662-13b05df2e1b75c8b2e28e56d6';
const perPage = 12;

const imageGallery = async (searchInputTerm, page) => {
  const url = `?q=${searchInputTerm}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`;
  try {
    const response = await axios.get(url);

    return new Promise(resolve => {
      setTimeout(() => {
        resolve(response.data);
      }, 2000);
    });
  } catch (error) {
    console.log('loading error:', error);
  }
};

export default imageGallery;
