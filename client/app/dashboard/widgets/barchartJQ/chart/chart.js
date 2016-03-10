// Hlavní direktive sloupcového grafu v jQuery
dashboardApp.directive('barchartJq', ['JsonChartResource', function(JsonChartResource) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
    },
    link: function(scope, elem, attrs) {
      /* po http požadavku dojke k přidání grafu */
      var addChart = function(opts) {
        correctOptsVal(opts);
        chartGrid(elem, opts);

        opts.nodeParent = elem;
        scope.opts = opts;
      };

      attrs.$observe('relativeUrl', function (newRelativeUrl) {
        relativeUrl = newRelativeUrl;
        graphData = JsonChartResource.send(relativeUrl).get();
        graphData.$promise.then(addChart);
      });
    },
    transclude: true,
    templateUrl: 'dashboard/widgets/barchartJQ/chart/template.html'
  };
}]);
