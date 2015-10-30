// Příklad grafu pluginu highchart, který se dá vložit do vydgetu
dashboardApp.directive('linechart', ['JsonGraphRes', function(JsonGraphRes) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
    },
    link: function(scope, elem, attrs) {
      var addChart = function(result) {
        console.log(result.linechart);

        var chartData = [];

        $.linechart({
          id: 'linechart-widget-demo',
          data: result.linechart
        });
      };

      var relativeUrl = attrs.relativeUrl; //např. 'data/graph1.json'
      var graphData = JsonGraphRes.send(relativeUrl, false).get();

      graphData.$promise.then(addChart);
    },
    transclude: true,
    templateUrl: 'dashboard/widgets/linechart/template.html'
  };
}]);
