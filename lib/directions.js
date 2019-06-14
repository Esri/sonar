var request = require('request-promise')

const directionsUrl = "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World/solve"

function getRoute(directions) {
  var steps = directions.directions[0].features;
  var response = [];
  for(var i=0; i<steps.length; i++) {
    response.push(steps[i].attributes.text);
  }

  return response.join("\n");

}

module.exports = function directions(start, stop, env) {
  var params = {
    "token": env.arcgisToken,
    "f": "json"
  }
  params.stops = [[start.x, start.y],[stop.x, stop.y]].join(";")
  console.log("Bus Stop request " + JSON.stringify(params))
  return request({method: 'post', qs: params, uri: directionsUrl, json: true })
          .then(getRoute)
          .catch(err => {
            console.log("Error getting stops")
            console.log(err)
          })
}
