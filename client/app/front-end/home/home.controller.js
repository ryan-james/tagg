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

angular.module('taggApp').controller('HomeCtrl', ['$scope', 'HomeService', function ($scope, HomeService, $timeout, $http, socket) {

    
      $scope.textTags = function() {
        for(var i=1; i<$scope.tags.length; i++) {
          $scope.tags[i].text = $scope.tags[i].tag;
        }
        return;
      };

      $scope.tagzz = [];
       
      $scope.loadTags = function(query) {
           // return $http.get('/api/tags?query=' + query);
           return $scope.tags;
      };

$scope.taggys = function() {
  // $scope.textTags();
  console.log($scope.tag);
  // console.log($scope.tagsss);
};

    
    $scope.refresh = function() {
      $scope.$broadcast('masonry.reload'); 
    };

    
    $scope.getTaggs = function() {
      HomeService.getTaggs().then(function(response) {
        $scope.taggs = response.data;
        // console.log('gettaggs: ');
        // console.log($scope.taggs);
         console.log('called get taggs');
         console.log($scope.taggs);
    })};
    $scope.getTaggs();


    $scope.initTags = [{text: 'ALL'}];

    $scope.getTags = function() {
      HomeService.getTags().then(function(response) {
        //console.log(response.data);
        $scope.tags = $scope.initTags.concat(response.data);
        $scope.textTags();
        console.log('gettags: ');
        console.log($scope.tags);

    })};
    $scope.getTags();


    $scope.saveTagg = function() {
      var titleCap = $scope.capitalizeEachWord($scope.title);
      var tagCap = $scope.capitalizeEachWord($scope.tag);
     
      //get tagg obj minus tag
      var tagg = {
        title: titleCap,
        url: $scope.url,        
      };      

      //get and save tag property
      HomeService.saveTag({tag: tagCap}).then(function(response) {
        //set the saved tagId response to tagg.tag
        tagg.tag = response.data._id;
        //save tagg obj
        HomeService.saveTagg(tagg).then(function() {
          $scope.getTaggs();
        }, function(err) {
        })
        .then(function() {
          $scope.getTags();
        });        
      }); 
    };



    $scope.removeTagg = function(item) {
      HomeService.deleteTagg(item).then(function() {
        $scope.getTaggs();
        console.log($scope.taggs);
      }, function(err) {
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



      //AUTO COMPLETE TAGS (doesn't work)

      // $scope.loadTags = function(query) {
      //   return $http.get('/tags?query=' + query);
      // };

      $scope.capitalizeEachWord = function(str) {
        if (str.length == 1){
          var str = str;
          return str.replace(/\w\S*/g, function(txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
        
        for(var i=0; i<str.length; i++) {
            var str = str[i];
            return str.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        };
    });
}


  $scope.refresh();
}]);