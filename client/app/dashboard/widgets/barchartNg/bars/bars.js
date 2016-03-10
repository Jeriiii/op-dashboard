// Direktiva sloužící k vykreslení sloupců v grafu, jedná se o potomek direktivy barsNg
dashboardApp.directive('barsChNg', ['JsonChartResource', '$timeout', function(JsonChartResource, $timeout) {
  return {
    restrict: 'E',
    replace: true,
    link: function(scope, elem, attrs) {

      scope.$watch('opts', function(opts) {
        /* po http požadavku přidá sloupce do grafu */
        if(opts) {
          createBarChartNg(scope, $timeout, elem, opts);
        }
      });

    },
    templateUrl: 'dashboard/widgets/barchartNg/bars/bars.html'
  };
}]);
