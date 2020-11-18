'use strict';

let cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
let mapFilterContainer = document.querySelector(`.map__filters-container`);
const APARTMENT_TYPE_MAP = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalow: `Бунгало `
};

const renderCard = function (card) {
  let cardClone = cardTemplate.cloneNode(true);
  let title = cardClone.querySelector(`.popup__title`);
  let address = cardClone.querySelector(`.popup__text--address`);
  let price = cardClone.querySelector(`.popup__text--price`);
  let apartment = cardClone.querySelector(`.popup__type`);
  let capacity = cardClone.querySelector(`.popup__text--capacity`);
  let time = cardClone.querySelector(`.popup__text--time`);
  let features = cardClone.querySelector(`.popup__features`);
  let feature = features.querySelectorAll(`.popup__feature`);
  let description = cardClone.querySelector(`.popup__description`);
  let photos = cardClone.querySelector(`.popup__photos`);
  let photo = photos.querySelector(`.popup__photo`);
  let avatar = cardClone.querySelector(`.popup__avatar`);
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
  return cardClone;
};

window.card = {
  generateTemplate(advert) {
    let fragment = document.createDocumentFragment();
    fragment.appendChild(renderCard(advert));
    mapFilterContainer.before(fragment);
  }
};
