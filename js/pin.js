'use strict';

const MAX_VISIBLE_PIN = 5;
const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;

let pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
let map = document.querySelector(`.map`);
let mapPins = map.querySelector(`.map__pins`);


const renderPin = function (advert) {
  const PIN = pinTemplate.cloneNode(true);
  let pinImage = PIN.querySelector(`img`);
  pinImage.src = advert.author.avatar;
  pinImage.alt = advert.offer.description;
  PIN.style.left = `${advert.location.x - (PIN_WIDTH / 2)}px`;
  PIN.style.top = `${advert.location.y - PIN_HEIGHT}px`;
  PIN.addEventListener(`click`, function (evt) {
    let pins = map.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    pins.forEach((pin)=>{
      if (pin.classList.contains(`map__pin--active`)) {
        pin.classList.remove(`map__pin--active`);
      }
    });
    evt.currentTarget.classList.add(`map__pin--active`);
    window.popup.open(advert);
  });
  PIN.addEventListener(`keydown`, function (evt) {
    if (evt.key === window.constants.BUTTON_ENTER) {
      evt.preventDefault();
      window.popup.open(advert);
    }
  });
  return PIN;
};
window.pin = {
  generateTemplate(adverts) {
    const FRAGMENT = document.createDocumentFragment();
    let pins = map.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    if (pins) {
      pins.forEach((item)=>mapPins.removeChild(item));
    }
    let tekeNumber = MAX_VISIBLE_PIN < adverts.length ? MAX_VISIBLE_PIN : adverts.length;
    for (let i = 0; i < tekeNumber; i++) {
      FRAGMENT.appendChild(renderPin(adverts[i]));
    }
    mapPins.appendChild(FRAGMENT);

  }
};
