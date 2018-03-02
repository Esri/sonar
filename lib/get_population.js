const getEnrichment = require('./get_enrichment')
const error = require('./error')

module.exports = function getPopulation(location, env) {
   return getEnrichment(location, ["KeyGlobalFacts"], ["TOTPOP", "TOTHH"], env)
   .then(function(values) {
     return " There are " + values["TOTPOP"] + " neighbors living in " + values["TOTHH"] + " households witin 200 meters";

   })
   .catch(function (message) {
         // return "There was an error in Get Population. (" + error + ")";
         console.log("Error getting population")
         console.log(message)
         return Promise.resolve(error())
   });
 }
