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
     //return HomeService.tagTypeAhead(query);
     return $http.get('/api/tags?query=' + query).then(function(res) {
       console.log('res');
       console.log(res.data);
       return res.data;
     });
     //return $scope.tags;
};


    
    $scope.refresh = function() {
      $scope.$broadcast('masonry.reload'); 
    };

    
    $scope.getTaggs = function() {
      HomeService.getTaggs().then(function(response) {
        $scope.taggs = response.data;
        // console.log('gettaggs: ');
        // console.log($scope.taggs);
         // console.log('called get taggs');
         // console.log($scope.taggs);
    })};
    $scope.getTaggs();


    $scope.initTags = [{text: 'ALL'}];

    $scope.getTags = function() {
      HomeService.getTags().then(function(response) {
        //console.log(response.data);
        $scope.tags = $scope.initTags.concat(response.data);
        
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
        $scope.textTags();

        HomeService.saveTagg(tagg).then(function() {
            SweetAlert.swal({   title: "Sweet!",   text: "You saved a tagg!",   type:"success" });
            $scope.getTaggs();
          }, function(err) {
            SweetAlert.swal({   title: "Shiiit!",   text: "Tagg not saved.",   type:"error" });
            console.log(err);          
          })
          .then(function() {
            $scope.getTags();
          }); 
      });

    };

    $scope.tagSplitter = function(tagCap) {
      //get tag array
      var promises = tagCap.map(function(tag) {
        //for each tag return the savetag promise
        return HomeService.saveTag({tag: tag, text: tag}).then(function(response) {
          //which returns the id promise after saving
            return response.data._id;
        });
        //tagCap array is mapped to a new array of saveTag promises, and each of those promises
        //returns a promise of an id
      });
        return $q.all(promises);      
    };


    $scope.textTags = function() {
        for(var i=0; i<$scope.tags.length; i++) {
          $scope.tags[i].text = $scope.tags[i].tag;
        }
        return;
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



    $scope.removeTagg = function(item) {
      HomeService.deleteTagg(item).then(function() {
        SweetAlert.swal({
          title:"Bye Tagg :(",
          text: "Your tagg is lost in the ether",
          type: "success"
        }, 
        function() {
          $scope.getTaggs();
        });
        //$scope.getTaggs();
        console.log($scope.taggs);
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