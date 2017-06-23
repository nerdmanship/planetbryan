// create sparkles

class Flame {
  
  constructor() {
    var side = 4;
    this.target = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    this.target.setAttribute("width", side);
    this.target.setAttribute("height", side);
    this.target.setAttribute("fill", "red");
    this.target.setAttribute("style", "mix-blend-mode: screen;");
  }

  appendTo(parent) {
    parent.appendChild(this.target);
  }

  isSparkle() {
    this.sparkle = true;
  }

  animate() {
    var f = this.target;
    var totTime = spread(12,2);
    var timeX = [spread(1, 0.1), spread(1, 0.5), spread(1, 0.5)];
    var timeS = [spread(0.5, 0.25), spread(1.5, 0.75), spread(3, 1), spread(1.5, 0.5)];
    var timeA = [spread(1.5, 0.5)];

    var yEase = Power1.easeOut;

    var xMin = spread(50,10);
    var xMax = random(100,120);
    var y = [198, random(50, 125)];
    
    var x = [spread(xMin, 1), spread(xMin, 1), spread(xMin, 3), spread(xMin, 5), spread(xMax, 100)];
    var s = [spread(1, 0.1), spread(4, 1), spread(1, 0.5), spread(4, 1), spread(1, 0.5)];
    var c = [ "hsl(10,65%,55%)", "hsl(40,100%,70%)", "hsl(40,0%,40%)"];

    if (this.sparkle) {
      // scale
      var _s = spread(0.2, 0.05);
      s = [_s, _s, _s, _s, _s];

      // fade timing
      timeA = [spread(5.5, 0.5)];

      // speed rising
      yEase = Power4.easeOut;
      y[1] = spread(50, 25);
      
      // percieved brightness
      c[0] = "hsl(40,100%,90%)";
      c[1] = "hsl(40,50%,50%)";

      // spread width
      x = [spread(xMin, 20), spread(xMin, 20), spread(xMin, 20), spread(xMin, 20), spread(xMin, 100)];  
      timeX = [spread(2, 0.1), spread(2, 0.5), spread(2, 0.5)];
    }

    TweenMax.set(f, {fill: c[0], x: x[0], y: y[0], scale: s[0], autoAlpha: 1, rotation: 45, transformOrigin: "center"});

    this.tl = new TimelineMax({repeat: -1, paused: true});

    this.tl
      .add("start")
      // Y
      .to(f, totTime, {y: y[1], ease: yEase}, "start")
      
      // X
      .to(f, timeX[0], { x: x[1], ease: Power1.easeOut}, "start")
      .to(f, timeX[1], { x: x[2], ease: Power1.easeInOut}, timeX[0])
      .to(f, timeX[2], { x: x[3], ease: Power1.easeInOut}, timeX[0] + timeX[1])
      .to(f, totTime-(timeX[0] + timeX[1] + timeX[2]), { x: x[4], ease: Power1.easeIn}, timeX[0] + timeX[1] + timeX[2])

      // SCALE
      .to(f, timeS[0], { scale: s[1], ease: Power1.easeOut}, "start")
      .to(f, timeS[1], { scale: s[2], ease: Power1.easeInOut}, timeS[0])
      .to(f, timeS[2], { scale: s[3], ease: Power1.easeInOut}, timeS[0] + timeS[1])
      .to(f, totTime-(timeS[0] + timeS[1] + timeS[2]), { scale: s[4], ease: Power1.easeOut}, timeS[0] + timeS[1] +timeS[2])

      // COLOR
      .to(f, timeA[0], { fill: c[1], ease: Power1.easeInOut}, "start")
      .to(f, 1, { fill: c[2], ease: Power1.easeInOut}, timeA[0])

      // ALPHA
      .to(f, totTime-timeA[0], { autoAlpha: 0, ease: Back.easeOut }, timeA[0])
      ;

  }
}


function spread(value, range) {
  return random(value-range, value+range);
}