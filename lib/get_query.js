var request = require('request-promise')
var qs = require('querystring')

module.exports = function getQuery(url, geometry, distance) {
  params = {
    "outFields": "*",
    "geometryType":"esriGeometryPoint",
    "geometry": geometry,
    "inSR":4326,
    "f": "json",
    "distance": distance,
    "units": "esriSRUnit_Meter"
    };
  return request({ method: 'get', url:url + "/query?" + qs.stringify(params), json: true});
}
