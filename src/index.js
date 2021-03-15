import './styles.css';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import ApiService from './js/apiService';
import searchFormTemplate from './templates/searchFormTemplate.hbs';
import imagesGalleryTemplate from './templates/imagesGalleryTemplate.hbs';
import imageCardTemplate from './templates/imageCardTemplate.hbs';
import loadMoreBtnTemplate from './templates/loadMoreBtnTemplate.hbs';
const debounce = require('lodash.debounce');

const apiService = new ApiService();

const refs = {
  bodyRef: document.querySelector('BODY'),
};

refs.bodyRef.insertAdjacentHTML('afterbegin', searchFormTemplate());
refs.bodyRef.insertAdjacentHTML('beforeend', imagesGalleryTemplate());
refs.bodyRef.insertAdjacentHTML('beforeend', loadMoreBtnTemplate());
refs.searchForm = document.querySelector('.search-form');
refs.gallery = document.querySelector('.gallery');
refs.loadMoreBtn = document.querySelector('.load-more-btn');

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
  showLoadMorebtn();
}

function onFetchError() {
  error({
    text: 'Oops! No matches found',
    delay: 1000,
  });
}

function onLoadMore(event) {
  const y = refs.gallery.clientHeight + 30;
  apiService.fetchImages().then(onFetchSucces).catch(onFetchError);
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
  console.log('Hide');
}
