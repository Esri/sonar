const _dayIndex = {
  "mon": "Monday",
  "tue": "Tuesday",
  "wed": "Wednesday",
  "thu": "Thursday",
  "fri": "Friday",
  "sat": "Saturday",
  "sun": "Sunday"
}
function days(input) {

  var output = new String(input.toLowerCase())
  var lookup = Object.keys(_dayIndex);
  for(var i=0; i<lookup.length; i++) {
    output = output.replace(lookup[i], _dayIndex[lookup[i]])
  }
  return output;
}

module.exports = {days}
