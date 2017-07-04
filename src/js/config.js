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

  var mode = getClientPerformance();

  if (mode === "off") {

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

  else if (mode === "minimal") {

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

  else if (mode === "limited") {
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

  var modes = {
    off: {
      enabled: false,
      rules: [bowser.windowsphone, bowser.samsungBrowser, bowser.tizen]
    },
    minimal: {
      enabled: false,
      rules: [mostHandheld]
    }, 
    limited: {
      enabled: false,
      rules: [iPhone6, bowser.firefox, bowser.safari]
    }
  };

for (var mode in modes) {
  for (var i = 0; i < modes[mode].rules.length; i++) {
    if (modes[mode].rules[i]) modes[mode].enabled = true;
  }
}



  if (modes["off"].enabled) {
    return "off";
  } else if (modes["minimal"].enabled) {
    return "minimal";
  } else if (modes["limited"].enabled) {
    return "limited";
  } else {
    return "performant";    
  }

}

/* 

PROJECT CONFIG END

*/