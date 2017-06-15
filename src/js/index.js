// @codekit-prepend "space.js";
// @codekit-prepend "stats.js";

var scene = document.querySelector("[data-anim=scene]");
var planet = document.querySelector("[data-anim=planet]");

// check screenwidth
var vw = window.innerWidth;

// Start settings
TweenMax.set(planet, { autoAlpha: 1, rotation: 2, transformOrigin: "center" });

// Reveal scene
TweenMax.to(scene, 1, {autoAlpha: 1});

if (vw<500) {
  // Mobile experience
  TweenMax.set(planet, { y: 1000, x: 50, scale: 1.8 });
} else {
  // Desktop experience
  TweenMax.set(planet, { y: 2100, x: 50, scale: 4 });
  TweenMax.from(planet, 20, {y: 4200, x: -1000, scale: 7, rotation: -30, ease: Back.easeOut.config(0.5)});
}