// Příklad grafu pluginu highchart, který se dá vložit do vydgetu
dashboardApp.directive('barsChJq', ['JsonGraphRes', function(JsonGraphRes) {
  return {
    restrict: 'E',
    replace: true,
    link: function(scope, elem, attrs) {
      opts = scope.opts;

      scope.$watch('opts', function(opts, oldValue) {
        /* po http požadavku přidá graf */
        if(opts) {
          createBarChart(elem, opts);
        }
      });

    },
    transclude: true,
    templateUrl: 'dashboard/widgets/barchartJQ/bars/bars.html'
  };
}]);
