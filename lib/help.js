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
    case 'checkin':
      response = helpAddNote();
      break;
    default:
      response = helpOverview();
  }

  return Promise.resolve(response)
}

function helpData() {
  var response = "I know about several things nearby. You can 'ask about ";
  var list = datasets.list();
  for(var i=0; i<list.length; i++) {
    response += list[i] + ", ";
  }
  response += "'";
  return response;
}

function helpAddNote() {
  var response = "Let me know if you would like to 'Add a note about a topic at a Location.'";
  return response;
}

function helpHello() {
  var response = "Hi, how can I help you?"
  return response;
}

function helpOverview() {
  var response = "I can tell you more about Local Data, Adding Notes, or Your Neighbors"
  return response;
}

module.exports = help
