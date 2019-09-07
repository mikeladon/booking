'use strict';
(function () {
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var ADS_COUNT = 8;
  var PIN_HEIGHT = document.querySelector('.map__pin:last-child').offsetHeight;
  var PIN_WIDTH = document.querySelector('.map__pin:last-child').offsetWidth;
  var mapOverlay = document.querySelector('.map__overlay');
  var pins = document.querySelector('.map__pins');

  var renderPin = function (pinData) {
    var element = document.createElement('button');
    var newImage = document.createElement('img');
    element.className = 'map__pin';
    element.style.top = pinData.location.y + 'px';
    element.style.left = pinData.location.x + 'px';
    newImage.src = pinData.author.avatar;
    newImage.alt = pinData.offer.type;
    newImage.style.width = '40px';
    newImage.style.height = '40px';
    element.appendChild(newImage);
    return element;
  };

  var getChosenNumbers = function (min, max) {
    var chosenNumbers = [];
    for (var k = min; k <= max; k++) {
      chosenNumbers.push(k);
    }
    return chosenNumbers;
  };

  var renderPins = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < ADS_COUNT; i++) {
      var similarAds = {
        'author': {
          'avatar': 'img/avatars/user0' + window.util.getUniqueInt(getChosenNumbers(1, ADS_COUNT)[i]) + '.png',
        },
        'offer': {
          'type': TYPES[window.util.getRandomInt(0, TYPES.length - 1)],
        },

        'location': {
          'x': window.util.getRandomInt(0, mapOverlay.offsetWidth) - (PIN_WIDTH / 2),
          'y': window.util.getRandomInt(130, 630) - PIN_HEIGHT,
        }
      };
      fragment.appendChild(renderPin(similarAds));
    }
    pins.appendChild(fragment);
  };

  renderPins();
})();
