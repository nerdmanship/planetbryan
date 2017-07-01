function setLayout() {
  if (window.innerWidth < 376) {
    config.planet.x = 70;
    config.planet.y = 1100;
    config.planet.scale = 1.8;
  } else if (window.innerWidth < 376 && bowser.ios && bowser.tablet) {
    config.planet.y = 1950;
  }
}