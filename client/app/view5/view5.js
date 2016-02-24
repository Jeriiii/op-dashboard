'use strict';

dashboardApp.controller('dashboardView5Ctrl', ['$scope', '$timeout','dModel', function($scope, $timeout, dModel) {

  $scope.model = dModel.barchartNg;

  var barchartNg = {
    type: 'barchartNg',
    settings: {
      tittle: 'Bar chart ng Změněný',
      relativeUrl: 'http://localhost/skola/op/dashboard-op/server/?type=barchart-another'
    }
  };

  $scope.reloadWidget = function() {
    console.log('změna modelu');
    $scope.model = {widgets: [barchartReact]};
    $scope.$apply();
    console.log('konec změny modelu');
  };
}]);
