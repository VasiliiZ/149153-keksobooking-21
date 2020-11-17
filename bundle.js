/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
(() => {
/*!**********************!*\
  !*** ./js/upload.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const FILE_TYPES = [`png`, `jpeg`, `jpg`];

let avatarChooser = document.querySelector(`.ad-form__field input[type=file]`);
let avatar = document.querySelector(`.ad-form-header__preview img`);
let fotoChooser = document.querySelector(`.ad-form__upload input[type=file]`);
let foto = document.querySelector(`.ad-form__photo`);

avatarChooser.addEventListener(`change`, function () {
  let file = avatarChooser.files[0];
  let fileName = file.name.toLowerCase();

  let matches = FILE_TYPES.some(function (type) {
    return fileName.endsWith(type);
  });

  if (matches) {
    let reader = new FileReader();

    reader.addEventListener(`load`, function () {
      avatar.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});

fotoChooser.addEventListener(`change`, function () {
  let file = fotoChooser.files[0];
  let fileName = file.name.toLowerCase();

  let matches = FILE_TYPES.some(function (type) {
    return fileName.endsWith(type);
  });

  if (matches) {
    let reader = new FileReader();

    reader.addEventListener(`load`, function () {
      foto.style.backgroundImage = `url(${reader.result})`;
    });

    reader.readAsDataURL(file);
  }
});

})();

(() => {
/*!*************************!*\
  !*** ./js/constants.js ***!
  \*************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


window.constants = {
  BUTTON_ENTER: `Enter`,
  BUTTON_ESC: `Escape`,
  LEFT_MOUSE_BTN: 0,
};

})();

(() => {
/*!***********************!*\
  !*** ./js/backend.js ***!
  \***********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const TIMEOUT_INTERVAL = 1000;
const METHODS = {
  GET: `GET`,
  POST: `POST`
};
const ServerStatus = {
  OK: 200
};
const xhr = new XMLHttpRequest();
window.backend = {
  load(onLoad, onError) {
    const URL = `https://21.javascript.pages.academy/keksobooking/data`;
    xhr.responseType = `json`;
    xhr.addEventListener(`load`, function () {
      if (xhr.status === ServerStatus.OK) {
        onLoad(xhr.response);
      } else {
        onError(`Ошибка загрузки данных: ${xhr.status} ${xhr.statusText}`);
      }
    });
    xhr.addEventListener(`error`, function () {
      onError(`Ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
    });
    xhr.timeout = TIMEOUT_INTERVAL;
    xhr.open(METHODS.GET, URL);
    xhr.send();
  },
  send(data, onLoad, onError) {
    const URL = `https://21.javascript.pages.academy/keksobooking`;
    xhr.addEventListener(`load`, function () {
      if (xhr.status === ServerStatus.OK) {
        onLoad();
      } else {
        onError(`Ошибка отправки данных: ${xhr.status} ${xhr.statusText}`);
      }
    });
    xhr.addEventListener(`error`, function () {
      onError(`Ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
    });
    xhr.timeout = TIMEOUT_INTERVAL;
    xhr.open(METHODS.POST, URL);
    xhr.send(data);
  }
};

})();

(() => {
/*!********************!*\
  !*** ./js/card.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


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
  title.textContent = card.offer.title;
  address.textContent = card.offer.address;
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

})();

(() => {
/*!*********************!*\
  !*** ./js/popup.js ***!
  \*********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const MAP = document.querySelector(`.map`);
const onPopupEscPress = function (evt) {
  if (evt.key === window.constants.BUTTON_ESC) {
    evt.preventDefault();
    window.popup.closePopup();
  }
};
window.popup = {
  openPopup(advert) {
    const popup = MAP.querySelector(`.popup`);
    if (popup) {
      MAP.removeChild(popup);
    }
    window.card.generateCardTemplate(advert);
    document.addEventListener(`keydown`, onPopupEscPress);
    const closeBtn = MAP.querySelector(`.popup__close`);
    closeBtn.addEventListener(`click`, this.closePopup);

  },
  closePopup() {
    const popup = MAP.querySelector(`.popup`);
    MAP.removeChild(popup);
    document.removeEventListener(`keydown`, onPopupEscPress);
  }
};

})();

(() => {
/*!*******************!*\
  !*** ./js/pin.js ***!
  \*******************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const MAX_VISIBLE_PIN = 5;
const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;

let pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
let map = document.querySelector(`.map`);
let mapPins = map.querySelector(`.map__pins`);


const renderPin = function (advert) {

  const PIN = pinTemplate.cloneNode(true);
  let pinImage = PIN.querySelector(`img`);
  pinImage.src = advert.author.avatar;
  pinImage.alt = advert.offer.description;
  PIN.style.left = `${advert.location.x - (PIN_WIDTH / 2)}px`;
  PIN.style.top = `${advert.location.y - PIN_HEIGHT}px`;
  PIN.addEventListener(`click`, function (evt) {
    let pins = map.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    pins.forEach((pin)=>{
      if (pin.classList.contains(`map__pin--active`)) {
        pin.classList.remove(`map__pin--active`);
      }
    });
    evt.currentTarget.classList.add(`map__pin--active`);
    window.popup.openPopup(advert);
  });
  PIN.addEventListener(`keydown`, function (evt) {
    if (evt.key === window.constants.BUTTON_ENTER) {
      evt.preventDefault();
      window.popup.openPopup(advert);
    }
  });
  return PIN;
};
window.pin = {
  generateTemplate(adverts) {
    let pins = map.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    if (pins) {
      pins.forEach((item)=>mapPins.removeChild(item));
    }
    const FRAGMENT = document.createDocumentFragment();
    let tekeNumber = MAX_VISIBLE_PIN < adverts.length ? MAX_VISIBLE_PIN : adverts.length;
    for (let i = 0; i < tekeNumber; i++) {
      FRAGMENT.appendChild(renderPin(adverts[i]));
    }
    mapPins.appendChild(FRAGMENT);

  }
};

})();

(() => {
/*!************************!*\
  !*** ./js/debounce.js ***!
  \************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const INTERVAL = 500;
window.debounce = function (cb) {
  let lastTimeout = null;

  return function (...parameters) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(()=> {
      cb(...parameters);
    }, INTERVAL);
  };
};

})();

(() => {
/*!**********************!*\
  !*** ./js/filter.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */

const MAP = document.querySelector(`.map`);

const checkPopup = function () {
  const popup = MAP.querySelector(`.popup`);
  if (popup) {
    MAP.removeChild(popup);
  }
};

const priceRange = {
  low: {
    min: 0,
    max: 10000
  },
  middle: {
    min: 10000,
    max: 50000
  },
  high: {
    min: 50000,
    max: 10000000
  }
};

const DEFAULT_TYPE = `any`;

const filteredByType = function (arr, type) {
  return type !== DEFAULT_TYPE ? arr.filter((item) => item.offer.type === type) : arr;
};

const filteredByRooms = function (arr, type) {
  return type !== DEFAULT_TYPE ? arr.filter((item) => parseInt(item.offer.rooms, 10) === parseInt(type, 10)) : arr;
};

const filteredByGuests = function (arr, type) {
  return type !== DEFAULT_TYPE ? arr.filter((item) => parseInt(item.offer.guests, 10) === parseInt(type, 10)) : arr;
};

const filteredByPrice = function (arr, type) {
  return type !== DEFAULT_TYPE ? arr.filter((item) => item.offer.price >= priceRange[type].min && item.offer.price <= priceRange[type].max) : arr;
};

const findFeature = function (features) {
  let match = 0;
  let flag = false;
  features.forEach((feature)=>{
    if (comparedFeatures.indexOf(feature) !== -1) {
      match += 1;
    }
  });
  if (match === comparedFeatures.length) {
    flag = true;
  }
  return flag;
};

const filteredByFeatures = function (arr) {
  return arr.filter((item)=>findFeature(item.offer.features));
};

const FEATURES_MAP = {
  "Wi-Fi": `wifi`,
  "Посудомоечная машина": `dishwasher`,
  "Парковка": `parking`,
  "Стиральная машина": `washer`,
  "Лифт": `elevator`,
  "Кондиционер": `conditioner`
};

let comparedFeatures = [];

const getMatch = function (arr, type) {
  let match = ``;
  match = arr.includes(type);
  if (!match) {
    arr.push(type);
  } else {
    let index = comparedFeatures.indexOf(type);
    arr.splice(index, 1);
  }
};

window.filter = {
  byType(adverts, filteredState) {
    checkPopup();
    let filtered = [];
    filtered = filteredByType(adverts, filteredState.type);
    filtered = filteredByPrice(filtered, filteredState.price);
    filtered = filteredByRooms(filtered, filteredState.rooms);
    filtered = filteredByGuests(filtered, filteredState.guests);
    filtered = filteredByFeatures(filtered);
    window.pin.generateTemplate(filtered);
  },
  byFeature(feature) {
    getMatch(comparedFeatures, FEATURES_MAP[feature]);
  }
};



})();

