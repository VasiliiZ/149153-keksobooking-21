'use strict';

(function () {
  const getRandomNumber = function (array) {
    return Math.floor(Math.random() * array.length);
  };
  window.utils = {
    getRandomFromRange(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    getRandomIndex(arr) {
      let randomNumber = getRandomNumber(arr);
      return arr[randomNumber];
    },
    getRandomLengthArr(arr) {
      let randomNumber = getRandomNumber(arr);
      let randomArray = [];
      for (let i = 0; i < randomNumber; i++) {
        randomArray.push(arr[i]);
      }
      return randomArray;
    },
    setDisabled(element) {
      for (let el of element) {
        el.setAttribute(`disabled`, `disabled`);
      }
    },
    removeDisabled(element) {
      for (let el of element) {
        el.removeAttribute(`disabled`);
      }
    },
  };
})();
