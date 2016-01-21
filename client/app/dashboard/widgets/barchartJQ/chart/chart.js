// Sloupcový graf
dashboardApp.directive('barchartJq', ['JsonGraphRes', function(JsonGraphRes) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
    },
    link: function(scope, elem, attrs) {
      /* po http požadavku přidá graf */
      var addChart = function(opts) {
        correctOptsVal(opts);
        chartGrid(elem, opts);

        opts.nodeParent = elem;
        scope.opts = opts;
      };

      var relativeUrl = attrs.relativeUrl; //např. 'data/graph1.json'
      var graphData = JsonGraphRes.send(relativeUrl).get();

      graphData.$promise.then(addChart);
    },
    transclude: true,
    templateUrl: 'dashboard/widgets/barchartJQ/chart/template.html'
  };
}]);
