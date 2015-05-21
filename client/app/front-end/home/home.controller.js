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

angular.module('taggApp').controller('HomeCtrl', ['$scope', '$q', 'HomeService', '$timeout', '$http', 'SweetAlert',
  function ($scope, $q, HomeService, $timeout, $http, SweetAlert, socket) {

 


$scope.taggys = function() {
  swal("Here's a message");
};




       
    $scope.loadTags = function(query) {
         return HomeService.tagTypeAhead(query).then(function(res) {
         // return $http.get('/api/tags?query=' + query).then(function(res) {
           console.log('res');
           console.log(res.data);
           var tagsWithoutText = res.data;
           $scope.tags = textTags(tagsWithoutText);
           //return res.data;
           return $scope.tags;
         });
         //return $scope.tags;
    };


     function textTags(tags) {
        for(var i=0; i<tags.length; i++) {
          tags[i].text = tags[i].tag;
        }
        return tags;
    };
    
    


    $scope.saveTagg = function() {
      var titleCap = capitalizeEachTitleWord($scope.title);
      var tagCap = capitalizeEachTag($scope.tag);
      
      var tagg = {
        title: titleCap,
        url: $scope.url,        
      };    

      $scope.tagSplitter(tagCap).then(function(tagResponses) {
        tagg.tag = tagResponses;

        HomeService.saveTagg(tagg).then(function() {
            SweetAlert.swal({   
              title: "Sweet!",   
              text: "You saved a tagg!",   
              type:"success" 
            },
            function(isConfirm) {
              $scope.title = '';
              $scope.url = '';
              $scope.tag = '';
            });
        }, function(err) {
          SweetAlert.swal({
            title: "Shiiit!",
            text: "Tagg not saved.",
            type:"error" 
          });

          console.log(err);
        }); 
      });

    };

    $scope.tagSplitter = function(tagCap) {
      //get tag array
      var promises = tagCap.map(function(tag) {
        //for each tag return the savetag promise
        return HomeService.saveTag({tag: tag}).then(function(response) {
          //which returns the id promise after saving
            return response.data._id;
        });
        //tagCap array is mapped to a new array of saveTag promises, and each of those promises
        //returns a promise of an id
      });
        return $q.all(promises);      
    };


    // $scope.textTags = function() {
    //     for(var i=0; i<$scope.tags.length; i++) {
    //       $scope.tags[i].text = $scope.tags[i].tag;
    //     }
    //     return;
    // };



      var capitalizeEachTitleWord = function(str) {       
          var str = str;
          return str.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          });
      };

      var capitalizeEachTag = function(str) {
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



  //$scope.refresh();
}]);