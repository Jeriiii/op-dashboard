
'use strict';

dashboardApp.controller('dashboardView6Ctrl', ['$scope', 'dModel', function($scope, dModel) {

  $scope.model = dModel.barchartReact;
  console.log($scope.model);
}]);
