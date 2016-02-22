'use strict';

dashboardApp.controller('dashboardView3Ctrl', ['$scope', 'dModel', '$timeout', function($scope, dModel, $timeout) {

  $scope.model = dModel.performanceWidgets;

  var barchartJQ = {
    type: 'barchartJQ',
    settings: {
      tittle: 'Bar chart JQ Změněný',
      relativeUrl: 'http://localhost/skola/op/dashboard-op/server/?type=barchart'
    }
  };

  var barchartNg = {
    type: 'barchartNg',
    settings: {
      tittle: 'Bar chart ng Změněný',
      relativeUrl: 'http://localhost/skola/op/dashboard-op/server/?type=barchart'
    }
  };

  var barchartReact = {
    type: 'barchartReact',
    settings: {
      tittle: 'Bar chart React Změněný',
      relativeUrl: 'http://localhost/skola/op/dashboard-op/server/?type=barchart'
    }
  };

  $timeout(function() {
    console.log('změna modelu');
    $scope.model = {widgets: [barchartJQ, barchartNg, barchartReact]};
    console.log('konec změny modelu');
  }, 1000);

}]);
