'use strict';

(function () {
  const MAP = document.querySelector(`.map`);
  const MAIN_MAP_PIN = MAP.querySelector(`.map__pin--main`);
  const FORM_ADDRESS = document.querySelector(`#address`);
  const MIN_COORD_Y = 130;
  const MAX_COORD_Y = 630;
  const MIN_COORD_X = 220;
  const MAX_COORD_X = MAP.clientWidth;
  const PIN_HEIGHT = 87;
  const PIN_WIDTH = 65;


  const getAdressCoords = function () {
    FORM_ADDRESS.value = `${Math.floor(parseInt(MAIN_MAP_PIN.style.left, 10) + MAIN_MAP_PIN.clientWidth / 2)}, ${Math.floor(parseInt(MAIN_MAP_PIN.style.top, 10) + MAIN_MAP_PIN.clientHeight - PIN_HEIGHT)}`;
  };

  MAIN_MAP_PIN.addEventListener(`mousedown`, function (evt) {
    if (evt.button === window.constants.LEFT_MOUSE_BTN && !window.utils.isPageActiveted) {
      window.form.pageActived();
      window.utils.isPageActiveted = true;
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

      let conditionCoordElementY = parseInt(MAIN_MAP_PIN.style.top, 10) > (MIN_COORD_Y - PIN_HEIGHT) && (parseInt(MAIN_MAP_PIN.style.top, 10) < (MAX_COORD_Y - PIN_HEIGHT));
      let conditionCoordElementX = parseInt(MAIN_MAP_PIN.style.left, 10) > (MIN_COORD_X - PIN_WIDTH) && (parseInt(MAIN_MAP_PIN.style.left, 10) < (MAX_COORD_X - PIN_WIDTH));
      let conditionCoordMouseX = moveEvt.clientX > MIN_COORD_X && moveEvt.clientX < MAX_COORD_X;
      let conditionCoordMouseY = moveEvt.clientY > MIN_COORD_Y && moveEvt.clientY < MAX_COORD_Y;
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
    if (evt.key === window.constants.BUTTON_ENTER && !window.utils.isPageActiveted) {
      window.form.pageActived();
      window.utils.isPageActiveted = true;
    }
  });

})();
