'use strict';

angular.module('taggApp')
	.directive('navbarUi', function() {
		return {
			restrict: 'E',
			templateUrl: 'navbar.html',
			controller: 'NavCtrl'
		};
});