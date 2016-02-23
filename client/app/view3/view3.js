'use strict';

dashboardApp.controller('dashboardView3Ctrl', ['$scope', 'dModel', '$timeout', function($scope, dModel, $timeout) {

  $scope.model = dModel.performanceWidgets;

}]);
