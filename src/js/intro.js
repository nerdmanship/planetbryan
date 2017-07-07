/* 

INTRO

*/

function playIntro() {
  var planetBody = document.querySelector("[data-anim=planetBody]");
  TweenMax.from(planetBody, 20, {y: 5200, x: -3500, scale: 10, rotation: -30, ease: Back.easeOut.config(0.5)});
}

/* 

INTRO END

*/