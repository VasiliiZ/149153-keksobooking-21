'use strict';

(function () {
  const TIMEOUT_INTERVAL = 1000;
  const METHODS = {
    GET: `GET`,
    POST: `POST`
  };
  const ServerStatus = {
    OK: 200
  };
  window.backend = {
    load(onLoad, onError) {
      const xhr = new XMLHttpRequest();
      const URL = `https://21.javascript.pages.academy/keksobooking/data`;
      xhr.responseType = `json`;
      xhr.addEventListener(`load`, function () {
        if (xhr.status === ServerStatus.OK) {
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
      xhr.timeout = TIMEOUT_INTERVAL;
      xhr.open(METHODS.GET, URL);
      xhr.send();
    },
    send(data, onLoad, onError) {
      const xhr = new XMLHttpRequest();
      const URL = `https://21.javascript.pages.academy/keksobooking`;
      xhr.responseType = `json`;
      xhr.addEventListener(`load`, function () {
        if (xhr.status === ServerStatus.OK) {
          onLoad();
        } else {
          onError(`Ошибка отправки данных: ${xhr.status} ${xhr.statusText}`);
        }
      });
      xhr.addEventListener(`error`, function () {
        onError(`Ошибка соединения`);
      });
      xhr.addEventListener(`timeout`, function () {
        onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
      });
      xhr.timeout = TIMEOUT_INTERVAL;
      xhr.open(METHODS.POST, URL);
      xhr.send(data);
    }
  };
})();
