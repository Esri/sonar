const getEnrichment = require('./get_enrichment')

module.exports = function getPopulation(location, env) {
   return getEnrichment(location, ["KeyGlobalFacts"], ["TOTPOP", "TOTHH"], env).then(function(values) {
     return location + " has " + values["TOTPOP"] + " neighbors living in " + values["TOTHH"] + " households";

   })
   .catch(function (error) {
         return "There was an error in Get Population. (" + error + ")";
   });
 }
