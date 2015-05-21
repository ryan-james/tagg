'use strict';

angular.module('taggApp')
  .service('TaggListService', function($http, $resource) {


  	return {
	  	getTaggs : function() {
				return $http.get('/api/taggs/').success(function(data) {
					return data;
				});
		},
		deleteTagg : function(tagg) {
			var tagg = tagg._id;
			return $http.delete('/api/taggs/' + tagg).success(function(data) {
				return data;
			});		
		},
		getTags : function() {
			return $http.get('/api/tags/').success(function(data) {
				return data;
			});
		}
	};

  });