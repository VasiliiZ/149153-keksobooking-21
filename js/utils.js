'use strict';

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
