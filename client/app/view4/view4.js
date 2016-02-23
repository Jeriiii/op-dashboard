'use strict';

dashboardApp.controller('dashboardView4Ctrl', ['$scope', '$timeout', 'dModel', function($scope, $timeout, dModel) {

  $scope.model = dModel.barchartJQ;

  var barchartJQ = {
    type: 'barchartJQ',
    settings: {
      tittle: 'Bar chart JQ Změněný',
      relativeUrl: 'http://localhost/skola/op/dashboard-op/server/?type=barchart'
    }
  };

  $timeout(function() {
    console.log('změna modelu');
    $scope.model = {widgets: [barchartJQ]};
    console.log('konec změny modelu');
  }, 1000);
}]);
