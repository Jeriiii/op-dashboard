// Příklad grafu pluginu highchart, který se dá vložit do vydgetu
dashboardApp.directive('barsChNg', ['JsonGraphRes', function(JsonGraphRes) {
  return {
    restrict: 'E',
    replace: true,
    link: function(scope, elem, attrs) {
      opts = scope.opts;

      scope.$watch('opts', function(opts, oldValue) {
        /* po http požadavku přidá graf */
        if(opts) {
          createBarChartNg(scope, elem, opts);
        }
      });

    },
    templateUrl: 'dashboard/widgets/barchartNg/bars/bars.html'
  };
}]);
