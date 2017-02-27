const qs = require('querystring')

module.exports = function webmapUrl(location, params) {
  if(params === undefined)
    params = {}


  var url = "https://www.arcgis.com/home/webmap/viewer.html"
  params.marker = location.x + ";" + location.y + ";;Dreses Was Here;;Dreses Was Here";
  params.level = 12;
  return url + "?" + qs.stringify(params);
}
