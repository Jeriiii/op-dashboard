'use strict';

dashboardApp.controller('dashboard1Ctrl', ['$scope', function($scope) {
  var model = {
    widgets: [
      {
        type: 'simpleText',
        settings: {
          tittle: 'Jednoduchý dashboard 1',
          text: 'Toto je opravdu jednoduchý dashboard 1 jen s textem'
        }
      },
      {
        type: 'simpleText',
        settings: {
          tittle: 'Jednoduchý dashboard 2',
          text: 'Toto je opravdu jednoduchý dashboard 2 jen s textem'
        }
      }
    ]
  };

  $scope.model = model;
}]);
