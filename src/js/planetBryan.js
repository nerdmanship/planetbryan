// @codekit-prepend "Flame.js";
// @codekit-prepend "flicker.js";
// @codekit-prepend "svg.js";

var initPlanetBryan = function(id) {
  buildSceneIn(id);
  animateScene();
};

function buildSceneIn(id) {
  var container = document.querySelector("#" + id);

  // Create and insert #space
  var spaceWrapper = document.createElement("div");
  spaceWrapper.setAttribute("id", "space");
  container.appendChild(spaceWrapper);

  // Create and insert #planet-wrapper
  var planetWrapper = document.createElement("div");
  planetWrapper.setAttribute("id", "planet-wrapper");
  container.appendChild(planetWrapper);

  // Append SVG in #planet-wrapper
  planetWrapper.insertAdjacentHTML("beforeend", svg);
}

function animateScene() {
  
  var planetBody = document.querySelector("[data-anim=planetBody]");

  startFire();
  flicker();
  createSpace();
  
  TweenMax.set(planetBody, { y: 1000, x: 50, scale: 1.8, transformOrigin: "center" });
  
  if (window.innerWidth > 321) {
    TweenMax.set(planetBody, { y: 1900, x: 50, scale: 4, rotation: 2, transformOrigin: "center" });
    //TweenMax.from(planetBody, 20, {y: 4200, x: -1000, scale: 7, rotation: -30, ease: Back.easeOut.config(0.5)});
  }


}


function startFire() {
  var fireplace = document.querySelector("[data-anim=fireplace]");
  var fireGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
  var count = 60;

  for(var i = 0; i < count; i++) {
    // Create new flame
    var flame = new Flame();
    // Add flame to group
    flame.appendTo(fireGroup);
    // Make every 10th flame into sparkle
    if (i%10 === 0) flame.isSparkle();
    // Animate flame
    flame.animate();
    // Set unique starting poing of flame
    flame.tl.progress(1/count*i).play().timeScale(0.75);
  }

  fireplace.appendChild(fireGroup);
}

function createSpace() {
  particlesJS.load('space', 'js/config.json');
}