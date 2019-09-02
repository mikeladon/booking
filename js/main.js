'use strict';
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var map = document.querySelector('.map');
var mapOverlay = document.querySelector('.map__overlay');
var pins = document.querySelector('.map__pins');
var ADS_COUNT = 8;
var PIN_HEIGHT = document.querySelector('.map__pin:last-child').offsetHeight;
var PIN_WIDTH = document.querySelector('.map__pin:last-child').offsetWidth;

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getChosenNumbers = function (min, max) {
  var chosenNumbers = [];
  for (var k = min; k <= max; k++) {
    chosenNumbers.push(k);
  }
  return chosenNumbers;
};

var arrayOfNumbers = getChosenNumbers(1, ADS_COUNT);

var getUniqueInt = function (min, max) {
  var uniqueNumber;
  var randomNumber = getRandomInt(min, max);
  if (arrayOfNumbers.indexOf(randomNumber) !== -1) {
    uniqueNumber = randomNumber;
    arrayOfNumbers.splice(arrayOfNumbers.indexOf(uniqueNumber), 1);
  } else {
    uniqueNumber = arrayOfNumbers[arrayOfNumbers.length - 1];
    arrayOfNumbers.splice(arrayOfNumbers.indexOf(uniqueNumber), 1);
  }
  return uniqueNumber;
};

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

var renderPins = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < ADS_COUNT; i++) {
    var similarAds = {
      'author': {
        'avatar': 'img/avatars/user0' + getUniqueInt(1, ADS_COUNT) + '.png',
      },
      'offer': {
        'type': TYPES[getRandomInt(0, TYPES.length - 1)],
      },

      'location': {
        'x': getRandomInt(0, mapOverlay.offsetWidth) - (PIN_WIDTH / 2),
        'y': getRandomInt(130, 630) - PIN_HEIGHT,
      }
    };
    fragment.appendChild(renderPin(similarAds));
  }
  pins.appendChild(fragment);
};

map.classList.remove('map--faded');
renderPins();
