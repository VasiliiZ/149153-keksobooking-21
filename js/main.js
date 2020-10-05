'use strict';

const adverts = [];
const APARTMENT_TYPE = [`palace`, `flat`, `house`, `bungalow`];
const MAX_ROOM = 4;
const CHECK_TIME = [`12:00`, `13:00`, `14:00`];
const FEATURES_TYPE = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTO_LINKS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

const MAP = document.querySelector(`.map`);
MAP.classList.remove(`map--faded`);

const MAP_PINS = MAP.querySelector(`.map__pins`);
const PIN_TEMPLATE = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

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
      "rooms": Math.floor(Math.random() * MAX_ROOM),
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

const generatePinTemplate = function () {
  const FRAGMENT = document.createDocumentFragment();
  for (let i = 0; i < adverts.length; i++) {
    FRAGMENT.appendChild(renderPin(adverts[i]));
  }
  MAP_PINS.appendChild(FRAGMENT);
};

generatePinTemplate();
