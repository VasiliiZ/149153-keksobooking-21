'use strict';

(function () {
  const PIN_TEMPLATE = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const MAP = document.querySelector(`.map`);
  const MAP_PINS = MAP.querySelector(`.map__pins`);
  const MAX_VISIBLE_PIN = 5;

  const renderPin = function (advert) {
    const PIN = PIN_TEMPLATE.cloneNode(true);
    const PIN_IMAGE = PIN.querySelector(`img`);
    PIN_IMAGE.src = advert.author.avatar;
    PIN_IMAGE.alt = advert.offer.description;
    PIN.style.left = `${advert.location.x + PIN_IMAGE.width / 2}px`;
    PIN.style.top = `${advert.location.y + PIN_IMAGE.height}px`;
    PIN.addEventListener(`click`, function () {
      window.popup.openPopup(advert);
    });
    PIN.addEventListener(`keydown`, function (evt) {
      if (evt.key === window.constants.BUTTON_ENTER) {
        evt.preventDefault();
        window.popup.openPopup(advert);
      }
    });
    return PIN;
  };
  window.pin = {
    generatePinTemplate(adverts) {
      const PINS = MAP.querySelectorAll(`.map__pin:not(.map__pin--main)`);
      if (PINS) {
        PINS.forEach((item)=>MAP_PINS.removeChild(item));
      }
      const FRAGMENT = document.createDocumentFragment();
      let tekeNumber = MAX_VISIBLE_PIN < adverts.length ? MAX_VISIBLE_PIN : adverts.length;
      for (let i = 0; i < tekeNumber; i++) {
        FRAGMENT.appendChild(renderPin(adverts[i]));
      }
      MAP_PINS.appendChild(FRAGMENT);

    }
  };
})();


