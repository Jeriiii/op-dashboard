'use strict';

dashboardApp.controller('dashboardView4Ctrl', ['$scope', '$timeout', 'dModel', function($scope, $timeout, dModel) {

  $scope.model = dModel.barchartJQ;
  $scope.count = 0;

  var barchartJQ2 = {
    type: 'barchartJQ',
    settings: {
      tittle: 'Bar chart JQ 2 Změněný',
      relativeUrl: 'http://localhost/skola/op/dashboard-op/server/?type=barchart-another'
    }
  };

  $scope.reloadWidget = function() {
    console.log('změna modelu');
    $scope.model = {widgets: [barchartJQ2]};

    console.log('konec změny modelu');
  };
}]);
