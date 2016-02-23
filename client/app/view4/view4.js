'use strict';

dashboardApp.controller('dashboardView4Ctrl', ['$scope', 'dModel', function($scope, dModel) {

  $scope.model = dModel.barchartJQ;
  console.log($scope.model);
}]);
