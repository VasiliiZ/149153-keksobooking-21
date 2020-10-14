'use strict';

(function () {
  const CHECK_TIME = [`12:00`, `13:00`, `14:00`];
  const FEATURES_TYPE = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const PHOTO_LINKS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
  const APARTMENT_TYPE = [`Palace`, `Flat`, `House`, `Bungalow`];
  const MAX_ROOM = 4;
  const adverts = [];

  for (let i = 0; i < 8; i++) {
    const MAP_PINS = document.querySelector(`.map__pins`);
    let xLocation = window.utils.getRandomFromRange(0, MAP_PINS.clientWidth);
    let yLocation = window.utils.getRandomFromRange(130, 630);
    let advertTemplate = {
      "author": {
        "avatar": `img/avatars/user0${i + 1}.png`
      },
      "offer": {
        "title": `Заголовок предложения`,
        "address": `${xLocation},${yLocation}`,
        "price": Math.floor(Math.random() * 10000),
        "type": window.utils.getRandomIndex(APARTMENT_TYPE),
        "rooms": window.utils.getRandomFromRange(1, MAX_ROOM),
        "guests": Math.floor(Math.random() * 10),
        "checkin": window.utils.getRandomIndex(CHECK_TIME),
        "checkout": window.utils.getRandomIndex(CHECK_TIME),
        "features": window.utils.getRandomLengthArr(FEATURES_TYPE),
        "description": `Описание`,
        "photos": window.utils.getRandomLengthArr(PHOTO_LINKS)
      },
      "location": {
        "x": xLocation,
        "y": yLocation
      }
    };
    adverts.push(advertTemplate);
  }

  window.adverts = adverts;
})();
