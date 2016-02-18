'use strict';

dashboardApp.controller('dashboardView3Ctrl', ['$scope', 'dModel', function($scope, dModel) {

  $scope.model = dModel.performanceWidgets;
  console.log($scope.model);
}]);
