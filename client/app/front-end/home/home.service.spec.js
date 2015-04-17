'use strict';

describe('home service tests', function() {

	beforeEach(module('taggApp'));

	var testHomeService;

	beforeEach(inject(function(HomeService) {
		testHomeService = HomeService;
	}));

	

	it('should have an empty array of taggs', function() {
		var taggs = testHomeService.getTaggs();
		expect(taggs.length).toEqual(0);
	});

	it('should have an array of tags with only ALL as a default entry', function() {
		var tags = testHomeService.getTags();
		expect(tags.length).toBe(1);
		expect(tags[0].tag).toEqual('ALL');
	});

	it('should be able to save a tagg', function() {
		var tagg = {title: 'TEST TITLE', url: 'www.test.com', tag: 'test-tag', date: '07/02/87'};
		//var taggs = testHomeService.getTaggs();
		testHomeService.saveTagg(tagg);
		var taggs = testHomeService.getTaggs();
		expect(taggs.length).toEqual(1);
	});

	it('should be able to delete a tagg', function() {
		var tagg = {title: 'TEST TITLE', url: 'www.test.com', tag: 'test-tag', date: '07/02/87'};
		testHomeService.saveTagg(tagg);
		var taggs = testHomeService.getTaggs();
		expect(taggs.length).toEqual(1);
		testHomeService.deleteTagg(tagg);
		expect(taggs.length).toEqual(0);
	});

	it('should be able to save a tag', function() {
		var tag = {tag: 'test-tag'};
		testHomeService.saveTag(tag);		
		var tags = testHomeService.getTags();
		expect(tags.length).toBe(2);
	});

});