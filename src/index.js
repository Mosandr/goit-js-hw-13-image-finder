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
ui.refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(event) {
  event.preventDefault();
  ui.resetGallery();
  ui.searchBtn.disable();
  api.resetPage();
  api.searchQuery = event.currentTarget.elements.query.value;
  api.fetchImages().then(onFetchSucces).catch(onFetchError);
}

function onFetchSucces(data) {
  ui.searchBtn.enable();
  if (data.length === 0) {
    onFetchError();
    return;
  }

  ui.appendImagesCards(data);
  ui.loadMoreBtn.show();
}

function onFetchError() {
  ui.searchBtn.enable();
  ui.loadMoreBtn.hide();
  error({
    text: 'Oops! No matches found',
    delay: 1000,
  });
}

async function onLoadMore(event) {
  ui.loadMoreBtn.disable();
  const y = ui.refs.gallery.clientHeight + 30;
  await api.fetchImages().then(onFetchSucces).catch(onFetchError);
  setTimeout(() => {
    window.scrollTo({
      top: y,
      left: 100,
      behavior: 'smooth',
    });
  }, 20);
  ui.loadMoreBtn.enable();
}
