'use strict';

xdescribe('home service tests', function() {

	beforeEach(module('taggApp'));

	var testHomeService, httpBackend;

	beforeEach(inject(function(HomeService, $httpBackend) {
		testHomeService = HomeService;
		httpBackend = $httpBackend;

	}));

	
	it('should be able to get taggs', function() {
		testHomeService.getTaggs();
		httpBackend.expectGET('/api/taggs/').respond({title: 'TEST TITLE', url: 'www.test.com', tag: 'test-tag', date: '07/02/87'});
		httpBackend.flush();		
	});

	it('should be able to save a tagg', function() {
		var tagg = {title: 'TEST TITLE', url: 'www.test.com', tag: 'test-tag', date: '07/02/87'};
		testHomeService.saveTagg(tagg);
		httpBackend.expectPOST('/api/taggs/').respond({title: 'TEST TITLE', url: 'www.test.com', tag: 'test-tag', date: '07/02/87'});
		httpBackend.flush();		
	});

	it('should be able to delete a tagg', function() {
		var tagg = {_id: 'test-tag'};	
		testHomeService.deleteTagg(tagg);
		httpBackend.expectDELETE('/api/taggs/' + tagg._id).respond('tagg deleted: ' + tagg);
		httpBackend.flush();		
	});

	it('should be able to get tags', function() {
		testHomeService.getTags();
		httpBackend.expectGET('/api/tags/').respond({tag: 'test-tag'});
		httpBackend.flush();		
	});

	it('should be able to save a tag', function() {
		var tag = {tag: 'test-tag'};
		testHomeService.saveTag(tag);		
		httpBackend.expectPOST('/api/tags/').respond({tag: 'test-tag'});
		httpBackend.flush();
	});

});