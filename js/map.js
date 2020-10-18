'use strict';

(function () {
  const MAP = document.querySelector(`.map`);
  const MAIN_MAP_PIN = MAP.querySelector(`.map__pin--main`);
  const FORM_ADDRESS = document.querySelector(`#address`);
  const minCoordY = 130;
  const maxCoordY = 630;
  const minCoordX = 220;
  const maxCoordX = MAP.clientWidth;
  const pinHeight = 87;
  const pinWidth = 65;

  const getAdressCoords = function () {
    FORM_ADDRESS.value = `${Math.floor(parseInt(MAIN_MAP_PIN.style.left, 10) + MAIN_MAP_PIN.clientWidth / 2)}, ${Math.floor(parseInt(MAIN_MAP_PIN.style.top, 10) + MAIN_MAP_PIN.clientHeight - pinHeight)}`;
  };

  MAIN_MAP_PIN.addEventListener(`mousedown`, function (evt) {
    if (evt.button === window.constants.LEFT_MOUSE_BTN) {
      window.form.pageActived();
      window.pin.generatePinTemplate();
    }

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    const onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      let conditionCoordElementY = parseInt(MAIN_MAP_PIN.style.top, 10) > (minCoordY - pinHeight) && (parseInt(MAIN_MAP_PIN.style.top, 10) < (maxCoordY - pinHeight));
      let conditionCoordElementX = parseInt(MAIN_MAP_PIN.style.left, 10) > (minCoordX - pinWidth) && (parseInt(MAIN_MAP_PIN.style.left, 10) < (maxCoordX - pinWidth));
      let conditionCoordMouseX = moveEvt.clientX > minCoordX && moveEvt.clientX < maxCoordX;
      let conditionCoordMouseY = moveEvt.clientY > minCoordY && moveEvt.clientY < maxCoordY;
      if ((conditionCoordElementY && conditionCoordElementX) || (conditionCoordMouseX && conditionCoordMouseY)) {
        MAIN_MAP_PIN.style.left = `${MAIN_MAP_PIN.offsetLeft - shift.x}px`;
        MAIN_MAP_PIN.style.top = `${MAIN_MAP_PIN.offsetTop - shift.y}px`;
      }

      getAdressCoords();
    };

    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      getAdressCoords();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });

  MAIN_MAP_PIN.addEventListener(`keydown`, function (evt) {
    if (evt.key === window.constants.BUTTON_ENTER) {
      window.form.pageActived();
      window.pin.generatePinTemplate();
    }
  });

})();
