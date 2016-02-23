'use strict';

dashboardApp.controller('dashboardView5Ctrl', ['$scope', '$timeout','dModel', function($scope, $timeout, dModel) {

  $scope.model = dModel.barchartNg;

  var barchartNg = {
    type: 'barchartNg',
    settings: {
      tittle: 'Bar chart ng Změněný',
      relativeUrl: 'http://localhost/skola/op/dashboard-op/server/?type=barchart'
    }
  };

  $timeout(function() {
    console.log('změna modelu');
    $scope.model = {widgets: [barchartNg]};
    console.log('konec změny modelu');
  }, 1000);
}]);
