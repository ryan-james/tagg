'use strict';

angular.module('taggApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/socket',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
  });