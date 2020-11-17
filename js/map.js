'use strict';

const MIN_COORD_Y = 130;
const MAX_COORD_Y = 630;
const MIN_COORD_X = 0;
const MAX_COORD_X = 1200;
const PIN_HEIGHT = 87;
const PIN_WIDTH = 65;

let map = document.querySelector(`.map`);
let mainMapPin = map.querySelector(`.map__pin--main`);
let formAddress = document.querySelector(`#address`);


const getAdressCoords = function () {
  formAddress.value = `${Math.floor(parseInt(mainMapPin.style.left, 10) + mainMapPin.clientWidth / 2)}, ${Math.floor(parseInt(mainMapPin.style.top, 10) + mainMapPin.clientHeight - PIN_HEIGHT)}`;
};

mainMapPin.addEventListener(`mousedown`, function (evt) {
  if (evt.button === window.constants.LEFT_MOUSE_BTN) {
    if (!window.utils.isPageActiveted) {
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

      let marginX = parseInt(mainMapPin.style.left, 10);
      let marginY = parseInt(mainMapPin.style.top, 10);
      let xMinCoord = map.getBoundingClientRect().x + PIN_WIDTH / 2;
      let xMaxCoord = MAX_COORD_X - PIN_WIDTH / 2;

      if ((moveEvt.clientX > xMinCoord || marginX > MIN_COORD_X) && (moveEvt.clientX < xMaxCoord || marginX < xMaxCoord)) {
        mainMapPin.style.left = `${mainMapPin.offsetLeft - shift.x}px`;
      }

      if ((moveEvt.clientY > MIN_COORD_Y || marginY > MIN_COORD_Y) && (moveEvt.clientY < MAX_COORD_Y - window.scrollY || marginY < MAX_COORD_Y - window.scrollY)) {
        mainMapPin.style.top = `${mainMapPin.offsetTop - shift.y}px`;
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
  }
});

mainMapPin.addEventListener(`keydown`, function (evt) {
  if (evt.key === window.constants.BUTTON_ENTER && !window.utils.isPageActiveted) {
    window.form.pageActived();
    window.utils.isPageActiveted = true;
  }
});
