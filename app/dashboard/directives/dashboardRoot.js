// Hlavní direktiva, ve které se nachází celý dashboard
dashboardApp.directive('dashboardRoot', ['$compile', 'dashboardModel', function($compile, dashboardModelProvider) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'dashboard/templates/rootDashboart.html',
    controller: function ( $scope, $element ) {
      $scope.addTextWidget = function (settings) {
        console.log(settings);
        $scope.settings = settings;
        var el = $compile(
          '<widget-base dbw-title="' + settings.tittle + '"><widget-simple-text dbw-text="' + settings.text + '" /></widget-base>'
        )( $scope );
        $element.find('#content').append( el );
      };
      $scope.addGraphWidget = function (settings) {
        $scope.settings = settings;
        var el = $compile(
          '<widget-base dbw-title="' + settings.tittle + '"><graph-example relative-url="' + settings.relativeUrl + '" /></widget-base>'
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
          scope.addTextWidget(value.settings);
        } else if(value.type == 'graph') {
          scope.addGraphWidget(value.settings);
        }
      });

      scope.textSettings = {
        tittle: 'Vygenerovaný textový widget',
        text: 'Obsah vygenerovaného widgetu.'
      };

      scope.graphSettings = {
        tittle: 'Vygenerovaný textový widget',
        relativeUrl: 'data/graph1.json'
      };
    }
  };
}]);
