// Hlavní direktiva, ve které se nachází celý dashboard
dashboardApp.directive('dashboardRoot', ['$compile', function($compile) {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    templateUrl: 'dashboard/templates/rootDashboart.html',
    controller: function ( $scope, $element ) {
      $scope.addTextWidget = function () {
        var el = $compile(
          '<dashboard-widget dbw-title="Vygenerovaný widget s textem">Obsah vygenerovaného widgetu</dashboard-widget> '
        )( $scope );
        $element.parent().append( el );
      };
      $scope.addGraphWidget = function () {
        var el = $compile(
          '<dashboard-widget dbw-title="Vygenerovaný widget s grafem"><graph-example /></dashboard-widget> '
        )( $scope );
        $element.parent().append( el );
      };
    },
    link: function(scope, elem, attrs) {
      var model = JSON.parse(attrs.dbModel);

      angular.forEach(model.widgets, function(value, key) {
        console.log(value);
        if(value.type == 'simpleText') {
          scope.addTextWidget();
        } else if(value.type == 'graph') {
          scope.addGraphWidget();
        }
      });
    }
  };
}]);

// Prázdný widget
dashboardApp.directive('dashboardWidget', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
    },
    link: function(scope, elem, attrs) {
        scope.dbwTitle = attrs.dbwTitle;
    },
    transclude: true,
    templateUrl: 'dashboard/templates/widget.html'
  };
});
