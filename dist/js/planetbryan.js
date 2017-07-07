"use strict";

/* 

UTILITY LIBRARY

*/

// Returns random float value
function random(min, max) {
  if (max === null) {
    max = min;min = 0;
  }
  return min + Math.random() * (max - min);
}

// Returns a value on destination range based on the input value on source range
function map(value, sourceMin, sourceMax, destinationMin, destinationMax) {
  return destinationMin + (destinationMax - destinationMin) * ((value - sourceMin) / (sourceMax - sourceMin)) || 0;
}

// Returns index exponentially distributed
function expNorm(val, min, max, power) {
  var expValue = Math.pow(val - min, power);
  var expRange = Math.pow(max - min, power);

  return expValue / expRange;
}

// Returns degrees converted to radients
function degreesToRads(degrees) {
  return degrees * Math.PI / 180;
}

// Returns radients converted to degrees
function radsToDegrees(rads) {
  return rads / Math.PI * 180;
}

// Returns a random value on the range between value-offset and value+offset
function spread(value, offset) {
  var min = value - offset;
  var max = value + offset;

  return min + Math.random() * (max - min);
}

// Display data on screen in development
function displayData(data) {

  // Grab the div
  var dataDiv = document.querySelector("#data");

  // Create one if there isn't one already
  if (!dataDiv) {
    dataDiv = document.createElement("div");
    dataDiv.id = "data";
    dataDiv.style = "margin-left: 100px; color: white;";
    document.body.appendChild(dataDiv);
  }

  // Append the new data
  dataDiv.innerHTML = dataDiv.innerHTML + "<br/>" + data;
}
/* 

UTILITY LIBRARY END

*/
'use strict';

/* 

STATS

*/

javascript: (function () {
  var script = document.createElement('script');script.onload = function () {
    var stats = new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop() {
      stats.update();requestAnimationFrame(loop);
    });
  };script.src = '//rawgit.com/mrdoob/stats.js/master/build/stats.min.js';document.head.appendChild(script);
})();

/* 

STATS END

*/
"use strict";

/* 

PROJECT CONFIG

*/

var config = {
  "planet": {
    "y": 2100,
    "x": 120,
    "scale": 4
  },
  "flames": {
    "anim": true,
    "count": 60,
    "targets": [],
    "height": 30,
    "reflection": true,
    "smoke": 0.05
  },
  "flicker": true,
  "intro": true,
  "fps": 30,
  "particles": {
    "number": { "value": 500 },
    "opacity": {
      "value": 0.65,
      "random": true,
      "anim": { "enable": false }
    },
    "size": {
      "value": 1,
      "random": true,
      "anim": { "enable": false }
    },
    "line_linked": { "enable": false },
    "move": {
      "enable": false
    }
  },
  "retina_detect": true,
  "displayData": true
};

// Make changes to default config
function setConfig() {

  var mode = getMode();

  if (mode === "off") {
    if (config.displayData) displayData("Off");
    config.flames.anim = false;
    config.flames.count = 100;
    config.intro = false;
    config.flicker = false;
  } else if (mode === "minimal") {
    if (config.displayData) displayData("Minimal");
    config.flames.count = 30;
    config.flicker = false;
    config.flames.reflection = false;
    config.intro = false;
    config.fps = 15;
    config.flames.smoke = 0;
  } else if (mode === "limited") {
    if (config.displayData) displayData("Limited");
    config.intro = false;
    config.flames.count = 40;
    config.flames.smoke = 0;
  }
}

// Checks the client browser and returns an animation mode based on its capacity
function getMode() {

  // SPECIFY RULES

  // BROWSERS: chrome, firefox, msie, msedge, safari, android, ios, more...
  // DEVICES: mobile, tablet, more...
  // OS: mac, windows, windowsphone, chromeos, android, ios, webos, more...
  // Full list of flags: https://github.com/lancedikson/bowser


  // EXAMPLE: Creating a bundle rule
  var sketchyBrowsers = bowser.msie || bowser.msedge;

  // EXAMPLE: Creating custom rules
  // Target specific devices by filtering out its specific properties
  var newIphones = bowser.ios && bowser.mobile && window.innerWidth > 320; // iPhone 6 & 7
  var newIpads = bowser.tablet && bowser.ios && window.innerWidth > 768; // iPad Pro
  // Create a rule for all handheld
  var allHandheld = bowser.tablet || bowser.mobile;
  // Create a rule for all exceptions
  var exceptionsHandheld = newIpads || newIphones; // Add i.e. new MS Surface here...
  // Filter out the exceptions from the larger group
  var mostHandheld = allHandheld && !exceptionsHandheld;
  // Use mostHandheld and exceptionsHandheld as rules


  // Add rule to the array of the mode you want it to enable
  var modes = {
    off: [bowser.windowsphone, bowser.samsungBrowser, bowser.tizen],
    minimal: [mostHandheld, sketchyBrowsers],
    limited: [exceptionsHandheld, bowser.firefox, bowser.safari],
    default: [bowser.chrome]
  };

  // CHECK RULES TO RETURN A MODE

  // Iterate over each mode in modes
  for (var mode in modes) {

    var rules = modes[mode];
    var i;
    var len = rules.length;
    for (i = 0; i < len; i++) {
      // Check if any rule in the rules array is true
      // Return the mode of the FIRST rule to be true
      if (rules[i]) return mode;
    }
  }
}

/* 

PROJECT CONFIG END

*/
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* 

FLAME CLASS

*/

var Flame = function () {
  function Flame() {
    _classCallCheck(this, Flame);

    var side = 8;
    var shape = "";
    if (shape === "circle") {
      this.target = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      this.target.setAttribute("r", side / 2);
      this.target.setAttribute("fill", "red");
    } else {
      this.target = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      this.target.setAttribute("width", side);
      this.target.setAttribute("height", side);
      this.target.setAttribute("rx", side / 16);
      this.target.setAttribute("fill", "red");
    }
  }

  _createClass(Flame, [{
    key: "appendTo",
    value: function appendTo(parent) {
      parent.appendChild(this.target);
    }
  }, {
    key: "isSparkle",
    value: function isSparkle() {
      this.sparkle = true;
    }
  }, {
    key: "animate",
    value: function animate() {
      var f = this.target;

      // Flame settings
      var totTime = 12;
      var timeX = [spread(1, 0.3), spread(1, 0.2), spread(1, 0.5)];
      var timeS = [spread(0.3, 0.15), spread(2, 0.2), spread(4.5, 0.2)];
      var timeC = [spread(1, 0.2), spread(2, 0.3), spread(1, 0.3)];

      var yEase = Power1.easeOut;

      var xMin = 40;
      var xMax = spread(70, 10);

      var y = [193, spread(175, 1), spread(170, 1), spread(120, 1), spread(config.flames.height, 25)];

      var x = [spread(xMin, 12), spread(xMin, 8), spread(4, 2), spread(10, 10), spread(xMax + 150, 100)];

      var s = [0.5, spread(2, 0.3), spread(0.2, 0.15), spread(4, 1), spread(1, 0.5)];

      var c = ["hsl(" + random(10, 25) + ", " + random(75, 85) + "%, 60%)", "hsl(45, 100%, " + random(75, 95) + "%)", "hsl(45,0%,40%)" // gray
      ];

      var a = [1, config.flames.smoke, 0];

      // Sparkle settings
      if (this.sparkle) {
        // scale
        var _s = spread(0.1, 0.025);
        s = [_s, _s, _s, _s, _s];

        // fade timing
        timeS = [spread(4, 1), spread(4, 1), 0.1];
        timeC = [spread(1, 0.2), spread(2, 0.3), spread(1, 0.3)];

        // speed rising
        yEase = Power4.easeOut;
        y[3] = spread(25, 25);

        // percieved brightness
        c[0] = "hsl(40,100%,90%)";
        c[1] = "hsl(" + random(30, 50) + ",100%, " + random(50, 85) + "%)";

        // spread width
        x = [spread(xMin, 20), spread(xMin, 20), spread(xMin, 20), spread(xMin, 20), spread(xMin, 100)];
        timeX = [spread(2, 0.1), spread(2, 0.5), spread(2, 0.5)];
      }

      // Start settings
      TweenMax.set(f, { fill: c[0], x: x[0], y: y[0], scale: s[0], autoAlpha: a[0], rotation: 45, transformOrigin: "bottom center" });

      // Timeline
      this.tl = new TimelineMax({ repeat: -1, paused: true });

      this.tl.add("start")
      // Y
      .to(f, totTime - 0.5, { bezier: [{ y: y[1] }, { y: y[2] }, { y: y[3] }, { y: y[4] }], ease: yEase }, "start =+0.5")

      // X
      .to(f, timeX[0], { x: x[1], ease: Power1.easeOut }, "start").to(f, timeX[1], { x: "+=" + x[2], ease: Power1.easeInOut }, timeX[0]).to(f, timeX[2], { x: "-=" + x[3], ease: Power1.easeInOut }, timeX[0] + timeX[1]).to(f, totTime - (timeX[0] + timeX[1] + timeX[2]), { x: x[4], ease: Power1.easeIn }, timeX[0] + timeX[1] + timeX[2])

      // SCALE
      .to(f, timeS[0], { scale: s[1], ease: Power1.easeOut }, "start").to(f, timeS[1], { scale: s[2], ease: Power1.easeInOut, transformOrigin: "top center" }, timeS[0]).to(f, timeS[2], { scale: s[3], ease: Power1.easeInOut }, timeS[0] + timeS[1]).to(f, totTime - (timeS[0] + timeS[1] + timeS[2]), { scale: s[4], ease: Power1.easeOut }, timeS[0] + timeS[1] + timeS[2])

      // COLOR
      .to(f, timeC[0], { fill: c[1], ease: Power1.easeInOut }, "start").to(f, timeC[1], { fill: c[1], ease: Power1.easeInOut }, timeC[0]).to(f, timeC[2], { fill: c[2], ease: Power1.easeInOut }, timeS[0] + timeS[1])

      // ALPHA
      .to(f, timeC[1], { autoAlpha: a[1], ease: Power1.easeOut }, timeS[0] + timeS[1]).to(f, totTime - (timeS[0] + timeS[1] + timeC[1]), { autoAlpha: a[2], ease: Power2.easeOut }, timeS[0] + timeS[1] + timeC[1]);
    }
  }]);

  return Flame;
}();

/* 

FLAME CLASS END

*/
'use strict';

/* 

GET SVG

*/

