'use strict';

(function () {
  const APARTMENT_TYPE = [`Palace`, `Flat`, `House`, `Bungalow`];
  const APARTMENT_PRICE = [`0`, `1000`, `5000`, `10000`];
  const ROOM_SIZE_MAP = {
    OneBedroom: `1`,
    TwoBedroom: `2`,
    ThreeBedroom: `3`
  };
  const MAP = document.querySelector(`.map`);
  const MAP_FILTERS = MAP.querySelector(`.map__filters`);
  const AD_FORM = document.querySelector(`.ad-form`);
  const FORM_CAPACITY = AD_FORM.querySelector(`#capacity`);
  const FORM_CAPACITY_OPTIONS = AD_FORM.querySelectorAll(`#capacity option`);
  const FORM_APARTMENT_PRICE = AD_FORM.querySelector(`#price`);
  const FORM_ADDRESS = AD_FORM.querySelector(`#address`);

  const MAIN_MAP_PIN = MAP.querySelector(`.map__pin--main`);

  FORM_ADDRESS.value = `${Math.floor(parseInt(MAIN_MAP_PIN.style.left, 10) + MAIN_MAP_PIN.clientWidth / 2)}, ${Math.floor(parseInt(MAIN_MAP_PIN.style.top, 10) + MAIN_MAP_PIN.clientHeight / 2)}`;

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

  const FORM_ROOM_NUMBERS = AD_FORM.querySelector(`#room_number`);

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

  const FORM_APARTMENT_TYPE = AD_FORM.querySelector(`#type`);

  FORM_APARTMENT_TYPE.addEventListener(`change`, function (evt) {
    onApartmentChange(evt.target.value);
  });

  const FORM_APARTMENT_TIMEIN = AD_FORM.querySelector(`#timein`);

  FORM_APARTMENT_TIMEIN.addEventListener(`change`, function (evt) {
    for (let element of FORM_APARTMENT_TIMEOUT.children) {
      if (evt.target.value === element.value) {
        FORM_APARTMENT_TIMEOUT.value = element.value;
      }
    }
  });

  const FORM_APARTMENT_TIMEOUT = AD_FORM.querySelector(`#timeout`);

  FORM_APARTMENT_TIMEOUT.addEventListener(`change`, function (evt) {
    for (let element of FORM_APARTMENT_TIMEIN.children) {
      if (evt.target.value === element.value) {
        FORM_APARTMENT_TIMEIN.value = element.value;
      }
    }
  });

  window.form = {
    pageActived() {
      MAP.classList.remove(`map--faded`);
      AD_FORM.classList.remove(`ad-form--disabled`);
      onCapacityChange(FORM_ROOM_NUMBERS.value);
      onApartmentChange(FORM_APARTMENT_TYPE.value);
      window.utils.removeDisabled(AD_FORM.children);
      window.utils.removeDisabled(MAP_FILTERS.children);
      FORM_ADDRESS.setAttribute(`disabled`, `disabled`);
    }
  };
})();
