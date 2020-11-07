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
  const MAIN = document.querySelector(`main`);
  const FORM_RESET_BUTTON = AD_FORM.querySelector(`.ad-form__reset`);
  const MAIN_MAP_PIN = MAP.querySelector(`.map__pin--main`);
  const HOUSING_TYPE = MAP_FILTERS.querySelector(`#housing-type`);
  const HOUSING_PRICE = MAP_FILTERS.querySelector(`#housing-price`);
  const HOUSING_ROOMS = MAP_FILTERS.querySelector(`#housing-rooms`);
  const HOUSING_QUESTS = MAP_FILTERS.querySelector(`#housing-guests`);
  const FEATURES = document.querySelectorAll(`.map__feature`);

  FORM_ADDRESS.value = `${Math.floor(parseInt(MAIN_MAP_PIN.style.left, 10) + MAIN_MAP_PIN.clientWidth / 2)}, ${Math.floor(parseInt(MAIN_MAP_PIN.style.top, 10) + MAIN_MAP_PIN.clientHeight / 2)}`;

  FORM_RESET_BUTTON.addEventListener(`click`, function () {
    AD_FORM.reset();
  });

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

  let adverts = [];

  const successHandler = function (data) {
    adverts = data;
    window.pin.generatePinTemplate(data);
  };


  const checkPopup = function () {
    const popup = MAP.querySelector(`.popup`);
    if (popup) {
      MAP.removeChild(popup);
    }
  };


  let filteredState = {
    type: `any`,
    price: `any`,
    rooms: `any`,
    guests: `any`
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

  const filteredByType = function (arr, type) {
    if (type !== `any`) {
      return arr.filter((item) => item.offer.type === type);
    } else {
      return arr;
    }
  };

  const filteredByRooms = function (arr, type) {
    if (type !== `any`) {
      return arr.filter((item) => parseInt(item.offer.rooms, 10) === parseInt(type, 10));
    } else {
      return arr;
    }
  };

  const filteredByGuests = function (arr, type) {
    if (type !== `any`) {
      return arr.filter((item) => parseInt(item.offer.guests, 10) === parseInt(type, 10));
    } else {
      return arr;
    }
  };

  const filteredByPrice = function (arr, type) {
    if (type !== `any`) {
      return arr.filter((item) => item.offer.price >= priceRange[type].min && item.offer.price <= priceRange[type].max);
    } else {
      return arr;
    }
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


  const filteredHandler = function () {
    checkPopup();
    let filtered = [];
    filtered = filteredByType(adverts, filteredState.type);
    filtered = filteredByPrice(filtered, filteredState.price);
    filtered = filteredByRooms(filtered, filteredState.rooms);
    filtered = filteredByGuests(filtered, filteredState.guests);
    filtered = filteredByFeatures(filtered);
    window.pin.generatePinTemplate(filtered);
  };

  HOUSING_TYPE.addEventListener(`change`, function (evt) {
    filteredState.type = evt.target.value;
    window.debounce(filteredHandler());
  });

  HOUSING_PRICE.addEventListener(`change`, function (evt) {
    filteredState.price = evt.target.value;
    window.debounce(filteredHandler());
  });

  HOUSING_ROOMS.addEventListener(`change`, function (evt) {
    filteredState.rooms = evt.target.value;
    window.debounce(filteredHandler());
  });

  HOUSING_QUESTS.addEventListener(`change`, function (evt) {
    filteredState.guests = evt.target.value;
    window.debounce(filteredHandler());
  });

  const FEATURES_TYPE = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const FEATURE_FROM_SERVER = [`Wi-Fi`, `Посудомоечная машина`, `Парковка`, `Стиральная машина`, `Лифт`, `Кондиционер`];

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

  const getCompareFeatures = function (feature) {

    switch (feature) {
      case FEATURE_FROM_SERVER[0]:
        getMatch(comparedFeatures, FEATURES_TYPE[0]);
        break;
      case FEATURE_FROM_SERVER[1]:
        getMatch(comparedFeatures, FEATURES_TYPE[1]);
        break;
      case FEATURE_FROM_SERVER[2]:
        getMatch(comparedFeatures, FEATURES_TYPE[2]);
        break;
      case FEATURE_FROM_SERVER[3]:
        getMatch(comparedFeatures, FEATURES_TYPE[3]);
        break;
      case FEATURE_FROM_SERVER[4]:
        getMatch(comparedFeatures, FEATURES_TYPE[4]);
        break;
      case FEATURE_FROM_SERVER[5]:
        getMatch(comparedFeatures, FEATURES_TYPE[5]);
        break;
    }
  };

  FEATURES.forEach((item) =>{
    item.addEventListener(`click`, function (evt) {
      getCompareFeatures(evt.target.textContent);
      window.debounce(filteredHandler());
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
    MAP.insertAdjacentElement(`afterbegin`, node);
  };

  const successSendHandler = function () {
    window.utils.setDisabledPage();
    const SUCCESS_TEMPLATE = document.querySelector(`#success`).content;
    const SUCCESS = SUCCESS_TEMPLATE.cloneNode(true);
    document.addEventListener(`click`, function () {
      hideSuccessMessage();
    });
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

  AD_FORM.addEventListener(`submit`, function (evt) {
    evt.preventDefault();
    FORM_ADDRESS.removeAttribute(`disabled`);
    window.backend.send(new FormData(AD_FORM), successSendHandler, errorSendHandler);
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
  };

  window.form = {
    pageActived() {
      MAP.classList.remove(`map--faded`);
      AD_FORM.classList.remove(`ad-form--disabled`);
      onCapacityChange(FORM_ROOM_NUMBERS.value);
      onApartmentChange(FORM_APARTMENT_TYPE.value);
      window.utils.removeDisabled(AD_FORM.children);
      window.utils.removeDisabled(MAP_FILTERS.children);
      FORM_ADDRESS.setAttribute(`disabled`, `disabled`);
      window.backend.load(successHandler, errorHandler);
    }
  };
})();
