const qs = require('querystring')

module.exports = function webmapUrl(location, params) {
  if(params === undefined)
    params = {}


  var url = "https://www.arcgis.com/home/webmap/viewer.html"
  if(params.marker === undefined || params.marker === null) {
    params.marker = location.x + ";" + location.y + ";;Dreses Was Here;;Dreses Was Here";
  }
  if(params.level === undefined || params.level === null) {
    params.level = 15;
  }

  return url + "?" + qs.stringify(params);
}
