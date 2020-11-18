'use strict';

const PIN_HEIGHT = 65;
const PIN_WIDTH = 65;
const MIN_COORD_Y = 97 - (PIN_HEIGHT / 2);
const MAX_COORD_Y = 566;
const MIN_COORD_X = 0 - (PIN_WIDTH / 2);
const MAX_COORD_X = 1200 - (PIN_WIDTH / 2);

let map = document.querySelector(`.map`);
let mainMapPin = map.querySelector(`.map__pin--main`);
let formAddress = document.querySelector(`#address`);


const getAdressCoords = function () {
  formAddress.value = `${Math.floor(parseInt(mainMapPin.style.left, 10) + mainMapPin.clientWidth / 2)}, ${Math.floor(parseInt(mainMapPin.style.top, 10) + mainMapPin.clientHeight)}`;
};

mainMapPin.addEventListener(`mousedown`, function (evt) {
  window.form.pageActived();

  if (evt.button === window.constants.LEFT_MOUSE_BTN && window.utils.isPageActiveted) {

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    const onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      if (window.utils.isPageActiveted) {
        let shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        let coordY = mainMapPin.offsetTop - shift.y;
        let coordX = mainMapPin.offsetLeft - shift.x;

        if (coordY > MIN_COORD_Y && coordY < MAX_COORD_Y) {
          mainMapPin.style.top = `${coordY}px`;
        }

        if (coordX > MIN_COORD_X && coordX < MAX_COORD_X) {
          mainMapPin.style.left = `${coordX}px`;
        }

        getAdressCoords();
      }

    };

    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      getAdressCoords();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  }
});

mainMapPin.addEventListener(`keydown`, function (evt) {
  if (evt.key === window.constants.BUTTON_ENTER && !window.utils.isPageActiveted) {
    window.form.pageActived();
  }
});
