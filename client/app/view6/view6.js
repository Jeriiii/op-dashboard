
'use strict';

dashboardApp.controller('dashboardView6Ctrl', ['$scope', '$timeout','dModel', function($scope, $timeout, dModel) {

  $scope.model = dModel.barchartReact;

  var barchartReact = {
    type: 'barchartReact',
    settings: {
      tittle: 'Bar chart React Změněný',
      relativeUrl: 'http://localhost/skola/op/dashboard-op/server/?type=barchart'
    }
  };

  $timeout(function() {
    console.log('změna modelu');
    $scope.model = {widgets: [barchartReact]};
    console.log('konec změny modelu');
  }, 1000);
}]);
