/*global describe, it, expect, require, jasmine, beforeEach */
var FakeCall = require('../src/fake-call');
describe('FakeCall', function () {
	'use strict';
	var requestListeners, underTest, bodyBuffer;
	beforeEach(function () {
		requestListeners = jasmine.createSpyObj('request', ['response', 'error']);
		bodyBuffer = [];
		underTest = new FakeCall(['a'], requestListeners, bodyBuffer);
	});
	it('records the call args', function () {
		expect(underTest.args).toEqual(['a']);
	});
	describe('networkError', function () {
		it('does not explode if the error listener is not provided', function () {
			requestListeners.error = undefined;
			underTest.networkError('x');
		});
		it('calls the error listener if it is provided', function () {
			underTest.networkError('x');
			expect(requestListeners.error).toHaveBeenCalledWith('x');
		});
	});
	describe('body', function () {
		it('retrieves the contents of the body buffer', function () {
			bodyBuffer.push('a');
			bodyBuffer.push('b');
			expect(underTest.body).toEqual(['a','b']);
		});
	});
	describe('respond', function () {
		it('invokes the response listener if provided', function () {
			underTest.respond(200, 'OK', 'some text');
			expect(requestListeners.response).toHaveBeenCalledWith(jasmine.objectContaining({statusCode: 200, statusMessage: 'OK'}));
		});
		it('passes the body into the response object listeners before calling end', function () {
			var calls = [];
			requestListeners.response = function (resp) {
				resp.on('data', function (data) {
					calls.push(['data', data]);
				});
				resp.on('end', function () {
					calls.push('end');
				});
			};
			underTest.respond(200, 'OK', 'some text');
			expect(calls).toEqual([['data', 'some text'], 'end']);
		});
		it('does not invoke the data listener if no body is provided', function () {
			var dataListener = jasmine.createSpy('data'),
				endListener = jasmine.createSpy('end');
			requestListeners.response = function (resp) {
				resp.on('data', dataListener);
				resp.on('end', endListener);
			};
			underTest.respond(200, 'OK');
			expect(endListener).toHaveBeenCalled();
			expect(dataListener).not.toHaveBeenCalled();
		});
		it('does not explode if the listeners are not provided', function () {
			underTest.respond(200, 'OK');
		});
		it('does not explode if the response listener is not provided', function () {
			requestListeners.response = undefined;
			underTest.respond(200, 'OK', 'some text');
		});
	});
});
