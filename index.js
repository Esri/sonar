const botBuilder = require('claudia-bot-builder')
const sonar = require('./lib/sonar.js');

module.exports = botBuilder(sonar, { platforms: ['alexa', 'slackSlashCommand', 'facebook'] });
