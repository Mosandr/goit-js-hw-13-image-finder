import './styles.css';
import './css/modal.scss';

import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

import ApiService from './js/components/apiService';
import UiService from './js/components/uiService';

const api = new ApiService();
const ui = new UiService();

ui.refs.searchForm.addEventListener('submit', onSearch);
setIntersectionObserver();

function onSearch(event) {
  event.preventDefault();
  ui.resetGallery();
  ui.searchBtn.disable();
  api.resetPage();
  api.searchQuery = event.currentTarget.elements.query.value;
  loadImages();
}

function onFetchSucces(data) {
  ui.searchBtn.enable();
  console.log('Fetch');

  if (data.length === 0) {
    onFetchError();
    return;
  }

  ui.appendImagesCards(data);
}

function onFetchError() {
  ui.searchBtn.enable();
  error({
    text: 'Oops! No matches found!',
    delay: 1000,
  });
}

function loadImages() {
  api.fetchImages().then(onFetchSucces).catch(onFetchError);
}

function setIntersectionObserver() {
  const options = { rootMargin: '200px' };

  const callback = entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && api.searchQuery !== '') {
        loadImages();
      }
    });
  };
  const io = new IntersectionObserver(callback, options);
  io.observe(ui.refs.onLoadTarget);
}
