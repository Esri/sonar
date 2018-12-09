const datasets = require('./datasets')
const geolocation = require('./geolocation')
const geoservice = require('./geoservice')
const error = require('./error')

module.exports = function notes(dataset, location, env) {
  var params = {
    "token": env.arcgisToken,
    "layerUrl": datasets('notes', 'dc').url
  }

  return geolocation.geometry(location).then(function(geometry) {
    geometry.spatialReference = {"wkid": 4326}
    params.edits = {
      "adds": [{
        "attributes": {
          "Name": "Citizen",
          "Category": 2,
          "Location": location,
          "Comments": dataset
        },
        "geometry": geometry
      }]
    }
    return geoservice().modifyFeatures(params).then(function(features) {
      if(features.error !== undefined && feature.error !== null) {
        return Promise.resolve("Error adding note. (" + features.error + ")");
      } else {
        return Promise.resolve("Added note")
      }
    }).catch(function(message) {
      return Promise.resolve(message)
    });
  })
}
