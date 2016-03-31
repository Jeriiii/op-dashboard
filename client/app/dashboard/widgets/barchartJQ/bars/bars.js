// Direktiva sloužící k vykreslení sloupců v grafu, jedná se o potomek direktivy barsJq
dashboardApp.directive('barsChJq', ['JsonChartResource', function(JsonChartResource) {
  return {
    restrict: 'E',
    replace: true,
    link: function(scope, elem, attrs) {
      /* Nutno obalit jQuery funkcionalitou aby fungovalo při testování karmou.
       Při klasickém spuštění dochází k obalení již na úrovni angularu. */
      if(typeof elem.offset !== 'function') {
        elem = $(elem);
      }

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
