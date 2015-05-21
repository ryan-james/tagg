'use strict';

angular.module('taggApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        template: '<tagg-home></tagg-home>'
      })
      .state('tagg-list', {
        url: '/tagg-list',
        template: '<tagg-list></tagg-list>'
      });
  });