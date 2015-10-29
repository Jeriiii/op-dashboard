// Příklad grafu pluginu highchart, který se dá vložit do vydgetu
dashboardApp.directive('graphExample', ['GraphRes', function(GraphRes) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
    },
    link: function(scope, elem, attrs) {
      scope.chartConfig = {
          options: {
              chart: {
                  type: 'bar'
              }
          },
          series: [],
          title: {
              text: 'Hello'
          },

          loading: true
      };

      scope.addPoints = function () {
          var seriesArray = scope.chartConfig.series;
          var rndIdx = Math.floor(Math.random() * seriesArray.length);
          seriesArray[rndIdx].data = seriesArray[rndIdx].data.concat([1, 10, 20]);
      };

      scope.addSeries = function () {
          var rnd = []
          for (var i = 0; i < 10; i++) {
              rnd.push(Math.floor(Math.random() * 20) + 1)
          }
          scope.chartConfig.series.push({
              data: rnd
          })
      };

      /* přidá serii dat do grafu */
      var addSerie = function (result) {
        var dataArr = [];

        angular.forEach(result, function(value, key) {
          var val = value[1]; //data jsou v poli na indexu 1
          dataArr.push(val);
        });

        scope.chartConfig.series.push({
            name: "Testovací serie",
            data: dataArr
        });

        scope.chartConfig.loading = !scope.chartConfig.loading;
      };

      var removeAllSeries = function() {
          scope.chartConfig.series = [];
      };

      scope.removeRandomSeries = function () {
          var seriesArray = scope.chartConfig.series;
          var rndIdx = Math.floor(Math.random() * seriesArray.length);
          seriesArray.splice(rndIdx, 1);
      };

      scope.swapChartType = function () {
          if (this.chartConfig.options.chart.type === 'line') {
              this.chartConfig.options.chart.type = 'bar';
          } else {
              this.chartConfig.options.chart.type = 'line';
              this.chartConfig.options.chart.zoomType = 'x';
          }
      };

      scope.toggleLoading = function () {
          this.chartConfig.loading = !this.chartConfig.loading;
          removeAllSeries();

          var graphData = GraphRes.query();
          graphData.$promise.then(addSerie);

          this.chartConfig.loading = !this.chartConfig.loading;
      };

      /* načtení serie dat ze služby GraphRes */
      var relativeUrl = attrs.relativeUrl; //např. 'data/graph1.json'
      var graphData = GraphRes.send(relativeUrl).query();
      graphData.$promise.then(addSerie);
    },
    transclude: true,
    templateUrl: 'dashboard/widgets/graph/template.html'
  };
}]);
