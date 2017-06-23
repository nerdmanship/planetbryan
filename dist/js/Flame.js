"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Flame = function () {
  function Flame(side) {
    _classCallCheck(this, Flame);

    this.target = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    this.target.setAttribute("width", side);
    this.target.setAttribute("height", side);
    this.target.setAttribute("fill", "red");

    var f = this.target;

    TweenMax.set(f, { rotation: 45 });
  }

  _createClass(Flame, [{
    key: "appendTo",
    value: function appendTo(parent) {
      parent.appendChild(this.target);
    }
  }]);

  return Flame;
}();
