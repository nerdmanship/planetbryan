/* 

FLAME CLASS

*/

class Flame {
  
  constructor() {
    var side = 8;
    var shape = "";
    if (shape === "circle") {
      this.target = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      this.target.setAttribute("r", side/2);
      this.target.setAttribute("fill", "red");

    } else {
      this.target = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      this.target.setAttribute("width", side);
      this.target.setAttribute("height", side);
      this.target.setAttribute("rx", side/16);
      this.target.setAttribute("fill", "red");
    }

  }

  appendTo(parent) {
    parent.appendChild(this.target);
  }

  isSparkle() {
    this.sparkle = true;
  }

  animate() {
    var f = this.target;

    // Flame settings
    var totTime = 12;
    var timeX = [spread(1, 0.3), spread(1, 0.2), spread(1, 0.5)];
    var timeS = [spread(0.3, 0.15), spread(2, 0.2), spread(4.5, 0.2)];
    var timeC = [spread(1, 0.2), spread(2, 0.3), spread(1, 0.3)];

    var yEase = Power1.easeOut;

    var xMin = 40;
    var xMax = spread(70,10);
    
    var y = [
              193,
              spread(175, 1),
              spread(170, 1),
              spread(120, 1),
              spread(config.flames.height, 25)
              ];
    
    var x = [
              spread(xMin, 12),
              spread(xMin, 8),
              spread(4, 2),
              spread(10, 10),
              spread(xMax+150, 100)
              ];
    
    var s = [
              0.5,
              spread(2, 0.3),
              spread(0.2, 0.15),
              spread(4, 1),
              spread(1, 0.5)
              ];
    
    var c = [ 
              "hsl(" + random(10,25)+ ", " + random(75,85)+ "%, 60%)",
              "hsl(45, 100%, " + random(75,95)+ "%)",
              "hsl(45,0%,40%)" // gray
              ];

    var a = [
              1,
              config.flames.smoke,
              0
              ];

    // Sparkle settings
    if (this.sparkle) {
      // scale
      var _s = spread(0.1, 0.025);
      s = [_s, _s, _s, _s, _s];

      // fade timing
      timeS = [spread(4, 1), spread(4, 1), 0.1];
      timeC = [spread(1, 0.2), spread(2, 0.3), spread(1, 0.3)];

      // speed rising
      yEase = Power4.easeOut;
      y[3] = spread(25, 25);
      
      // percieved brightness
      c[0] = "hsl(40,100%,90%)";
      c[1] = "hsl("+random(30,50)+",100%, "+random(50,85)+"%)";

      // spread width
      x = [spread(xMin, 20), spread(xMin, 20), spread(xMin, 20), spread(xMin, 20), spread(xMin, 100)];  
      timeX = [spread(2, 0.1), spread(2, 0.5), spread(2, 0.5)];
    }

    // Start settings
    TweenMax.set(f, {fill: c[0], x: x[0], y: y[0], scale: s[0], autoAlpha: a[0], rotation: 45, transformOrigin: "bottom center"});

    // Timeline
    this.tl = new TimelineMax({repeat: -1, paused: true});

    this.tl
      .add("start")
      // Y
      .to(f, totTime-0.5, {bezier: [{y:y[1]}, {y:y[2]}, {y:y[3]}, {y:y[4]} ], ease: yEase}, "start =+0.5")
      
      // X
      .to(f, timeX[0], { x: x[1], ease: Power1.easeOut}, "start")
      .to(f, timeX[1], { x: "+=" + x[2], ease: Power1.easeInOut}, timeX[0])
      .to(f, timeX[2], { x: "-=" + x[3], ease: Power1.easeInOut}, timeX[0] + timeX[1])
      .to(f, totTime-(timeX[0] + timeX[1] + timeX[2]), { x: x[4], ease: Power1.easeIn}, timeX[0] + timeX[1] + timeX[2])

      // SCALE
      .to(f, timeS[0], { scale: s[1], ease: Power1.easeOut}, "start")
      .to(f, timeS[1], { scale: s[2], ease: Power1.easeInOut, transformOrigin: "top center"}, timeS[0])
      .to(f, timeS[2], { scale: s[3], ease: Power1.easeInOut}, timeS[0] + timeS[1])
      .to(f, totTime-(timeS[0] + timeS[1] + timeS[2]), { scale: s[4], ease: Power1.easeOut}, timeS[0] + timeS[1] +timeS[2])

      // COLOR
      .to(f, timeC[0], { fill: c[1], ease: Power1.easeInOut}, "start")
      .to(f, timeC[1], { fill: c[1], ease: Power1.easeInOut}, timeC[0])
      .to(f, timeC[2], { fill: c[2], ease: Power1.easeInOut}, timeS[0] + timeS[1])

      // ALPHA
      .to(f, timeC[1], { autoAlpha: a[1], ease: Power1.easeOut }, timeS[0] + timeS[1])
      .to(f, totTime-(timeS[0] + timeS[1] + timeC[1]), { autoAlpha: a[2], ease: Power2.easeOut }, (timeS[0] + timeS[1] + timeC[1]))
      ;
  }
}

/* 

FLAME CLASS END

*/