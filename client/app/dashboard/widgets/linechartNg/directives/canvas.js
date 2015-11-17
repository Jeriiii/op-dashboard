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
      dotsWidth: 2,                           // dots width (radius)
      linesColors: [['#CC3333'],['#3333CC']], // lines colors
      linesWidth: 2,                          // lines width
      tooltipMarginX: 15,                     // tooltip horizontal margin from cursor
      tooltipMarginY: 15                      // tooltip vertical margin from cursor
  }, o);

  return o;
};

/**
 * Vrátí maximální hodnotu Xové a Yové souřadnice.
 */
var maxXYFn = function(data) {
  // Return the max values in our data list
  var maxX = 0;
  var maxY = 0;
  for (j=0;j<data.length;j++)
  {
      for (i=0;i<data[j].length; i++)
      {
          if (data[j][i].X > maxX) maxX = data[j][i].X;
          if (data[j][i].Y > maxY) maxY = data[j][i].Y;
      }
      maxY += 10 - maxY % 10;
  }

  return {
    'X': maxX,
    'Y': maxY,
  };
};

/**
 * Inicializuje canvas.
 * @param {Element} graph Graf do kterého se má kreslit
 * @param {Object} o Nastavení pluginu.
 * @return {Canvas} Canvas grafu.
 */
var canvasInit = function(graph, o) {
  var c = graph[0].getContext('2d');
      c.strokeStyle = o.gridColor;
      c.fillStyle = o.gridFontColor;
      c.font = o.gridFont;
      //c.textAlign = "center";
      c.textAlign = "right"
      c.textBaseline = "middle";

      return c;
}

/**
 * Nakreslí osy X a Y
 * @param {Canvas} c Canvas grafu.
 * @return {Object} Nastavení pluginu.
 */
var drawAxises = function(c, o) {
  c.beginPath();
  c.moveTo(o.gridPaddingX, 0);
  c.lineTo(o.gridPaddingX, o.graph.height - o.gridPaddingY);
  c.lineTo(o.graph.width, o.graph.height - o.gridPaddingY);
  c.linesWidth = o.gridWidth;
  c.stroke();
}

/**
 * Vrátí X souřadnici bodu v grafu.
 * @param {Number} val Xová souřadnice.
 * @param {Object} o Nastavení pluginu.
 * @param {Object} maxXY Maximální souřednice X a Y pro tuto křivku
 * @return {Number} Xová souřadnice bodu v grafu v pixelech.
 */
var getPointX = function(val, o, maxXY){
  return (((o.graph.width - o.gridPaddingX) / (maxXY.X + 1)) * val + (o.gridPaddingX * 1.5));
};

/**
 * Vrátí Y souřadnici bodu v grafu.
 * @param {Number} val Xová souřadnice.
 * @param {Object} o Nastavení pluginu.
 * @param {Object} maxXY Maximální souřednice X a Y pro tuto křivku
 * @return {Number} Yová souřadnice bodu v grafu v pixelech.
 */
var getPointY = function(val, o, maxXY){
  return (o.graph.height - (((o.graph.height - o.gridPaddingY) / maxXY.Y) * val) - o.gridPaddingY);
};

/**
 * Nakreslí graf do cavasu.
 */
var linechartCanvas = function($scope, elem, options) {
    var o = getOptions(options);

    o.graph = {"width": 452, "height": 155};

    // Canvas size iso container
    var graph = elem;//$('> canvas', wrap);
    graph.attr('width',o.graph.width);
    graph.attr('height',o.graph.height);

    var c = canvasInit(graph, o);
    drawAxises(c, o);

    var maxXY = maxXYFn(o.data);

    // Draw the X value texts
    for (i=0;i<=maxXY.X;i++)
        c.fillText(i, getPointX(i, o, maxXY), o.graph.height - o.gridPaddingY + 20);

    // Draw the Y value texts
    for (i=0;i<maxXY.Y;i+= 10)
        c.fillText(i, o.gridPaddingX - 10, getPointY(i, o, maxXY));

    for (j=0;j<o.data.length;j++)
    {
        // Add position properties to the dots
        for (i=0;i<o.data[j].length;i++)
        angular.extend(o.data[j][i],{
            posX: getPointX(o.data[j][i].X, o, maxXY),
            posY: getPointY(o.data[j][i].Y, o, maxXY),
            rXr: 16
        });

        // Draw the line graph
        var lineColor = ((typeof o.linesColors[j] !== 'undefined')?o.linesColors[j]:'#000000');
        c.strokeStyle = lineColor;
        console.log(c.strokeStyle);
        c.beginPath();
        c.moveTo(o.data[j][0].posX, o.data[j][0].posY);
        for (i=1;i<o.data[j].length;i++)
            c.lineTo(o.data[j][i].posX, o.data[j][i].posY);
        c.linesWidth = o.linesWidth;
        c.stroke();

        // Draw the dots
        c.fillStyle = lineColor;//o.dotsColor;
        for (i=0;i<o.data[j].length;i++){
            c.beginPath();
            c.arc(o.data[j][i].posX, o.data[j][i].posY, o.dotsWidth + 0.5, 0, Math.PI * 2, true);
            c.fill();
        }
    }

    // Dots click function
    var dotClick = false;
    graph.click(function(){
        if (dotClick)
            o.dotsClick(dotClick);
    });

    return graph;
};


// Příklad grafu pluginu highchart, který se dá vložit do vydgetu
dashboardApp.directive('linechartAngCanvas', ['JsonGraphRes', function(JsonGraphRes) {
  return {
    restrict: 'A',
    // replace: true,
    scope: {
    },
    link: function($scope, elem, attrs) {
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
      var graphData = JsonGraphRes.send(relativeUrl).get();

      graphData.$promise.then(addChart);
    },
    transclude: true,
    // templateUrl: 'dashboard/widgets/linechartAng/template.html'
  };
}]);