function getSVG() {
  return '<svg id="planetbryan-artwork" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 1200 1200">\n            <defs>\n              ' + (config.flames.reflection ? '<symbol id="symFire" data-anim="fireplace" width="150" height="200"></symbol>' : '') + '\n              <mask id="visor-mask">\n                <path id="visor-mask-path" fill="url(#linearGradient-0)" d="M583.14 146.58c1.37.4 2.63.62 3.6.62 10.8 0 19.8-6.7 19.8-8.63 0-6.94-10.6-11.58-17.56-12.12-.9-.07-1.88-.04-2.9.08-4.2 2.24-7.4 6.35-7.4 11.04 0 3.5 1.8 6.7 4.46 9z"></path>\n              </mask>\n              <lineargradient id="linearGradient-0" x1="10%" x2="0%" y1="0%" y2="100%">\n                <stop stop-color="#000000" offset="0%"></stop>\n                <stop stop-color="#FFFFFF" offset="100%"></stop>            \n              </lineargradient>\n              <lineargradient id="linearGradient-1" x1="106.35%" x2="0%" y1="66.96%" y2="33.94%">\n                <stop stop-color="#021117" offset="0%"></stop>\n                <stop stop-color="#01080A" offset="42.24%"></stop>\n                <stop stop-color="#021117" offset="100%"></stop>\n              </lineargradient>\n              <lineargradient id="linearGradient-2" x1="50%" x2="50%" y1="1.42%" y2="100%">\n                <stop stop-color="#0A181C" offset="0%"></stop>\n                <stop stop-color="#030A0A" offset="100%"></stop>\n              </lineargradient>\n              <lineargradient id="linearGradient-3" x1="41.71%" x2="79.34%" y1="100%" y2="0%">\n                <stop stop-color="#4B2123" offset="0%"></stop>\n                <stop stop-color="#DEA77A" offset="100%"></stop>\n              </lineargradient>\n              <lineargradient id="linearGradient-4" x1="50%" x2="50%" y1="100%" y2="0%">\n                <stop stop-color="#4B2123" offset="0%"></stop>\n                <stop stop-color="#B38C64" offset="100%"></stop>\n              </lineargradient>\n              <lineargradient id="linearGradient-5" x1="100%" x2="68.7%" y1="100%" y2="-9.95%">\n                <stop stop-color="#4B2123" offset="0%"></stop>\n                <stop stop-color="#B08862" offset="100%"></stop>\n              </lineargradient>\n              <lineargradient id="linearGradient-6" x1="50%" x2="50%" y1="0%" y2="100%">\n                <stop stop-color="#0A181C" offset="1.42%"></stop>\n                <stop stop-color="#030A0A" offset="100%"></stop>\n              </lineargradient>\n              <lineargradient id="linearGradient-7" x1="67.76%" x2="13.79%" y1="100%" y2="-4.97%">\n                <stop stop-color="#532928" offset="0%"></stop>\n                <stop stop-color="#A67E5C" offset="100%"></stop>\n              </lineargradient>\n              <lineargradient id="linearGradient-8" x1="100%" x2="0%" y1="105.74%" y2="0%">\n                <stop stop-color="#4B2123" offset="0%"></stop>\n                <stop stop-color="#D9A377" offset="100%"></stop>\n              </lineargradient>\n              <lineargradient id="linearGradient-9" x1="50%" x2="50%" y1="0%" y2="100%">\n                <stop stop-color="#001D29" offset="0%"></stop>\n                <stop stop-color="#00090D" offset="100%"></stop>\n              </lineargradient>\n              <lineargradient id="linearGradient-10" x1="-11.17%" x2="111.5%" y1="50%" y2="82.1%">\n                <stop stop-color="#19120E" offset="0%"></stop>\n                <stop stop-color="#2B2019" offset="100%"></stop>\n              </lineargradient>\n              <lineargradient id="linearGradient-11" x1="-18.83%" x2="41.01%" y1="54.1%" y2="58.8%">\n                <stop stop-color="#879398" offset="0%"></stop>\n                <stop stop-color="#0C0F0F" offset="100%"></stop>\n              </lineargradient>\n              <lineargradient id="linearGradient-12" x1="115.85%" x2="22.18%" y1="41.87%" y2="61.2%">\n                <stop stop-color="#A4B1B8" offset="0%"></stop>\n                <stop stop-color="#222929" offset="100%"></stop>\n              </lineargradient>\n              <lineargradient id="linearGradient-13" x1="128.5%" x2="40.16%" y1="54.69%" y2="60.74%">\n                <stop stop-color="#AAB7BE" offset="0%"></stop>\n                <stop stop-color="#212828" offset="100%"></stop>\n              </lineargradient>\n              <lineargradient id="linearGradient-14" x1="113.23%" x2="0%" y1="34.87%" y2="50%">\n                <stop stop-color="#263834" offset="0%"></stop>\n                <stop stop-color="#090E0D" offset="100%"></stop>\n              </lineargradient>\n              <lineargradient id="linearGradient-15" x1="-29.11%" x2="88.85%" y1="39.38%" y2="61.63%">\n                <stop stop-color="#253633" offset="0%"></stop>\n                <stop stop-color="#030505" offset="100%"></stop>\n              </lineargradient>\n              <lineargradient id="linearGradient-16" x1="36.18%" x2="98.76%" y1="33.73%" y2="66.78%">\n                <stop stop-color="#BECCD4" offset="0%"></stop>\n                <stop stop-color="#1D2323" offset="100%"></stop>\n              </lineargradient>\n              <lineargradient id="linearGradient-17" x1="0%" x2="90.57%" y1="40.75%" y2="54.32%">\n                <stop stop-color="#283A36" offset="0%"></stop>\n                <stop stop-color="#030504" offset="100%"></stop>\n              </lineargradient>\n              <lineargradient id="linearGradient-18" x1="-10.8%" x2="106.7%" y1="38.09%" y2="54.98%">\n                <stop stop-color="#D8E7F0" offset="0%"></stop>\n                <stop stop-color="#2C3538" offset="100%"></stop>\n              </lineargradient>\n              <lineargradient id="linearGradient-19" x1="0%" x2="59.88%" y1="40.75%" y2="50%">\n                <stop stop-color="#392C26" offset="0%"></stop>\n                <stop stop-color="#1E1714" offset="100%"></stop>\n              </lineargradient>\n              <lineargradient id="linearGradient-20" x1="0%" x2="75.71%" y1="7.13%" y2="88.7%">\n                <stop stop-color="#2F3233" offset="0%"></stop>\n                <stop stop-color="#212628" offset="100%"></stop>\n              </lineargradient>\n              <lineargradient id="linearGradient-21" x1="0%" x2="75.71%" y1="7.13%" y2="88.7%">\n                <stop stop-color="#5C6266" offset="0%"></stop>\n                <stop stop-color="#23333A" offset="100%"></stop>\n              </lineargradient>\n              <lineargradient id="linearGradient-22" x1="50.01%" x2="50.01%" y1="0%" y2="103.26%">\n                <stop stop-color="#14191C" offset="0%"></stop>\n                <stop stop-color="#0B1619" offset="99.96%"></stop>\n              </lineargradient>\n              <lineargradient id="linearGradient-23" x1="100%" x2="8.89%" y1="19.63%" y2="81.41%">\n                <stop stop-color="#4B2123" offset="0%"></stop>\n                <stop stop-color="#BC956A" offset="100%"></stop>\n              </lineargradient>\n              <lineargradient id="linearGradient-24" x1="50.01%" x2="50.01%" y1="2.19%" y2="103.11%">\n                <stop stop-color="#1B1B1C" offset="0%"></stop>\n                <stop stop-color="#081519" offset="99.96%"></stop>\n              </lineargradient>\n              <lineargradient id="linearGradient-25" x1="84.79%" x2="50%" y1="54.88%" y2="28.72%">\n                <stop stop-color="#4B2123" offset="0%"></stop>\n                <stop stop-color="#BC956A" offset="100%"></stop>\n              </lineargradient>\n            </defs>\n            <g id="Artwork-v2" fill="none" fill-rule="evenodd">\n              <g id="SVG">\n                <g id="planet" data-anim="planetBody">\n                  <g id="body">\n                    <path id="round" fill="#030A09" d="M612.08 105.7l-23.5-5.45-17.4 7.87-38.24-3.62-20.53 10-17.7-6.6-29.07 18.58-23.58-1.18-17.03 13.73-22.07-2.32-4.32 6.1c-24.4 2.4-31.1-7.14-35.94-8.85-5.95-2.1-43.58 13.82-121.07 81.58-47.28 41.34-57.87 75.46-57.84 85.87.02 10.4 7.93 8.2 5.26 16.37-.28.87-.6 1.88-.92 3l-5.67 3.78-7.82 22.82-20 50.2-26.28 34.1 2.43 14.83-12.3 29.8 7.77 5.35c-9.55 38.1-14.63 78-14.63 119.07 0 269.62 218.68 488.2 488.43 488.2s488.42-218.58 488.42-488.2c0-56.7-9.67-111.12-27.45-161.74l-14.36-48.22-13.96-48.34-26.67-15.67-15.4-36.86-25.25-30.1-3.57-8.26-18.34-8.38-13.84-18.94-28.14-10.65-31-27.5-10.97-3.33c-9.7-9.54-25.7-22.52-24.97-29.8 1.97-19.3-25.83-22.4-62.77-34.4-36.93-12-55.13-25.05-71-9.07-6.04 6.08-28.46 4.68-43.13 4.5l-45.6-8.26z"></path>\n                    <path id="planet-edge" fill="#021117" d="M532.62 104.66l.32-.16 34.75 3.3 3.54.53-30.28 3.38zM494.54 108l.15-.1 17.16 6.4-11.14 2.43zM443.15 125.35l22.1 1.1-11.2 5.34z"></path>\n                    <path id="planet-edge" fill="#010E12" d="M362.7 133.95c2.1.75 6.94 5.38 17.75 7.98 10.82 2.6 29.62 3.64 30.93 3.87-4.2 5.25-35.7 19.44-49.52 24.98-16.8 6.74-2.3-11.17-7.03-14.95-4.74-3.77-8.58-3.48-8.58-7.45 0-3.98 13.7-11.17 12.04-12.83-1.53-1.5-29.57 13.6-34.68 16.37 23.26-14.94 35.84-19.12 39.07-17.97z"></path>\n                    <path id="planet-edge" fill="#021117" d="M653.28 113.17l-41.2-7.46-23.5-5.45-.16.07 11.58 10.9z" opacity=".58"></path>\n                    <g id="crater" fill="url(#linearGradient-1)" transform="translate(712.98 101.504)">\n                      <path d="M55.7 29.75s58.97 19.74 61.17 13.62c2.2-6.1-26.52-14.45-58.78-24.93C25.83 7.96 5.7-1.36 2.34 5.1-1 11.57 55.7 29.75 55.7 29.75z"></path>\n                    </g>\n                    <path id="planetdetail24" fill="#021117" d="M533.12 125.12l11.4-.53 4.2.52s-2.27 1.12-3.6 1.36c-1.3.24-9.5 1.03-9.5 1.03l-7.98-.5 5.48-1.88z" opacity=".5"></path>\n                    <path id="planetdetail23" fill="#021117" d="M511.24 130.36l14.4-.67 5.3.66s-2.85 1.42-4.5 1.72c-1.68.3-12.05 1.3-12.05 1.3l-10.1-.64 6.94-2.38z" opacity=".7"></path>\n                    <path id="planetdetail22" fill="#021117" d="M594.98 118.78l18.5 2.48-13.27 1-13.8-1.5z" opacity=".5"></path>\n                    <path id="planetdetail21" fill="#021117" d="M699.05 142.66l30.38 4.07-21.8 1.65-21.55-4.3z" opacity=".6"></path>\n                    <path id="planetdetail20" fill="#021117" d="M757.1 159.76l21.94 6.85 7.08 7.1-24.2-5-22.08-11.4z" opacity=".6"></path>\n                    <path id="planetdetail19" fill="#021117" d="M864.04 238.9l19.43 12.28 5 8.7-22.08-11.1-18.4-16.7z" opacity=".6"></path>\n                    <path id="planetdetail18" fill="#021117" d="M889.34 273.22l29.86 24.47 6.55 15.46-34.5-22.97L864 258.57z" opacity=".6"></path>\n                    <path id="planetdetail17" fill="#021117" d="M852.15 199.58l12.2 7.73 3.14 5.46-13.88-6.96-11.54-10.5z" opacity=".6"></path>\n                    <path id="planetdetail16" fill="#021117" d="M898.65 223.08l12.2 7.73 3.14 5.46-13.88-6.96-11.54-10.5z" opacity=".6"></path>\n                    <path id="planetdetail15" fill="#021117" d="M898.65 241.08l12.2 7.73 3.14 5.46-13.88-6.96-11.54-10.5z" opacity=".6"></path>\n                    <path id="planetdetail14" fill="#021117" d="M915.9 263.68l30.06 21.65-12.24 2.78-12.62-9.14-12.85-15.28z" opacity=".6"></path>\n                    <path id="planetdetail13" fill="#021117" d="M553.23 127.4l22.18.6 8.2 3.46-22.18.37-11.84-1.06z" opacity=".6"></path>\n                    <path id="planetdetail12" fill="#021117" d="M534.1 134.03h13.77l8.16 2.58-12.44 2.6H533l-3.15-1.24z" opacity=".8"></path>\n                    <path id="planetdetail11" fill="#021117" d="M624.05 127.66l30.38 4.07-21.8 1.65-20.4-2.86z" opacity=".6"></path>\n                    <path id="planetdetail10" fill="#021117" d="M423.17 153.6l19.47-4.38 4.88 1.2-23.45 8.14z"></path>\n                    <path id="planetdetail9" fill="#021117" d="M341.47 190.3l28.9-10.15-18.65 11.36-16.4 7.67z" opacity=".5"></path>\n                    <path id="planetdetail8" fill="#021117" d="M271.94 241.94l26.96-14.56-16.65 14.14-15 10.14z" opacity=".5"></path>\n                    <path id="planetdetail7" fill="#021117" d="M313.25 228.04l50.95-20.96-32.44 22.16-26.85 20.34z" opacity=".5"></path>\n                    <path id="planetdetail6" fill="#021117" d="M243.25 273.05l49.9-22.85-31.4 24.04-18.5 19.34-10.22-4.05z" opacity=".5"></path>\n                    <path id="planetdetail5" fill="#021117" d="M308.53 264.28l52.5-32.05 11.23 5.83-40.57 27.7-35.95 19.14z" opacity=".5"></path>\n                    <path id="planetdetail4" fill="#021117" d="M341.53 181.74l27.08-8.44-20.38 10.12z" opacity=".5"></path>\n                    <path id="planetdetail3" fill="#021117" d="M372.5 186.36l27.07-8.45L374.9 191h-11.75z" opacity=".5"></path>\n                    <path id="planetdetail2" fill="#021117" d="M449.85 141.4l16.24-3.9 2.24 1.18-23.35 7.58 1.05-2.18z" opacity=".6"></path>\n                    <path id="planetdetail1" fill="#021117" d="M460.8 143.64l19.87-3.47 2.63 1.37-24.93 7-4.2-.9z" opacity=".6"></path>\n                  </g>\n                  <g id="ground">\n                    <path id="fire" data-anim="ground" fill="#34191A" d="M721 167.1s-3.26-.56-12.33-2.57c-9.06-2.02-54-3.13-54-3.13l-27.53-6.52s17.83-5.58 28.37-8.44c10.54-2.85 24.15-3.53 24.15-3.53s-77.53-5-91.9-5c-14.4 0-3.3 13.62-3.3 13.62l-16.47-12.6s-29.2 1.5-42.95 3.12c-13.75 1.6-32.22 5.65-32.22 5.65l2.43 10.48-14.12.94-9.15-7.6c-27.4 5.46-78.1 20.55-83.34 23.1-5.24 2.58 10.97-1.8 18-2.48 7.06-.68 19-1.27 19-1.27l-4.4 9.4s-52.07 14.5-48.16 17.46c3.92 2.95 31.5-4.43 50.77-7.5 19.28-3.1 16.73-2.82 16.73-2.82l-1 2.82 1.66 1.6s-5.14.04-21.4 4.8c-16.24 4.78-31.45 16.73-16.1 12.4 15.34-4.3 55.68-13.54 55.68-13.54l33.43 14.6L568 221.4l63.94 38.22-22.97-27.64 95.12-19.86 16.92-45z"></path>\n                    <path id="fire" data-anim="ground" fill="#55352C" d="M698.62 168.96c-12.54-5.9-44.52-7.8-44.52-7.8l-25.53-16.48s-4.68-1.66-24.24-1.76c-19.56-.1-52.4 2.4-72.1 3.4-19.7.97-37.53 3.74-37.53 3.74v8l-13.7 1.28-6.2-5.27s-24.36 5.58-34.42 9.5c-1.73.67-4.32 1.93-7.38 3.54l-11.83 13.1-18.6 5.54c-1.74.52-5.14 4.9-4.75 6.53.22.9 3.04 2.4 5.55 1.84 3.1-.67 7.65-1.64 12.48-2.56 10.83-2.06 23.08-4.05 23.33-3.87.18.14 2.07 4.12 2.07 4.12s-8.4 1-17.47 3.6c-4.6 1.34-8.6 2.87-11.44 4.04-2.72 1.14-1.2 3.54.6 4.34 1.96.9 11.83 0 11.83 0s133.76 35 175.23 32.36c3.88-.25 7.7-.67 11.42-1.23l-2.7-3.04 85.36-35.68s9.9-4.14 13.34-9.98c3.45-5.84 3.74-11.36-8.8-17.24z"></path>\n                    <path id="fire" data-anim="ground" fill="#7D5642" d="M617.2 172.35c-8.44 0-19.65-1.33-19.65-1.33l-10.46-2.35s-24.34-.27-36.5 0c-12.17.26-29.86 1.44-29.86 1.44l-5.7.92-9 1.33-5.15-2.03s-26.78 4.2-28.44 4.97c-1.65.78 13.86-.86 8 .78-5.86 1.63-15.48 1.57-20.4 3.72-4.92 2.15 26.9-.85 22.23 0-4.68.85-14.8 4.07-17.7 5-2.92.95 30.43-.9 30.43-.9l20 4.16s24.6 1.37 33.92 2.16c9.32.8 28.24 4.16 34.3 4.3 6.06.14-5.2-3.5 0-3.5s47.1-4.74 62-7.1c14.92-2.38-19.6-11.57-28.05-11.57z"></path>\n                    <path id="fire" data-anim="ground" fill="#492B25" d="M604.24 180.84l-17.07-3.27-9.46-2.4-5.9-1.33-8.57.8-4.17.13-4.07-.93-20.62.8-3.22.52-5.07.75-2.9-1.13-16.05 2.8 4.5.45-7.1 1.42-4.73 2 11.12-.8v.95l-8.34 1.45 17.28-.62 10.07 3.56 8.54-.8 5.3 1.82 6.5-1.03 12.93 2.3 6.4-1.86 27.8-2.23z"></path>\n                  </g>\n                  <g id="rock5">\n                    <path id="base" fill="url(#linearGradient-2)" d="M.45 49.36L5.97 26 16.7 14.94l2.45-.67 4.24-11.8L42.8.42l4.4 17.94-4.4 32.72-11.6 3.23z" transform="translate(622.845 107.167)"></path>\n                    <path id="face" fill="#2A2926" d="M623.3 156.53l5.52-23.37 10.76-11.14 3.75 1.68-1.7-1.12 4.6-12.92 19.4-2.08 1.67 15-.87 2.57-3.93-.5 4.8 1.95-6.93 16.57-6.73-1.73 7.77 4.62-7.35 15.4z"></path>\n                    <path id="fire" data-anim="rockFace" fill="url(#linearGradient-3)" d="M31.5 1.62L42.8.42l1.66 15-.87 2.56-3.43-.43c-.58-6.8-3.65-12.63-8.67-15.93zm8.68 16.08l4.28 1.73L37.53 36l-3.63-.93c3.93-3.85 6.37-9.2 6.37-15.14 0-.76-.03-1.5-.1-2.23zm-6.96 18l5.35 3.2-7.36 15.4-16.43-2.65c6.42-2.84 11.35-5.5 12.4-7.38.75-1.35.07-2.8-1.47-4.2 2.8-.93 5.36-2.43 7.52-4.36z" transform="translate(622.845 107.167)"></path>\n                    <g id="highlights" data-anim="rockHl" fill="#EFC082">\n                      <path id="highlight3" d="M662.7 124.72l4.18 2.53.4-.57z" opacity="0.5"></path>\n                      <path id="highlight2" d="M653.86 141.57l7.07 5.37.3-.95z" opacity="0.5"></path>\n                      <path id="highlight1" d="M665.56 107.6l-10.62 1.16 1.18.67z" opacity="0.5"></path>\n                    </g>\n                  </g>\n                  <g id="rock4">\n                    <path id="base" fill="#0D0A06" d="M571.22 152.4l-6-27.16 1.22-11.86 12.8-1.48 5.5 9.97-.16 29.68z"></path>\n                    <path id="face" fill="#3A3934" d="M571.22 152.4l-2.93-13.27 12.95-2.58-13.27 1.15-2.75-12.46 1.22-11.86 12.8-1.48 4.87 8.84s-8.04.94-7.93 1.13c.1.2 8.55 0 8.55 0l-.17 29.68-13.36.86z"></path>\n                    <path id="fire" data-anim="rockFace" fill="url(#linearGradient-4)" d="M13.87 40.6l2.93-13.3-12.95-2.57 13.27 1.15 2.75-12.46-1.22-11.86L5.85.08.96 8.9S9 9.87 8.9 10.06c-.1.2-8.56 0-8.56 0L.5 39.73l13.37.86z" transform="matrix(-1 0 0 1 585.095 111.82)"></path>\n                    <g id="highlights" data-anim="rockHl" fill="#EFC082">\n                      <path id="highlight2" d="M584.78 121.83l-11.08.2 11 2.04z" opacity="0.5"></path>\n                      <path id="highlight1" d="M568.37 139.17l13.6-2.73-13.07 4.85z" opacity="0.5"></path>\n                    </g>\n                  </g>\n                  <g id="rock3">\n                    <path id="base" fill="#0D0A08" d="M495 158.17l.55-13.26-.97-1.1.5-15.97-1-.87-.2-7.16-12.53-3.04-6.68 9.23 2.5 16.3-.66 1.4 4.44 15.65z"></path>\n                    <path id="face" fill="#2A2926" d="M495 158.17l.56-14.2-4.27.94 2.8-2.05.97-15.02-12.58 1.1 9.62-3.1 1.75-6.03-12.52-3.04-6.68 9.23 3.7 14.8 10.23.65-12.1 2.26 4.44 15.65z"></path>\n                    <path id="fire" data-anim="rockFace" fill="url(#linearGradient-5)" d="M24.37 39.92L23.2 25.75l-4.13 1.46 2.55-2.38-.88-15.02L8.4 12.4l9.17-4.24 1-6.2L5.77.5l-5.5 9.98 5.5 14.25 10.2-.6-11.72 3.72 6.3 14.98z" transform="rotate(7 -707 3946.427)"></path>\n                    <g id="highlights" data-anim="rockHl" fill="#EFC082">\n                      <path id="highlight4" d="M476.75 143.85l.2 1.6 11.37-3.76z" opacity="0.5"></path>\n                      <path id="highlight3" d="M495.5 144.14l-7.1 1.3 7.12.06z" opacity="0.5"></path>\n                      <path id="highlight2" d="M495.17 129.16l-14.2.07 14.17-1.5z" opacity="0.5"></path>\n                      <path id="highlight1" d="M493.74 119.8l-12.2-3.1-3.5 4.7 3.87-3.44z" opacity="0.5"></path>\n                    </g>\n                  </g>\n                  <g id="rock2">\n                    <path id="base" fill="url(#linearGradient-6)" d="M46.8 65.25l-6-15.83-1.54-1.53-2.62-9.38-1.57-.5L23.2 8.16h-.76l-1.32-3.1-14.44-5L.12 36.4l6.56 36.36h20.06z" transform="translate(394.382 107.398)"></path>\n                    <path id="face" fill="#2A2926" d="M441.2 172.65l-5.88-15.96h-18.5l16.97-1.38-2.7-9.44-9.98-.44h8.45l-11.97-29.88h-9.72l8.4-1.26-.78-1.82-14.44-5.02-1 16.88h4l-1.8.65 4.9 7.58h10.44l-11.58 1.08 3.46 2.5v22.59l8.12 14.95 16.77-3.58-18.17 4.46 4.92 5.6z"></path>\n                    <path id="fire" data-anim="rockFace" fill="url(#linearGradient-7)" d="M46.8 65.25L40.95 49.3h-18.5L39.4 47.9l-2.68-9.44-9.98-.44h8.45L23.2 8.16H13.5l8.4-1.26-.78-1.82L6.68.06l-1 16.88h4l-1.8.65 4.9 7.58h10.44l-11.58 1.08 3.46 2.5v22.59l8.12 14.95L40 62.72 21.8 67.18l4.92 5.6z" transform="translate(394.382 107.398)"></path>\n                    <g id="highlights" data-anim="rockHl" fill="#EFC082">\n                      <path id="highlight6" d="M408.2 115.58l9.44-.02.3 1.06z" opacity="0.5"></path>\n                      <path id="highlight5" d="M400.13 122.7v1.7l8.06-.6z" opacity="0.5"></path>\n                      <path id="highlight4" d="M406.2 133.65l11.35-1.05-9.12 2.82z" opacity="0.5"></path>\n                      <path id="highlight3" d="M431.04 145.87l.35 1.26-9.8-1.54z" opacity="0.5"></path>\n                      <path id="highlight2" d="M435.3 156.77l.54 1.53-13.5-1.53z" opacity="0.5"></path>\n                      <path id="highlight1" d="M416.4 174.55l13.9-2.82-12.84 4.27z" opacity="0.5"></path>\n                    </g>\n                  </g>\n                  <g id="rock1">\n                    <path id="base" fill="url(#linearGradient-6)" d="M37.9 47.07l-5.2-13.6-.7.04-9.44-21.62-.76.37-3.16-6.84L8.78.5l-8.63 8L24.6 50.72l11.68-.6z" transform="translate(404.882 141.7)"></path>\n                    <path id="face" fill="#3F3E39" d="M442.86 188.93l-5.28-13.75-.7.04-9.45-21.74-3.96 1.65 2.7-2.3-2.65-5.72-9.86-4.92.37 7.18 4.46 5 3.1-1.3-2.5 4.2 7.6 10.6 4.36-1.38-4.93 3.8 15.2 21.52z"></path>\n                    <path id="fire" data-anim="rockFace" fill="url(#linearGradient-8)" d="M37.98 47.23L32.7 33.48l-.7.04-9.45-21.74-3.96 1.65 2.68-2.3-2.64-5.72L8.78.5l.37 7.18 4.46 5 3.12-1.3-2.5 4.2 7.6 10.6 4.36-1.38-4.93 3.8 15.2 21.52z" transform="translate(404.882 141.7)"></path>\n                    <g id="highlights" data-anim="rockHl" fill="#EFC082">\n                      <path id="Path-9" d="M414.05 149.5l-.33-7.35 7.57 3.87-6.6-1.7z" opacity="0.5"></path>\n                      <path id="Path-18" d="M419.07 157.3l2.46-4.16-1.6 5.32z" opacity="0.5"></path>\n                      <path id="Path-19" d="M428.07 155.04l-.6-1.5-3.9 1.5z" opacity="0.5"></path>\n                      <path id="Path-20" d="M426.12 170.26l.9 1.2 4.12-5z" opacity="0.5"></path>\n                      <path id="Path-21" d="M437.68 175l2.56 7.9-3.1-6.78-2.54-1.1z" opacity="0.5"></path>\n                    </g>\n                  </g>\n                  <g id="bobby">\n                    <path id="shadow" fill="#040B0C" d="M624.8 150.16s-9.44 1.28-14.87 3.2c-3.23 1.15-8.27 3.3-11.5 4.44-3.23 1.15-13.42 6.47-13.42 6.47s-2.06 8.06 1.6 10.52c.75.5 6.44-1.68 6.15-1.14-.3.54-1.8 1.8-1.8 1.8s21.6-3.25 26.55-5.45c4.95-2.2 3.65-3.33 6.27-4.7 2.62-1.37 6.22-2.95 9.08-4.2 7.95-3.53 15.83-7.4 17.16-9.67.77-1.35.08-2.78-1.46-4.2 8.46-2.78 14.58-10.75 14.58-20.14 0-7.8-3.16-14.6-8.73-18.28l-8.17.8-4.63 12.97 1.7 1.1-3.73-1.68-10.75 11.08-4.02 17.06z" opacity=".83"></path>\n                    <g id="backpack">\n                      <path fill="#7E9C9E" d="M608.03 166.44l.02-15.66c.1-3.2.1-5-1.57-5.07l-10.06-1.1c-1.68-.06-2.25 2.5-2.36 5.7l-1.1 17c-.12 3.2 14.96 2.33 15.07-.86z"></path>\n                      <path id="backpack_shade" fill="#172C2E" d="M604 168.3v-15.65c.12-3.2.12-5-1.55-5.07l-10.07-1.1c-1.68-.07-2.25 2.5-2.36 5.68l-1.1 17.02c-.12 3.2 14.96 2.32 15.07-.87z"></path>\n                    </g>\n                    <g id="body">\n                      <path id="lowerbody-copy" fill="#7E9C9E" d="M591.5 170.6c3.3-.3 4.48-1.32 6.4-2.58 1.9-1.26 5.05 1.1 5.05-2.34 0-3.5-7.08-2.43-12.8-1.58-5.74.85-9-3.45-9-2.47 0 6.64 3.5 9.6 10.36 8.96z"></path>\n                      <path id="upperbody" fill="#A7C2C5" d="M594.28 142.82c2.68 0 5.38 2.76 7.25 6.52 1.88 3.76 1.38 16 1.38 16s-4.98 2.36-16.22 2.07c-11.24-.27-3.88-11.86-.46-16.98 2.4-3.6 5.53-7.6 8.06-7.6z"></path>\n                    </g>\n                    <g id="legs">\n                      <path id="chin" fill="#C1D9DC" d="M578.57 170.25c-.85-.8-1.38-1.92-1.38-3.17 0-2.4 1.95-4.34 4.36-4.34 2.42 0 2.8 2.5 3.8 4.34.45.85 1.04 1.47 1.54 1.96.6.58 2.06 3.6.76 4.7s-8.4-2.85-9.1-3.5z"></path>\n                      <path id="cap" fill="#28393A" d="M578.95 170.87c-.85-.8-2.03-2.54-2.03-3.8 0-2.38 2.23-4.33 4.64-4.33 2.42 0 2.8 2.25 3.78 4.1.2.35-4.13 1.58-5.33 2.6-1.2 1-.65 1.8-1.05 1.43z"></path>\n                      <path id="chin" fill="#C1D9DC" d="M604.84 170.6c1-.94 1.62-2.27 1.62-3.74 0-2.82-1.76-4.57-4.6-4.57-2.85 0-2.94 3.45-4.8 4.92-1.86 1.47-6.17 2.68-5.93 5.94.24 3.26 12.9-1.82 13.7-2.57z"></path>\n                      <path id="cap" fill="#304547" d="M604.6 171.17c1.38-.72 2.13-2.84 2.13-4.3 0-1.17-.3-2.15-.85-2.9-.8-1.08-2.1-1.68-3.76-1.68-2.84 0-3.17 1.5-4.38 3.67-.37.65 3.8 1.63 5.45 2.96 1.64 1.33 0 2.96 1.4 2.24z"></path>\n                      <path id="foot" fill="#EBF9FA" d="M590.3 175.8c1.14 0 2.05-1.02 2.05-2.28 0-1.25.72-2.85-.4-2.85-1.14 0-2.65 1.6-2.65 2.85 0 1.26-.13 2.27 1 2.27zM586.32 174.97c-.88-.43-1.22-1.58-.73-2.57.47-.98 1.58-1.43 2.47-1 .88.43.4 1.2-.1 2.17-.47 1-.76 1.84-1.65 1.4z"></path>\n                    </g>\n                    <g id="arms">\n                      <path id="upper" fill="#7E9C9E" d="M586.22 150.4c-.8-.04-5.8 6.13-7.36 10.17-.9 2.35 2.64 1.7 3.05.86 0 0 .84-3.42 1.97-6.08 1.12-2.67 2.58-4.95 2.35-4.96z"></path>\n                      <path id="cap" fill="#304547" d="M601.5 149c.52 0 1.5.46 2.2 2.94.9 3.22-.58 6.7-2.2 2.93-1-2.34-.5-5.84 0-5.86z"></path>\n                      <path id="upper" fill="#B4CACC" d="M602.05 150.08c1.27-.05 7.12 11 3.5 12.58-3.65 1.58-4.38-3.88-3.84-7.72.42-2.9-.17-4.84.35-4.86z"></path>\n                      <path id="cap" fill="#28393A" d="M581.7 160.3c1.97.47-1.38 3.8-1.38 3.8s-1.67-.27-1.88-2.28c-.2-2 1.32-2 3.27-1.53z"></path>\n                      <path id="cap" fill="#304547" d="M601.92 158.86c-2.33.58 1.78 4.17 1.78 4.17s3.8.47 3.8-1.94c0-2.4-3.25-2.82-5.58-2.24z"></path>\n                      <path id="lower" fill="#C1D9DC" d="M600.53 159.28c-2.33.58-2.8 2.32-2.34 4.3.44 2 4 .33 4 .33s5.1-.64 4.58-2.65c-.52-2.02-3.92-2.55-6.25-1.97z"></path>\n                      <path id="hand" fill="#EBF9FA" d="M600.05 166.44c-1.77 0-3.2-1.46-3.2-3.26 0-1.8 1.43-3.25 3.2-3.25 1.77 0 3.7 2.64 2.42 3.62-1.27.98-.65 2.9-2.42 2.9z"></path>\n                      <path id="patch" fill="#2A2D2E" d="M604.23 152.5c-.24-.17-1.18.07-1.3.28-.1.2-.1 2.45.35 2.74.45.3 1.88 0 2.16-.1.3-.1-.98-2.76-1.2-2.93z"></path>\n                    </g>\n                    <g id="head">\n                      <path id="helmet" fill="#C1D9DC" d="M593.97 149.8c6.22 0 7.08-.34 8.84-2.36 3.3-2.36 5.64-5.9 5.64-9.87 0-7.1-7.43-12.83-14.56-12.83-7.14 0-14.38 5.74-14.38 12.83 0 4.38 2.77 8.25 6.58 10.57.8 1.67 5.17 1.67 7.9 1.67z"></path>\n                      <path id="neck" fill="#304547" d="M594.4 150.9c5.46-.63 7.74-.84 8.4-3.46 0 0-1 1.84-8.92 1.84s-7.8-1.14-7.8-1.14c-.64 2.94 2.88 3.4 8.33 2.76z"></path>\n                      <path id="visor" fill="url(#linearGradient-9)" d="M8.43 22.67c10.83 0 19.8-6.7 19.8-8.63 0-6.94-10.6-11.58-17.55-12.12-.9-.07-1.88-.04-2.9.08C3.6 4.24.4 8.34.4 13.04c0 3.5 1.8 6.7 4.46 9 1.37.42 2.63.63 3.6.63z" transform="translate(578.297 124.53)"></path>\n                      <path id="visor_rim" fill="#101119" d="M586.73 147.2c10.82 0 19.8-6.7 19.8-8.63 0-3.72-.6 2.98-10.38 6.1-9.78 3.1-13.7 1.27-13.7 1.27.22.22.45.44.7.64 1.36.4 2.62.62 3.58.62z"></path>\n                      ' + (config.flames.reflection ? '<g id="masked_content_visor" mask="url(#visor-mask)"><g transform="translate(630 -45) scale(-1 1)" opacity="0.7"><use xlink:href="#symFire"></use></g></g>' : '') + '\n                      <g id="hinge">\n                        <path id="hinge4" fill="#456366" d="M603.3 144.52c1.48 0 4.57-3.1 4.57-6.95 0-3.84-3.1-6.95-4.57-6.95-1.5 0-.8 3.1-.8 6.95 0 3.84-.7 6.95.8 6.95z"></path>\n                        <path id="hinge3" fill="#304547" d="M603.75 130.7c1.58.5 4.12 3.4 4.12 6.87 0 3.48-2.54 6.37-4.12 6.87-1-.5-.45-3.4-.45-6.87 0-3.48-.56-6.37.45-6.87z"></path>\n                        <path id="hinge2" fill="#456366" d="M604.73 142.1c.97 0 2.3-2.03 2.3-4.53 0-2.5-1.33-4.53-2.3-4.53-.96 0-.52 2.03-.52 4.53 0 2.5-.43 4.53.53 4.53z"></path>\n                        <path id="hinge1" fill="#C1D9DC" d="M604.38 141.97c-.5-.5-.17-2.28-.17-4.4 0-2.12-.3-3.9.18-4.4.88.5 1.83 2.28 1.83 4.4 0 2.12-.94 3.9-1.82 4.4z"></path>\n                      </g>\n                    </g>\n                    <g id="box">\n                      <path id="box-copy" fill="#51696B" d="M585.43 151.87s.63-.43 1.98-.14c1.35.3 5.87.15 6.38.85.26.36-.87 2.33-1.36 4.44-.5 2.1-.3 4.24-.83 4.65-1.02.78-5.9.5-8.4.23-.8-.1 2.23-10.03 2.23-10.03z"></path>\n                      <path fill="#C1D9DC" d="M582.45 161.2c-1.1-.77 1.93-8.7 3-9.35.46-.3.47.15 1.68.4 1.2.27 4.8.14 5.25.78.24.32-.78 2.1-1.22 3.98-.45 1.9-.27 3.83-.75 4.2-1.2.93-7.65.2-7.95 0z"></path>\n                    </g>\n                    <g id="front-hand">\n                      <path id="lower" fill="#C1D9DC" d="M582.52 160.56c1.95.48 3.9 1.65 3.53 3.27-.38 1.63-4.92.53-4.92.53s-2.3-.62-1.88-2.27c.43-1.66 1.32-2.02 3.27-1.54z"></path>\n                      <path id="hand" fill="#EBF9FA" d="M584.46 167.24c1.48 0 2.7-1.2 2.7-2.67 0-1.48-1.22-2.68-2.7-2.68-1.5 0-3.1 2.16-2.03 2.97 1.07.8.54 2.37 2.03 2.37z"></path>\n                    </g>\n                    <g id="overlay">\n                      <g id="highlights" data-anim="character" fill="#D9AD6C">\n                        <path id="highlights9" d="M587.35 152.2c1.34.3 4.64.02 5.15.73.15.2-1.18.77-2.2 1.4-1.04.6-1.55 4.9-2.93 6.17-.66.6-1.17.16-2.26 0-1.08-.17-2.9-.14-2.86-.44.2-2.4 2.34-7.68 3.2-8.2.1-.06.15-.1.22-.1.3-.1.8.26 1.7.45z" opacity=".5"></path>\n                        <path id="highlights8" d="M581.13 164.36s-.36-.1-.77-.3l-.04.03s-1.67-.27-1.88-2.28c-.08-.83.13-1.3.54-1.56.92-2.2 2.74-4.92 4.34-6.95 1.14-1.44 2.5-2.77 2.46-2.7-1.8 2.7-4.68 8.35-5.14 9.48l-.73-.04c-.1.18.4.37.35.52.12.03.73-.03.86 0 1.18.3 1.9.82 2.56 1.56.94.4 2.55 1.35 2.55 2.45 0 1.47-.26 2.67-1.74 2.67-1.5 0-.96-1.57-2.03-2.37-.1-.1-.2-.2-.25-.3-.62-.1-1.05-.2-1.05-.2z" opacity=".5"></path>\n                        <path id="highlights7" d="M600.53 159.28c.27-.07.57-.12.87-.16.06-.06.15-.12.25-.16-.15-1.22.7-2.07.7-3.5 0-1.44-.34-3.94-.08-3.94.25 0 .75 1.18.75 1.18s.17.07.17.14.38 2.5.34 2.6c-.07.23-.1.14-.1.14.1.88.52 3.04.38 3.05-.95.1-.66.46-.66.46s-1.5.35-1.5 1.47c.24.2.36.32.6.62.25.28.36.52.48.82.06.07-.93.56-1.34 1.16-.75 1.03.2 3.26-1.35 3.26-1.77 0-3.2-1.46-3.2-3.26 0-1.35.8-2.52 1.97-3 .4-.4.96-.7 1.7-.9z" opacity=".5"></path>\n                        <path id="highlights6" d="M583.93 170.55c-1.3-.9-2.06-2.13-2.06-2.13l.72-.3s-3.1-.94-3.77-2.03c-.65-1.1-.12-2.4-.12-2.4-1.06.8-1.78 2.02-1.78 3.38 0 1.25 1.18 3 2.03 3.8.2.17.16.07.22-.2 1.28.8 4.12 2.3 6.2 2.95.1.57.43 1.1.95 1.34.9.44 1.18-.4 1.66-1.4.18-.36.36-.7.47-.98.2-.52-.35.77-1.5.1-1.13-.65-.62-1.17-.63-1.17 0 0-1.08-.07-2.4-.98z" opacity=".5"></path>\n                        <path id="highlights5" d="M598.96 169.92c2.14-.3 3.05-.38 4.26-.96.2.2.82.27.55-.05-.4-.45-1.07-.8-1.98-1.2-2.08-.88-3.98-1.45-3.9-1.4-.25.35-.52.67-.84.92-1.3 1.02-3.75 1.9-5.07 3.45h-.06c-1.13 0-2.64 1.6-2.64 2.85 0 1.26-.13 2.27 1 2.27.48 0 .32-2.22.55-3.08.24-.87 1.56-1.2 1.7-1.67 0 0 4.27-.84 6.4-1.13z" opacity=".5"></path>\n                        <path id="highlights4" d="M604.38 141.96c.1.1.2.14.35.14.97 0 2.3-2.03 2.3-4.53 0-2.5-1.33-4.53-2.3-4.53-.14 0-.26.05-.35.14.88.5 1.83 2.27 1.83 4.4 0 2.1-.94 3.9-1.82 4.4v-.02z" opacity=".5"></path>\n                        <path id="highlights3" d="M603.75 130.7c-.16-.05-.32-.08-.45-.08-1.5 0-.8 3.1-.8 6.95 0 3.84-.7 6.95.8 6.95.13 0 .3-.03.45-.08-1-.5-.45-3.4-.45-6.87 0-3.48-.56-6.37.45-6.87z" opacity=".5"></path>\n                        <path id="highlights2" d="M593 152.25c.6.16.78.32.78.32.15-.05.25-.13.3-.25.24-1.04.45-1.4.45-1.4s-1.15 0-1.15-.68c0-.66 1.15-.88 1.15-.88s-.8-2.33-.46-3.16c.82-.18 1.4-.4 2.06-.63-4.85.84-9.86 1.46-13 1 .4.13.8.24 1.18.32.56.45 1.16.86 1.78 1.24-.18.82-.04 1.45.4 1.9-.08.1-.73 1.32-.9 1.72 0 0 .6-.14.96-.14s1.15.16 1.63.2c.3.04 2 .12 3.3.22 1.3.1 1.4.17 1.53.2z" opacity=".5"></path>\n                        <path id="highlights1" d="M596.86 128.4c-.53-.2-1-.38-1.4-.5 1-2 5.8-1.2 4.76-1.7-2-.93-4.18-1.46-6.34-1.46-2.35 0-4.7.62-6.8 1.7 4.7.43 8.77 2.2 9.78 1.97z" opacity=".5"></path>\n                      </g>\n                      <path id="shade" fill="#000507" d="M593.78 152.58c.17-.1.27-.18.3-.26.24-1.04.45-1.4.45-1.4s-1.15 0-1.15-.68c0-.66 1.15-.88 1.15-.88s-.8-2.33-.46-3.16c.82-.18 1.4-.4 2.06-.63.98-.46 5.47-2.65 6.2-3.03.03 1.23.24 1.98.97 1.98.13 0 .3-.03.45-.08-1-.5-.45-3.4-.45-6.87 0-3.48-.56-6.37.45-6.87-.16-.05-.32-.08-.45-.08-1.5 0-.8 3.1-.8 6.95 0 1.92-.18 3.67-.16 4.92-.3-.67 0-2.74.02-5.3 0-2.62-.3-3.67 0-5.73 0 0-2.5-1.74-5.5-3.06-.53-.22-1-.38-1.4-.5 1-2 5.8-1.2 4.76-1.7 4.6 2.14 8.22 6.43 8.22 11.37 0 3-1.34 5.8-3.44 7.98l1.48.16c1.68.07 1.68 1.9 1.57 5.08l-.02 15.66c-.02.6-.56 1.1-1.42 1.52-.25 1.28-.94 2.66-2 3.2-.57.3-.64.2-.63-.08-2.42 1.16-9.03 3.6-11.7 3.1-.26.93-1.04 1.6-1.97 1.6-1.13 0-1-1-1-2.26 0-1.25 1.5-2.85 2.64-2.85h.05l.12-.14-.6.06c-1.4.12-2.65.1-3.76-.07.1.28.2.57.28.86h.03c.53.26.57.63.4 1.1.08-.22-.46.8-1.5.2-1.15-.65-.64-1.17-.65-1.17 0 0-1.08-.07-2.4-.98-1.3-.9-2.05-2.13-2.05-2.13l.72-.3s-3.1-.94-3.77-2.03c-.65-1.1-.12-2.4-.12-2.4-1.06.8-1.78 2.02-1.78 3.38 0 1.25 1.18 3 2.03 3.8.2.17.16.07.22-.2 1.28.8 4.12 2.3 6.2 2.95.1.57.43 1.1.95 1.34.9.44 1.18-.4 1.66-1.4.18-.36.36-.7.47-.98-.1.28-.3.6-.47.97-.48 1-.77 1.84-1.66 1.4-.52-.25-.86-.77-.94-1.34-2.1-.64-4.93-2.16-6.2-2.96-.07.28-.03.38-.23.2-.85-.8-2.03-2.54-2.03-3.8 0-1.52.92-2.87 2.2-3.65-.32-.34-.6-.84-.68-1.6-.04-.4 0-.74.1-1-.1.26-.14.6-.1 1 .2 2 1.88 2.27 1.88 2.27l.04-.05c.4.2.77.3.77.3s.43.1 1.05.2c.05.13.14.23.25.32 1.07.8.54 2.37 2.03 2.37 1.48 0 1.75-1.2 1.75-2.67 0-1.1-1.6-2.04-2.54-2.45-.67-.74-1.38-1.27-2.55-1.56-.12-.03-.73.03-.85 0 .04-.15-.44-.34-.34-.52l.74.04c.45-1.12 3.3-6.7 5.1-9.44.22-.17.38-.25.48-.25h.02l.23-.35c-.08.1-.68 1.36-.88 1.73l-.16.07c-.86.53-3 5.8-3.2 8.2-.03.3 1.78.28 2.87.45 1.1.16 1.6.6 2.27 0 1.38-1.26 1.7-5.54 2.73-6.16.9-.54 2.17-1.05 2.38-1.3 0-.14-.13-.35-.84-.47-.6-.1-3-.16-4-.3-.63-.1-1.4-.4-1.66-.48-.27-.1-.34-.06-.34-.06s.53-.1.98-.1c.14 0 1.62.22 2.6.26 1 .04 2.17.08 3.35.25.8.12 1.1.3 1.2.43zm-10.4.65c.84-1.07 1.62-1.94 2.17-2.42-.42.43-1.35 1.4-2.17 2.43zm17.15 6.05c-.75.2-1.3.5-1.7.9-1.17.48-2 1.65-2 3 0 1.8 1.45 3.26 3.22 3.26 1.55 0 .6-2.23 1.35-3.26.4-.6 1.4-1.1 1.34-1.16-.12-.3-.23-.54-.47-.83-.25-.3-.37-.43-.62-.63 0-1.12 1.5-1.48 1.5-1.48s-.28-.38.67-.47c.14 0-.27-2.17-.4-3.05 0 0 .05.1.12-.13.04-.12-.35-2.54-.35-2.6 0-.08-.18-.15-.18-.15s-.5-1.18-.75-1.18c-.26 0 .1 2.5.1 3.93 0 1.44-.87 2.3-.72 3.5-.1.05-.2.1-.25.17-.3.04-.6.1-.87.16zm-1.57 10.64c-2.14.3-6.42 1.13-6.42 1.13-.13.46-1.45.8-1.7 1.67-.22.86-.06 3.07-.54 3.07-1.13 0-1-1.02-1-2.28 0-1.25 1.5-2.85 2.64-2.85h.05c1.3-1.54 3.77-2.43 5.06-3.45.32-.25.6-.57.83-.9-.08-.07 1.82.5 3.9 1.38.9.4 1.58.75 1.97 1.2.27.33-.35.26-.55.06-1.2.58-2.12.66-4.26.96zm5.42-27.96c.1.1.2.14.35.14.97 0 2.3-2.03 2.3-4.53 0-2.5-1.33-4.53-2.3-4.53-.14 0-.26.05-.35.14.88.5 1.83 2.27 1.83 4.4 0 2.1-.94 3.9-1.82 4.4v-.02z" opacity=".75"></path>\n                    </g>\n                  </g>\n                  <g id="bonfire">\n                    <path id="base_bg" fill="#A68F74" d="M536.68 178.6l32.86-.52 4.37-7.35-3.17-.6-6.14-1.03-1.58.95-5.1-1.24-7.4.76-5.17-2.26-5.78 2.83-5.22-.32-3.4 2z"></path>\n                    ' + (config.flames.reflection ? '<g transform="translate(502 -26)"><use xlink:href="#symFire"></use></g>' : '<g data-anim="fireplace" transform="translate(502 -26)"></g>') + '\n                    <path id="base_fg" fill="url(#linearGradient-10)" d="M.1 16.46l21.36 3.9 3.94-.27 4.4.25 3.4 1.38 3.57-1.53 5.34-1.03 2.92.82 5.8-.2 2.95.73 6.3-1 3.8.48 6.43-.7 3.16.42 3.25-.35L73.25 17l-2.03-1.6-2.8-.06-2.15-2.48-3.92-.32-1.35-2.78-2.95-.05-1.7-1.7-1.12 1.22-2.42 1.88-1.73-.5-2.83.54-2.7.73-3.56-.16-2.26-.6-2.36.87-2.92-1.37-2.38 1.05-3.25-1.1-1.53.78-2.37-.74-2.5 1.43-2.5-.98h-2.18l-2.44-.63.22-2.32-2.8 1.16-1.85 1.8-2.7.14-3.56 3.1-2.1.32z" transform="translate(517.547 162.504)"></path>\n                    <path id="ridge" fill="#BFA874" d="M530.67 171.58l1.06-.43 1.23-.48.08-.02-.2 2.27 2.43.63h2.18l2.5.98 2.5-1.44 2.37.73 1.52-.78 3.25 1.1 2.37-1.05 2.92 1.37 2.35-.88 2.26.6 3.58.17 2.7-.73 2.82-.54 1.73.5 2.43-1.88.9-1 .4.07-.2 1.64-3.15 1.88-2.22-.56-3.9.6-.8.95-3.16-.56-3.17-.8-2.36 1.52-3.1-1.3-2.35.9-2.84-1.07-2.18.68-2.04-1.1-2.52 2.12-2.64-1.4-2.14-.35-3.8-.48.42-1.23z"></path>\n                  </g>\n                  <g id="lenny">\n                    <path id="shadow" fill="#040B0C" d="M524.6 188.02l-49.1 20.52-116 13.68 130.27-38.34z" opacity=".83"></path>\n                    <g id="body">\n                      <path fill="url(#linearGradient-11)" d="M22.85.05C19.53.05 2.48 27 2.9 27.45 1.2 28.5 0 30.3 0 32.34 0 34 1.55 36.3 2.67 37.36c.26.24 14.25 3.03 21.8 3.18 7.58.16 11.2-2.4 11.95-2.78 1.83-.96 2.82-3.68 2.82-5.73 0-2.05-1.32-4.1-1.43-4.23 1.26-.8 2.2-2.85 2.2-4.35 0-1-3.18-8.82-4.8-11.4-.9-3.2-2.17-3.8-2.83-3.77-.05 0-.1.03-.15.08-2.46-4.82-5.93-8.3-9.37-8.3z" transform="matrix(-1 0 0 1 527.936 150.636)"></path>\n                      <path id="upper" fill="url(#linearGradient-12)" d="M38.1 27.8c1.26-.8 2.2-2.85 2.2-4.35 0-1-3.18-8.82-4.8-11.4-.42-1.5-1.46 4.63-2.24 11.47-.88 7.7 4.95 4.4 4.85 4.28z" transform="matrix(-1 0 0 1 527.936 150.636)"></path>\n                      <path id="butt" fill="url(#linearGradient-13)" d="M32.84 39.5c2.24-.7 3.48-1.53 3.87-1.74 1.84-.96 2.83-3.68 2.83-5.73 0-2.05-1.32-4.1-1.42-4.23 0 0-4.1-10.84-4.9-3.8-.84 7.56-1.35 15.82-.36 15.5z" transform="matrix(-1 0 0 1 527.936 150.636)"></path>\n                      <path id="elbow" fill="url(#linearGradient-14)" d="M38.1 27.8c1.3-.6 3.2-4.14 2.5-4.64-.67-.47-3.87-.27-3.87-.27s0 3.86 1.38 4.9z" transform="matrix(-1 0 0 1 527.936 150.636)"></path>\n                      <path id="knee" fill="url(#linearGradient-15)" d="M3.87 27.64C1.3 26.96 0 30.28 0 32.34c0 1.65 1.9 5.04 2.56 5.18.67.14-1.52-3.37-1.12-6.16.4-2.8 5-3.04 2.43-3.72z" transform="matrix(-1 0 0 1 527.936 150.636)"></path>\n                      <path id="upper" fill="url(#linearGradient-16)" d="M12.34 9.3c-2.95 3.32-5.06 7.4-7.17 10.5-2.1 3.1-3.2 3.13-3.3 3.93-.36 2.27-.22 2.93.85 3.73 1.07.8 5.3 3.26 7.97 0C13.37 24.2 16.4 4.7 12.33 9.3z" transform="matrix(-1 0 0 1 527.936 150.636)"></path>\n                      <path id="elbow" fill="url(#linearGradient-17)" d="M3 22.88c-.22-1.4-1.38-.05-1.38 2.94 0 2.98 3.06 3.1 5.2 3.26 1.56.12 2.97-.26 4.2-1.76 1.24-1.5-1.4.38-3.65-.33-2.27-.73-4.1-2.35-4.37-4.12z" transform="matrix(-1 0 0 1 527.936 150.636)"></path>\n                    </g>\n                    <g id="head">\n                      <path id="helmet" fill="url(#linearGradient-18)" d="M17.3 33.35c8.2 0 9.33-.46 11.65-3.15 4.35-3.13 5.93-5.9 5.93-13.13C34.88 7.1 26.58 0 17.18 0 12.3 0 7.33 2.1 3.72 5.44.44 8.5.1 12.58.1 17.07c0 4.52.35 8.63 3.67 11.68.96.9 2.02 1.7 3.15 2.38 1.07 2.22 6.8 2.22 10.4 2.22z" transform="matrix(-1 0 0 1 522.808 126.623)"></path>\n                      <path id="neck" fill="url(#linearGradient-19)" d="M10.2 32.3c-3.35-.45-3.28-1.17-3.28-1.17-.43 2.04.6 3.18 2.73 3.7 1.95.46 2.06-2.32.54-2.53z" transform="matrix(-1 0 0 1 522.808 126.623)"></path>\n                    </g>\n                    <g id="backpack" transform="translate(5 320) scale(1 -1) rotate(1.5)">\n                      <path id="backpack_shade" fill="url(#linearGradient-20)" d="M22.85 33.6l-.78-23.38c0-4.77-.1-7.5-2.55-7.5L6.92.63c-2.46 0-5.4 4.84-5.4 9.6L.74 35.67c0 1.97 5.66 3.38 10.1 3.3 4.43-.08 12-2.58 12-5.38z" transform="rotate(178 256.613 81.128)"></path>\n                      <path fill="url(#linearGradient-21)" d="M26.6 34.14L25.77 9.6c0-5-.1-7.86-2.68-7.86L7.53.54C4.93.55 4.2 4.6 4.2 9.6l-.8 26.72c0 5 23.2 2.82 23.2-2.18z" transform="rotate(178 256.612 81.073)"></path>\n                    </g>\n                    <g id="hinge">\n                      <path id="hinge4" fill="#1B2826" d="M519.8 153.3c1.94 0 6-4.14 6-9.25 0-5.1-4.06-9.25-6-9.25-1.97 0-1.08 4.14-1.08 9.25 0 5.1-.9 9.25 1.07 9.25z"></path>\n                      <path id="hinge3" fill="#304742" d="M520.38 134.9c2.08.67 5.43 4.5 5.43 9.15 0 4.63-3.34 8.47-5.42 9.14-1.33-.68-.6-4.52-.6-9.15 0-4.64-.73-8.48.6-9.14z"></path>\n                      <path id="hinge2" fill="#131C1A" d="M521.68 150.08c1.27 0 3-2.7 3-6.03s-1.73-6.03-3-6.03c-1.28 0-.7 2.7-.7 6.03s-.58 6.03.7 6.03z"></path>\n                      <path id="hinge1" fill="#1B2828" d="M521.22 149.9c-.65-.66-.23-3.03-.23-5.85 0-2.83-.43-5.2.22-5.85 1.16.65 2.4 3.02 2.4 5.85 0 2.82-1.24 5.2-2.4 5.85z"></path>\n                    </g>\n                    <g id="overlay">\n                      <path id="shade" fill="#070C0F" d="M487.5 173.7l-.15.1c-.7.5 1.16 4 2.48 4.63-1.05-1.28-2.42-4.06-1.72-4.56.1-.06.47-.3.63-.35.3-1.24.5-3.4 1.73-6.12l-.2-.33c-1.16 2.6-2.25 5.4-2.54 6.57l-.2.07c-.08.04-.13.06-.17.1-.7.5 1.16 4 2.48 4.63-.1.12-1.43 2.2-1.43 4.24 0 1.76.74 4.03 2.1 5.23v.3c.15 4.1 16.03 5.77 21.46 3.4 2.06-.32 3.63-.92 4.2-1.83 4.8-.77 8.78-1.6 9.1-1.76-.02.12.02.18.12.16.53-.1 1.86-2.33 2.36-4.05.12-.4.2-.78.2-1.14 0-.13 0-.26-.02-.4-.1-1.53-.87-3.55-2.27-4.18.2-.22.37-.5.5-.8-.13.3-.3.58-.5.8 1.4.63 2.16 2.65 2.27 4.2l.02.38c0 .36-.08.75-.2 1.15-.48 1.66-1.72 3.76-2.26 3.88 0 0 1.84-3.85 1.5-6.27-.25-1.16-2.27-2.63-2.27-2.63s.66-1.62.54-2.62c-.1-1-.87-1.5-.87-1.5s-1.9-1.08-3.54-3.4c-1.66-2.3-2.88-6.2-3.4-7.14-1.2-2.1-2.83-3.2-2.07-4.07 0 0-.47.36-.76-.67-.28-1.03.35-1.2.35-1.2l-.82-1.5c5.52-1.44 6.28-3.78 6.28-3.78 2.07-1.72 4.97-4.3 5.08-8.8.16-6.94-5.58-9.56-5.58-9.56l-2.48-.27c-2.9-5.72-10.67-7.93-11.8-7.93 4.9 0 9.87 2.1 13.47 5.44 1.1 1.04 1.88 2.2 2.42 3.45 1.98 1.4 4.3 4.7 4.3 8.55 0 4.2-2.76 7.74-4.82 8.87-.5.88-1.14 1.7-1.96 2.45-.97.9-2.03 1.7-3.15 2.4l-.08.1c.04 0 0 .05-.07.12l.14-.24c1.1-.7 2.17-1.5 3.14-2.4.82-.74 1.46-1.56 1.96-2.44 2.06-1.13 4.8-4.67 4.8-8.87 0-3.85-2.3-7.15-4.28-8.54-.54-1.24-1.3-2.4-2.43-3.44-3.6-3.34-8.57-5.44-13.48-5.44-9.4 0-17.7 7.1-17.7 17.07 0 6.38 1.24 9.28 4.53 12.03-2.16.4-2.15 3.2-2 7.9l.02 2.94c-1.22 2.7-2.44 5.83-2.75 7.07l-.2.07zm33.96-35.64c-.98.3-.47 2.87-.47 6 0 3.1-.52 5.67.46 5.98-.08.02-.16.04-.24.04-1.28 0-.7-2.7-.7-6.03s-.58-6.03.7-6.03c.08 0 .16 0 .24.04zm-13.82 16.47c.4-.08 3.18.22 4.06 2.1.9 1.88 1.62 18.06 1.26 18.13-.37.07-2.27-16.63-2.65-17.87-.36-1.25-3.08-2.3-2.66-2.37z" opacity=".7"></path>\n                      <g id="highlights" data-anim="character" fill="#D9AD6C">\n                        <path id="highlight1" d="M517.42 134.55l2.48.27s5.74 2.62 5.58 9.55c-.1 4.5-3 7.1-5.07 8.8 0 0-.75 2.35-6.27 3.8l.82 1.48s-.63.18-.35 1.2c.3 1.04.76.68.76.68-.76.88.87 1.96 2.06 4.08.53.95 1.75 4.85 3.4 7.16 1.66 2.3 3.55 3.38 3.55 3.38s.76.5.87 1.5c.12 1-.53 2.63-.53 2.63s2.03 1.47 2.28 2.64c.34 2.43-1.5 6.28-1.5 6.28.54-.12 1.78-2.22 2.26-3.87.12-.4.2-.78.2-1.14 0-.13 0-.26-.02-.4-.1-1.53-.87-3.55-2.27-4.18.4-.45.66-1.07.66-1.93 0-2.65-.9-4-1.26-3.3-.54-.5-1.3-1.28-2.28-2.72-2.1-3.1-4.2-7.15-7.14-10.46.36-.58.46-1.3.27-2.2 0 0 0 .08-.15.22l.14-.24c1.1-.7 2.17-1.5 3.14-2.4.82-.74 1.46-1.56 1.96-2.44 2.06-1.13 4.8-4.67 4.8-8.87 0-3.85-2.3-7.15-4.28-8.54-.54-1.24-1.3-2.4-2.43-3.44-3.6-3.34-8.57-5.44-13.48-5.44 1.13 0 8.9 2.2 11.8 7.93zM487.72 173.64c-.16.04-.3.1-.37.16-.7.5 1.16 4 2.48 4.63-1.05-1.28-2.42-4.06-1.72-4.56.1-.06.47-.3.63-.35.3-1.24.5-3.4 1.73-6.12l-.2-.33c-1.16 2.6-2.25 5.4-2.54 6.57z" opacity=".5"></path>\n                        <path id="highlight2" d="M521.46 138.06c-.08-.03-.16-.04-.24-.04-1.28 0-.7 2.7-.7 6.03s-.58 6.03.7 6.03c.08 0 .16-.02.24-.04-.98-.3-.47-2.87-.47-6 0-3.1-.52-5.67.46-5.98zM507.64 154.53c.4-.08 3.18.22 4.06 2.1.9 1.88 1.62 18.06 1.26 18.13-.37.07-2.27-16.63-2.65-17.87-.36-1.25-3.08-2.3-2.66-2.37z" opacity=".5"></path>\n                      </g>\n                    </g>\n                  </g>\n                  <g id="big_plate_right">\n                    <path id="side" fill="#010505" d="M600.85 210.07l7.84 21.72 70 34.06 148 61.85-152.05-75.92z"></path>\n                    <path id="face" fill="url(#linearGradient-22)" d="M141.95 2.13L121.1.4 97.22 26.85l-25.87 4.2L.3 43.47 73.86 89.2l154.77 72.9 8.53-82.96-14.8-35.67-26.63-25.83-27.72-3.4z" transform="translate(600.5 166.5)"></path>\n                    <path id="highlight" data-anim="plate" fill="url(#linearGradient-23)" d="M121.1.4L97.2 26.9l-25.86 4.2L.3 43.46l99.18-14.33z" transform="translate(600.5 166.5)"></path>\n                  </g>\n                  <g id="big_plate_left">\n                    <path id="side" fill="#010505" d="M651.97 270.05l-6.58 7.82-181.45 23.8L316.8 382.8l125.3-94.1 180.26-25.24z"></path>\n                    <path id="plate" fill="url(#linearGradient-24)" d="M256.32 22.75l-74.58-11.32L146.97.16 101.1 13l2.75 22.5L.2 189.93 146.98 100 339.8 74.5z" transform="translate(312.546 194.692)"></path>\n                    <path id="shadow" fill="#040A0A" d="M415.4 222.15l-1.75-14.45 45.87-12.85 18.32 5.94.1.04-62.53 21.3z" opacity=".5"></path>\n                    <path id="highlight" data-anim="plate" fill="url(#linearGradient-25)" d="M256.32 22.75l-74.56-11.3-16.4-5.32-4.82 1.7 17.96 5.5 77.82 11.5 56.86 33.15z" transform="translate(312.546 194.692)"></path>\n                  </g>\n                </g>\n              </g>\n            </g>\n          </svg>';
}

