'use strict';

const CARD_TEMPLATE = document.querySelector(`#card`).content.querySelector(`.map__card`);
const MAP_FILTER_CONTAINER = document.querySelector(`.map__filters-container`);
const APARTMENT_TYPE_MAP = {
  Palace: `Дворец`,
  Flat: `Квартира`,
  House: `Дом`,
  Bungalow: `Бунгало `
};

const renderCard = function (card) {
  const CARD = CARD_TEMPLATE.cloneNode(true);
  const TITLE = CARD.querySelector(`.popup__title`);
  const ADDRESS = CARD.querySelector(`.popup__text--address`);
  const PRICE = CARD.querySelector(`.popup__text--price`);
  const APARTMENT = CARD.querySelector(`.popup__type`);
  const CAPACITY = CARD.querySelector(`.popup__text--capacity`);
  const TIME = CARD.querySelector(`.popup__text--time`);
  const FEATURES = CARD.querySelector(`.popup__features`);
  const FEATURE = FEATURES.querySelectorAll(`.popup__feature`);
  const DESCRIPTION = CARD.querySelector(`.popup__description`);
  const PHOTOS = CARD.querySelector(`.popup__photos`);
  const PHOTO = PHOTOS.querySelector(`.popup__photo`);
  const AVATAR = CARD.querySelector(`.popup__avatar`);
  TITLE.textContent = card.offer.title;
  ADDRESS.textContent = card.offer.address;
  PRICE.textContent = `${card.offer.price}₽/ночь`;
  APARTMENT.textContent = APARTMENT_TYPE_MAP[card.offer.type];
  CAPACITY.textContent = `${card.offer.rooms} комнаты для ${card.offer.guests} гостей`;
  TIME.textContent = `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}`;
  DESCRIPTION.textContent = card.offer.description;
  AVATAR.src = card.author.avatar;

  FEATURE.forEach((element) => {
    FEATURES.removeChild(element);
  });

  card.offer.features.forEach((element) => {
    let feature = document.createElement(`li`);
    feature.classList.add(`popup__feature`);
    feature.classList.add(`popup__feature--${element}`);
    FEATURES.appendChild(feature);
  });

  PHOTOS.removeChild(PHOTO);

  card.offer.photos.forEach((element) => {
    let photo = PHOTO;
    photo.src = element;
    PHOTOS.appendChild(photo);
  });
  return CARD;
};

window.card = {
  generateCardTemplate(advert) {
    const FRAGMENT = document.createDocumentFragment();
    FRAGMENT.appendChild(renderCard(advert));
    MAP_FILTER_CONTAINER.before(FRAGMENT);
  }
};
