/*global module, require, setTimeout */
var FakeCall = require('./fake-call');

module.exports = function createFakeRequest(matcher, passthrough) {
	'use strict';
	var calls = [],
		pipes = [],
		result = function (request) {
			if (matcher && !matcher.test(request.href)) {
				return passthrough.apply(this, arguments);
			}
			var argsArray = [].slice.apply(arguments),
				listeners = {},
				bodyBuffer = [],
				fake = {
					on: function (eventName, listener) {
						listeners[eventName] = listener;
						return fake;
					},
					once: function (eventName, listener) {
						listeners[eventName] = listener;
						return fake;
					},
					end: function () {
						return fake;
					},
					write: function (content, encoding, callback) {
						bodyBuffer.push(content);
						if (callback) {
							callback();
						}
						return fake;
					}
				},
				fakeCall = new FakeCall(argsArray, listeners, bodyBuffer);
			calls.push(fakeCall);
			setTimeout(function () {
				pipes.forEach(function (pipe) {
					pipe.apply(fakeCall, argsArray);
				});
			}, 1);
			return fake;
		};
	result.calls = calls;
	result.pipe = function (f) {
		pipes.push(f);
	};
	return result;
};
