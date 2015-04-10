'use strict';

// angular.module('mean.taggdup').factory('Taggdup', [
//   function() {
//     return {
//       name: 'taggdup'
//     };
//   }
// ]);

angular.module('tagg')
  .service('HomeService', function($resource) {

  	var taggs = [];

    var tagOptions = [
	{text: 'ALL'}
	];


	return {
		getTaggs : function() {
			return taggs;
		},
		saveTagg : function(tagg) {
			return taggs.push(tagg);
		},
		deleteTagg : function(tagg) {
			var index = taggs.indexOf(tagg);
			taggs.splice(index, 1);
			return;
		},
		getTags : function() {
			return tagOptions;
		},
		saveTags : function(tag) {
			if(tagOptions.indexOf(tag) === -1) {
				return tagOptions.push(tag);
			}
		}
	};


  });