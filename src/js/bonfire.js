/* 

BONFIRE ANIMATION

*/


function createFlames() {
  var fireplace = document.querySelector("[data-anim=fireplace]");
  var fireGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
  var flames = config.flames.targets;
  var count = config.flames.count;

  for(var i = 0; i < count; i++) {
    // Create new flame
    var flame = new Flame();
    // Add to array
    flames.push(flame);
    // Add flame to group
    flame.appendTo(fireGroup);
    // Make every 10th flame a sparkle
    if (i%10 === 0) flame.isSparkle();
  }

  fireplace.appendChild(fireGroup);


  for(var i = 0; i < flames.length; i++) {
    // Animate flame
    flames[i].animate();
    // Set unique starting poing of flame
    flames[i].tl.progress(1/count*i);
  }
}


function animateFlames() {
  var flames = config.flames.targets;
  
  for(var i = 0; i < flames.length; i++) {

    flames[i].tl.play().timeScale(0.65);
  }
}

/* 

BONFIRE ANIMATION END

*/
