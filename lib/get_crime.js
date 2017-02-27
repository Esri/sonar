const getQuery = require('./get_query')
const getLocation = require('./get_location')

module.exports = function getCrime(address) {
  return getLocation(address).then(function(location) {
    var url = "https://maps2.dcgis.dc.gov/dcgis/rest/services/FEEDS/CDW_Feeds/MapServer/8";
    var geometry = location.x + "," + location.y;
    return getQuery(url, geometry, 200).then(function(layer) {
      var response = "There were " + layer.features.length + " crimes nearby in the past month."
      switch(layer.features.length) {
          case 0:
                response += " It's completely safe right now."
                break;
          case 1:
                response += " Stay safe."
                break;
          case 2:
                response += " It's a little scary out there."
                break;
          default:
                response += " It's dangerous, why are you talking to me?!"
      }
      return response;
   })
  })
  .catch(function (error) {
        return "There was an error in Get Crime. (" + error + ")";
  });
}
