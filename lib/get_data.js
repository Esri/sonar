const geolocation = require('./geolocation')
const geoservice = require('./geoservice')
const directions = require('./directions')
const datasets = require('./datasets')
const error = require('./error')
const convert = require('./convert')

module.exports = function getData(dataset, address, env) {
      return geolocation.geometry(address).then(function(location) {

        //   TODO: use the geocoder response
        var region = "dc"
        if(address.match(/New York/)) {
            region = "nyc"
        }
        var config = datasets(dataset, region);

        var url = config.url;
        var geometry = location.x + "," + location.y;
        return geoservice().query(url, geometry, config.distance).then(function(layer) {

         var response = config.template.replace(/\{(\w*)\}/g, function(m,key) {
           var answer = layer.features[0].attributes[key];

           return convert.days(answer)
         });

         if(dataset == "bus stops") {
             console.log("Getting Bus stops: " + JSON.stringify(location))
             return directions(location, layer.features[0].geometry, env).then(function(steps) {
                 console.log("Got Bus stops: " + JSON.stringify(steps))
                 response += "\nHow to get there: " + steps;
                return response;
            }).catch(err => {
                 console.log("Error Bus stops")
                 console.log(err)
            })
         } else {
             return response;
         }

       })
      })
      .catch(function (message) {
        //   var response = "There was an error getting data for " + dataset.toLowerCase() + ".";
        //   response += error
        return Promise.resolve(error());
      });
    }
