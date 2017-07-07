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
  }

  else if (mode === "minimal") {
    if (config.displayData) displayData("Minimal");
    config.flames.count = 30;
    config.flicker = false;
    config.flames.reflection = false;
    config.intro = false;
    config.fps = 15;
    config.flames.smoke = 0;
  }

  else if (mode === "limited") {
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
  var mostHandheld = (allHandheld) && !(exceptionsHandheld);
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