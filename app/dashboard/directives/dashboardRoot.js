// Hlavní direktiva, ve které se nachází celý dashboard
dashboardApp.directive('dashboardRoot', ['$compile', 'dashboardModel', function($compile, dashboardModelProvider) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'dashboard/templates/rootDashboart.html',
    controller: function ( $scope, $element ) {
      $scope.addTextWidget = function () {
        var el = $compile(
          '<widget-base dbw-title="Vygenerovaný widget s textem"><widget-simple-text dbw-text="Obsah vygenerovaného widgetu" /></widget-base>'
        )( $scope );
        $element.find('#content').append( el );
      };
      $scope.addGraphWidget = function () {
        var el = $compile(
          '<widget-base dbw-title="Vygenerovaný widget s grafem"><graph-example /></widget-base>'
        )( $scope );
        $element.find('#content').append( el );
      };
    },
    link: function(scope, elem, attrs) {
      //var model = JSON.parse(attrs.dbModel);
      var model = dashboardModelProvider.getModel();

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
