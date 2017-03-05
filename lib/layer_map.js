const geolocation = require('./geolocation')
const webmapUrl = require('./webmap_url')
const datasets = require('./datasets')

module.exports = function layerMap(dataset, address) {
  return geolocation.geometry(address).then(function(location) {
    return webmapUrl(location, {"url": datasets(dataset).url})
  });
}
