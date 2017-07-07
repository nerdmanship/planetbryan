/* 

UTILITY LIBRARY

*/

// Returns random float value
function random(min, max) {
  if (max === null) { max = min; min = 0; }
  return min + Math.random() * (max - min);
}

// Returns a value on destination range based on the input value on source range
function map(value, sourceMin, sourceMax, destinationMin, destinationMax) {
  return destinationMin + (destinationMax - destinationMin) * ((value - sourceMin) / (sourceMax - sourceMin)) || 0;
}

// Returns index exponentially distributed
function expNorm(val, min, max, power) {
  var expValue = Math.pow((val-min), power);
  var expRange = Math.pow((max-min), power);

  return expValue/expRange;
}

// Returns degrees converted to radients
function degreesToRads(degrees) {
  return degrees * Math.PI / 180;
}

// Returns radients converted to degrees
function radsToDegrees(rads) {
  return rads / Math.PI * 180;
}

// Returns a random value on the range between value-offset and value+offset
function spread(value, offset) {
  var min = value-offset;
  var max = value+offset;
  
  return min + Math.random() * (max - min);
}

// Display data on screen in development
function displayData(data) {
  
  // Grab the div
  var dataDiv = document.querySelector("#data");

  // Create one if there isn't one already
  if (!dataDiv) {
    dataDiv = document.createElement("div");
    dataDiv.id = "data";
    dataDiv.style = "margin-left: 100px; color: white;";
    document.body.appendChild(dataDiv);
  }
  
  // Append the new data
  dataDiv.innerHTML = dataDiv.innerHTML + "<br/>" + data;
}
/* 

UTILITY LIBRARY END

*/