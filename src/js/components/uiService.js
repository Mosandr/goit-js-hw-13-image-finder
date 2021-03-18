import searchFormTemplate from '../../templates/searchFormTemplate.hbs';
import imagesGalleryTemplate from '../../templates/imagesGalleryTemplate.hbs';
import loadMoreBtnTemplate from '../../templates/loadMoreBtnTemplate.hbs';
import imageCardTemplate from '../../templates/imageCardTemplate.hbs';
import LoadBtn from './loadBtn';
import createAndShowModal from '../components/image-modal';

export default class UiService {
  constructor() {
    this.refs = this.getRefs();
    this.loadMoreBtn = this.getLoadMoreButton();
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

    refs.bodyRef.insertAdjacentHTML('beforeend', loadMoreBtnTemplate());
    refs.loadMoreBtn = document.querySelector('[data-action="load-more-btn"]');

    return refs;
  }

  getLoadMoreButton() {
    const loadMoreBtn = new LoadBtn(
      '[data-action="load-more-btn"]',
      true,
      'Load More',
    );
    loadMoreBtn.enable();
    return loadMoreBtn;
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
