'use strict';

(function () {
  const MAP = document.querySelector(`.map`);
  const onPopupEscPress = function (evt) {
    if (evt.key === window.constants.BUTTON_ESC) {
      evt.preventDefault();
      window.popup.closePopup();
    }
  };
  window.popup = {
    openPopup(advert) {
      const popup = MAP.querySelector(`.popup`);
      if (popup) {
        MAP.removeChild(popup);
      }
      window.card.generateCardTemplate(advert);
      document.addEventListener(`keydown`, onPopupEscPress);
      const closeBtn = MAP.querySelector(`.popup__close`);
      closeBtn.addEventListener(`click`, this.closePopup);

    },
    closePopup() {
      const popup = MAP.querySelector(`.popup`);
      MAP.removeChild(popup);
      document.removeEventListener(`keydown`, onPopupEscPress);
    }
  };
})();
