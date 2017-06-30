function random(min, max) {
  if (max === null) { max = min; min = 0; }
  return min + Math.random() * (max - min);
}

// Get returns a value on destination range based on the input value on source range
function map(value, sourceMin, sourceMax, destinationMin, destinationMax) {
  return destinationMin + (destinationMax - destinationMin) * ((value - sourceMin) / (sourceMax - sourceMin)) || 0;
}

// exponential index normalization = index^pow / count^pow
function expNorm(val, min, max, power) {
  var expValue = Math.pow((val-min), power);
  var expRange = Math.pow((max-min), power);

  // Test this to make sure...
  return expValue/expRange;
}

function degreesToRads(degrees) {
  return degrees * Math.PI / 180;
}

function radsToDegrees(rads) {
  return rads / Math.PI * 180;
}

function spread(value, range) {
  var min = value-range;
  var max = value+range;
  
  return min + Math.random() * (max - min);
}



javascript:(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//rawgit.com/mrdoob/stats.js/master/build/stats.min.js';document.head.appendChild(script);})()

// create sparkles

class Flame {
  
  constructor() {
    var side = 4;
    this.target = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    this.target.setAttribute("width", side);
    this.target.setAttribute("height", side);
    this.target.setAttribute("fill", "red");
    //this.target.setAttribute("style", "mix-blend-mode: screen;");
  }

  appendTo(parent) {
    parent.appendChild(this.target);
  }

  isSparkle() {
    this.sparkle = true;
  }

  animate() {
    var f = this.target;

    // Flame settings
    var totTime = spread(12,2);
    var timeX = [spread(1, 0.1), spread(1.5, 0.5), spread(1, 0.5)];
    var timeS = [spread(0.5, 0.25), spread(1.5, 0.75), spread(3, 1), spread(1.5, 0.5)];
    var timeA = [spread(1.3, 0.2), spread(2, 0.3)];

    var yEase = Power1.easeOut;

    var xMin = spread(50,5);
    var xMax = spread(200,10);
    var y = [197, spread(80, 25)];
    
    var x = [spread(xMin, 12), spread(xMin-3, 5), spread(xMin+3, 5), spread(xMin+5, 5), spread(xMax, 100)];
    var s = [spread(1, 0.1), spread(3.5, 1), spread(1.3, 0.5), spread(4, 1), spread(1, 0.5)];
    var c = [ "hsl(5, 60%, 60%)", "hsl(45, 100%, 80%)", "hsl(50,0%,40%)"];

    // Sparkle settings
    if (this.sparkle) {
      // scale
      var _s = spread(0.2, 0.05);
      s = [_s, _s, _s, _s, _s];

      // fade timing
      timeA = [spread(5.5, 0.5)];

      // speed rising
      yEase = Power4.easeOut;
      y[1] = spread(50, 25);
      
      // percieved brightness
      c[0] = "hsl(40,100%,90%)";
      c[1] = "hsl(40,50%,50%)";

      // spread width
      x = [spread(xMin, 20), spread(xMin, 20), spread(xMin, 20), spread(xMin, 20), spread(xMin, 100)];  
      timeX = [spread(2, 0.1), spread(2, 0.5), spread(2, 0.5)];
    }

    // Start settings
    TweenMax.set(f, {fill: c[0], x: x[0], y: y[0], scale: s[0], autoAlpha: 1, rotation: 45, transformOrigin: "center"});

    // Timeline
    this.tl = new TimelineMax({repeat: -1, paused: true});

    this.tl
      .add("start")
      // Y
      .to(f, totTime-0.1, {y: y[1], ease: yEase}, "start =+0.1")
      
      // X
      .to(f, timeX[0], { x: x[1], ease: Power1.easeOut}, "start")
      .to(f, timeX[1], { x: x[2], ease: Power1.easeInOut}, timeX[0])
      .to(f, timeX[2], { x: x[3], ease: Power1.easeInOut}, timeX[0] + timeX[1])
      .to(f, totTime-(timeX[0] + timeX[1] + timeX[2]), { x: x[4], ease: Power1.easeIn}, timeX[0] + timeX[1] + timeX[2])

      // SCALE
      .to(f, timeS[0], { scale: s[1], ease: Power1.easeOut}, "start")
      .to(f, timeS[1], { scale: s[2], ease: Power1.easeInOut}, timeS[0])
      .to(f, timeS[2], { scale: s[3], ease: Power1.easeInOut}, timeS[0] + timeS[1])
      .to(f, totTime-(timeS[0] + timeS[1] + timeS[2]), { scale: s[4], ease: Power1.easeOut}, timeS[0] + timeS[1] +timeS[2])

      // COLOR
      .to(f, timeA[0], { fill: c[1], ease: Power1.easeInOut}, "start")
      .to(f, 1, { fill: c[2], ease: Power1.easeInOut}, timeA[1])

      // ALPHA
      .to(f, 2, { autoAlpha: 0.3, ease: Power1.easeOut }, timeA[1])
      .to(f, 5, { autoAlpha: 0, ease: Back.easeOut }, timeA[1]+2)
      ;
  }
}

function flicker() {

  // Cache DOM
  var ground = document.querySelectorAll("[data-anim=ground]"),
  characters = document.querySelectorAll("[data-anim=character]"),
  rockFaces = document.querySelectorAll("[data-anim=rockFace]"),
  rockHls = document.querySelectorAll("[data-anim=rockHl]"),
  plates = document.querySelectorAll("[data-anim=plate]");

  // Define eases
  var rough1 = RoughEase.ease.config({ template:  Power1.easeOut, strength: 1, points: 10, taper: "none", randomize:  true, clamp: true});
  var rough2 = RoughEase.ease.config({ template:  Power1.easeOut, strength: 1, points: 10, taper: "none", randomize:  true, clamp: true});
  var rough3 = RoughEase.ease.config({ template:  Power1.easeOut, strength: 1, points: 10, taper: "none", randomize:  true, clamp: true});
  var rough4 = RoughEase.ease.config({ template:  Power1.easeOut, strength: 2, points: 10, taper: "none", randomize:  true, clamp: true});
  var rough5 = RoughEase.ease.config({ template:  Power1.easeOut, strength: 2, points: 10, taper: "none", randomize:  true, clamp: true});
  var rough6 = RoughEase.ease.config({ template:  Power1.easeOut, strength: 2, points: 10, taper: "none", randomize:  true, clamp: true});
  
  // Hide all
  TweenMax.set([ground,characters,rockFaces,rockHls,plates], {autoAlpha: 0});

  // Tween ground
  TweenMax.fromTo(ground[0], 2, { autoAlpha: 0.7 }, { autoAlpha: 1, repeat: -1, yoyo: true, ease: rough1 });
  TweenMax.fromTo(ground[1], 2, { autoAlpha: 0.6 }, { autoAlpha: 1, repeat: -1, yoyo: true, ease: rough2 });
  TweenMax.fromTo(ground[2], 2, { autoAlpha: 0.4, scaleX: 0.95 }, { autoAlpha: 0.7, scaleX: 1, transformOrigin: "center", repeat: -1, yoyo: true, ease: rough3 });
  TweenMax.fromTo(ground[3], 2, { autoAlpha: 0.9, scale: 0.95 }, { autoAlpha: 1, scale: 1, transformOrigin: "center", repeat: -1, yoyo: true, ease: rough1 });

  // Tween characters
  //TweenMax.fromTo(characters[0], 2, { autoAlpha: 0 }, { autoAlpha: 1, repeat: -1, yoyo: true, ease: rough1 });
  //TweenMax.fromTo(characters[1], 2, { autoAlpha: 0 }, { autoAlpha: 1, repeat: -1, yoyo: true, ease: rough2 });
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

// @codekit-prepend "Flame.js";
// @codekit-prepend "flicker.js";

var initPlanetBryan = function() {
  // Create scene
    // Create space
    // Inject SVG

  // Cache DOM
  var scene = document.querySelector("[data-anim=scene]");
  var planet = document.querySelector("[data-anim=planet]");
  var fireplace = document.querySelector("[data-anim=fireplace]");

  // Set start values
  var vw = window.innerWidth;
  TweenMax.set(planet, { autoAlpha: 1, transformOrigin: "center" });

  // Reveal scene
  TweenMax.to(scene, 1, {autoAlpha: 1});

  // Start animation
  startFire(fireplace);

  if (vw<500) {
    // Mobile experience
    TweenMax.set(planet, { y: 1000, x: 50, scale: 1.8 });
  } else {
    // Desktop experience
    flicker();
    particlesJS.load('space', 'js/config.json');
    TweenMax.set(planet, { y: 2100, x: 50, scale: 4 });
    TweenMax.from(planet, 20, {y: 4200, x: -1000, scale: 7, rotation: -30, ease: Back.easeOut.config(0.5)});
  }
};


function startFire(parent) {
  // create
  var fire = document.createElementNS("http://www.w3.org/2000/svg", "g");
  
  // populate
  var count = 60;

  for(var i = 0; i < count; i++) {
    var flame = new Flame();
    flame.appendTo(fire);
    if (i%10 === 0) flame.isSparkle();
    flame.animate();
    flame.tl.progress(1/count*i).play().timeScale(0.75);
  }


  // append
  parent.appendChild(fire);
}

// @codekit-prepend "../assets/nerdmanship/js/utility.js";
// @codekit-prepend "space.js";
// @codekit-prepend "stats.js";
// @codekit-prepend "planetBryan.js";

initPlanetBryan();

