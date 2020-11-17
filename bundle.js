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
let reader;

avatarChooser.addEventListener(`change`, () => {
  let file = avatarChooser.files[0];
  let fileName = file.name.toLowerCase();

  let matches = FILE_TYPES.some(function (type) {
    return fileName.endsWith(type);
  });

  if (matches) {
    reader = new FileReader();

    reader.addEventListener(`load`, () => {
      avatar.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});

fotoChooser.addEventListener(`change`, () => {
  let file = fotoChooser.files[0];
  let fileName = file.name.toLowerCase();

  let matches = FILE_TYPES.some(function (type) {
    return fileName.endsWith(type);
  });

  if (matches) {
    reader = new FileReader();

    reader.addEventListener(`load`, () =>{
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

let xhr;

window.backend = {
  load(onLoad, onError) {
    xhr = new XMLHttpRequest();
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
    xhr = new XMLHttpRequest();
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

})();

(() => {
/*!*********************!*\
  !*** ./js/popup.js ***!
  \*********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


let map = document.querySelector(`.map`);

const onPopupEscPress = (evt) => {
  if (evt.key === window.constants.BUTTON_ESC) {
    evt.preventDefault();
    window.popup.close();
  }
};
window.popup = {
  open(advert) {
    let popup = map.querySelector(`.popup`);
    if (popup) {
      map.removeChild(popup);
    }
    window.card.generateTemplate(advert);
    document.addEventListener(`keydown`, onPopupEscPress);
    let closeBtn = map.querySelector(`.popup__close`);
    closeBtn.addEventListener(`click`, this.close);

  },
  close() {
    let popup = map.querySelector(`.popup`);
    map.removeChild(popup);
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
    window.popup.open(advert);
  });
  PIN.addEventListener(`keydown`, function (evt) {
    if (evt.key === window.constants.BUTTON_ENTER) {
      evt.preventDefault();
      window.popup.open(advert);
    }
  });
  return PIN;
};
window.pin = {
  generateTemplate(adverts) {
    const FRAGMENT = document.createDocumentFragment();
    let pins = map.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    if (pins) {
      pins.forEach((item)=>mapPins.removeChild(item));
    }
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


const DEFAULT_TYPE = `any`;
const FEATURES_MAP = {
  "Wi-Fi": `wifi`,
  "Посудомоечная машина": `dishwasher`,
  "Парковка": `parking`,
  "Стиральная машина": `washer`,
  "Лифт": `elevator`,
  "Кондиционер": `conditioner`
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

let map = document.querySelector(`.map`);

const checkPopup = () => {
  const popup = map.querySelector(`.popup`);
  if (popup) {
    map.removeChild(popup);
  }
};

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
const DEFAULT_PIN_LEFT = mainMapPin.style.left;
const DEFAULT_PIN_TOP = mainMapPin.style.top;

let map = document.querySelector(`.map`);
let mainMapPin = map.querySelector(`.map__pin--main`);
let mapFilters = map.querySelector(`.map__filters`);
let adForm = document.querySelector(`.ad-form`);
let formCapacity = adForm.querySelector(`#capacity`);
let formCapacityOptions = adForm.querySelectorAll(`#capacity option`);
let formApartmentPrice = adForm.querySelector(`#price`);
let formAdress = adForm.querySelector(`#address`);
let main = document.querySelector(`main`);
let formResetButton = adForm.querySelector(`.ad-form__reset`);
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


formResetButton.addEventListener(`click`, clearForm);

const onCapacityChange = function (value) {
  for (let i = formCapacity.length - 1; i >= 0; i--) {
    formCapacity.removeChild(formCapacity[i]);
  }
  switch (value) {
    case RoomSize.OneBedroom:
      formCapacity.appendChild(formCapacityOptions[2]);
      break;
    case RoomSize.TwoBedroom:
      formCapacity.appendChild(formCapacityOptions[1]);
      formCapacity.appendChild(formCapacityOptions[2]);
      break;
    case RoomSize.ThreeBedroom:
      formCapacity.appendChild(formCapacityOptions[0]);
      formCapacity.appendChild(formCapacityOptions[1]);
      formCapacity.appendChild(formCapacityOptions[2]);
      break;
    default:
      formCapacity.appendChild(formCapacityOptions[3]);
  }
};

let formRoomNumbers = adForm.querySelector(`#room_number`);

formRoomNumbers.addEventListener(`change`, function (evt) {
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

let formApartmentType = adForm.querySelector(`#type`);

formApartmentType.addEventListener(`change`, function (evt) {
  onApartmentChange(evt.target.value);
});

let formApartmentTimein = adForm.querySelector(`#timein`);

formApartmentTimein.addEventListener(`change`, function (evt) {
  for (let element of formApartmentTimeout.children) {
    if (evt.target.value === element.value) {
      formApartmentTimeout.value = element.value;
    }
  }
});

let formApartmentTimeout = adForm.querySelector(`#timeout`);

formApartmentTimeout.addEventListener(`change`, function (evt) {
  for (let element of formApartmentTimein.children) {
    if (evt.target.value === element.value) {
      formApartmentTimein.value = element.value;
    }
  }
});

let adverts = [];

const onPageload = function (data) {
  map.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);
  onCapacityChange(formRoomNumbers.value);
  onApartmentChange(formApartmentType.value);
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

const onPageLoadError = function (errorMessage) {
  let node = document.createElement(`div`);
  node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
  node.style.position = `absolute`;
  node.style.left = 0;
  node.style.right = 0;
  node.style.fontSize = `15px`;
  node.textContent = errorMessage;
  map.insertAdjacentElement(`afterbegin`, node);
};

const onFormSend = function () {
  clearForm();
  const SUCCESS_TEMPLATE = document.querySelector(`#success`).content;
  const SUCCESS = SUCCESS_TEMPLATE.cloneNode(true);
  document.addEventListener(`click`, hideSuccessMessage);
  const FRAGMENT = document.createDocumentFragment();
  FRAGMENT.appendChild(SUCCESS);
  main.appendChild(FRAGMENT);
  document.addEventListener(`keydown`, onSuccessEscPress);
};

const onFormSendError = function () {
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
  main.appendChild(FRAGMENT);
  document.addEventListener(`keydown`, onErrorEscPress);
};

adForm.addEventListener(`submit`, function (evt) {
  evt.preventDefault();
  window.backend.send(new FormData(adForm), onFormSend, onFormSendError);
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
  let error = document.querySelector(`.error`);
  main.removeChild(error);
  document.removeEventListener(`keydown`, onErrorEscPress);
};

const hideSuccessMessage = function () {
  let success = document.querySelector(`.success`);
  main.removeChild(success);
  document.removeEventListener(`keydown`, onSuccessEscPress);
  document.removeEventListener(`click`, hideSuccessMessage);
};

window.form = {
  pageActived() {
    window.backend.load(onPageload, onPageLoadError);
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
    let map = document.querySelector(`.map`);
    let adForm = document.querySelector(`.ad-form`);
    let mapFilters = map.querySelector(`.map__filters`);
    let pins = map.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    let mapPins = map.querySelector(`.map__pins`);

    map.classList.add(`map--faded`);
    adForm.classList.add(`ad-form--disabled`);
    window.utils.setDisabled(adForm.children);
    window.utils.setDisabled(mapFilters.children);
    adForm.reset();
    window.utils.isPageActiveted = false;
    pins.forEach((item)=>mapPins.removeChild(item));
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


const MIN_COORD_Y = 130;
const MAX_COORD_Y = 630;
const MIN_COORD_X = 0;
const MAX_COORD_X = 1200;
const PIN_HEIGHT = 87;
const PIN_WIDTH = 65;

let map = document.querySelector(`.map`);
let mainMapPin = map.querySelector(`.map__pin--main`);
let formAddress = document.querySelector(`#address`);


const getAdressCoords = function () {
  formAddress.value = `${Math.floor(parseInt(mainMapPin.style.left, 10) + mainMapPin.clientWidth / 2)}, ${Math.floor(parseInt(mainMapPin.style.top, 10) + mainMapPin.clientHeight - PIN_HEIGHT)}`;
};

mainMapPin.addEventListener(`mousedown`, function (evt) {
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

      let marginX = parseInt(mainMapPin.style.left, 10);
      let marginY = parseInt(mainMapPin.style.top, 10);
      let xMinCoord = map.getBoundingClientRect().x + PIN_WIDTH / 2;
      let xMaxCoord = MAX_COORD_X - PIN_WIDTH / 2;

      if ((moveEvt.clientX > xMinCoord || marginX > MIN_COORD_X) && (moveEvt.clientX < xMaxCoord || marginX < xMaxCoord)) {
        mainMapPin.style.left = `${mainMapPin.offsetLeft - shift.x}px`;
      }

      if ((moveEvt.clientY > MIN_COORD_Y || marginY > MIN_COORD_Y) && (moveEvt.clientY < MAX_COORD_Y - window.scrollY || marginY < MAX_COORD_Y - window.scrollY)) {
        mainMapPin.style.top = `${mainMapPin.offsetTop - shift.y}px`;
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

mainMapPin.addEventListener(`keydown`, function (evt) {
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