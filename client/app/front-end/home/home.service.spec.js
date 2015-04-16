'use strict';

describe('home service tests', function() {

	beforeEach(module('taggApp'));

	var testHomeService;

	beforeEach(inject(function(HomeService) {
		testHomeService = HomeService;
	}));

	

	it('should have an empty array of taggs', function() {
		expect((testHomeService.taggs).length).toEqual(0);
	});

	it('should have an array of tags with only ALL as a default entry', function() {
		expect((testHomeService.tags).length).toEqual(1);
		expect((testHomeService.tags[0]).tag.text()).toEqual('ALL');
	});

	it('should be able to get all taggs', function() {
		var taggs = testHomeService.getTaggs();
		expect(taggs.length).toBe(0);
	});

	it('should be able to save a tagg', function() {
		var tagg = {title: 'TEST TITLE', url: 'www.test.com', tag: 'test-tag', date: '07/02/87'};
		//var taggs = testHomeService.getTaggs();
		testHomeService.saveTaggs(tagg);
		expect((testHomeService.taggs).length).toBe(1);
	});

	it('should be able to delete a tagg', function() {
		testHomeService.taggs = [{title: 'TEST TITLE', url: 'www.test.com', tag: 'test-tag', date: '07/02/87'}];
		testHomeService.delete({title: 'TEST TITLE', url: 'www.test.com', tag: 'test-tag', date: '07/02/87'});
		expect((testHomeService.taggs).length).toBe(0);
	});

	it('should be able to get all tags', function() {
		var tags = testHomeService.getTags();
		expect(tags.length).toBe(1);
	});

	it('should be able to save a tag', function() {
		var tag = {tag: 'test-tag'};
		testHomeService.saveTags(tag);
		expect((testHomeService.tags).length).toBe(1);
	});

});