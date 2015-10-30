// Příklad grafu pluginu highchart, který se dá vložit do vydgetu
dashboardApp.directive('linechart', ['JsonGraphRes', function(JsonGraphRes) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
    },
    link: function(scope, elem, attrs) {
      /* po http požadavku přidá graf */
      var addChart = function(chartData) {
        $.linechart({
          id: 'linechart-widget-demo',
          data: chartData.linechart
        });
      };

      var relativeUrl = attrs.relativeUrl; //např. 'data/graph1.json'
      var graphData = JsonGraphRes.send(relativeUrl).get();

      graphData.$promise.then(addChart);
    },
    transclude: true,
    templateUrl: 'dashboard/widgets/linechart/template.html'
  };
}]);
