'use strict';

// angular.module('taggApp')
// 	.directive('taggTags', function() {
// 		return {
// 			restrict: 'E',
// 			templateUrl: 'app/front-end/tagg-list/tagg-list.html',
// 			controller: 'TaggListCtrl'
// 		};

// 	});


angular.module('taggApp')
	.directive('taggTags', function($compile) {
    
    var getTemplate = function(tagsString) {
    	//create blank string
        var template = '';
        //convert the array string to json
        if(tagsString !== '') {var tags = JSON.parse(tagsString);}
        //for every tag obj in the array
        for(var tag in tags) {
        	var actTag = tags[tag];
        	//keep adding each tag to the blank template string
            template += '*' + actTag.tag + '* ';
        }
        //when complete, return the template string
        console.log(template);
        return template;
    };

     return {
        restrict: 'E',
 
        link: function(scope, element, attrs) {
            element.html(getTemplate(attrs.tags)).show();
         }
     };
 });