dashboardApp.directive('dbwGraph', ['GraphRes', function(GraphRes) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
    },
    link: function(scope, elem, attrs) {
        var chart = new Highcharts.Chart({
          chart: {
            renderTo: 'container',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
          },
          title: {
            text: 'Browser market shares at a specific website, 2010'
          },
          tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage}%</b>',
            percentageDecimals: 1
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: true,
                color: '#000000',
                connectorColor: '#000000',
                formatter: function () {
                  return '<b>' + this.point.name + '</b>: ' + this.percentage + ' %';
                }
              }
            }
          },
          series: [{
            type: 'pie',
            name: 'Browser share',
            data: scope.items
          }]
      });
      scope.graph = 'Toto je graf';


      // angular.forEach(graphData, function(value, key) {
      //   chart.series[0].setData(value, true);
      // });
      // function(data){
      //   scope.graphName = data.name;
      //   scope.settings = data;
      //   chart.series[0].setData(data[0], true);
      // }
      scope.$watch("items", function (newValue) {
        chart.series[0].setData(newValue, true);
      }, true);

      var graphData = GraphRes.query();
      scope.items = graphData;
    },
    transclude: true,
    templateUrl: 'dashboard/widgets/graph/template.html'
  };
}]);
