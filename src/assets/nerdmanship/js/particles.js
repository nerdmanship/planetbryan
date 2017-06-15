class Particle {
  
  constructor(radius, cx, cy) {

    this.target = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    this.target.setAttribute("r", radius);
    
    if (cx && cy) {
      this.target.setAttribute("cx", cx);
      this.target.setAttribute("cy", cy);
    }
  }

  appendTo(parent) {
    parent.appendChild(this.target);
  }

}