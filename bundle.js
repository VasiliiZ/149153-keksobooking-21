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
const Methods = {
  GET: `GET`,
  POST: `POST`
};
const ServerStatus = {
  OK: 200
};


window.backend = {
  load(onLoad, onError) {
    let xhr = new XMLHttpRequest();
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
    xhr.open(Methods.GET, URL);
    xhr.send();
  },
  send(data, onLoad, onError) {
    let xhr = new XMLHttpRequest();
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
    xhr.open(Methods.POST, URL);
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
    let pins = map.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    map.removeChild(popup);
    pins.forEach((pin)=>{
      if (pin.classList.contains(`map__pin--active`)) {
        pin.classList.remove(`map__pin--active`);
      }
    });
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
  let pin = pinTemplate.cloneNode(true);
  let pinImage = pin.querySelector(`img`);
  pinImage.src = advert.author.avatar;
  pinImage.alt = advert.offer.description;
  pin.style.left = `${advert.location.x - (PIN_WIDTH / 2)}px`;
  pin.style.top = `${advert.location.y - PIN_HEIGHT}px`;
  pin.addEventListener(`click`, function (evt) {
    let pins = map.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    pins.forEach((elem)=>{
      if (elem.classList.contains(`map__pin--active`)) {
        elem.classList.remove(`map__pin--active`);
      }
    });
    evt.currentTarget.classList.add(`map__pin--active`);
    window.popup.open(advert);
  });
  pin.addEventListener(`keydown`, function (evt) {
    if (evt.key === window.constants.BUTTON_ENTER) {
      evt.preventDefault();
      window.popup.open(advert);
    }
  });
  return pin;
};
window.pin = {
  generateTemplate(adverts) {
    let fragment = document.createDocumentFragment();
    let pins = map.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    if (pins) {
      pins.forEach((item)=>mapPins.removeChild(item));
    }
    let tekeNumber = MAX_VISIBLE_PIN < adverts.length ? MAX_VISIBLE_PIN : adverts.length;
    for (let i = 0; i < tekeNumber; i++) {
      fragment.appendChild(renderPin(adverts[i]));
    }
    mapPins.appendChild(fragment);

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
const PriceRange = {
  LOW: {
    min: 0,
    max: 10000
  },
  MIDDLE: {
    min: 10000,
    max: 50000
  },
  HIGH: {
    min: 50000,
    max: 10000000
  }
};

let mapFilters = document.querySelector(`.map__filters`);
let housingType = mapFilters.querySelector(`#housing-type`);
let housingPrice = mapFilters.querySelector(`#housing-price`);
let housingRooms = mapFilters.querySelector(`#housing-rooms`);
let housingGuests = mapFilters.querySelector(`#housing-guests`);


mapFilters.addEventListener(`change`, window.debounce(function () {
  window.utils.checkPopup();
  let housingFeatures = mapFilters.querySelectorAll(`.map__checkbox:checked`);

  let filtered = window.utils.adverts.filter(function (item) {

    let type = true;
    let price = true;
    let rooms = true;
    let guests = true;
    let features = true;

    if (housingType.value !== DEFAULT_TYPE) {
      type = housingType.value === item.offer.type;
    }

    if (housingRooms.value !== DEFAULT_TYPE) {
      rooms = parseInt(housingRooms.value, 10) === parseInt(item.offer.rooms, 10);
    }

    if (housingGuests.value !== DEFAULT_TYPE) {
      guests = parseInt(housingGuests.value, 10) === parseInt(item.offer.guests, 10);
    }

    if (housingPrice.value !== DEFAULT_TYPE) {
      price = item.offer.price >= PriceRange[housingPrice.value.toUpperCase()].min && item.offer.price <= PriceRange[housingPrice.value.toUpperCase()].max;
    }

    const filteredByFeatures = function (elem) {
      for (let i = 0; i < elem.length; i++) {
        if (item.offer.features.indexOf(elem[i].value) === -1) {
          features = false;
          break;
        }
      }
    };

    filteredByFeatures(housingFeatures);

    return type && price && rooms && guests && features;
  });

  window.pin.generateTemplate(filtered);
}));

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

const DEFAULT_PIN_LEFT = mainMapPin.style.left;
const DEFAULT_PIN_TOP = mainMapPin.style.top;

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
let featureCheckbox = document.querySelectorAll(`.map__checkbox`);
let avatar = document.querySelector(`.ad-form-header__preview img`);
let foto = document.querySelector(`.ad-form__photo`);

formAdress.value = `${Math.floor(parseInt(mainMapPin.style.left, 10) + mainMapPin.clientWidth / 2)}, ${Math.floor(parseInt(mainMapPin.style.top, 10) + mainMapPin.clientHeight - PIN_HEIGHT)}`;

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
  avatar.src = `img/muffin-grey.svg`;
  foto.style.backgroundImage = ``;
  window.utils.checkPopup();
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


const onPageload = function (data) {
  map.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);
  onCapacityChange(formRoomNumbers.value);
  onApartmentChange(formApartmentType.value);
  window.utils.removeDisabled(adForm.children);
  window.utils.removeDisabled(mapFilters.children);
  formAdress.setAttribute(`disabled`, `disabled`);
  window.utils.isPageActiveted = true;
  window.utils.adverts = data;
  window.pin.generateTemplate(data);
};

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
  let succesTemplate = document.querySelector(`#success`).content;
  let success = succesTemplate.cloneNode(true);
  document.addEventListener(`click`, hideSuccessMessage);
  let fragment = document.createDocumentFragment();
  fragment.appendChild(success);
  main.appendChild(fragment);
  document.addEventListener(`keydown`, onSuccessEscPress);
};


const onFormSendError = function () {
  let errorTemplate = document.querySelector(`#error`).content;
  let error = errorTemplate.cloneNode(true);
  let errorButton = error.querySelector(`.error__button`);
  errorButton.addEventListener(`click`, hideErrorMessage);
  document.addEventListener(`click`, hideErrorMessage);
  let fragment = document.createDocumentFragment();
  fragment.appendChild(error);
  main.appendChild(fragment);
  document.addEventListener(`keydown`, onErrorEscPress);
};

adForm.addEventListener(`submit`, function (evt) {
  evt.preventDefault();
  formAdress.removeAttribute(`disabled`);
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
  let errorElem = document.querySelector(`.error`);
  let errorButton = document.querySelector(`.error__button`);
  main.removeChild(errorElem);
  document.removeEventListener(`keydown`, onErrorEscPress);
  errorButton.removeEventListener(`click`, hideErrorMessage);
  document.removeEventListener(`click`, hideErrorMessage);
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


let map = document.querySelector(`.map`);

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
  checkPopup() {
    const popup = map.querySelector(`.popup`);
    if (popup) {
      map.removeChild(popup);
    }
  },
  isPageActiveted: false,
  adverts: []
};

})();

