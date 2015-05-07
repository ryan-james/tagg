'use strict';

angular.module('taggApp')
	.directive('taggAway', function() {
		return {
			restricted: 'E',
			templateUrl: 'app/front-end/home/away.html',
			controller: 'HomeCtrl'
		};

	});