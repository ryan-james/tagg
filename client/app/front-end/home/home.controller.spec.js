'use strict';

xdescribe('home controller tests', function() {

	beforeEach(module('taggApp'));

	var scope, controller, homeServiceMock;

	beforeEach(inject(function($rootScope, $controller, $q, HomeService) {
		scope = $rootScope.$new();

		homeServiceMock = HomeService;

		 spyOn(homeServiceMock, 'getTaggs').and.returnValue($q.when({title: 'TEST TITLE', url: 'www.test.com', tag: 'test-tag', date: '07/02/87'}));
		 spyOn(homeServiceMock, 'getTags').and.returnValue($q.when({tag: 'test-tag'}));
		 spyOn(homeServiceMock, 'saveTagg').and.returnValue($q.when({}));
		 spyOn(homeServiceMock, 'deleteTagg').and.returnValue($q.when({}));
		 spyOn(homeServiceMock, 'saveTag').and.returnValue($q.when({}));		


		controller = $controller('HomeCtrl', 
			{$scope:scope, HomeService:homeServiceMock});
	}));

	it('should call the getTaggs service function', function() {
		scope.getTaggs();
		expect(homeServiceMock.getTaggs).toHaveBeenCalled();
	});

	it('should call the getTaggs service function and set scope.taggs', function() {
		spyOn(scope, 'getTaggs').and.callThrough();
		scope.getTaggs();
		expect(scope.taggs.length).toBe(1);
	});

	it('should call service getTags function', function() {
		scope.getTags();
		expect(homeServiceMock.getTags).toHaveBeenCalled();
	});

	it('should set initTags to be ALL', function() {
		expect(scope.initTags.length).toBe(1);
		expect(scope.initTags[0].tag).toBe('ALL');
	});

	it('should add extra tags to initTags after calling scope.getTags', function() {
		scope.getTags().and.callThrough();
		expect(scope.initTags.length).toBe(2);
		expect(scope.initTags[0].tag).toBe('ALL');
		expect(scope.initTags[1].tag).toBe('test-tag');
	});

	it('should delete a tagg when the delete button is clicked', function() {
		scope.removeTagg();
		expect(homeServiceMock.deleteTagg).toHaveBeenCalled();
	});

	it('should display all taggs when ALL is the filter value', function() {
		scope.taggs = [{title: 'TEST TITLE', url: 'www.test.com', tag: 'test-tag', date: '07/02/87'},
		{title: 'TEST TITLE', url: 'www.test.com', tag: 'test', date: '07/02/87'}];
		expect(scope.taggs.length).toBe(2);
		scope.filterTaggs('ALL');
		expect(scope.filterTag).toBeUndefined();
	});

	it('should call the capitalise function after saving a tagg', function() {
		spyOn(scope, 'saveTagg').and.callThrough();
		spyOn(scope, 'capitalizeEachWord');
		scope.title = 'hello';
		scope.tag = 'goodbye';
		scope.saveTagg();
		expect(scope.capitalizeEachWord).toHaveBeenCalled();
	});

	it('should capitalise the first letter of a tagg title', function() {
		var upperWord = scope.capitalizeEachWord('word');
		expect(upperWord).toEqual('Word');
	});

	
});