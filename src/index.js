import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import PaginationButtons from './PaginationButtons';
import { getListItem } from './getListItem';
import { fetchPictures } from './api';

import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
};

let value = '';
let currentPage = 1;
let totalPages = 0;
let items = [];

const lightBox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionType: 'attr',
  captionPosition: 'bottom',
  captionDelay: 250,
  captionsData: 'alt',
  docClose: true,
});

const getPictures = async () => {
  try {
    const { data } = await fetchPictures(value, currentPage);

    items = [...items, ...data.hits];

    if (data.totalHits === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    totalPages = Math.ceil(data.totalHits / 40);
  } catch (error) {
    Notify.failure(error);
  }

  paginationButtons.setTotalPages(totalPages);
  paginationButtons.render();

  if (currentPage >= totalPages) {
    Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
    return;
  }
};

const renderList = () => {
  const list = items.map(getListItem).join('');

  refs.gallery.innerHTML = '';
  refs.gallery.insertAdjacentHTML('beforeend', list);
  lightBox.refresh();
};

const onSearchItems = async e => {
  e.preventDefault();
  value = e.currentTarget.elements.searchQuery.value.trim();

  if (!value) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }

  currentPage = 1;

  await getPictures();
  renderList();
};

const onPageChange = async page => {
  currentPage = page;

  await getPictures();
  renderList();
};

// --- initialize pagination ---
const paginationButtons = new PaginationButtons({
  selector: '.pages',
  onChange: onPageChange,
});

// --- event listeners ---
refs.form.addEventListener('submit', onSearchItems);
