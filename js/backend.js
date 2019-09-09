'use strict';

(function () {
  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    var timeout = 5000;
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError(xhr.status + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Connection was lost');
    });
    xhr.addEventListener('timeout', function () {
      onError('The request took' + timeout / 1000 + 'seconds');
    });

    xhr.open('GET', 'https://js.dump.academy/keksobooking/data');
    xhr.send();
  };
})();

