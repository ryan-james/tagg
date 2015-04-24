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

angular.module('taggApp').controller('HomeCtrl', ['$scope', 'HomeService', function ($scope, HomeService, $http, socket) {
    
    //$scope.taggs = HomeService.getTaggs();

    $scope.getTaggs = function() {
      HomeService.getTaggs().then(function(response) {
        $scope.taggs = response.data;
        console.log($scope.taggs);
    })};
    $scope.getTaggs();


    $scope.initTags = [{tag: 'ALL'}];

    $scope.getTags = function() {
      HomeService.getTags().then(function(response) {
        //console.log(response.data);
        $scope.tags = $scope.initTags.concat(response.data);
        //console.log($scope.tags);

    })};
    $scope.getTags();


    $scope.saveTagg = function() {

      //get tagg obj minus tag
      var tagg = {
        title: $scope.title,
        url: $scope.url,        
      };      

      //get and save tag property
      var tag = $scope.tag;   
      HomeService.saveTag({tag: $scope.tag}).then(function(response) {
        console.log('response after saving tag');
        console.log(response.data);
        tagg.tag = response.data;
        console.log('tagg: ');
        console.log(tagg);
        //save tagg obj
        HomeService.saveTagg(tagg).then(function() {
          $scope.getTaggs();
        })
        .then(function() {
          $scope.getTags();
        });        
      }); 



    };



    $scope.removeTagg = function(item) {
      HomeService.deleteTagg(item).then(function() {
        $scope.getTaggs();
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