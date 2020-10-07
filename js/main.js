'use strict';

const adverts = [];
const APARTMENT_TYPE = [`palace`, `flat`, `house`, `bungalow`];
const APARTMENT_TYPE_MAP = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalow: `Бунгало `
};
const MAX_ROOM = 4;
const CHECK_TIME = [`12:00`, `13:00`, `14:00`];
const FEATURES_TYPE = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTO_LINKS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

const MAP = document.querySelector(`.map`);
MAP.classList.remove(`map--faded`);

const MAP_PINS = MAP.querySelector(`.map__pins`);
const PIN_TEMPLATE = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const CARD_TEMPLATE = document.querySelector(`#card`).content.querySelector(`.map__card`);
const MAP_FILTER_CONTAINER = MAP.querySelector(`.map__filters-container`);

const getRandomFromRange = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

const getRandomNumber = function (array) {
  return Math.floor(Math.random() * array.length);
};

const getRandomIndex = function (arr) {
  let randomNumber = getRandomNumber(arr);
  return arr[randomNumber];
};

const getRandomLengthArr = function (arr) {
  let randomNumber = getRandomNumber(arr);
  let randomArray = [];
  for (let i = 0; i < randomNumber; i++) {
    randomArray.push(arr[i]);
  }
  return randomArray;
};

for (let i = 0; i < 8; i++) {
  let xLocation = getRandomFromRange(0, MAP_PINS.clientWidth);
  let yLocation = getRandomFromRange(130, 630);
  let advertTemplate = {
    "author": {
      "avatar": `img/avatars/user0${i + 1}.png`
    },
    "offer": {
      "title": `Заголовок предложения`,
      "address": `${xLocation},${yLocation}`,
      "price": Math.floor(Math.random() * 10000),
      "type": getRandomIndex(APARTMENT_TYPE),
      "rooms": Math.floor(Math.random() * MAX_ROOM), /** Обработку на 0 надо? */
      "guests": Math.floor(Math.random() * 10),
      "checkin": getRandomIndex(CHECK_TIME),
      "checkout": getRandomIndex(CHECK_TIME),
      "features": getRandomLengthArr(FEATURES_TYPE),
      "description": `Описание`,
      "photos": getRandomLengthArr(PHOTO_LINKS)
    },
    "location": {
      "x": xLocation,
      "y": yLocation
    }
  };
  adverts.push(advertTemplate);
}

const renderPin = function (advert) {
  const PIN = PIN_TEMPLATE.cloneNode(true);
  const PIN_IMAGE = PIN.querySelector(`img`);
  PIN_IMAGE.src = advert.author.avatar;
  PIN_IMAGE.alt = advert.offer.description;
  PIN.style.left = `${advert.location.x + PIN_IMAGE.width / 2}px`;
  PIN.style.top = `${advert.location.y + PIN_IMAGE.height}px`;
  return PIN;
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

  for (let i = 0; i < FEATURE.length; i++) {
    FEATURES.removeChild(FEATURE[i]);
  }

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

const generatePinTemplate = function () {
  const FRAGMENT = document.createDocumentFragment();
  adverts.forEach((element) => FRAGMENT.appendChild(renderPin(element)));
  MAP_PINS.appendChild(FRAGMENT);
};

const generateCardTemplate = function () {
  const FRAGMENT = document.createDocumentFragment();
  FRAGMENT.appendChild(renderCard(adverts[0]));
  MAP_FILTER_CONTAINER.before(FRAGMENT);
};

generatePinTemplate();
generateCardTemplate();
