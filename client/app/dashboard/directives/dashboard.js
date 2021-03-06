/* funkce controleru této direktivy */
var ctrlFnc = function ( $scope, $element ) {
  $scope.addTextWidget = function () {
    $scope.widgets.unshift({
        type: 'simpleText',
        settings: {
          title: 'Vygenerovaný textový widget',
          text: 'Toto je opravdu jednoduchý dashboard 1 jen s textem',
          escapeHtml: true
        }
      });
  };

  $scope.addGraphWidget = function () {
    $scope.widgets.unshift({
      type: 'graph',
      settings: {
        title: 'Vygenerované graf',
        relativeUrl: '/server/?type=hightchart'
      }
    });
  };

  $scope.addClockWidget = function () {
    $scope.widgets.unshift({
      type: 'clock',
      settings: {
        title: 'Vygenerované hodiny',
        format: 'HH:mm:ss'
      }
    });
  };
};

/* funkce link této direktivy */
var linkFnc = function(scope, elem, attrs) {
  //var model = dashboardModelProvider.getModel();

  //var model = JSON.parse(attrs.dbModel);
  //scope.widgets = model.widgets;

  attrs.$observe('dbModel', function (newDbModel) {
    model = JSON.parse(newDbModel);
    scope.widgets = model.widgets;
    scope.dynamicAdd = model.dynamicAdd
  });
};

// Hlavní direktiva, ve které se nachází celý dashboard
dashboardApp.directive('dashboardRoot', ['$compile', 'dashboardModel', function($compile, dashboardModelProvider) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'dashboard/templates/dashboart.html',
    controller: ctrlFnc,
    link: linkFnc
  };
}]);
