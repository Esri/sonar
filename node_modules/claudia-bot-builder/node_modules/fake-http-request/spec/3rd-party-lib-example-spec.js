/* global require, it, describe, beforeEach, afterEach, expect, jasmine */
var fakeRequest = require('../index'),
	https = require('https'),
	request = require('request');
describe('example using a third party library', function () {
	'use strict';
	beforeEach(function () {
		fakeRequest.install({
			type: 'https',
			matcher: /google/
		});
	});
	afterEach(function () {
		fakeRequest.uninstall('https');
	});
	it('captures arguments passed using a third party library', function (done) {
		request('https://www.google.com').on('request', function () {
			expect(https.request.calls.length).toEqual(1);
			expect(https.request.calls[0].args[0]).toEqual(jasmine.objectContaining({
				host: 'www.google.com',
				port: 443,
				path: '/'
			}));
			done();
		}).on('error', done.fail);
	});
	it('can simulate a response to a 3rd party library', function (done) {
		request('https://www.google.com', function (error, response, body) {
			expect(response.statusCode).toEqual(200);
			expect(response.statusMessage).toEqual('OK');
			expect(body).toEqual('Hello there');
			done();
		}).on('request', function () {
			https.request.calls[0].respond(200, 'OK', 'Hello there');
		}).on('error', done.fail);
	});
	it('can simulate an error to a 3rd party library', function (done) {
		request('https://www.google.com', function (error /*, response, body */) {
			expect(error).toEqual('Boom!');
			done();
		}).on('request', function () {
			https.request.calls[0].networkError('Boom!');
		}).on('response', done.fail);
	});
	it('can fake only the requests matched with matcher if provided', function (done) {
		var numOfHttpRequests = https.request.calls.length;
		request('https://www.github.com', function() {
			expect(https.request.calls.length).toBe(numOfHttpRequests);
			done();
		}).on('error', done.fail);
	});
	it('fakes only the requests it can match', function (done) {
		request('https://www.google.com', function() {
			expect(https.request.calls.length).toBe(1);
			request('https://www.npmjs.com', function () {
				expect(https.request.calls.length).toBe(1);
				done();
			});
		}).on('request', function () {
			var numOfHttpRequests = https.request.calls.length
			numOfHttpRequests &&
				typeof https.request.calls[numOfHttpRequests - 1].respond === 'function' &&
				https.request.calls[numOfHttpRequests - 1].respond(200, 'OK', 'Hello there');
		}).on('error', done.fail);
	});
});
