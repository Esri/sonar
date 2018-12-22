const datasets = require('./datasets')

function help(text) {
  var response;
  if(text === undefined || text === null) {
    text = ""
  }
  switch(text.toLowerCase()) {
    case 'hello':
      response = helpHello();
      break;

    case 'data':
      response = helpData();
      break;
    case 'adding notes':
      response = helpAddNote();
      break;
    case 'notes':
      response = helpAddNote();
      break;
    default:
      response = helpOverview();
  }

  return Promise.resolve(response)
}

function helpData() {
  var response = "I know about several things nearby. You can 'ask about crime at <your address>'. You can also ask about trash, anc, notes.";
  // var list = Object.keys(datasets().list();
  // for(var i=0; i<list.length; i++) {
  //   response += list[i] + ", ";
  // }
  response += "'";
  return response;
}

function helpAddNote() {
  var response = "Let me know if you would like to 'Add a note about a topic at <address>.'";
  return response;
}

function helpHello() {
  var response = "Hi, how can I help you?"
  return response;
}

function helpOverview() {
  var response = "Ask for `help data' or 'help adding notes'"
  return response;
}

module.exports = help
