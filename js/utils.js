'use strict';

const getRandomNumber = function (array) {
  return Math.floor(Math.random() * array.length);
};
window.utils = {
  getRandomFromRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  },
  getRandomIndex(arr) {
    let randomNumber = getRandomNumber(arr);
    return arr[randomNumber];
  },
  getRandomLengthArr(arr) {
    let randomNumber = getRandomNumber(arr);
    let randomArray = [];
    for (let i = 0; i < randomNumber; i++) {
      randomArray.push(arr[i]);
    }
    return randomArray;
  },
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
