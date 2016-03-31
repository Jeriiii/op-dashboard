// Direktiva sloužící k vykreslení sloupců v grafu, jedná se o potomek direktivy barsNg
dashboardApp.directive('barsChNg', ['JsonChartResource', '$timeout', function(JsonChartResource, $timeout) {
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
          createBarChartNg(scope, $timeout, elem, opts);
        }
      });

    },
    templateUrl: 'dashboard/widgets/barchartNg/bars/bars.html'
  };
}]);
