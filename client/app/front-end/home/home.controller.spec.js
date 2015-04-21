'use strict';

describe('home controller tests', function() {

	beforeEach(module('taggApp'));

	var scope, controller, homeServiceMock;

	beforeEach(inject(function($rootScope, $controller, HomeService) {
		scope = $rootScope.$new();

		homeServiceMock = HomeService;

		 spyOn(homeServiceMock, 'getTaggs').and.returnValue({title: 'TEST TITLE', url: 'www.test.com', tag: 'test-tag', date: '07/02/87'});
		 spyOn(homeServiceMock, 'getTags').and.returnValue({text: 'test-tag'});
		 spyOn(homeServiceMock, 'saveTagg').and.returnValue({});
		 spyOn(homeServiceMock, 'saveTag').and.returnValue({});
		

		controller = $controller('HomeCtrl', 
			{$scope:scope, HomeService:homeServiceMock});
	}));

	it('should assign the saved taggs to the scope', function() {
		scope.taggs();
		expect(homeServiceMock.getTaggs).toHaveBeenCalled();
		expect((scope.taggs).length).toBe(1);
		expect((scope.taggs.title).text()).toBe('TEST TITLE');		
	});

	it('should assign the saved tags to the scope', function() {
		scope.tags = homeServiceMock.getTags();
		expect((scope.tags).length).toBe(1);
		expect((scope.tags.text).text()).toBe('test-tag');	
	});

	it('should save a tagg', function() {
		var tagg = {title: 'TEST TITLE', url: 'www.test.com', tag: 'test-tag', date: '07/02/87'};
		scope.saveTagg(tagg);
		expect(homeServiceMock.saveTagg).toHaveBeenCalled();	
	});

	it('should save a tag after saving a tagg', function() {
		var tagg = {title: 'TEST TITLE', url: 'www.test.com', tag: 'test-tag', date: '07/02/87'};
		scope.saveTagg(tagg);
		expect(homeServiceMock.saveTag(tag)).toHaveBeenCalled();	
	});

	it('should set the correct tag filter', function() {
		var tagFilter = 'tagg-filter';
		scope.filterTaggs(tagFilter);
		expect(scope.filterTag).toEqual('tagg-filter');	
	});

	it('should set the correct tag filter to null if the filter value is ALL', function() {
		var tagFilter = 'ALL';
		scope.filterTaggs(tagFilter);
		expect(scope.filterTag).toEqual(null);	
	});
});