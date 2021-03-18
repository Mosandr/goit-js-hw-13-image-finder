import * as basicLightbox from 'basiclightbox';

export default function createAndShowModal({ src, width, alt }) {
  const modal = basicLightbox.create(
    `<img src="${src}" width="${width}" height="" alt="${alt}">`,
  );
  modal.show();
}

//переписать на класс, добавить в опции стрелки прокуртки, добавить геттеры ссылок для кнопки, чтобы вешать ивент
