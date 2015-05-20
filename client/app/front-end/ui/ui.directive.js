'use strict';

angular.module('taggApp')
	.directive('taggUi', function($state) {
		return {
			restrict: 'E',
			templateUrl: 'app/front-end/ui/ui.html'
		};
	});