const geolocation = require('./geolocation')
const geoservice = require('./geoservice')
const datasets = require('./datasets')

module.exports = function getData(dataset, address) {
      return geolocation.geometry(address).then(function(location) {
      var config = datasets(dataset);
        var url = config.url;
        var geometry = location.x + "," + location.y;
        return geoservice.query(url, geometry, config.distance).then(function(layer) {
         return config.template.replace(/\{(\w*)\}/g, function(m,key) {
               return layer.features[0].attributes[key];
         });
       })
      })
      .catch(function (error) {
        return "There was an error in Get Data for " + dataset.toLowerCase() + ". (" + error + ")";
      });
    }
