module.exports = function ping(signal) {
  var response = 'pong';
  if(signal !== undefined && signal !== null) {
    response += " " + signal;
  }
  return Promise.resolve(response);
}
