// Příklad grafu pluginu highchart, který se dá vložit do vydgetu
var hightChartLink = function(scope, elem, attrs, ChartResource) {
    scope.chartConfig = {
        options: {
            chart: {
                type: 'bar'
            }
        },
        series: [],
        title: {
            text: 'Název grafu'
        },

        loading: true
    };

    /* Přidá body do grafu */
    scope.addPoints = function () {
        var seriesArray = scope.chartConfig.series;
        var rndIdx = Math.floor(Math.random() * seriesArray.length);
        seriesArray[rndIdx].data = seriesArray[rndIdx].data.concat([1, 10, 20]);
    };

    /* Přidá řadu do grafu */
    scope.addSeries = function () {
        var rnd = []
        for (var i = 0; i < 10; i++) {
            rnd.push(Math.floor(Math.random() * 20) + 1)
        }
        scope.chartConfig.series.push({
            name: 'Vygenerovaná serie',
            data: rnd
        })
    };

    /* Přidá řadu ze spracovaného ajaxového požadavku */
    var addSerie = function (result) {
        var dataArr = [];


        angular.forEach(result.data, function(value, key) {
            var val = value.data; //data jsou v poli na indexu 1
            dataArr.push(val);
        });

        scope.chartConfig.series.push({
            name: result.serieName,
            data: dataArr
        });

        scope.chartConfig.loading = !scope.chartConfig.loading;
    };

    /* Odstraní všechny série */
    var removeAllSeries = function() {
        scope.chartConfig.series = [];
    };

    /* Odstraní náhobnou sérii */
    scope.removeRandomSeries = function () {
        var seriesArray = scope.chartConfig.series;
        var rndIdx = Math.floor(Math.random() * seriesArray.length);
        seriesArray.splice(rndIdx, 1);
    };

    /* Přepne mezi zobrazením sloupcového a spojnicoého grafu */
    scope.swapChartType = function () {
        if (this.chartConfig.options.chart.type === 'line') {
            this.chartConfig.options.chart.type = 'bar';
        } else {
            this.chartConfig.options.chart.type = 'line';
            this.chartConfig.options.chart.zoomType = 'x';
        }
    };

    /* Načte data ze serveru - vyvolá nový ajaxový požadavek */
    scope.update = function () {
        this.chartConfig.loading = !this.chartConfig.loading;
        removeAllSeries();

        var graphData = ChartResource.query();
        graphData.$promise.then(addSerie);

        this.chartConfig.loading = !this.chartConfig.loading;
    };

    /* načtení serie dat ze služby ChartResource */
    var relativeUrl = attrs.relativeUrl; //např. 'data/graph1.json'
    var graphData = ChartResource.send(relativeUrl).get();

    graphData.$promise.then(addSerie);
};

dashboardApp.directive('graphExample', ['ChartResource', function(ChartResource) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
    },
    link: function(scope, elem, attrs) {
        return hightChartLink(scope, elem, attrs, ChartResource);
    },
    transclude: true,
    templateUrl: 'dashboard/widgets/hightChart/template.html'
  };
}]);
