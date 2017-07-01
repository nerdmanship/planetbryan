class Flame {
  
  constructor() {
    var side = 4;
    this.target = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    this.target.setAttribute("width", side);
    this.target.setAttribute("height", side);
    this.target.setAttribute("fill", "red");
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
    var totTime = spread(12,2);
    var timeX = [spread(1, 0.1), spread(1, 0.2), spread(1, 0.5)];
    var timeS = [spread(0.3, 0.15), spread(1.2, 0.5), spread(4.5, 0.5), spread(1, 0.5)];
    var timeC = [spread(1, 0.2), spread(2, 0.3), spread(2, 0.3)];

    var yEase = Power1.easeOut;

    var xMin = 47;
    var xMax = spread(70,10);
    
    var y = [
              195,
              spread(185, 1),
              spread(180, 1),
              spread(175, 1),
              spread(config.flames.height, 25)
              ];
    
    var x = [
              spread(xMin, 18),
              spread(xMin, 8),
              spread(4, 2),
              spread(4, 2),
              spread(xMax+100, 40)
              ];
    
    var s = [
              0.5,
              spread(3.5, 1),
              spread(1, 0.3),
              spread(4, 1),
              spread(1, 0.5)
              ];
    
    var c = [ 
              "hsl(" + random(5,15)+ ", " + random(75,85)+ "%, 60%)",
              "hsl(45, 100%, " + random(75,95)+ "%)", // gray
              "hsl(45,0%,40%)" // gray
              ];

    // Sparkle settings
    if (this.sparkle) {
      // scale
      var _s = spread(0.2, 0.05);
      s = [_s, _s, _s, _s, _s];

      // fade timing
      timeC = [2,8];

      // speed rising
      yEase = Power4.easeOut;
      y[3] = spread(config.flames.height, 25);
      
      // percieved brightness
      c[0] = "hsl(40,100%,90%)";
      c[1] = "hsl("+random(20,40)+",100%,70%)";

      // spread width
      x = [spread(xMin, 20), spread(xMin, 20), spread(xMin, 20), spread(xMin, 20), spread(xMin, 100)];  
      timeX = [spread(2, 0.1), spread(2, 0.5), spread(2, 0.5)];
    }

    // Start settings
    TweenMax.set(f, {fill: c[0], x: x[0], y: y[0], scale: s[0], autoAlpha: 1, rotation: 45, transformOrigin: "center"});

    // Timeline
    this.tl = new TimelineMax({repeat: -1, paused: true});

    this.tl
      .add("start")
      // Y
      .to(f, totTime-0.1, {bezier: [{y:y[1]}, {y:y[2]}, {y:y[3]}, {y:y[4]} ], ease: yEase}, "start =+0.1")
      
      // X
      .to(f, timeX[0], { x: x[1], ease: Power1.easeOut}, "start")
      .to(f, timeX[1], { x: "+=" + x[2], ease: Power1.easeInOut}, timeX[0])
      .to(f, timeX[2], { x: "-=" + x[3], ease: Power1.easeInOut}, timeX[0] + timeX[1])
      .to(f, totTime-(timeX[0] + timeX[1] + timeX[2]), { x: x[4], ease: Power1.easeIn}, timeX[0] + timeX[1] + timeX[2])

      // SCALE
      .to(f, timeS[0], { scale: s[1], ease: Power1.easeOut}, "start")
      .to(f, timeS[1], { scale: s[2], ease: Power1.easeInOut}, timeS[0])
      .to(f, timeS[2], { scale: s[3], ease: Power1.easeInOut}, timeS[0] + timeS[1])
      .to(f, totTime-(timeS[0] + timeS[1] + timeS[2]), { scale: s[4], ease: Power1.easeOut}, timeS[0] + timeS[1] +timeS[2])

      // COLOR
      .to(f, timeC[0], { fill: c[1], ease: Power1.easeInOut}, "start")
      .to(f, timeC[1], { fill: c[2], ease: Power1.easeInOut}, timeS[0] + timeS[1])

      // ALPHA
      .to(f, timeC[1], { autoAlpha: 0.2, ease: Power1.easeOut }, timeS[0] + timeS[1])
      .to(f, totTime-(timeS[0] + timeS[1] + timeC[1]), { autoAlpha: 0, ease: Power2.easeOut }, (timeS[0] + timeS[1] + timeC[1]))
      ;
  }
}