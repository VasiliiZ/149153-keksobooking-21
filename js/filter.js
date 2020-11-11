'use strict';
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
    max: 1000000
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
    window.pin.generatePinTemplate(filtered);
  },
  byFeature(feature) {
    getMatch(comparedFeatures, FEATURES_MAP[feature]);
  }
};


