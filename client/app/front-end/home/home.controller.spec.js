'use strict';

describe('home controller tests', function() {

	beforeEach(module('taggApp'));

	var scope, controller, homeServiceMock;

	beforeEach(inject(function($rootScope, $controller, HomeService) {
		scope = $rootScope.$new();

		homeServiceMock = HomeService;

		// spyOn(homeServiceMock, 'getTaggs').and.returnValue(SOMETAGG);
		// spyOn(homeServiceMock, 'saveTagg').and.returnValue(SOMETAGG);
		

		controller = $controller('HomeCtrl', 
			{$scope:scope, HomeService:homeServiceMock});

	}));

	xit('should do stuff', function() {

	});

});