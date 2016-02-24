// Sloupcový graf
dashboardApp.directive('barchartNg', ['JsonGraphRes', function(JsonGraphRes) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
    },
    link: function(scope, elem, attrs) {
      /* po http požadavku přidá graf */
      var addChart = function(opts) {
        console.log('Vykreslení grafu');
        correctOptsVal(opts);
        chartGridNg(scope, elem, opts);

        opts.nodeParent = elem;
        scope.opts = opts;
      };

      //var relativeUrl = attrs.relativeUrl; //např. 'data/graph1.json'
      //var graphData = JsonGraphRes.send(relativeUrl).get();
      //
      //graphData.$promise.then(addChart);

      attrs.$observe('relativeUrl', function (newRelativeUrl) {
        var relativeUrl = newRelativeUrl;
        var graphData = JsonGraphRes.send(relativeUrl).get();
        graphData.$promise.then(addChart);
      });
    },
    // transclude: true,
    templateUrl: 'dashboard/widgets/barchartNg/chart/template.html'
  };
}]);
