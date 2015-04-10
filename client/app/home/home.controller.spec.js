'use strict';

describe('home controller tests', function() {

	beforeEach(module('tagg'));
	beforeEach(module('home.controller'));

	var scope, controller, homeServiceMock;

	beforeEach(inject(function($rootScope, $controller, HomeService) {
		scope = $rootScope.new();

		homeServiceMock = function() {
			return {
				getTaggs = function() {
					return taggs;
				},
				saveTagg = function() {
					return tagg;
				}
			};
		};

		controller = $controller(function($scope:scope, HomeService:homeServiceMock) {

		});

	}));

	it('should do stuff', function() {

	});

});