/*global module */
module.exports = function FakeCall(callArgs, listeners, requestBodyBuffer) {
	'use strict';
	var self = this;
	self.args = callArgs;
	self.respond = function (statusCode, statusMessage, body) {
		var responseListeners = {},
		fakeResponse = {
			setEncoding: function () {},
			on: function (eventName, listener) {
				responseListeners[eventName] = listener;
			},
			once: function (eventName, listener) {
				responseListeners[eventName] = listener;
			},
			statusCode: statusCode,
			statusMessage: statusMessage
		};
		if (listeners.response) {
			listeners.response(fakeResponse);
		}
		if (body && responseListeners.data) {
			responseListeners.data(body);
		}
		if (responseListeners.end) {
			responseListeners.end();
		}
	};
	self.body = requestBodyBuffer;
	self.networkError = function (err) {
		if (listeners.error) {
			listeners.error(err);
		}
	};
};
