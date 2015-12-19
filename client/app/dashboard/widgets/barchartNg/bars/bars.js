// Příklad grafu pluginu highchart, který se dá vložit do vydgetu
dashboardApp.directive('barsChNg', ['JsonGraphRes', function(JsonGraphRes) {
  return {
    restrict: 'E',
    replace: true,
    link: function(scope, elem, attrs) {

      opts = angular.fromJson(scope.opts);
      /* po http požadavku přidá graf */
      var addChart = function(chartData) {
        createBarChart(elem, opts);
      };

      addChart();

      // var relativeUrl = attrs.relativeUrl; //např. 'data/graph1.json'
      // var graphData = JsonGraphRes.send(relativeUrl).get();
      //
      // graphData.$promise.then(addChart);
    },
    transclude: true,
    templateUrl: 'dashboard/widgets/barchartNg/bars/bars.html'
  };
}]);
