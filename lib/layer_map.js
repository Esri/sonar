const getLocation = require('./get_location')
const webmapUrl = require('./webmap_url')
const datasets = require('./datasets')

module.exports = function layerMap(dataset, address) {
  return getLocation(address).then(function(location) {
    return webmapUrl(location, {"url": datasets(dataset).url})
  });
}