/* 

GET SVG END

*/
"use strict";

/* 

CREATE SPACE

*/

function createSpace(container) {
  // Create and insert #space
  var spaceWrapper = document.createElement("div");
  spaceWrapper.setAttribute("id", "space");
  container.appendChild(spaceWrapper);
  // Init particles
  particlesJS('space', config);
}

/* 

CREATE SPACE END

*/
"use strict";

/* 

LAYOUT

*/

function setLayout() {
  if (window.innerWidth < 376) {
    config.planet.x = 70;
    config.planet.y = 1100;
    config.planet.scale = 1.8;
  }
}

/* 

LAYOUT END

*/
"use strict";

/* 

INTRO

*/

function playIntro() {
  var planetBody = document.querySelector("[data-anim=planetBody]");
  TweenMax.from(planetBody, 20, { y: 5200, x: -3500, scale: 10, rotation: -30, ease: Back.easeOut.config(0.5) });
}

/* 

INTRO END

*/
"use strict";

/* 

CREATE PLANET

*/

function createPlanet(container) {
    // Create and insert #planet-wrapper
    var planetWrapper = document.createElement("div");
    planetWrapper.setAttribute("id", "planet-wrapper");
    container.appendChild(planetWrapper);

    // Append SVG in #planet-wrapper
    var svg = getSVG();
    planetWrapper.insertAdjacentHTML("beforeend", svg);

    var planetBody = document.querySelector("[data-anim=planetBody]");
    TweenMax.set(planetBody, { y: config.planet.y, x: config.planet.x, rotation: 2, scale: config.planet.scale, transformOrigin: "center" });
}

