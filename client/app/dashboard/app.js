'use strict';

var dashboardApp = angular.module('dashboardApp', ['ngResource', 'ngRoute', 'dashboardServices', "highcharts-ng", 'react']);

dashboardApp.value('wwwRoot', 'http://localhost/skola/op/dashboard-op');