/* 

PROJECT CONFIG

*/

var config = {
  "planet": {
    "y": 2100,
    "x": 120,
    "scale": 4,
  },
  "flames": {
    "count": 70,
    "targets": [],
    "height": 100,
    "reflection": true
  },
  "flicker": true,
  "intro": true,
  "fire": true,
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
      "enable": true,
      "speed": 0.3,
      "direction": "right",
      "random": true,
      "straight": true,
      "out_mode": "out"
    }
  },
  "retina_detect": true
};


// Make changes on default
function setConfig() {

  var performance = getClientPerformance();

  if (performance === "incapable") {

    config.particles.number.value = 500;
    config.particles.move.enable = false;
    config.flames.count = 30;
    config.flames.height = 130;
    config.flames.reflection = false;
    config.flicker = false;
    config.intro = false;
    config.fire = false;
    config.fps = 15;
  }

  else if (performance === "limited") {

    config.particles.number.value = 100;
    config.particles.move.enable = false;
    config.flames.count = 30;
    config.flames.height = 130;
    config.flames.reflection = false;
    config.flicker = false;
    config.intro = false;
    config.fire = true;
    config.fps = 15;

  }

  else if (performance === "capable") {
    console.log("log");
    config.particles.number.value = 500;
    config.particles.move.enable = false;
    config.flames.count = 50;
    config.flames.height = 120;

    config.flames.reflection = true;
    config.flicker = true;
    config.intro = true;
    config.fire = true;
    config.fps = 30;

  }

}

function getClientPerformance() {

  // BROWSERS: chrome, firefox, msie, msedge, safari, android, ios
  // DEVICES: mobile, tablet
  // OS: mac, windows, windowsphone, chromeos, android, ios, webos
  // Full list of flags: https://github.com/lancedikson/bowser

  // Target specific device
  var iPhone6 = bowser.ios && bowser.mobile && window.innerWidth > 375;

  // Make bundle
  var mostHandheld = (bowser.mobile || bowser.tablet) && !(iPhone6);
  
  // Verdict
  var incapable = bowser.windowsphone || bowser.samsungBrowser || bowser.tizen;
  var limited = mostHandheld;
  var capable = iPhone6 || bowser.firefox || bowser.safari || bowser.chrome;
  
  if (incapable) {
    return "incapable";
  } else if (limited) {
    return "limited";
  } else if (capable) {
    return "capable";
  } else {
    return "performant";    
  }

}

/* 

PROJECT CONFIG END

*/