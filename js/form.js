'use strict';

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
