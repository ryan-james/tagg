'use strict';

/* jshint -W098 */
// angular.module('mean.taggdup').controller('TaggdupController', ['$scope', 'Global', 'Taggdup',
//   function($scope, Global, Taggdup) {
//     $scope.global = Global;
//     $scope.package = {
//       name: 'taggdup'
//     };
//   }
// ]);

angular.module('taggApp').controller('HomeCtrl', ['$scope', 'HomeService', function ($scope, HomeService, $http) {
    
    //$scope.taggs = HomeService.getTaggs();

    HomeService.getTaggs().then(function(response) {
      $scope.taggs = response.data;
      console.log($scope.taggs);
    });

    $scope.tags = HomeService.getTags();


    $scope.saveTagg = function() {

      var tagg = {
        title: $scope.title,
        url: $scope.url,
        tag: $scope.tag,
        date: new Date()
      };

      HomeService.saveTagg(tagg).then(function() {
        HomeService.getTaggs()
      });

      // var tag = $scope.tag;   
      // HomeService.saveTag({tag: $scope.tag}); 

    };

    $scope.removeTagg = function(item) {
      HomeService.deleteTagg(item).then(function() {
        return $scope.taggs;
      });
      console.log(item);
    };




    // $scope.filterTaggs = function(tagFilterValue) {
    //   console.log('TFV: ' + JSON.stringify(tagFilterValue));
    //   $scope.filterTag = tagFilterValue;
    //   console.log('TFV: ' + $scope.filterTag);

      
    //   if($scope.filterTag === 'ALL') {
    //     $scope.filterTag = null;
    //   }
    // };



      //AUTO COMPLETE TAGS (doesn't work)

      // $scope.loadTags = function(query) {
      //   return $http.get('/tags?query=' + query);
      // };



}]);