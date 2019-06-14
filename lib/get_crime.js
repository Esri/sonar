const geoservice = require('./geoservice')
const geolocation = require('./geolocation')
const error = require('./error')

module.exports = function getCrime(address) {
  return geolocation.geometry(address).then(function(location) {
    var url = "https://maps2.dcgis.dc.gov/dcgis/rest/services/FEEDS/MPD/MapServer/8";
    var geometry = location.x + "," + location.y;
    return geoservice().query(url, geometry, 200).then(function(layer) {
      var response = "There were " + layer.features.length + " crimes nearby in the past month."
      switch(layer.features.length) {
          case 0:
                response += " It's completely safe right now."
                break;
          case 1:
                response += " Stay safe."
                break;
          case 2:
                response += " Stay safe."
                break;
          default:
                response += " It's something to be worried about."
      }
      return response;
   })
  })
  .catch(function (message) {
    // return "There was an error in Get Crime. (" + error + ")";
    return Promise.resolve(error())
  });
}
