import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchPictures = (value, currentPage) =>
  axios.get(
    `?q=${value}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}&key=30191539-d56ffab2c88cb867d9bceaf74`
  );
