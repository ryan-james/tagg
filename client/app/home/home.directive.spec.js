'use strict';

describe('home directive tests', function() {

	before(module('tagg'));
	before(module('home.html'));

	var scope, element;

	before(inject(function($rootScope, $compile) {
		scope = $rootScope.new();
		element = '<tagg></tagg>';
		element = $compile(element)(scope);
		scope.$digest();
	}));

	it('should do shit', function() {

	});

});