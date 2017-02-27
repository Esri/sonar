const getLocation = require('./get_location')
const webmapUrl = require('./webmap_url')

module.exports = function getMap(address) {
  return getLocation(address).then(webmapUrl);
}