/* 

CREATE PLANET END

*/
"use strict";

/* 

FLICKER ANIMATION

*/

function startFlicker() {

  // Cache DOM
  var ground = document.querySelectorAll("[data-anim=ground]"),
      characters = document.querySelectorAll("[data-anim=character]"),
      rockFaces = document.querySelectorAll("[data-anim=rockFace]"),
      rockHls = document.querySelectorAll("[data-anim=rockHl]"),
      plates = document.querySelectorAll("[data-anim=plate]");

  // Define eases
  var rough1 = RoughEase.ease.config({ template: Power1.easeOut, strength: 1, points: 10, taper: "none", randomize: true, clamp: true });
  var rough2 = RoughEase.ease.config({ template: Power1.easeOut, strength: 1, points: 10, taper: "none", randomize: true, clamp: true });
  var rough3 = RoughEase.ease.config({ template: Power1.easeOut, strength: 1, points: 10, taper: "none", randomize: true, clamp: true });
  var rough4 = RoughEase.ease.config({ template: Power1.easeOut, strength: 2, points: 10, taper: "none", randomize: true, clamp: true });
  var rough5 = RoughEase.ease.config({ template: Power1.easeOut, strength: 2, points: 10, taper: "none", randomize: true, clamp: true });
  var rough6 = RoughEase.ease.config({ template: Power1.easeOut, strength: 2, points: 10, taper: "none", randomize: true, clamp: true });

  // Hide all
  TweenMax.set([ground, characters, rockFaces, rockHls, plates], { autoAlpha: 0 });

  // Tween ground
  TweenMax.fromTo(ground[0], 2, { autoAlpha: 0.7 }, { autoAlpha: 1, repeat: -1, yoyo: true, ease: rough1 });
  TweenMax.fromTo(ground[1], 2, { autoAlpha: 0.6 }, { autoAlpha: 1, repeat: -1, yoyo: true, ease: rough2 });
  TweenMax.fromTo(ground[2], 2, { autoAlpha: 0.4, scaleX: 0.95 }, { autoAlpha: 0.7, scaleX: 1, transformOrigin: "center", repeat: -1, yoyo: true, ease: rough3 });
  TweenMax.fromTo(ground[3], 2, { autoAlpha: 0.9, scale: 0.95 }, { autoAlpha: 1, scale: 1, transformOrigin: "center", repeat: -1, yoyo: true, ease: rough1 });

  // Tween characters
  TweenMax.fromTo(characters[0], 2, { autoAlpha: 1, fill: "hsl(25, 80%, 60%)" }, { autoAlpha: 1, fill: "hsl(45, 100%, 80%)", repeat: -1, yoyo: true, ease: rough1 });
  TweenMax.fromTo(characters[1], 2, { autoAlpha: 1, fill: "hsl(25, 80%, 60%)" }, { autoAlpha: 1, fill: "hsl(45, 100%, 80%)", repeat: -1, yoyo: true, ease: rough2 });

  // Tween rock faces
  TweenMax.fromTo(rockFaces[0], 2, { autoAlpha: 0.75 }, { autoAlpha: 1, repeat: -1, yoyo: true, ease: rough4 });
  TweenMax.fromTo(rockFaces[1], 2, { autoAlpha: 0.75 }, { autoAlpha: 1, repeat: -1, yoyo: true, ease: rough5 });
  TweenMax.fromTo(rockFaces[2], 2, { autoAlpha: 0.75 }, { autoAlpha: 1, repeat: -1, yoyo: true, ease: rough6 });
  TweenMax.fromTo(rockFaces[3], 2, { autoAlpha: 0.75 }, { autoAlpha: 1, repeat: -1, yoyo: true, ease: rough4 });
  TweenMax.fromTo(rockFaces[4], 2, { autoAlpha: 0.75 }, { autoAlpha: 1, repeat: -1, yoyo: true, ease: rough5 });

  // Tween rock highlights
  TweenMax.fromTo(rockHls[0], 2, { autoAlpha: 0.15 }, { autoAlpha: 0.5, repeat: -1, yoyo: true, ease: rough3 });
  TweenMax.fromTo(rockHls[1], 2, { autoAlpha: 0.15 }, { autoAlpha: 0.5, repeat: -1, yoyo: true, ease: rough3 });
  TweenMax.fromTo(rockHls[2], 2, { autoAlpha: 0.15 }, { autoAlpha: 0.5, repeat: -1, yoyo: true, ease: rough3 });
  TweenMax.fromTo(rockHls[3], 2, { autoAlpha: 0.15 }, { autoAlpha: 0.5, repeat: -1, yoyo: true, ease: rough3 });
  TweenMax.fromTo(rockHls[4], 2, { autoAlpha: 0.15 }, { autoAlpha: 0.5, repeat: -1, yoyo: true, ease: rough3 });

  // Tween plate highlights
  TweenMax.fromTo(plates[0], 2, { autoAlpha: 0.35 }, { autoAlpha: 1, repeat: -1, yoyo: true, ease: rough1 });
  TweenMax.fromTo(plates[1], 2, { autoAlpha: 0.35 }, { autoAlpha: 1, repeat: -1, yoyo: true, ease: rough2 });
}

