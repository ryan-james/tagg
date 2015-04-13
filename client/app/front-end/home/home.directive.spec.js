'use strict';

describe('home directive tests', function() {

	beforeEach(module('taggApp'));
	beforeEach(module('app/front-end/home/home.html'));

	var scope, element;

	beforeEach(inject(function($rootScope, $compile) {
		scope = $rootScope.$new();
		element = '<tagg-home></tagg-home>';
		element = $compile(element)(scope);
		scope.$digest();
	}));

	it('should do shit', function() {

	});

});