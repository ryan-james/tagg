'use strict';

angular.module('taggApp').controller('TaggListCtrl', ['$scope', '$q', 'HomeService', 'TaggListService', '$timeout', '$http', 'SweetAlert',
  function ($scope, $q, HomeService, TaggListService, $timeout, $http, SweetAlert, socket) {



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




$scope.extract = function(url) {

  function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

    function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }

  $.embedly.extract(url, {     
    key: '7a682728fe9646b483c6aee1c9edc992',
    query: {maxwidth:530}
  })
  .progress(function(obj) {
      var key = '7a682728fe9646b483c6aee1c9edc992';
      // console.log(obj);
      // console.log(obj.images[0]);
      // console.log(obj.images[0].colors[0]);
      var img  = obj.images[0];

      var color = rgbToHex(img.colors[0].color[0], img.colors[0].color[1], img.colors[0].color[2]);
      console.log(color);

      displayImage(img, color, obj.url, key);
  });

};



var displayImage = function(img, color, provider, myKey){
 
  var width = 400,
    height = Math.ceil(img.height * (width / img.width));
 
  // Add the block to the results section.
  $('.demo .results').html(
    '<div class="background-wrapper"><div id="backgroundBlock"><span>' +
    provider+'</span></div></div>');
 
  // Create a wrapper.
  $('.background-wrapper').css({
    width: width + 20,
    height: height+ 20
  });
  // Build the actually placeholder.
  $('#backgroundBlock').css({
      background: color,
      width: width,
      height: height
  });
  // Center the text.
  $('#backgroundBlock span').css('padding-top', Math.floor(height/2)-10);
 
  // Animate the fade in.
  $('.background-wrapper').animate({opacity: 1}, 500);
 
  // Use Embedly display to resize the image, we add a timestamp in the demo o
  var src = $.embedly.display.resize(img.url,
      {query: {width:width, height:height}, key: myKey}) +
      '&_' +Math.floor(Math.random() * 1000);
 
  // Create the img element
  var elem = document.createElement('img');
 
  // Set up the onload handler.
  var loaded = false;
  var handler = function() {
    if (loaded) {
      return;
    }
    loaded = true;
    // Fade the image into view.
    $('#backgroundBlock img').animate({opacity: 1}, 1000);
  };
 
  // Add the attributes to the image.
  elem.onload = handler;
  elem.src = src;
  elem.style.display = 'block';
  // Place the image in the correct ID.
  document.getElementById('backgroundBlock').appendChild(elem);
 
  // If the image is already in the browsers cache call the handler.
  if (elem.complete) {
    handler();
  }
};
 
// $('.demo-background .collapse .button').on('click', function(){
//   // Grab the input.
//   var url = $('.demo-background input').val();
//   // Make the call to Embedly Extract
//   $.embedly.extract(url)
//     .progress(function(obj){
//       // Grab images and create the colors.
//       var img = obj.images[0],
//         color = new Color(img.colors[0].color[0], img.colors[0].color[1], img.colors[0].color[2]);
//       // Display the image inline.
//       displayImage(img, color.hex, obj.provider_display);
//     });
// });


  }
]);