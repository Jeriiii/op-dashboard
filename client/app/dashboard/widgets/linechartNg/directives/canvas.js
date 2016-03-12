/* Directiva pracující s canvasem. */
/**
 * Vrátí nastavení pluginu.
 */
var getOptions = function(o) {
  o = angular.extend({
      gridColor: '#555555',                   // Barva pozadí grafu
      gridFont: 'normal 11px Arial',          // Používané fonty v canvasu
      gridFontColor: '#222222',               // Barva písma v canvasu
      gridPaddingX: 30,                       // Horizontální rozestup mezi hodnotami (popisky os)
      gridPaddingY: 30,                       // Vertikální rozestup mezi hodnotami (popisky os)
      gridWidth: 1,                           // Šířka X nebo Y osy
      dotsHover: function(dot){},             // Funkce která se zavolá při najetí nad bod
      dotsWidth: 3,                           // Poloměr bodu
      linesColors: [['#CC3333'],['#3333CC']], // Barvy křivek
      linesWidth: 2,                          // Šířka křívky
      tooltipMarginX: 15,                     // Horizontální odsazení tooltipu od kurzoru při najetí nad bod
      tooltipMarginY: 15                      // Vertikální odsazení tooltipu od kurzoru při najetí nad bod
  }, o);

    o.mmXY = maxXYFn(o.data);

  return o;
};

/**
 * Nakreslí graf do cavasu.
 */
var linechartCanvas = function($scope, elem, options) {
    var o = getOptions(options);

    o.graph = {"width": elem.parent().width(), "height": elem.parent().height()};

    // Canvas size iso container
    var graph = elem;
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
  /* po http požadavku přidá graf */
  var addChart = function(chartData) {
    linechartCanvas($scope, elem, {
      data: chartData.linechart
    });
  };

  var relativeUrl = attrs.relativeUrl; //např. 'data/graph1.json'
  var graphData = JsonChartResource.send(relativeUrl).get();

  graphData.$promise.then(addChart);

}

/* Příklad grafu pluginu highchart, který se dá vložit do vydgetu */
dashboardApp.directive('linechartNgCanvas', ['JsonChartResource', function(JsonChartResource) {
  return {
    restrict: 'A',
    scope: {
    },
    link: function($scope, elem, attrs) {
      return linechartLink($scope, elem, attrs, JsonChartResource);
    },
    transclude: true
    }
}]);
