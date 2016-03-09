/*******************************************************
    linechart | 1.0
********************************************************

    HTML line charts with canvas and Jquery.

    See sample at Github :
    https://github.com/damienvingrief/linechart

*******************************************************/
/* Vrátí nastavení s defaultními hodnotami */
var options = null;

/**
 * Vrátí nastavení pluginu.
 */
var getOptions = function(o) {
  // if(options != null) {
  //   return options;
  // }

  o = angular.extend({
      // Mandatory options
      id: '',                                 // id given to the chart
      data: [                                 // datas arrays
          [
            { X: 0, Y: 54, tip: 'Tooltip HTML 1#1' },
            { X: 2, Y: 28, tip: 'Tooltip HTML 1#2' },
            { X: 3, Y: 22, tip: 'Tooltip HTML 1#3' }
          ]
        ],
      // Other options
      gridColor: '#555555',                   // grid color
      gridFont: 'normal 11px Arial',          // grid texts font properties
      gridFontColor: '#333333',               // grid texts font color
      gridPaddingX: 30,                       // grid horizontal space between values
      gridPaddingY: 30,                       // grid vertical space between values
      gridWidth: 1,                           // grid width
      dotsHover: function(dot){},             // dots hover function
      dotsClick: function(dot){},             // dots click function
      dotsColor: '#333333',                   // dots color
      dotsWidth: 3,                           // dots width (radius)
      linesColors: [['#CC3333'],['#3333CC']], // lines colors
      linesWidth: 2,                          // lines width
      tooltipMarginX: 15,                     // tooltip horizontal margin from cursor
      tooltipMarginY: 15                      // tooltip vertical margin from cursor
  }, o);

  return o;
};

/**
 * Nakreslí graf do cavasu.
 */
var linechartCanvas = function($scope, elem, options) {
    var o = getOptions(options);

    o.mmXY = maxXYFn(o.data);
    o.graph = {"width": elem.parent().width(), "height": elem.parent().height()};

    // Canvas size iso container
    var graph = elem;//$('> canvas', wrap);
    graph.attr('width',o.graph.width);
    graph.attr('height',o.graph.height);

    var c = canvasInit(graph, o);
    drawAxises(c, o);

    drawAxisesValue(c, o);
    drawLines(c, o);

    return graph;
};

/** link fce této direktivy */
var linechartLink = function($scope, elem, attrs, JsonChartResource) {
  var lineChartId = 'linechart-ang-widget-demo';
  $scope.lineChartId = lineChartId;

  /* po http požadavku přidá graf */
  var addChart = function(chartData) {
    linechartCanvas($scope, elem, {
      id: lineChartId,
      data: chartData.linechart
    });
  };

  var relativeUrl = attrs.relativeUrl; //např. 'data/graph1.json'
  var graphData = JsonChartResource.send(relativeUrl).get();

  graphData.$promise.then(addChart);

}

// Příklad grafu pluginu highchart, který se dá vložit do vydgetu
dashboardApp.directive('linechartNgCanvas', ['JsonChartResource', function(JsonChartResource) {
  return {
    restrict: 'A',
    // replace: true,
    scope: {
    },
    link: function($scope, elem, attrs) {
      return linechartLink($scope, elem, attrs, JsonChartResource);
    },
    transclude: true,
    // templateUrl: 'dashboard/widgets/linechartAng/template.html'
    }
}]);
