'use strict';

angular.module('taggApp').controller('TaggListCtrl', ['$scope', '$q', 'HomeService', 'TaggListService', '$timeout', '$http', 'SweetAlert',
  function ($scope, $q, HomeService, TaggListService, $timeout, $http, SweetAlert, socket) {


 $scope.photos = [
    {id: 'p1', 'title': 'A nice day!', src: "http://lorempixel.com/300/400/"},
    {id: 'p2', 'title': 'Puh!', src: "http://lorempixel.com/300/400/sports"},
    {id: 'p3', 'title': 'What a club!', src: "http://lorempixel.com/300/400/nightlife"}
];


    $scope.getTaggs = function() {
      TaggListService.getTaggs().then(function(response) {
        $scope.taggs = response.data;
        console.log('gettaggs: ');
        console.log($scope.taggs);
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
          text: "Hades ate your tagg for breakfast.",
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
            console.log(item);

      SweetAlert.swal({
         title: "Are you sure?",
         text: "Your tagg will be banished to the underworld!",
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