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

angular.module('taggApp').controller('HomeCtrl', ['$scope', '$q', 'HomeService', function ($scope, $q, HomeService, $timeout, $http, socket) {

    
      $scope.textTags = function() {
        for(var i=1; i<$scope.tags.length; i++) {
          $scope.tags[i].text = $scope.tags[i].tag;
        }
        return;
      };

      $scope.tagzz = [];



       
$scope.loadTags = function(query) {
     return HomeService.tagTypeAhead(query);
    // return $http.get('/api/tags?query=' + query);
     //return $scope.tags;
};


$scope.res;
$scope.taggys = function() {
  // $scope.textTags();
  // console.log($scope.tag);
  // console.log($scope.tags);
  // console.log($scope.tagsss);
  $scope.res = $scope.tagSplitter($scope.tag);
};

$scope.taggyss = function() {
  // $scope.textTags();
  // console.log($scope.tag);
  // console.log($scope.tags);
   console.log($scope.res);
  //$scope.tagSplitter($scope.tag);
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
      var titleCap = $scope.capitalizeEachTitleWord($scope.title);
      var tagCap = $scope.capitalizeEachTag($scope.tag);
      // { tag: [ 'Piggy', 'Jiggy' ] }
     
      //get tagg obj minus tag
      var tagg = {
        title: titleCap,
        url: $scope.url,        
      };    

      // var tagResponses = []; 
      $scope.tagSplitter(tagCap)
      .then(function(tagResponses) {
        tagg.tag = tagResponses;

        HomeService.saveTagg(tagg).then(function() {
            $scope.getTaggs();
          }, function(err) {
          })
          .then(function() {
            $scope.getTags();
          }); 
      });

    };

    $scope.tagSplitter = function(tagCap) {
      var promises = tagCap.map(function(tag) {
        return HomeService.saveTag({tag: tag}).then(function(response) {
            return response.data._id;
        });
      });

      // var promises = function(tagCap) {
      //   var ressy = [];
      //   for (var i=0; i<tagCap.length; i++) {
      //     return HomeService.saveTag({tag: tagCap[i]}).then(function(response) {
      //       ressy.push(response.data._id);
      //     });
      //       return ressy;          
      //   }
      // };
      return $q.all(promises);
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

      $scope.capitalizeEachTitleWord = function(str) {
       
          var str = str;
          return str.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          });
      };

      $scope.capitalizeEachTag = function(str) {
          var cutTags = [];
          var str = str;
        console.log('init str : ');
        console.log(str);
        console.log('init str length: ');
        console.log(str.length);       
        
        for(var i=0; i<str.length; i++) {
            var strSep = str[i];
            console.log('for str: ');
            console.log(strSep);
            var strSepx = strSep.text; 
            console.log('for str text: ');
            console.log(strSepx); 

            var newTag = strSepx.replace(/\w\S*/g, function(txt) {
              return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });

            cutTags.push(newTag);
            console.log(cutTags); 

        }
        return cutTags;
      };



  $scope.refresh();
}]);