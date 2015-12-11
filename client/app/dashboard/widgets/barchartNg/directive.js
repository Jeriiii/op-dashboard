// Příklad grafu pluginu highchart, který se dá vložit do vydgetu
dashboardApp.directive('barchartNg', ['JsonGraphRes', function(JsonGraphRes) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
    },
    link: function(scope, elem, attrs) {
      /* po http požadavku přidá graf */
      var addChart = function(chartData) {
        $('.bar-chart-ng').cssCharts({
          type:"bar",
          bars: [[4,2],[4,5],[8,3],[4,2]],
          max:"8",
          unit:"k",
          grid:"1",
          width:"20"
        });
      };

      addChart();

      // var relativeUrl = attrs.relativeUrl; //např. 'data/graph1.json'
      // var graphData = JsonGraphRes.send(relativeUrl).get();
      //
      // graphData.$promise.then(addChart);
    },
    transclude: true,
    templateUrl: 'dashboard/widgets/barchartNg/template.html'
  };
}]);
