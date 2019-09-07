'use strict';
var map = document.querySelector('.map');
var mainPin = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var adFormFields = adForm.querySelectorAll('.ad-form__element');
var addressField = document.querySelector('#address');

adFormFields.forEach(function (element) {
  element.setAttribute('disabled', 'disabled');
});

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

