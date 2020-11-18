'use strict';

let map = document.querySelector(`.map`);

const onPopupEscPress = (evt) => {
  if (evt.key === window.constants.BUTTON_ESC) {
    evt.preventDefault();
    window.popup.close();
  }
};
window.popup = {
  open(advert) {
    let popup = map.querySelector(`.popup`);
    if (popup) {
      map.removeChild(popup);
    }
    window.card.generateTemplate(advert);
    document.addEventListener(`keydown`, onPopupEscPress);
    let closeBtn = map.querySelector(`.popup__close`);
    closeBtn.addEventListener(`click`, this.close);

  },
  close() {
    let popup = map.querySelector(`.popup`);
    let pins = map.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    map.removeChild(popup);
    pins.forEach((pin)=>{
      if (pin.classList.contains(`map__pin--active`)) {
        pin.classList.remove(`map__pin--active`);
      }
    });
    document.removeEventListener(`keydown`, onPopupEscPress);
  }
};
