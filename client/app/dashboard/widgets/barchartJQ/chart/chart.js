// Sloupcový graf
dashboardApp.directive('barchartJq', ['JsonGraphRes', function(JsonGraphRes) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
    },
    link: function(scope, elem, attrs) {
      var opts = {
        bars: [[4,2,7,9],[4,5,2,1],[8,3,5,2],[4,2,2,4]],
        unit:"k",
        grid:"1"
      };

      correctOptsVal(opts);

      chartGrid(elem, opts);

      opts.nodeParent = elem;
      scope.opts = opts;

      // var relativeUrl = attrs.relativeUrl; //např. 'data/graph1.json'
      // var graphData = JsonGraphRes.send(relativeUrl).get();
      //
      // graphData.$promise.then(addChart);
    },
    transclude: true,
    templateUrl: 'dashboard/widgets/barchartJQ/chart/template.html'
  };
}]);
