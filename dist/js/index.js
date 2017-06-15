particlesJS.load('space', 'js/config.json');

javascript:(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//rawgit.com/mrdoob/stats.js/master/build/stats.min.js';document.head.appendChild(script);})()

// @codekit-prepend "space.js";
// @codekit-prepend "stats.js";

var space = document.querySelector("[data-anim=space]");
var planet = document.querySelector("[data-anim=planet]");

// check screenwidth
var vw = window.innerWidth;

// Start settings
TweenMax.set(planet, { autoAlpha: 1, rotation: 2, transformOrigin: "center" });

TweenMax.to(space, 1, {autoAlpha: 1});

if (vw<500) {
  // Mobile intro
  TweenMax.set(planet, { y: 800, x: 50, scale: 1.4 });
} else {
  // Desktop intro
  TweenMax.set(planet, { y: 2100, x: 50, scale: 4 });
  TweenMax.from(planet, 10, {y: 4200, x: -1000, scale: 7, rotation: -20, ease: Back.easeOut.config(0.5)});
}

