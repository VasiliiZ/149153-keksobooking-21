'use strict';

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
