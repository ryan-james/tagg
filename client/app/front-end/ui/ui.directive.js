'use strict';

angular.module('taggApp')
	.directive('taggUi', function() {
		return {
			restricted: 'E',
			templateUrl: 'app/front-end/ui/ui.html',		
		};
	});