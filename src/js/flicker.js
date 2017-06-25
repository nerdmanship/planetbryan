function flicker() {

  // Cache DOM
  var ground = document.querySelectorAll("[data-anim=ground]"),
  characters = document.querySelectorAll("[data-anim=character]"),
  rockFaces = document.querySelectorAll("[data-anim=rockFace]"),
  rockHls = document.querySelectorAll("[data-anim=rockHl]"),
  plates = document.querySelectorAll("[data-anim=plate]");

  // Define eases
  var rough1 = RoughEase.ease.config({ template:  Power1.easeOut, strength: 1, points: 10, taper: "none", randomize:  true, clamp: true});
  var rough2 = RoughEase.ease.config({ template:  Power1.easeOut, strength: 1, points: 10, taper: "none", randomize:  true, clamp: true});
  var rough3 = RoughEase.ease.config({ template:  Power1.easeOut, strength: 1, points: 10, taper: "none", randomize:  true, clamp: true});
  var rough4 = RoughEase.ease.config({ template:  Power1.easeOut, strength: 2, points: 10, taper: "none", randomize:  true, clamp: true});
  var rough5 = RoughEase.ease.config({ template:  Power1.easeOut, strength: 2, points: 10, taper: "none", randomize:  true, clamp: true});
  var rough6 = RoughEase.ease.config({ template:  Power1.easeOut, strength: 2, points: 10, taper: "none", randomize:  true, clamp: true});
  
  // Hide all
  TweenMax.set([ground,characters,rockFaces,rockHls,plates], {autoAlpha: 0});

  // Tween ground
  TweenMax.fromTo(ground[0], 2, { autoAlpha: 0.7 }, { autoAlpha: 1, repeat: -1, yoyo: true, ease: rough1 });
  TweenMax.fromTo(ground[1], 2, { autoAlpha: 0.6 }, { autoAlpha: 1, repeat: -1, yoyo: true, ease: rough2 });
  TweenMax.fromTo(ground[2], 2, { autoAlpha: 0.4, scaleX: 0.95 }, { autoAlpha: 0.7, scaleX: 1, transformOrigin: "center", repeat: -1, yoyo: true, ease: rough3 });
  TweenMax.fromTo(ground[3], 2, { autoAlpha: 0.9, scale: 0.95 }, { autoAlpha: 1, scale: 1, transformOrigin: "center", repeat: -1, yoyo: true, ease: rough1 });

  // Tween characters
  TweenMax.fromTo(characters[0], 2, { autoAlpha: 0 }, { autoAlpha: 1, repeat: -1, yoyo: true, ease: rough1 });
  TweenMax.fromTo(characters[1], 2, { autoAlpha: 0 }, { autoAlpha: 1, repeat: -1, yoyo: true, ease: rough2 });

  // Tween rock faces
  TweenMax.fromTo(rockFaces[0], 2, { autoAlpha: 0.75 }, { autoAlpha: 1, repeat: -1, yoyo: true, ease: rough4 });
  TweenMax.fromTo(rockFaces[1], 2, { autoAlpha: 0.75 }, { autoAlpha: 1, repeat: -1, yoyo: true, ease: rough5 });
  TweenMax.fromTo(rockFaces[2], 2, { autoAlpha: 0.75 }, { autoAlpha: 1, repeat: -1, yoyo: true, ease: rough6 });
  TweenMax.fromTo(rockFaces[3], 2, { autoAlpha: 0.75 }, { autoAlpha: 1, repeat: -1, yoyo: true, ease: rough4 });
  TweenMax.fromTo(rockFaces[4], 2, { autoAlpha: 0.75 }, { autoAlpha: 1, repeat: -1, yoyo: true, ease: rough5 });

  // Tween rock highlights
  TweenMax.fromTo(rockHls[0], 2, { autoAlpha: 0.15 }, { autoAlpha: 0.5, repeat: -1, yoyo: true, ease: rough3 });
  TweenMax.fromTo(rockHls[1], 2, { autoAlpha: 0.15 }, { autoAlpha: 0.5, repeat: -1, yoyo: true, ease: rough3 });
  TweenMax.fromTo(rockHls[2], 2, { autoAlpha: 0.15 }, { autoAlpha: 0.5, repeat: -1, yoyo: true, ease: rough3 });
  TweenMax.fromTo(rockHls[3], 2, { autoAlpha: 0.15 }, { autoAlpha: 0.5, repeat: -1, yoyo: true, ease: rough3 });
  TweenMax.fromTo(rockHls[4], 2, { autoAlpha: 0.15 }, { autoAlpha: 0.5, repeat: -1, yoyo: true, ease: rough3 });

  // Tween plate highlights
  TweenMax.fromTo(plates[0], 2, { autoAlpha: 0.35 }, { autoAlpha: 1, repeat: -1, yoyo: true, ease: rough1 });
  TweenMax.fromTo(plates[1], 2, { autoAlpha: 0.35 }, { autoAlpha: 1, repeat: -1, yoyo: true, ease: rough2 });
}