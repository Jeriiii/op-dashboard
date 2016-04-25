
'use strict';

dashboardApp.controller('dashboardView6Ctrl', ['$scope', '$timeout','dModel', function($scope, $timeout, dModel) {

  $scope.model = dModel.barchartReact;
  $scope.title = 'Pro účely testování zobrazení jednoho sloup. grafu';

  var barchartReact = {
    type: 'barchartReact',
    settings: {
      title: 'Bar chart React Změněný',
      relativeUrl: '/server/?type=barchart-another'
    }
  };

  $scope.reloadWidget = function() {
    console.log('změna modelu');
    $scope.model = {widgets: [barchartReact]};
    console.log('konec změny modelu');
  };
}]);
