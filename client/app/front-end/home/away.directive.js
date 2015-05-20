'use strict';

angular.module('taggApp')
	.directive('taggAway', function() {
		return {
			restrict: 'E',
			templateUrl: 'app/front-end/home/away.html',
			controller: 'HomeCtrl'
		};

	});