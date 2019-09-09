'use strict';
(function () {
  var pins = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('button');

  var renderPin = function (item) {
    var element = pinTemplate.cloneNode(true);
    element.style.top = item.location.y + 'px';
    element.style.left = item.location.x + 'px';
    element.querySelector('img').src = item.author.avatar;
    element.querySelector('img').alt = item.offer.type;
    return element;
  };

  var renderPins = function (array) {
    var fragment = document.createDocumentFragment();
    array.forEach(function (element) {
      fragment.appendChild(renderPin(element));
    });
    pins.appendChild(fragment);
  };

  var successHandler = function (data) {
    renderPins(data);
  };

  var errorHandler = function (message) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = message;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.load(successHandler, errorHandler);
})();
