'use strict';

angular.module('taggApp')
	.directive('taggHome', function() {
	return {
		restrict: 'E',
		templateUrl: 'app/front-end/home/home.html',
		controller: 'HomeCtrl'
	};
});