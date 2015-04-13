'use strict';

angular.module('taggApp')
	.directive('taggHome', function() {
	return {
		restrict: 'E',
		templateUrl: 'home.html',
		controller: 'HomeCtrl'
	};
});