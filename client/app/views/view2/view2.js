'use strict';

dashboardApp.controller('dashboardView2Ctrl', ['$scope', 'dModel', function($scope, dModel) {
  $scope.model = dModel.baseWidgets;
  $scope.title = 'Základní widgety';
}]);
