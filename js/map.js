'use strict';

(function () {
  const MAIN_MAP_PIN = document.querySelector(`.map__pin--main`);

  MAIN_MAP_PIN.addEventListener(`mousedown`, function (evt) {
    if (evt.button === window.constants.LEFT_MOUSE_BTN) {
      window.form.pageActived();
      window.pin.generatePinTemplate();
    }
  });

  MAIN_MAP_PIN.addEventListener(`keydown`, function (evt) {
    if (evt.key === window.constants.BUTTON_ENTER) {
      window.form.pageActived();
      window.pin.generatePinTemplate();
    }
  });

})();
