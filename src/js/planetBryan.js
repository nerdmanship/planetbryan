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
  if(config.flames.anim) animateFlames();
};

/* 

INITIALISATION END

*/
