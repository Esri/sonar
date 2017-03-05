const datasets = require('./datasets')
const geolocation = require('./geolocation')
const geoservice = require('./geoservice')

module.exports = function checkin(dataset, location, env) {
  var params = {
    "token": env.arcgisToken,
    "layerUrl": datasets('checkins').url
  }

  return geolocation.geometry(location).then(function(geometry) {
    geometry.spatialReference = {"wkid": 4326}
    params.edits = {
      "adds": [{
        "attributes": {
          "Name": "Bob",
          "Category": 1,
          "Location": location,
          "Comments": dataset
        },
        "geometry": geometry
      }]
    }
    return geoservice().modifyFeatures(params).then(function(features) {
      return Promise.resolve("Added note")
    });
  })
}
