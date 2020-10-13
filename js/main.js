'use strict';

const adverts = [];
const APARTMENT_TYPE = [`Palace`, `Flat`, `House`, `Bungalow`];
const APARTMENT_PRICE = [`0`, `1000`, `5000`, `10000`];
const APARTMENT_TYPE_MAP = {
  Palace: `Дворец`,
  Flat: `Квартира`,
  House: `Дом`,
  Bungalow: `Бунгало `
};
const ROOM_SIZE_MAP = {
  OneBedroom: `1`,
  TwoBedroom: `2`,
  ThreeBedroom: `3`
};
const MAX_ROOM = 4;
const CHECK_TIME = [`12:00`, `13:00`, `14:00`];
const FEATURES_TYPE = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTO_LINKS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

const MAP = document.querySelector(`.map`);
const MAP_PINS = MAP.querySelector(`.map__pins`);
const PIN_TEMPLATE = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const CARD_TEMPLATE = document.querySelector(`#card`).content.querySelector(`.map__card`);
const MAP_FILTER_CONTAINER = MAP.querySelector(`.map__filters-container`);
const MAP_FILTERS = MAP_FILTER_CONTAINER.querySelector(`.map__filters`);
const AD_FORM = document.querySelector(`.ad-form`);
const MAIN_MAP_PIN = MAP.querySelector(`.map__pin--main`);
const FORM_ADDRESS = AD_FORM.querySelector(`#address`);
const FORM_CAPACITY_OPTIONS = AD_FORM.querySelectorAll(`#capacity option`);
const FORM_CAPACITY = AD_FORM.querySelector(`#capacity`);
const FORM_APARTMENT_TYPE = AD_FORM.querySelector(`#type`);
const FORM_APARTMENT_PRICE = AD_FORM.querySelector(`#price`);
const FORM_ROOM_NUMBERS = AD_FORM.querySelector(`#room_number`);
const FORM_APARTMENT_ADDRESS = AD_FORM.querySelector(`#address`);
const FORM_APARTMENT_TIMEIN = AD_FORM.querySelector(`#timein`);
const FORM_APARTMENT_TIMEOUT = AD_FORM.querySelector(`#timeout`);
const BUTTON_ENTER = `Enter`;
const BUTTON_ESC = `Escape`;

FORM_ADDRESS.value = `${Math.floor(parseInt(MAIN_MAP_PIN.style.left, 10) + MAIN_MAP_PIN.clientWidth / 2)};${Math.floor(parseInt(MAIN_MAP_PIN.style.top, 10) + MAIN_MAP_PIN.clientHeight / 2)}`;

const closePopup = function () {
  const popup = MAP.querySelector(`.popup`);
  MAP.removeChild(popup);
  document.removeEventListener(`keydown`, onPopupEscPress);
};

const openPopup = function (advert) {
  const popup = MAP.querySelector(`.popup`);
  if (popup) {
    MAP.removeChild(popup);
  }
  generateCardTemplate(advert);
  document.addEventListener(`keydown`, onPopupEscPress);
  const closeBtn = MAP.querySelector(`.popup__close`);
  closeBtn.addEventListener(`click`, closePopup);

};

const onPopupEscPress = function (evt) {
  if (evt.key === BUTTON_ESC) {
    evt.preventDefault();
    closePopup();
  }
};

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
      "rooms": getRandomFromRange(1, MAX_ROOM),
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

const setDisabled = function (element) {
  for (let el of element) {
    el.setAttribute(`disabled`, `disabled`);
  }
};

const removeDisabled = function (element) {
  for (let el of element) {
    el.removeAttribute(`disabled`);
  }
};

setDisabled(AD_FORM.children);
setDisabled(MAP_FILTERS.children);

const mapPinActive = function () {
  MAP.classList.remove(`map--faded`);
  AD_FORM.classList.remove(`ad-form--disabled`);
  FORM_ADDRESS.value = `${Math.floor(parseInt(MAIN_MAP_PIN.style.left, 10) + MAIN_MAP_PIN.clientWidth / 2)};${Math.floor(parseInt(MAIN_MAP_PIN.style.top, 10) + MAIN_MAP_PIN.clientHeight - 156)}`;
  onCapacityChange(FORM_ROOM_NUMBERS.value);
  onApartmentChange(FORM_APARTMENT_TYPE.value);
  removeDisabled(AD_FORM.children);
  removeDisabled(MAP_FILTERS.children);
  FORM_APARTMENT_ADDRESS.setAttribute(`disabled`, `disabled`);
};

MAIN_MAP_PIN.addEventListener(`mousedown`, function (evt) {
  if (evt.button === 0) {
    mapPinActive();
    generatePinTemplate();
  }
});

