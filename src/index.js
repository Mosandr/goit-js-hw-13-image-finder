import './styles.css';
import './css/modal.scss';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import ApiService from './js/apiService';
import imageCardTemplate from './templates/imageCardTemplate.hbs';
import refs from './js/refs';
import createAndShowModal from './js/image-modal';
const debounce = require('lodash.debounce');

const apiService = new ApiService();

refs.searchForm.addEventListener('input', debounce(onQueryInput, 500));
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onQueryInput(event) {
  event.preventDefault();
  resetGallery();
  apiService.resetPage();
  hideLoadMorebtn();
  apiService.searchQuery = event.target.value;
  apiService.fetchImages().then(onFetchSucces).catch(onFetchError);
}

function onFetchSucces(data) {
  if (data.length === 0) {
    onFetchError();
    return;
  }
  appendImagesCards(markupCardsList(data));
  addOnImageClickListener();
  showLoadMorebtn();
}

function onFetchError() {
  error({
    text: 'Oops! No matches found',
    delay: 1000,
  });
}

async function onLoadMore(event) {
  const y = refs.gallery.clientHeight + 30;
  await apiService.fetchImages().then(onFetchSucces).catch(onFetchError);
  setTimeout(() => {
    window.scrollTo({
      top: y,
      left: 100,
      behavior: 'smooth',
    });
  }, 20);
}

function appendImagesCards(listMarkup) {
  refs.gallery.insertAdjacentHTML('beforeend', listMarkup);
}

function markupCardsList(data) {
  const markup = data.reduce(
    (acc, item) =>
      acc + '<li class="gallery__item">' + imageCardTemplate(item) + '</li>',
    '',
  );
  return markup;
}

function resetGallery() {
  refs.gallery.innerHTML = '';
}

function showLoadMorebtn() {
  refs.loadMoreBtn.classList.remove('hide');
}

function hideLoadMorebtn() {
  refs.loadMoreBtn.classList.add('hide');
}

function addOnImageClickListener() {
  refs.gallery.addEventListener('click', onImageClickHandler);
}

function onImageClickHandler(event) {
  if (event.target.nodeName === 'IMG') {
    const clickedImg = event.target;
    const imageData = {
      src: clickedImg.dataset.largeimageurl,
      width: 1280,
      alt: clickedImg.alt,
    };
    createAndShowModal(imageData);
  }
}
