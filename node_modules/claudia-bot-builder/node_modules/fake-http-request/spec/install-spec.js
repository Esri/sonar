/*global describe, require, beforeEach, afterEach, it, expect*/
var https = require('https'),
	http = require('http'),
	fakeRequest = require('../index');

describe('index module', function () {
	'use strict';
	var originalHttpsRequest, originalHttpRequest;
	beforeEach(function () {
		originalHttpsRequest = https.request;
		originalHttpRequest = http.request;
	});
	afterEach(function () {
		http.request = originalHttpRequest;
		https.request = originalHttpsRequest;
	});
	describe('install', function () {
		it('installs to https by default', function () {
			fakeRequest.install();
			expect(originalHttpRequest).toBe(http.request);
			expect(originalHttpsRequest).not.toBe(https.request);
			fakeRequest.uninstall();
		});
		it('can install to http if required', function () {
			fakeRequest.install('http');
			expect(originalHttpRequest).not.toBe(http.request);
			expect(originalHttpsRequest).toBe(https.request);
			fakeRequest.uninstall('http');
		});
		it('can receive config as an object', function () {
			fakeRequest.install({
				type: 'http'
			});
			expect(originalHttpRequest).not.toBe(http.request);
			expect(originalHttpsRequest).toBe(https.request);
			fakeRequest.uninstall('http');
		})
		it('refuses to install twice', function () {
			fakeRequest.install();
			expect(function () {
				fakeRequest.install();
			}).toThrowError('Fake HTTP request is already installed in https');
			fakeRequest.uninstall();
		});
	});
	describe('uninstall', function () {
		it('uninstalls https by default', function () {
			fakeRequest.install();
			fakeRequest.uninstall();
			expect(originalHttpsRequest).toBe(https.request);
		});

		it('refuses to uninstall twice', function () {
			fakeRequest.install();
			fakeRequest.uninstall();
			expect(function () {
				fakeRequest.uninstall();
			}).toThrowError('Fake HTTP request is not installed in https');
		});
		it('refuses to uninstall if not installed', function () {
			expect(function () {
				fakeRequest.uninstall();
			}).toThrowError('Fake HTTP request is not installed in https');

		});
		it('can uninstall http if required', function () {
			fakeRequest.install('http');
			fakeRequest.uninstall('http');
			expect(originalHttpRequest).toBe(http.request);
		});
	});
});
