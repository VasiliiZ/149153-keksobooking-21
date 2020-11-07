'use strict';

(function () {
  const INTERVAL = 500;
  window.debounce = function (cb) {
    let lastTimeout = null;

    return function (...parameters) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb(...parameters);
      }, INTERVAL);
    };
  };
})();
