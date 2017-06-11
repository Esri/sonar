const getIntent = function (alexaPayload) {
 'use strict';
 return alexaPayload &&
   alexaPayload.request &&
   alexaPayload.request.type === 'IntentRequest' &&
   alexaPayload.request.intent;
}

const getIntentName = function (alexaPayload) {
 'use strict';
 return alexaPayload &&
   alexaPayload.request &&
   alexaPayload.request.type === 'IntentRequest' &&
   alexaPayload.request.intent &&
   alexaPayload.request.intent.name;
}

const intentNames ={
  "hello": {
    "name": "Hello",
    "match": "hello"
  },
  "help": {
    "name": "Help",
    "match": "help ?(.*)?"
  },
  "ping": {
    "name": "Ping",
    "match": "ping ?(.*)?"
  },
  "open": {
    "name": "Hal",
    "match": "open the pod bay doors"
  },
  "add": {
    "name": "AddNote",
    "match": "add note (.*) at (.*)"
  },
  "notes": {
    "name": "AddNote",
    "match": "notes (.*) at (.*)"
  },
  "what": {
    "name": "GetData",
    "match": "what are the (.*) at (.*)"
  },
  "ask": {
    "name": "GetData",
    "match": "ask about (.*) at (.*)"
  },
  "tell": {
    "name": "GetData",
    "match": "tell me about (.*) at (.*)"
  },
  "population": {
    "name": "GetPopulation",
    "match": "(.*) of (.*)"
  },
  "safety": {
    "name": "GetCrime",
    "match": "safety (.*) (.*)"
  },
  "map": {
    "name": "GetMap",
    "match": "(.*) of (.*)"
  },
  "see": {
    "name": "LayerMap",
    "match": "see (.*) at (.*)"
  }
}

module.exports = function parseIntents(request, originalRequest) {

  var intentName = getIntentName(originalRequest.body);
  var slots = {}

  if ((intentName === undefined || intentName === null || intentName == false) && request.text) {
       var keyword = request.text.toLowerCase().split(" ")[0];

       var intent = intentNames[keyword];
       if(intent === undefined || intent === null) {
         return {intent: "error"}
       }
       var regex = new RegExp(intent.match);
       var parse = regex.exec(request.text)

      //  console.log("request: " + request.text)
      //  console.log("parse: " + JSON.stringify(parse))
      //  Right now we'll always make sure this is the order, but that might change.
       var regexGroups = { "Dataset": 1, "Location": 2 };
       var regkeys = Object.keys(regexGroups);
      for(var i=0; i<regkeys.length; i++) {
        slots[regkeys[i]] = parse[regexGroups[regkeys[i]]];
      }
  } else {
      var intent = getIntent(originalRequest.body)
      var keys = Object.keys(intent.slots);
      // console.log("request: " + originalRequest.body)
      // console.log("Alexa intent: " + JSON.stringify(intent))
      // console.log("Alexa slots: " + JSON.stringify(intent.slots))

      for(var i=0; i<keys.length; i++) {
            slots[keys[i]] = intent.slots[keys[i]].value;
      }

      // console.log("Processed slots: " + JSON.stringify(slots))

 }

  return {intent: intent.name, slots: slots};
}
