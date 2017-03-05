const geolocation = require('./geolocation')
const webmapUrl = require('./webmap_url')

module.exports = function getMap(address) {
  return geolocation.geometry(address).then(webmapUrl);
}
