// @codekit-prepend "space.js";
// @codekit-prepend "stats.js";

var planet = document.querySelector("[data-anim=planet]");

TweenMax.set(planet, { autoAlpha: 1, y: 2100, x: 50, scale: 4, rotation: 2, transformOrigin: "center" });
TweenMax.from(planet, 10, {y: 4200, x: -1000, scale: 7, rotation: -50, ease: Back.easeOut.config(0.5), onComplete: idle});

function idle() {
  //TweenMax.to(planet, 5, { y: 2120, repeat: -1, yoyo: true, ease: Power1.easeInOut });
  console.log("idle");
}