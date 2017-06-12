var address = "101 4th St NE, Washington, DC";
var token = process.env.ARCGIS_TOKEN;
var geolocation = require('./lib/geolocation')
var env = {"arcgisToken": token}

function log(name, method) {
  method.then(function(text) {
    console.log(name + ": ", JSON.stringify(text))
  })
}

const getData = require('./lib/get_data')
var nyc_address = "118 West 22nd Street, New York City"
log('getData trash NYC',getData("trash", nyc_address, env));
//
// const help = require('./lib/help')
// log("help", help())
// log("help with text", help("data"))
//
//
// const hal = require('./lib/hal')
// log("hal", hal.sorry())
//
//
// const ping = require('./lib/ping')
// log("ping", ping())
// log("ping", ping("with a response"))
//
// const getCrime = require('./lib/get_crime')
// log('getCrime', getCrime(address))
//
// const getMap = require('./lib/get_map')
// log('getMap',getMap(address));
//
// const getPopulation = require('./lib/get_population')
// log('getPopulation',getPopulation(address, {"arcgisToken": token}));
//
// log('getData trash',getData("trash", address, env));
// log('getData anc',getData("anc", address, env));
// log('getData crime',getData("crime", address, env));
// log('getData bus stops',getData("bus stops", address, env));
//
//
// const layerMap = require('./lib/layer_map')
// log('layerMap',layerMap("crime", address));
//
// const parseIntent = require('./lib/parse_intent')
// inputs = parseIntent({"text": "map of " + address}, {"body": ""});
// console.log(inputs)
//
// inputs = parseIntent({"text": "hal error"}, {"body": ""});
// console.log(inputs)
//
// inputs = parseIntent({"text": "open the pod bay doors"}, {"body": ""});
// console.log(inputs)
//
//
// var server = 'http://services.arcgis.com/bkrWlSKcjUDFDtgw/arcgis/rest/services/SonarComments/FeatureServer';
// const geoservice = require('./lib/geoservice')
// // log('query', geoservice().metadata(server));
// var serviceInputs = {'username':'aturner', 'name': 'SonarTest', 'token': token}
// // log('create', geoservice().create(serviceInputs));
//
// // serviceInputs.serviceUrl = 'http://services.arcgis.com/bkrWlSKcjUDFDtgw/arcgis/rest/services/SonarTest/FeatureServer';
// // log('create', geoservice().createLayer(serviceInputs));
// //
// // var featuresInput = serviceInputs
// // featuresInput.serviceUrl = server;
// // geolocation.geometry(address).then(function(geometry) {
// //   geometry.spatialReference = {"wkid": 4326}
// //   // featuresInput.edits = {
// //   //   "deletes": [3]
// //   // }
// //   featuresInput.edits = {
// //     "adds": [{
// //       "attributes": {
// //         "Name": "Bob",
// //         "Category": 1,
// //         "Location": "Here",
// //         "Comments": "notesg in..."
// //       },
// //       "geometry": geometry
// //     }]
// //   }
// //   log('create', geoservice().modifyFeatures(featuresInput));
// // })
//
// const notes = require('./lib/notes')
// log("note", notes("Test",address,env))