(() => {
/*!********************!*\
  !*** ./js/form.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const APARTMENT_TYPES = [`Palace`, `Flat`, `House`, `Bungalow`];
const APARTMENT_PRICES = [`0`, `1000`, `5000`, `10000`];
const RoomSize = {
  OneBedroom: `1`,
  TwoBedroom: `2`,
  ThreeBedroom: `3`
};
const PIN_HEIGHT = 87;

let map = document.querySelector(`.map`);
let mainMapPin = map.querySelector(`.map__pin--main`);
let mapFilters = map.querySelector(`.map__filters`);
let adForm = document.querySelector(`.ad-form`);

const DEFAULT_PIN_LEFT = mainMapPin.style.left;
const DEFAULT_PIN_TOP = mainMapPin.style.top;
const FORM_CAPACITY = adForm.querySelector(`#capacity`);
const FORM_CAPACITY_OPTIONS = adForm.querySelectorAll(`#capacity option`);
let formApartmentPrice = adForm.querySelector(`#price`);
let formAdress = adForm.querySelector(`#address`);
const MAIN = document.querySelector(`main`);
const FORM_RESET_BUTTON = adForm.querySelector(`.ad-form__reset`);
let housingType = mapFilters.querySelector(`#housing-type`);
let housingPrice = mapFilters.querySelector(`#housing-price`);
let housingRooms = mapFilters.querySelector(`#housing-rooms`);
let housingGuests = mapFilters.querySelector(`#housing-guests`);
let features = document.querySelectorAll(`.map__feature`);
let featureCheckbox = document.querySelectorAll(`.map__checkbox`);
let avatar = document.querySelector(`.ad-form-header__preview img`);
let foto = document.querySelector(`.ad-form__photo`);


const clearForm = function () {
  window.utils.setDisabledPage();
  mainMapPin.style.left = DEFAULT_PIN_LEFT;
  mainMapPin.style.top = DEFAULT_PIN_TOP;
  housingType.value = `any`;
  housingPrice.value = `any`;
  housingRooms.value = `any`;
  housingGuests.value = `any`;
  featureCheckbox.forEach((feature)=>{
    feature.checked = false;
  });
  filteredState = {
    type: `any`,
    price: `any`,
    rooms: `any`,
    guests: `any`
  };
  avatar.src = `img/muffin-grey.svg`;
  foto.style.backgroundImage = ``;
  formAdress.value = `${Math.floor(parseInt(mainMapPin.style.left, 10) + mainMapPin.clientWidth / 2)}, ${Math.floor(parseInt(mainMapPin.style.top, 10) + mainMapPin.clientHeight - PIN_HEIGHT)}`;
};


FORM_RESET_BUTTON.addEventListener(`click`, clearForm);

const onCapacityChange = function (value) {
  for (let i = FORM_CAPACITY.length - 1; i >= 0; i--) {
    FORM_CAPACITY.removeChild(FORM_CAPACITY[i]);
  }
  switch (value) {
    case RoomSize.OneBedroom:
      FORM_CAPACITY.appendChild(FORM_CAPACITY_OPTIONS[2]);
      break;
    case RoomSize.TwoBedroom:
      FORM_CAPACITY.appendChild(FORM_CAPACITY_OPTIONS[1]);
      FORM_CAPACITY.appendChild(FORM_CAPACITY_OPTIONS[2]);
      break;
    case RoomSize.ThreeBedroom:
      FORM_CAPACITY.appendChild(FORM_CAPACITY_OPTIONS[0]);
      FORM_CAPACITY.appendChild(FORM_CAPACITY_OPTIONS[1]);
      FORM_CAPACITY.appendChild(FORM_CAPACITY_OPTIONS[2]);
      break;
    default:
      FORM_CAPACITY.appendChild(FORM_CAPACITY_OPTIONS[3]);
  }
};

const FORM_ROOM_NUMBERS = adForm.querySelector(`#room_number`);

FORM_ROOM_NUMBERS.addEventListener(`change`, function (evt) {
  onCapacityChange(evt.target.value);
});

const onApartmentChange = function (value) {
  switch (value) {
    case APARTMENT_TYPES[0].toLowerCase():
      formApartmentPrice.setAttribute(`min`, APARTMENT_PRICES[3]);
      formApartmentPrice.setAttribute(`placeholder`, APARTMENT_PRICES[3]);
      break;
    case APARTMENT_TYPES[1].toLowerCase():
      formApartmentPrice.setAttribute(`min`, APARTMENT_PRICES[1]);
      formApartmentPrice.setAttribute(`placeholder`, APARTMENT_PRICES[1]);
      break;
    case APARTMENT_TYPES[2].toLowerCase():
      formApartmentPrice.setAttribute(`min`, APARTMENT_PRICES[2]);
      formApartmentPrice.setAttribute(`placeholder`, APARTMENT_PRICES[2]);
      break;
    default:
      formApartmentPrice.setAttribute(`min`, APARTMENT_PRICES[0]);
      formApartmentPrice.setAttribute(`placeholder`, APARTMENT_PRICES[0]);
  }
};

const FORM_APARTMENT_TYPE = adForm.querySelector(`#type`);

FORM_APARTMENT_TYPE.addEventListener(`change`, function (evt) {
  onApartmentChange(evt.target.value);
});

const FORM_APARTMENT_TIMEIN = adForm.querySelector(`#timein`);

FORM_APARTMENT_TIMEIN.addEventListener(`change`, function (evt) {
  for (let element of FORM_APARTMENT_TIMEOUT.children) {
    if (evt.target.value === element.value) {
      FORM_APARTMENT_TIMEOUT.value = element.value;
    }
  }
});

const FORM_APARTMENT_TIMEOUT = adForm.querySelector(`#timeout`);

FORM_APARTMENT_TIMEOUT.addEventListener(`change`, function (evt) {
  for (let element of FORM_APARTMENT_TIMEIN.children) {
    if (evt.target.value === element.value) {
      FORM_APARTMENT_TIMEIN.value = element.value;
    }
  }
});

let adverts = [];

const successHandler = function (data) {
  map.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);
  onCapacityChange(FORM_ROOM_NUMBERS.value);
  onApartmentChange(FORM_APARTMENT_TYPE.value);
  window.utils.removeDisabled(adForm.children);
  window.utils.removeDisabled(mapFilters.children);
  formAdress.setAttribute(`disabled`, `disabled`);
  adverts = data;
  window.pin.generateTemplate(data);
};

let filteredState = {
  type: `any`,
  price: `any`,
  rooms: `any`,
  guests: `any`
};


housingType.addEventListener(`change`, function (evt) {
  filteredState.type = evt.target.value;
  window.debounce(window.filter.byType(adverts, filteredState));
});

housingPrice.addEventListener(`change`, function (evt) {
  filteredState.price = evt.target.value;
  window.debounce(window.filter.byType(adverts, filteredState));
});

housingRooms.addEventListener(`change`, function (evt) {
  filteredState.rooms = evt.target.value;
  window.debounce(window.filter.byType(adverts, filteredState));
});

housingGuests.addEventListener(`change`, function (evt) {
  filteredState.guests = evt.target.value;
  window.debounce(window.filter.byType(adverts, filteredState));
});

features.forEach((item) =>{
  item.addEventListener(`click`, function (evt) {
    window.filter.byFeature(evt.target.textContent);
    window.debounce(window.filter.byType(adverts, filteredState));
  });
});

const errorHandler = function (errorMessage) {
  let node = document.createElement(`div`);
  node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
  node.style.position = `absolute`;
  node.style.left = 0;
  node.style.right = 0;
  node.style.fontSize = `15px`;
  node.textContent = errorMessage;
  map.insertAdjacentElement(`afterbegin`, node);
};

const successSendHandler = function () {
  clearForm();
  const SUCCESS_TEMPLATE = document.querySelector(`#success`).content;
  const SUCCESS = SUCCESS_TEMPLATE.cloneNode(true);
  document.addEventListener(`click`, hideSuccessMessage);
  const FRAGMENT = document.createDocumentFragment();
  FRAGMENT.appendChild(SUCCESS);
  MAIN.appendChild(FRAGMENT);
  document.addEventListener(`keydown`, onSuccessEscPress);
};

const errorSendHandler = function () {
  const ERROR_TEMPLATE = document.querySelector(`#error`).content;
  const ERROR = ERROR_TEMPLATE.cloneNode(true);
  const ERROR_BUTTON = ERROR.querySelector(`.error__button`);
  ERROR_BUTTON.addEventListener(`click`, function () {
    hideErrorMessage();
  });
  document.addEventListener(`click`, function () {
    hideErrorMessage();
  });
  const FRAGMENT = document.createDocumentFragment();
  FRAGMENT.appendChild(ERROR);
  MAIN.appendChild(FRAGMENT);
  document.addEventListener(`keydown`, onErrorEscPress);
};

adForm.addEventListener(`submit`, function (evt) {
  evt.preventDefault();
  window.backend.send(new FormData(adForm), successSendHandler, errorSendHandler);
});

const onErrorEscPress = function (evt) {
  if (evt.key === window.constants.BUTTON_ESC) {
    hideErrorMessage();
  }
};

const onSuccessEscPress = function (evt) {
  if (evt.key === window.constants.BUTTON_ESC) {
    hideSuccessMessage();
  }
};

const hideErrorMessage = function () {
  const ERROR = document.querySelector(`.error`);
  MAIN.removeChild(ERROR);
  document.removeEventListener(`keydown`, onErrorEscPress);
};

const hideSuccessMessage = function () {
  const SUCCESS = document.querySelector(`.success`);
  MAIN.removeChild(SUCCESS);
  document.removeEventListener(`keydown`, onSuccessEscPress);
  document.removeEventListener(`click`, hideSuccessMessage);
};

window.form = {
  pageActived() {
    window.backend.load(successHandler, errorHandler);
  }
};

})();

(() => {
/*!*********************!*\
  !*** ./js/utils.js ***!
  \*********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


window.utils = {
  setDisabled(element) {
    for (let el of element) {
      el.setAttribute(`disabled`, `disabled`);
    }
  },
  removeDisabled(element) {
    for (let el of element) {
      el.removeAttribute(`disabled`);
    }
  },
  setDisabledPage() {
    const MAP = document.querySelector(`.map`);
    const AD_FORM = document.querySelector(`.ad-form`);
    const MAP_FILTERS = MAP.querySelector(`.map__filters`);
    const PINS = MAP.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    const MAP_PINS = MAP.querySelector(`.map__pins`);

    MAP.classList.add(`map--faded`);
    AD_FORM.classList.add(`ad-form--disabled`);
    window.utils.setDisabled(AD_FORM.children);
    window.utils.setDisabled(MAP_FILTERS.children);
    AD_FORM.reset();
    window.utils.isPageActiveted = false;
    PINS.forEach((item)=>MAP_PINS.removeChild(item));
  },
  isPageActiveted: false
};

})();

(() => {
/*!*******************!*\
  !*** ./js/map.js ***!
  \*******************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const MAP = document.querySelector(`.map`);
const MAIN_MAP_PIN = MAP.querySelector(`.map__pin--main`);
const FORM_ADDRESS = document.querySelector(`#address`);
const MIN_COORD_Y = 130;
const MAX_COORD_Y = 630;
const MIN_COORD_X = 0;
const MAX_COORD_X = 1200;
const PIN_HEIGHT = 87;
const PIN_WIDTH = 65;

const getAdressCoords = function () {
  FORM_ADDRESS.value = `${Math.floor(parseInt(MAIN_MAP_PIN.style.left, 10) + MAIN_MAP_PIN.clientWidth / 2)}, ${Math.floor(parseInt(MAIN_MAP_PIN.style.top, 10) + MAIN_MAP_PIN.clientHeight - PIN_HEIGHT)}`;
};

MAIN_MAP_PIN.addEventListener(`mousedown`, function (evt) {
  if (evt.button === window.constants.LEFT_MOUSE_BTN) {
    if (!window.utils.isPageActiveted) {
      window.form.pageActived();
      window.utils.isPageActiveted = true;
    }

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    const onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();


      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      let marginX = parseInt(MAIN_MAP_PIN.style.left, 10);
      let marginY = parseInt(MAIN_MAP_PIN.style.top, 10);
      let xMinCoord = MAP.getBoundingClientRect().x + PIN_WIDTH / 2;
      let xMaxCoord = MAX_COORD_X - PIN_WIDTH / 2;

      if ((moveEvt.clientX > xMinCoord || marginX > MIN_COORD_X) && (moveEvt.clientX < xMaxCoord || marginX < xMaxCoord)) {
        MAIN_MAP_PIN.style.left = `${MAIN_MAP_PIN.offsetLeft - shift.x}px`;
      }

      if ((moveEvt.clientY > MIN_COORD_Y || marginY > MIN_COORD_Y) && (moveEvt.clientY < MAX_COORD_Y - window.scrollY || marginY < MAX_COORD_Y - window.scrollY)) {
        MAIN_MAP_PIN.style.top = `${MAIN_MAP_PIN.offsetTop - shift.y}px`;
      }

      getAdressCoords();
    };

    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      getAdressCoords();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  }
});

MAIN_MAP_PIN.addEventListener(`keydown`, function (evt) {
  if (evt.key === window.constants.BUTTON_ENTER && !window.utils.isPageActiveted) {
    window.form.pageActived();
    window.utils.isPageActiveted = true;
  }
});

})();

(() => {
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


let adForm = document.querySelector(`.ad-form`);
let mapFilters = document.querySelector(`.map__filters`);

window.utils.setDisabled(mapFilters.children);
window.utils.setDisabled(adForm.children);

})();

/******/ })()
;