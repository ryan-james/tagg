'use strict';

angular.module('taggApp')
	.directive('taggBrick', function() {
	return {
		restrict: 'E',
		templateUrl: 'app/front-end/home/brick.html',
		controller: 'HomeCtrl'
	};
});