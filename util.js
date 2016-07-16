function isInt(value) {
  var x;
  if (isNaN(value)) {
    return false;
  }
  x = parseFloat(value);
  return (x | 0) === x;
}

function assert(expr, mssg) {
    if (expr) {
        console.log(mssg);
    } else {
        console.log("ERROR: " + mssg);
    }
}


