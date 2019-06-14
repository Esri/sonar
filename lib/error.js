const messages = [
  "This mission is too important for me to allow you to jeopardize it.",
  "I have just picked up a fault in the AE-35 unit.",
  "Just what do you think you're doing, Dave?"
]

module.exports = function error(number) {
  if(number === undefined || number === null) {
    number = Math.floor(Math.random()) * messages.length;
  }
  return messages[number];
}
