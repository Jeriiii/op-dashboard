'use strict';

dashboardApp.controller('dashboardView5Ctrl', ['$scope', 'dModel', function($scope, dModel) {

  $scope.model = dModel.barchartNg;
  console.log($scope.model);
}]);
