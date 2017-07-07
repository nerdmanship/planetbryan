/* 

CREATE SPACE

*/

function createSpace(container) {
  // Create and insert #space
  var spaceWrapper = document.createElement("div");
  spaceWrapper.setAttribute("id", "space");
  container.appendChild(spaceWrapper);
  // Init particles
  particlesJS('space', config);
}

/* 

CREATE SPACE END

*/
