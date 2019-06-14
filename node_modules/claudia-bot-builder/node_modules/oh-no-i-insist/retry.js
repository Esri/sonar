/*global module, global, require */
var wait = require('./wait');
module.exports = function retry(promiseGenerator, delay, maxTimes, predicate, onRetry, PromiseImplementation) {
	'use strict';
	var Promise = PromiseImplementation || global.Promise,
		handleFailure = function (failure) {
			if (maxTimes > 1 && (!predicate || (predicate && predicate(failure)))) {
				if (onRetry) {
					onRetry();
				}
				return wait(delay, Promise).then(function () {
					return retry (promiseGenerator, delay, maxTimes - 1, predicate, onRetry, Promise);
				});
			} else {
				return Promise.reject(failure);
			}
		};

	if (!maxTimes) {
		return Promise.reject('failing to retry');
	}
	return Promise.resolve().then(promiseGenerator).catch(handleFailure);
};
