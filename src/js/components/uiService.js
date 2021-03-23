import searchFormTemplate from '../../templates/searchFormTemplate.hbs';
import imagesGalleryTemplate from '../../templates/imagesGalleryTemplate.hbs';

import imageCardTemplate from '../../templates/imageCardTemplate.hbs';
import LoadBtn from './loadBtn';
import createAndShowModal from '../components/image-modal';

export default class UiService {
  constructor() {
    this.refs = this.getRefs();

    this.searchBtn = this.getSearchButton();
    this.addOnImageClickListener();
  }

  getRefs() {
    const refs = {
      bodyRef: document.querySelector('BODY'),
    };

    refs.bodyRef.insertAdjacentHTML('afterbegin', searchFormTemplate());
    refs.searchForm = document.querySelector('.search-form');
    refs.searchBtn = document.querySelector('[data-action="search-btn"]');

    refs.bodyRef.insertAdjacentHTML('beforeend', imagesGalleryTemplate());
    refs.gallery = document.querySelector('.gallery');

    const targetMarkup = '<div data-set="targetForIO"></div>';

    refs.bodyRef.insertAdjacentHTML('beforeend', targetMarkup);
    refs.onLoadTarget = document.querySelector('[data-set="targetForIO"]');

    return refs;
  }

  getSearchButton() {
    const searchBtn = new LoadBtn(
      '[data-action="search-btn"]',
      false,
      'Search',
      'Searching...',
    );
    searchBtn.enable();
    return searchBtn;
  }

  appendImagesCards(data) {
    const markup = data.reduce(
      (acc, item) =>
        acc + '<li class="gallery__item">' + imageCardTemplate(item) + '</li>',
      '',
    );
    this.refs.gallery.insertAdjacentHTML('beforeend', markup);
  }

  resetGallery() {
    this.refs.gallery.innerHTML = '';
  }

  addOnImageClickListener() {
    this.refs.gallery.addEventListener('click', onImageClickHandler);
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
  }
}
