const botBuilder = require('claudia-bot-builder')
const parseIntent = require('./parse_intent')

const getData = require('./get_data')
const getPopulation = require('./get_population')
const getCrime = require('./get_crime')
const getMap = require('./get_map')

const api = botBuilder(function (request, originalRequest) {
  var inputs = parseIntent(request, originalRequest);

  // console.log("env 1: " + JSON.stringify(request.env))
  // console.log("env 2: " + JSON.stringify(originalRequest.env))
  switch(inputs.intent) {
    case 'GetData':
      return getData(inputs.slots.Dataset, inputs.slots.Location);
      break;

    case 'GetPopulation':
      return getPopulation(inputs.slots.Location, originalRequest.env);
      break;

    case 'GetMap':
      return getMap(inputs.slots.Location);
      break;

    case 'SummarizeData':
      return "Summarize not yet implemented."
      break;

    case 'AddNote':
      return "Notes not yet available.";
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
            text: 'Bye from Geohub!'
          },
          shouldEndSession: true
        }
      };
      break;
    default:
      return "Sorry, there was an error in Geo Hub";

  }
}, { platforms: ['alexa', 'slackSlashCommand', 'facebook'] });

module.exports = api;
