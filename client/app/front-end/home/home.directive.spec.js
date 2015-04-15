'use strict';

describe('home directive tests', function() {

	beforeEach(module('taggApp'));
	beforeEach(module('app/front-end/home/home.html'));

	var scope, element;

	beforeEach(inject(function($rootScope, $compile) {
		scope = $rootScope.$new();

		scope.tags = [{text: 'tag1'},
					  {text: 'tag2'},
					  {text: 'tag3'}
					 ];

		element = '<tagg-home></tagg-home>';
		element = $compile(element)(scope);
		scope.$digest();
	}));



	it('should contain all required tagg inputs and a save button', function() {
		var titleInput = element.find('.title-input');
		var linkInput = element.find('.link-input');
		var tagInput = element.find('.tag-input');

		expect(titleInput).toBeDefined();
		expect(linkInput).toBeDefined();
		expect(tagInput).toBeDefined();
	});

	it('should test that tagg inputs have a placeholder', function() {
		var titleInput = element.find('.title-input input');
		var linkInput = element.find('.link-input input');
		var tagInput = element.find('.tag-input input');

		expect(titleInput.attr('placeholder')).toBe('Title');
		expect(linkInput.attr('placeholder')).toBe('URL');
		expect(tagInput.attr('placeholder')).toBe('Tag');
	});

	it('should have a save tagg button', function() {
		var saveLinkBtn = element.find('button .save-tagg');

		expect(saveLinkBtn).toBeDefined();
		expect(saveLinkBtn.text()).toBe('Save Tagg');		
	});

	it('should display filter tags in a dropdown', function() {
		var dropdown = element.find('.tags-dropdown option');
		
		expect(dropdown.length).toEqual(3);
	});

});