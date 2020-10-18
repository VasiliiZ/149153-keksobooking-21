'use strict';

(function () {
  const serverStatus = {
    OK: 200
  };
  window.backend = {
    load(onLoad, onError) {
      const xhr = new XMLHttpRequest();
      const url = `https://21.javascript.pages.academy/keksobooking/data`;
      xhr.responseType = `json`;
      xhr.addEventListener(`load`, function () {
        if (xhr.status === serverStatus.OK) {
          onLoad(xhr.response);
        } else {
          onError(`Ошибка загрузки данных: ${xhr.status} ${xhr.statusText}`);
        }
      });
      xhr.addEventListener(`error`, function () {
        onError(`Ошибка соединения`);
      });
      xhr.addEventListener(`timeout`, function () {
        onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
      });
      xhr.timeout = 10;
      xhr.open(`GET`, url);
      xhr.send();
    }
  };
})();
