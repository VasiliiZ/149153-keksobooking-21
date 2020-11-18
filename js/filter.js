'use strict';

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
