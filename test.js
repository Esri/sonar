const getCrime = require('./lib/get_crime')
var address = "101 4th St NE, Washington, DC";
var token = "...";

getCrime(address).then(function(text) {
  console.log(text)
})

const getMap = require('./lib/get_map')
getMap(address).then(function(text) {
  console.log(text)
})

const getPopulation = require('./lib/get_population')
getPopulation(address, {"arcgisToken": token}).then(function(text) {
  console.log(text)
})

const getData = require('./lib/get_data')
getData("trash", address).then(function(text) {
  console.log(text)
})

getData("anc", address).then(function(text) {
  console.log(text)
})

getData("crime", address).then(function(text) {
  console.log(text)
})

getData("bus stops", address).then(function(text) {
  console.log(text)
})

const parseIntent = require('./lib/parse_intent')
inputs = parseIntent({"text": "map of " + address}, {"body": ""});
console.log(inputs)
