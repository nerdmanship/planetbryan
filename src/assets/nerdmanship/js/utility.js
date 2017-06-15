function random(min, max) {
  if (max === null) { max = min; min = 0; }
  return min + Math.random() * (max - min);
}

// Get returns a value on destination range based on the input value on source range
function map(value, sourceMin, sourceMax, destinationMin, destinationMax) {
  return destinationMin + (destinationMax - destinationMin) * ((value - sourceMin) / (sourceMax - sourceMin)) || 0;
}

// exponential index normalization = index^pow / count^pow
function expNorm(val, min, max, power) {
  var expValue = Math.pow((val-min), power);
  var expRange = Math.pow((max-min), power);

  // Test this to make sure...
  return expValue/expRange;
}

function degreesToRads(degrees) {
  return degrees * Math.PI / 180;
}

function radsToDegrees(rads) {
  return rads / Math.PI * 180;
}