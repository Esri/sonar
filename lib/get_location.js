var request = require('request-promise')
var qs = require('querystring')

module.exports = function getLocation(address) {
 var url = `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/find`;
 //  &bbox=${bbox}
 params = {
   "text": address,
   "isCollection":false,
   "outSR":4326,
   "f": "json",
   "maxlocations": 5
   };
 return request({ method: 'get', url:url + "?" + qs.stringify(params), json: true})
  .then(function (body) {
    var coordinates = body.locations[0].feature.geometry
    return coordinates;
  })
  .catch(function (error) {
        return "There was an error in Get Location. (" + error + ")";
  });
}
