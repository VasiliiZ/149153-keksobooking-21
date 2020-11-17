'use strict';

let cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
const MAP_FILTER_CONTAINER = document.querySelector(`.map__filters-container`);
const APARTMENT_TYPE_MAP = {
  Palace: `Дворец`,
  Flat: `Квартира`,
  House: `Дом`,
  Bungalow: `Бунгало `
};

const renderCard = function (card) {
  const CARD = cardTemplate.cloneNode(true);
  let title = CARD.querySelector(`.popup__title`);
  let address = CARD.querySelector(`.popup__text--address`);
  let price = CARD.querySelector(`.popup__text--price`);
  let apartment = CARD.querySelector(`.popup__type`);
  let capacity = CARD.querySelector(`.popup__text--capacity`);
  let time = CARD.querySelector(`.popup__text--time`);
  let features = CARD.querySelector(`.popup__features`);
  let feature = features.querySelectorAll(`.popup__feature`);
  let description = CARD.querySelector(`.popup__description`);
  let photos = CARD.querySelector(`.popup__photos`);
  let photo = photos.querySelector(`.popup__photo`);
  let avatar = CARD.querySelector(`.popup__avatar`);
  title.textContent = card.offer.title;
  address.textContent = card.offer.address;
  price.textContent = `${card.offer.price}₽/ночь`;
  apartment.textContent = APARTMENT_TYPE_MAP[card.offer.type];
  capacity.textContent = `${card.offer.rooms} комнаты для ${card.offer.guests} гостей`;
  time.textContent = `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}`;
  description.textContent = card.offer.description;
  avatar.src = card.author.avatar;

  feature.forEach((element) => {
    features.removeChild(element);
  });

  card.offer.features.forEach((element) => {
    let featureElem = document.createElement(`li`);
    featureElem.classList.add(`popup__feature`);
    featureElem.classList.add(`popup__feature--${element}`);
    features.appendChild(featureElem);
  });

  photos.removeChild(photo);

  card.offer.photos.forEach((element) => {
    let photoElem = photo;
    photoElem.src = element;
    photos.appendChild(photoElem);
  });
  return CARD;
};

window.card = {
  generateTemplate(advert) {
    const FRAGMENT = document.createDocumentFragment();
    FRAGMENT.appendChild(renderCard(advert));
    MAP_FILTER_CONTAINER.before(FRAGMENT);
  }
};
