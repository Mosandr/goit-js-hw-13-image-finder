import searchFormTemplate from '../templates/searchFormTemplate.hbs';
import imagesGalleryTemplate from '../templates/imagesGalleryTemplate.hbs';
import loadMoreBtnTemplate from '../templates/loadMoreBtnTemplate.hbs';

const refs = {
  bodyRef: document.querySelector('BODY'),
};

refs.bodyRef.insertAdjacentHTML('afterbegin', searchFormTemplate());
refs.bodyRef.insertAdjacentHTML('beforeend', imagesGalleryTemplate());
refs.bodyRef.insertAdjacentHTML('beforeend', loadMoreBtnTemplate());
refs.searchForm = document.querySelector('.search-form');
refs.gallery = document.querySelector('.gallery');
refs.loadMoreBtn = document.querySelector('.load-more-btn');

export default refs;
