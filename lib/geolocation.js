var request = require('request-promise')
var qs = require('querystring')
const error = require('./error')

function locations(address) {
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
     return body.locations;
   })
   .catch(function (error) {
         return "There was an error in Get Location. (" + error + ")";
   });

}

function geometry(address) {
  return locations(address).then(function(locations) {
    // console.log("geometry", JSON.stringify(locations[0]))
    var coordinates = locations[0].feature.geometry
    return coordinates;

  }).catch(function(message) {
    return Promise.resolve(error())
  });
}

module.exports = {geometry, locations}