(() => {
/*!*******************!*\
  !*** ./js/map.js ***!
  \*******************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const PIN_HEIGHT = 65;
const PIN_WIDTH = 65;
const MIN_COORD_Y = 97 - (PIN_HEIGHT / 2);
const MAX_COORD_Y = 566;
const MIN_COORD_X = 0 - (PIN_WIDTH / 2);
const MAX_COORD_X = 1200 - (PIN_WIDTH / 2);

let map = document.querySelector(`.map`);
let mainMapPin = map.querySelector(`.map__pin--main`);
let formAddress = document.querySelector(`#address`);


const getAdressCoords = function () {
  formAddress.value = `${Math.floor(parseInt(mainMapPin.style.left, 10) + mainMapPin.clientWidth / 2)}, ${Math.floor(parseInt(mainMapPin.style.top, 10) + mainMapPin.clientHeight)}`;
};

mainMapPin.addEventListener(`mousedown`, function (evt) {
  window.form.pageActived();

  if (evt.button === window.constants.LEFT_MOUSE_BTN && window.utils.isPageActiveted) {

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    const onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      if (window.utils.isPageActiveted) {
        let shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        let coordY = mainMapPin.offsetTop - shift.y;
        let coordX = mainMapPin.offsetLeft - shift.x;

        if (coordY > MIN_COORD_Y && coordY < MAX_COORD_Y) {
          mainMapPin.style.top = `${coordY}px`;
        }

        if (coordX > MIN_COORD_X && coordX < MAX_COORD_X) {
          mainMapPin.style.left = `${coordX}px`;
        }

        getAdressCoords();
      }

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