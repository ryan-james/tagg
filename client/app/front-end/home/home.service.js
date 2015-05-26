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

	return {
		// getTaggs : function() {
		// 	return $http.get('/api/taggs/').success(function(data) {
		// 		return data;
		// 	});
		// },
		saveTagg : function(tagg) {
			var tagg = tagg;
			return $http.post('/api/taggs/', tagg).success(function(data, status) {
				return data;
			});
		},
		// deleteTagg : function(tagg) {
		// 	var tagg = tagg._id;
		// 	return $http.delete('/api/taggs/' + tagg).success(function(data) {
		// 		return data;
		// 	});
		// },

		// getTags : function() {
		// 	return $http.get('/api/tags/').success(function(data) {
		// 		return data;
		// 	});
		// },
		tagTypeAhead : function(query) {
			return $http.get('/api/tags/?query=' + query).success(function(data) {
				return data;
			});
		},
		saveTag : function(tag) {
			 //var promises = tagCap.map(function(tag) {
			// if(tagOptions.indexOf(tag) === -1) {
			// 	return tagOptions.push(tag);
			// }
			return $http.post('/api/tags/', tag).success(function(data) {
				// console.log('data: ');
				// console.log(data);
				return data;
			});
		}


	// 	$scope.tagSplitter = function(tagCap) {
 //      //get tag array
 //      //var promises = tagCap.map(function(tag) {
 //        //for each tag return the savetag promise
 //        return HomeService.saveTag({tag: tag}).then(function(response) {
 //          //which returns the id promise after saving
 //            return response.data._id;
 //        });
 //        //tagCap array is mapped to a new array of saveTag promises, and each of those promises
 //        //returns a promise of an id
 //      });
 //        return $q.all(promises);      
 //    };
	};


  });