'use strict';

angular.module('taggApp').controller('TaggListCtrl', ['$scope', '$q', 'HomeService', 'TaggListService', '$timeout', '$http', 'SweetAlert',
  function ($scope, $q, HomeService, TaggListService, $timeout, $http, SweetAlert, socket) {


  	$scope.getTaggs = function() {
      TaggListService.getTaggs().then(function(response) {
        $scope.taggs = response.data;
        // console.log('gettaggs: ');
        // console.log($scope.taggs);
         // console.log('called get taggs');
         // console.log($scope.taggs);
      });
    };
    $scope.getTaggs();


    $scope.initTags = [{tag: 'ALL', text: 'ALL'}];

    $scope.getTags = function() {
      TaggListService.getTags().then(function(response) {        
        $scope.tags = $scope.initTags.concat(response.data);
        // $scope.textTags();
        console.log('gettags: ');
        console.log($scope.tags);

    })};
    $scope.getTags();


    //  $scope.textTags = function() {
    //     for(var i=0; i<$scope.tags.length; i++) {
    //       $scope.tags[i].text = $scope.tags[i].tag;
    //     }
    //     return;
    // };





    $scope.removeTagg = function(item) {
      TaggListService.deleteTagg(item).then(function() {
        SweetAlert.swal({
          title:"Bye Tagg :(",
          text: "Your tagg is banished to the underworld",
          type: "success"
        });
        $scope.getTaggs();
      }, function(err) {
        SweetAlert.swal("Couldn't remove tagg because of " + err);
      });
      console.log(item);
    };


    $scope.filterTaggs = function(tagFilterValue) {
      console.log('TFV: ' + JSON.stringify(tagFilterValue));
      $scope.filterTag = tagFilterValue;
      console.log('TFV: ' + $scope.filterTag);

      
      if($scope.filterTag === 'ALL') {
        $scope.filterTag = undefined;
      }
    };





    $scope.refresh = function() {
      $scope.$broadcast('masonry.reload'); 
    };


    $scope.removeTaggWarning = function(item) {
      SweetAlert.swal({
         title: "Are you sure?",
         text: "Your will tagg will be lost forever!",
         type: "warning",
         showCancelButton: true,
         confirmButtonColor: "#DD6B55",
         confirmButtonText: "Yes, delete it!",
         closeOnConfirm: false
      },
      function(isConfirm){
        if(isConfirm){
          $scope.removeTagg(item);
        }
        else {
          SweetAlert.swal({
            title: "Lucky Tagg :)",
            text: "Tagg survives another day!",
            type: "error"
          });
        }
      });
    };


  }
]);