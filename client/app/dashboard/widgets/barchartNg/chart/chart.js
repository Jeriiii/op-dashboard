// Hlavní direktive sloupcového grafu v angularu
dashboardApp.directive('barchartNg', ['JsonChartResource', function(JsonChartResource) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
    },
    link: function(scope, elem, attrs) {
      /* po http požadavku dojke k přidání grafu */
      var addChart = function(opts) {
        console.log('Vykreslení grafu');
        correctOptsVal(opts);
        chartGridNg(scope, elem, opts);

        opts.nodeParent = elem;
        scope.opts = opts;
      };

      attrs.$observe('relativeUrl', function (newRelativeUrl) {
        var relativeUrl = newRelativeUrl;
        var graphData = JsonChartResource.send(relativeUrl).get();
        graphData.$promise.then(addChart);
      });
    },
    templateUrl: 'dashboard/widgets/barchartNg/chart/template.html'
  };
}]);