/* 

FLICKER ANIMATION END

*/
"use strict";

/* 

BONFIRE ANIMATION

*/

function createFlames() {
  var fireplace = document.querySelector("[data-anim=fireplace]");
  var fireGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
  var flames = config.flames.targets;
  var count = config.flames.count;

  for (var i = 0; i < count; i++) {
    // Create new flame
    var flame = new Flame();
    // Add to array
    flames.push(flame);
    // Add flame to group
    flame.appendTo(fireGroup);
    // Make every 10th flame a sparkle
    if (i % 10 === 0) flame.isSparkle();
  }

  fireplace.appendChild(fireGroup);

  for (var i = 0; i < flames.length; i++) {
    // Animate flame
    flames[i].animate();
    // Set unique starting poing of flame
    flames[i].tl.progress(1 / count * i);
  }
}

function animateFlames() {
  var flames = config.flames.targets;

  for (var i = 0; i < flames.length; i++) {

    flames[i].tl.play().timeScale(0.65);
  }
}

/* 

BONFIRE ANIMATION END

*/
"use strict";

//- @codekit-prepend "../assets/nerdmanship/js/utility.js";
//- @codekit-prepend "../assets/nerdmanship/js/stats.js";
//- @codekit-prepend "config.js";
//- @codekit-prepend "Flame.js";
//- @codekit-prepend "getSvg.js";
//- @codekit-prepend "space.js";
//- @codekit-prepend "layout.js";
//- @codekit-prepend "intro.js";
//- @codekit-prepend "planet.js";
//- @codekit-prepend "flicker.js";
//- @codekit-prepend "bonfire.js";


/* 

INITIALISATION

*/

var initPlanetBryan = function initPlanetBryan(id) {

  // INSERT PROJECT HERE
  var container = document.querySelector("#" + id);

  // OPTIONS
  setConfig();

  // LAYOUT
  setLayout();

  // SPACE
  createSpace(container);

  // PLANET
  createPlanet(container);

  // FIRE
  createFlames();

  // ANIMATE
  TweenMax.ticker.fps(config.fps);
  if (config.flicker) startFlicker();
  if (config.intro) playIntro();
  if (config.flames.anim) animateFlames();
};

/* 

INITIALISATION END

*/
