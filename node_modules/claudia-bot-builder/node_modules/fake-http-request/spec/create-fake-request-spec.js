/*global describe, it, expect, require, jasmine, beforeEach, afterEach */
var createFakeRequest = require('../src/create-fake-request'),
	FakeCall = require('../src/fake-call');
describe('createFakeRequest', function () {
	'use strict';
	it('returns a function that creates objects with the HTTP request interface', function () {
		var request = createFakeRequest(),
			result = request({method: 'GET', body: 'XXX'});
		expect(typeof result.on).toEqual('function');
		expect(typeof result.end).toEqual('function');
		expect(typeof result.write).toEqual('function');
	});
	it('records calls', function () {
		var request = createFakeRequest();

		request({method: 'GET', body: 'XXX'});
		request({method: 'POST', host: 'yyy'});

		expect(request.calls.length).toEqual(2);
		expect(request.calls[0].args).toEqual([{method: 'GET', body: 'XXX'}]);
		expect(request.calls[1].args).toEqual([{method: 'POST', host: 'yyy'}]);

	});
	it('records body write', function () {
		var request = createFakeRequest(),
			reqObj;

		reqObj = request({});
		reqObj.write('bla bla');
		reqObj.write('hahaha');
		expect(request.calls[0].body).toEqual(['bla bla', 'hahaha']);

	});
	describe('piping calls', function () {
		var request, spy1, spy2;
		beforeEach(function () {
			jasmine.clock().install();
			request = createFakeRequest();
			spy1 = jasmine.createSpy('pipe1');
			spy2 = jasmine.createSpy('pipe2');
		});
		afterEach(function () {
			jasmine.clock().uninstall();
		});
		it('does not pipe calls to listeners before timeout', function () {
			request.pipe(spy1);
			request.pipe(spy2);
			request({method: 'GET', body: 'XXX'});
			expect(spy1).not.toHaveBeenCalled();
			expect(spy2).not.toHaveBeenCalled();
		});
		it('pipes calls to listeners after timeout', function () {
			request.pipe(spy1);
			request.pipe(spy2);
			request({method: 'POST', host: 'yyy'});
			request({method: 'GET', body: 'XXX'});

			jasmine.clock().tick(2);
			expect(spy1).toHaveBeenCalledWith({method: 'GET', body: 'XXX'});
			expect(spy1).toHaveBeenCalledWith({method: 'POST', host: 'yyy'});
			expect(spy2).toHaveBeenCalledWith({method: 'GET', body: 'XXX'});
			expect(spy2).toHaveBeenCalledWith({method: 'POST', host: 'yyy'});
			expect(spy1.calls.count()).toEqual(2);
			expect(spy2.calls.count()).toEqual(2);
		});
		it('sets this to be the fake call for piping', function (done) {
			request.pipe(function (args) {
				expect(this).toEqual(jasmine.any(FakeCall));
				expect(args).toEqual(this.args[0]);
				done();
			});
			request({method: 'POST', host: 'yyy'});
			jasmine.clock().tick(2);
		});
	});


	it('can set up response event listeners', function () {
		var request = createFakeRequest(),
			reqObj,
			responseBody,
			responseCode,
			responseMessage;

		reqObj = request({method: 'GET', body: 'XXX'});

		reqObj.on('response', function (res) {
			responseCode = res.statusCode;
			responseMessage = res.statusMessage;
			res.on('data', function (chunk) {
				responseBody = chunk;
			});
		});
		request.calls[0].respond(200, 'OK', 'Yellow!');
		expect(responseBody).toEqual('Yellow!');
		expect(responseCode).toEqual(200);
		expect(responseMessage).toEqual('OK');
	});
	it('can set up error response listeners', function () {
		var request = createFakeRequest(),
			reqObj,
			responseError;
		reqObj = request({method: 'GET', body: 'XXX'});
		reqObj.on('error', function (e) {
			responseError = e;
		});
		request.calls[0].networkError('WOW!');
		expect(responseError).toEqual('WOW!');
	});
	it('can chain method calls', function () {
		var request = createFakeRequest(),
			result,
			reqObj;

		reqObj = request({method: 'GET', body: 'XXX'});
		result = reqObj.on('data', function () {}).end();
		expect(result).toBe(reqObj);
	});
});
