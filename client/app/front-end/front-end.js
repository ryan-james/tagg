'use strict';

angular.module('taggApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        template: '<tagg-home></tagg-home>'
      })
      .state('away', {
        url: '/away',
        template: '<tagg-away></tagg-away>'
      });
  });