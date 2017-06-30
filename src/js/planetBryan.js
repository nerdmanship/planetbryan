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