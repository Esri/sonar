const parseIntent = require('./parse_intent')

const getData = require('./get_data')
const getPopulation = require('./get_population')
const getCrime = require('./get_crime')
const getMap = require('./get_map')
const layerMap = require('./layer_map')
const ping = require('./ping')
const notes = require('./notes')
const hal = require('./hal')
const help = require('./help')
// const device = require('./device')
const context = require('./context.js')

// Routes intent to the appropriate function module
// TODO: extract this to module
function route(intent, inputs, originalRequest) {
  switch(intent) {
      case 'error':
        return "I'm sorry, Dave. I'm afraid I can't do that.";
        break;

      case 'Hello':
        return help("hello");
        break;

      case 'Help':
        return help(inputs.slots.Dataset);
        break;

      case 'Hal':
        return hal.sorry();
        break;

      case 'Ping':
        return ping(inputs.slots.Dataset);
        break;

      case 'GetData':
        return getData(inputs.slots.Dataset, inputs.slots.Location, originalRequest.env);
        break;

      case 'GetPopulation':
        return getPopulation(inputs.slots.Location, originalRequest.env);
        break;

      case 'GetMap':
        return getMap(inputs.slots.Location);
        break;

      case 'LayerMap':
        return layerMap(inputs.slots.Dataset, inputs.slots.Location);
        break;

      case 'SummarizeData':
        return "Summarize not yet implemented."
        break;

      case 'AddNote':
        return notes(inputs.slots.Dataset, inputs.slots.Location, originalRequest.env);
        break;

      case 'GetCrime':
        return getCrime(inputs.slots.Location);
        break;

      case 'ExitApp':
        // return a JavaScript object to set advanced response params
        // this prevents any packaging from bot builder and is just
        // returned to Alexa as you specify
        return {
          response: {
            outputSpeech: {
              type: 'PlainText',
              text: 'Bye from Sonar!'
            },
            shouldEndSession: true
          }
        };
        break;
      default:
        return "Sorry, there was an error in Sonar.";
    }
}

module.exports = function sonar(request, originalRequest) {
  var timestamp = Date.now();
  var key = timestamp.toString() + "." + request.type + '.' + request.sender; // Platform of the sender + the unique sender id

  // Currently, context not used, but laying groundwork
  return context.restoreCtx(request.sender).then(function(existingCtx) {

    var inputs = parseIntent(request, originalRequest);
    var response = route(inputs.intent, inputs, originalRequest);

    return context.persistCtx(request.sender, inputs.intent).then(function() {
      return response;
      // return context.trackUsage(key, timestamp, request.sender, request.type, 'new', request).then(function(result){
      //
      // }).catch(function(error) {
      //   return "Error trackUsage: " + error;
      // });
    // end persistCtx
    }).catch(function(error) {
      return "Error persistCtx: " + error;
    })

  // end restoreCtx
  }).catch(function(error) {
    return "Error restoreCtx: " + error;
  })

}
