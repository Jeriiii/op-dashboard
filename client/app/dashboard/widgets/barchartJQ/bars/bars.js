// Direktiva sloužící k vykreslení sloupců v grafu, jedná se o potomek direktivy barsJq
dashboardApp.directive('barsChJq', ['JsonChartResource', function(JsonChartResource) {
  return {
    restrict: 'E',
    replace: true,
    link: function(scope, elem, attrs) {

      scope.$watch('opts', function(opts) {
        /* po http požadavku přidá sloupce do grafu */
        if(opts) {
          createBarChart(elem, opts);
        }
      });

    },
    transclude: true,
    templateUrl: 'dashboard/widgets/barchartJQ/bars/bars.html'
  };
}]);
