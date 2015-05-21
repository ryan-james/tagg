'use strict';

angular.module('taggApp')
	.directive('taggList', function() {
		return {
			restrict: 'E',
			templateUrl: 'app/front-end/tagg-list/tagg-list.html',
			controller: 'TaggListCtrl'
		};

	});