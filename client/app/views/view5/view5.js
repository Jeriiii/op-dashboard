'use strict';

dashboardApp.controller('dashboardView5Ctrl', ['$scope', '$timeout','dModel', function($scope, $timeout, dModel) {

  $scope.model = dModel.barchartNg;
  $scope.title = 'Pro účely testování zobrazení jednoho sloup. grafu';

  var barchartNg = {
    type: 'barchartNg',
    settings: {
      tittle: 'Bar chart ng Změněný',
      relativeUrl: 'http://localhost/skola/op/dashboard-op/server/?type=barchart-another'
    }
  };

  $scope.reloadWidget = function() {
    console.log('změna modelu');
    $scope.model = {widgets: [barchartNg]};
    console.log('konec změny modelu');
  };
}]);
