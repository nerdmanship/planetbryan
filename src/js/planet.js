function createPlanet(container) {
    // Create and insert #planet-wrapper
  var planetWrapper = document.createElement("div");
  planetWrapper.setAttribute("id", "planet-wrapper");
  container.appendChild(planetWrapper);

  // Append SVG in #planet-wrapper
  planetWrapper.insertAdjacentHTML("beforeend", svg);

  var planetBody = document.querySelector("[data-anim=planetBody]");
  TweenMax.set(planetBody, { y: config.planet.y, x: config.planet.x, rotation: 2, scale: config.planet.scale, transformOrigin: "center" });
}