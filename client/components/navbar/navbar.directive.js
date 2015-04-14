'use strict';

angular.module('taggApp')
	.directive('navbarUi', function() {
		return {
			restrict: 'E',
			templateUrl: 'components/navbar/navbar.html',
			controller: 'NavbarCtrl'
		};
});