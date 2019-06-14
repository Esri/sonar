var request = require('request-promise')
var qs = require('querystring')
const error = require('./error')

module.exports = function getEnrichment(location, collections, attributes, env) {
  var token = env.arcgisToken;
  var url = "https://geoenrich.arcgis.com/arcgis/rest/services/World/geoenrichmentserver/GeoEnrichment/enrich";
  params = {
      "dataCollections":JSON.stringify(collections),
      "studyAreas":JSON.stringify([
        {"address":{"text":location},
         "areaType":"RingBuffer","bufferUnits":"esriMiles","bufferRadii":[0.1]}]),
      "f":"pjson",
      "token":token
    };

  return request({ method: 'get', url:url + "?" + qs.stringify(params), json: true})
   .then(function (body) {
     var values = {}
     console.log("Enrichment." + JSON.stringify(attributes))
     for(var i=0; i<attributes.length;i++) {
       values[attributes[i]] = body.results[0].value.FeatureSet[0].features[0].attributes[attributes[i]];
     }
     return values;
   })
   .catch(function (message) {
        //  return "There was an error in Get Enrichment."
        console.log("There was an error in Get Enrichment.")
        console.log(message)
         return Promise.resolve(error());
   });
}
