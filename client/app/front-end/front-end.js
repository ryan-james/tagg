'use strict';

angular.module('taggApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        template: '<tagg-home></tagg-home>'
        //controller: 'UiCtrl'
      });
  });