MAIN_MAP_PIN.addEventListener(`keydown`, function (evt) {
  if (evt.key === BUTTON_ENTER) {
    mapPinActive();
    generatePinTemplate();
  }
});


const onCapacityChange = function (value) {
  for (let i = FORM_CAPACITY.length - 1; i >= 0; i--) {
    FORM_CAPACITY.removeChild(FORM_CAPACITY[i]);
  }
  switch (value) {
    case ROOM_SIZE_MAP.OneBedroom:
      FORM_CAPACITY.appendChild(FORM_CAPACITY_OPTIONS[2]);
      break;
    case ROOM_SIZE_MAP.TwoBedroom:
      FORM_CAPACITY.appendChild(FORM_CAPACITY_OPTIONS[1]);
      FORM_CAPACITY.appendChild(FORM_CAPACITY_OPTIONS[2]);
      break;
    case ROOM_SIZE_MAP.ThreeBedroom:
      FORM_CAPACITY.appendChild(FORM_CAPACITY_OPTIONS[0]);
      FORM_CAPACITY.appendChild(FORM_CAPACITY_OPTIONS[1]);
      FORM_CAPACITY.appendChild(FORM_CAPACITY_OPTIONS[2]);
      break;
    default:
      FORM_CAPACITY.appendChild(FORM_CAPACITY_OPTIONS[3]);
  }
};

FORM_ROOM_NUMBERS.addEventListener(`change`, function (evt) {
  onCapacityChange(evt.target.value);
});

const onApartmentChange = function (value) {
  switch (value) {
    case APARTMENT_TYPE[0].toLowerCase():
      FORM_APARTMENT_PRICE.setAttribute(`min`, APARTMENT_PRICE[3]);
      FORM_APARTMENT_PRICE.setAttribute(`placeholder`, APARTMENT_PRICE[3]);
      break;
    case APARTMENT_TYPE[1].toLowerCase():
      FORM_APARTMENT_PRICE.setAttribute(`min`, APARTMENT_PRICE[1]);
      FORM_APARTMENT_PRICE.setAttribute(`placeholder`, APARTMENT_PRICE[1]);
      break;
    case APARTMENT_TYPE[2].toLowerCase():
      FORM_APARTMENT_PRICE.setAttribute(`min`, APARTMENT_PRICE[2]);
      FORM_APARTMENT_PRICE.setAttribute(`placeholder`, APARTMENT_PRICE[2]);
      break;
    default:
      FORM_APARTMENT_PRICE.setAttribute(`min`, APARTMENT_PRICE[0]);
      FORM_APARTMENT_PRICE.setAttribute(`placeholder`, APARTMENT_PRICE[0]);
  }
};

FORM_APARTMENT_TYPE.addEventListener(`change`, function (evt) {
  onApartmentChange(evt.target.value);
});

FORM_APARTMENT_TIMEIN.addEventListener(`change`, function (evt) {
  for (let element of FORM_APARTMENT_TIMEOUT.children) {
    if (evt.target.value === element.value) {
      FORM_APARTMENT_TIMEOUT.value = element.value;
    }
  }
});
FORM_APARTMENT_TIMEOUT.addEventListener(`change`, function (evt) {
  for (let element of FORM_APARTMENT_TIMEIN.children) {
    if (evt.target.value === element.value) {
      FORM_APARTMENT_TIMEIN.value = element.value;
    }
  }
});
const renderPin = function (advert) {
  const PIN = PIN_TEMPLATE.cloneNode(true);
  const PIN_IMAGE = PIN.querySelector(`img`);
  PIN_IMAGE.src = advert.author.avatar;
  PIN_IMAGE.alt = advert.offer.description;
  PIN.style.left = `${advert.location.x + PIN_IMAGE.width / 2}px`;
  PIN.style.top = `${advert.location.y + PIN_IMAGE.height}px`;
  PIN.addEventListener(`click`, function () {
    openPopup(advert);
  });
  PIN.addEventListener(`keydown`, function (evt) {
    if (evt.key === BUTTON_ENTER) {
      evt.preventDefault();
      openPopup(advert);
    }
  });
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

const generatePinTemplate = function () {
  const FRAGMENT = document.createDocumentFragment();
  adverts.forEach((element) => FRAGMENT.appendChild(renderPin(element)));
  MAP_PINS.appendChild(FRAGMENT);
};

const generateCardTemplate = function (advert) {
  const FRAGMENT = document.createDocumentFragment();
  FRAGMENT.appendChild(renderCard(advert));
  MAP_FILTER_CONTAINER.before(FRAGMENT);
};

