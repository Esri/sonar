const ApiBuilder = require('claudia-api-builder')
const api = new ApiBuilder()
const sonar = require('./lib/sonar')

api.post('/api', function (request) {
  return sonar(request.body, { env: process.env }) // request.body contains text, sender
});

module.exports = api
