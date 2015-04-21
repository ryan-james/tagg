'use strict';

// angular.module('mean.taggdup').factory('Taggdup', [
//   function() {
//     return {
//       name: 'taggdup'
//     };
//   }
// ]);

angular.module('taggApp')
  .service('HomeService', function($http, $resource) {

  	var taggs = [];

    var tagOptions = [
	{tag: 'ALL'}
	];



	return {
		getTaggs : function() {
			//return taggs;
			return $http.get('api/taggs/').success(function(data) {});
		},
		saveTagg : function(tagg) {
			//return taggs.push(tagg);
			var tagg = tagg;
			$http.post('/api/taggs', tagg).success(function(data, status) {
				console.log('status: ');
				console.log(status);
				console.log('data: ');
				console.log(data);
				return data;
			});
		},
		deleteTagg : function(tagg) {
			// var index = taggs.indexOf(tagg);
			// taggs.splice(index, 1);
			// return;
			var tagg = tagg._id;
			$http.delete('api/taggs/' + tagg).success(function(data) {});
			return;
		},
		getTags : function() {
			return tagOptions;
		},
		saveTag : function(tag) {
			if(tagOptions.indexOf(tag) === -1) {
				return tagOptions.push(tag);
			}
		}
	};


  });