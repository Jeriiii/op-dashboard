// Příklad grafu pluginu highchart, který se dá vložit do vydgetu
dashboardApp.directive('barsChNg', ['JsonGraphRes', function(JsonGraphRes) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      opts: "@"
    },
    link: function(scope, elem, attrs) {

      alert(attrs.opts);
      opts = angular.fromJson(attrs.opts);
      /* po http požadavku přidá graf */
      var addChart = function(chartData) {
        console.log('addChart');
        //$('.bar-chart-ng').ngChart(attrs.opts);
        thychart.bar(elem, opts);
      };


      alert(opts.type);

      if(opts.type != undefined) {
        console.log('johoho');
        addChart();
      }

      // var relativeUrl = attrs.relativeUrl; //např. 'data/graph1.json'
      // var graphData = JsonGraphRes.send(relativeUrl).get();
      //
      // graphData.$promise.then(addChart);
    },
    transclude: true,
    templateUrl: 'dashboard/widgets/barchartNg/bars/bars.html'
  };
}]);
