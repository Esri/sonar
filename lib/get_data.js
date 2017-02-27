const getLocation = require('./get_location')
const getQuery = require('./get_query')

const datasets = {
      "trash": {
            "url": "http://maps2.dcgis.dc.gov/dcgis/rest/services/DCGIS_DATA/Public_Service_WebMercator/MapServer/13",
            "distance": 1,
            "template": "Trash pickup is {DAY_}"
      },
      "crime": {
            "url": "https://maps2.dcgis.dc.gov/dcgis/rest/services/FEEDS/CDW_Feeds/MapServer/8",
            "distance": 200,
            "template": "The most recent crime was {OFFENSE}"
      },
      "anc": {
            "url": "https://maps2.dcgis.dc.gov/dcgis/rest/services/DCGIS_DATA/Administrative_Other_Boundaries_WebMercator/MapServer/1",
            "distance": 1,
            "template": "The ANC is {NAME}"
      },
      "bus stops": {
            "url": "http://maps2.dcgis.dc.gov/dcgis/rest/services/DCGIS_DATA/Transportation_WebMercator/MapServer/53",
            "distance": 200,
            "template": "The nearest stop is at {BSTP_MSG_TEXT}"
      }
}

module.exports = function getData(dataset, address) {
      return getLocation(address).then(function(location) {
      var config = datasets[dataset.toLowerCase()];
        var url = config.url;
        var geometry = location.x + "," + location.y;
        return getQuery(url, geometry, config.distance).then(function(layer) {
         return config.template.replace(/\{(\w*)\}/g, function(m,key) {
               return layer.features[0].attributes[key];
         });
       })
      })
      .catch(function (error) {
        return "There was an error in Get Data for " + dataset.toLowerCase() + ". (" + error + ")";
      });
    }
