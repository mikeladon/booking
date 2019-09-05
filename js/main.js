'use strict';
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ADS_COUNT = 8;
var PIN_HEIGHT = document.querySelector('.map__pin:last-child').offsetHeight;
var PIN_WIDTH = document.querySelector('.map__pin:last-child').offsetWidth;
var map = document.querySelector('.map');
var mainPin = document.querySelector('.map__pin--main');
var mapOverlay = document.querySelector('.map__overlay');
var pins = document.querySelector('.map__pins');
var adForm = document.querySelector('.ad-form');
var adFormFields = adForm.querySelectorAll('.ad-form__element');
var addressField = document.querySelector('#address');

adFormFields.forEach(function (element) {
  element.setAttribute('disabled', 'disabled');
});


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

var getUniqueInt = function (arr) {
  var j;
  var temp;
  for (var i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
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
        'avatar': 'img/avatars/user0' + getUniqueInt(getChosenNumbers(1, ADS_COUNT)[i]) + '.png',
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

var onMainPinClick = function () {
  addressField.value = mainPin.offsetLeft + ', ' + mainPin.offsetTop;
  adFormFields.forEach(function (element) {
    element.removeAttribute('disabled', 'disabled');
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
  });
};

mainPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  onMainPinClick();
  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {
    evt.preventDefault();
    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
    mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
    addressField.value = parseInt(mainPin.style.left, 10) + ', ' + parseInt(mainPin.style.top, 10);
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    if (parseInt(mainPin.style.top, 10) < 60 || parseInt(mainPin.style.top, 10) > 660
      || parseInt(mainPin.style.left, 10) < -15 || parseInt(mainPin.style.left, 10) > 1055) {
      mainPin.style.top = 375 + 'px';
      mainPin.style.left = 570 + 'px';
      addressField.value = parseInt(mainPin.style.left, 10) + ', ' + parseInt(mainPin.style.top, 10);
    }
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});


renderPins();
