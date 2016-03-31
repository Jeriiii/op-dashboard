'use strict';

angular.module('dashboardApp').controller('dashboardView1Ctrl', ['$scope', 'dModel', function($scope, dModel) {
  $scope.model = dModel.allCharts;
  $scope.title = 'Všechny grafy';
}]);