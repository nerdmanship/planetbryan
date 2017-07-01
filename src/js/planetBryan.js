//- @codekit-prepend "config.js";
//- @codekit-prepend "Flame.js";
//- @codekit-prepend "svg.js";
//- @codekit-prepend "space.js";
//- @codekit-prepend "layout.js";
//- @codekit-prepend "intro.js";
//- @codekit-prepend "planet.js";
//- @codekit-prepend "flicker.js";
//- @codekit-prepend "bonfire.js";


/* INIT */

var initPlanetBryan = function(id) {

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
  if(config.flicker) startFlicker();
  if(config.intro) playIntro();
  if(config.fire) animateFlames();
};

// INIT END