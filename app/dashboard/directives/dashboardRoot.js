/* funkce controleru této direktivy */
var ctrlFnc = function ( $scope, $element ) {
  $scope.addTextWidget = function () {
    $scope.widgets.push({
        type: 'simpleText',
        settings: {
          tittle: 'Vygenerovaný textový widget',
          text: 'Toto je opravdu jednoduchý dashboard 1 jen s textem'
        }
      });
  };

  $scope.addGraphWidget = function () {
    $scope.widgets.push({
      type: 'graph',
      settings: {
        tittle: 'Vygenerované graf',
        relativeUrl: 'data/graph1.json'
      }
    });
  };

  $scope.addClockWidget = function () {
    $scope.widgets.push({
      type: 'clock',
      settings: {
        tittle: 'Vygenerované hodiny',
        format: 'HH:mm:ss'
      }
    });
  };
};

/* funkce link této direktivy */
var linkFnc = function(scope, elem, attrs) {
  var model = JSON.parse(attrs.dbModel);
  //var model = dashboardModelProvider.getModel();
  scope.widgets = model.widgets;
};

// Hlavní direktiva, ve které se nachází celý dashboard
dashboardApp.directive('dashboardRoot', ['$compile', 'dashboardModel', function($compile, dashboardModelProvider) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'dashboard/templates/rootDashboart.html',
    controller: ctrlFnc,
    link: linkFnc
  };
}]);
