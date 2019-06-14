/*global module, setTimeout */
module.exports	= function wait(timeout, Promise) {
	'use strict';
	return new Promise(function (resolve) {
		setTimeout(resolve, timeout);
	});
};
