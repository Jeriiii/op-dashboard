/**
 * Zobrazí titulek u bodu v grafu.
 * @param {Object} o Nastavení pluginu.
 * @param {Object} dotHover Vlastnosti téhoto konkrétního bodu - např. tittle.
 * @param {integner} mouseX Xová souřadnice kurzoru.
 * @param {integner} mouseY Yová souřadnice kurzoru.
 * @param {scope} $scope
 */
var showDotTittle = function(o, dotHover, mouseX, mouseY, $scope) {
  $scope.thtml = dotHover.tip;
  // $scope.tooltip.css = '{"position": "absolute", ' +
  //     '"left": "' + (mouseX + o.tooltipMarginX) + '",' +
  //     '"top": "' + ( + o.tooltipMarginY) + '",' +
  //     '"display": "block",' +
  //     '"color": "red"}'
  // ;
  $scope.tcss = {
    "position": "absolute",
    "left": (mouseX + o.tooltipMarginX),
    "top": (mouseY + o.tooltipMarginY),
    'display': 'block',
    "color": "red"
  };
  o.dotsHover(dotHover);
  // console.log($scope.tooltip.html);
}

/**
 * Zobrazí titulek u bodu v grafu.
 * @param {Object} o Nastavení pluginu.
 * @param {scope} $scope
 */
var hideDotTittle = function(o, $scope) {
  // console.log(dotHover);
  $scope.thtml = '';
  $scope.tcss = 'position: static;' +
      'positionLeft: 0;' +
      'positionTop: 0;' +
      'display: none;'
  ;
}

/**
 * Najde v datech informace o tom bodu, nad kterým má právě uživatel kurzor.
 * @param {Object} o Nastavení pluginu.
 * @param {integner} mouseX Xová souřadnice kurzoru.
 * @param {integner} mouseY Yová souřadnice kurzoru.
 * @param {scope} $scope
 */
var findHoverDot = function(o, mouseX, mouseY, $scope) {
  for (j=0;j<o.data.length;j++)
      for (i=0;i<o.data[j].length;i++){
          if (typeof o.data[j][i].tip == 'string' && o.data[j][i].tip != '')
          {
              var dx = mouseX - o.data[j][i].posX;
              var dy = mouseY - o.data[j][i].posY;

              if (dx * dx + dy * dy < o.data[j][i].rXr)
                  return o.data[j][i];

          }
      }
}

/**
 * Nabinduje na tečky v grafu titulky, které se zobrazí při najetí myší.
 * @param {Object} o Nastavení pluginu.
 * @param {element} wrap Element nad kterým se direktiva spouští.
 * @param {scope} $scope
 */
var dotsHover = function(o, wrap, $scope) {
  // Dots click function
  var dotClick = false;

  //var wrapOffset = wrap.offset();
  wrapRect = wrap.offset(); //objekt TextRange, který zajišťuje zjištění relativní pozice k levému a hornímu rohu (asi předka?)

  //var tooltip = $('> div', wrap); //dodělat přes scope

  // Dots hover function
  wrap.bind("mousemove", function (e){
      var dotHover = false;

      mouseX = parseInt(e.clientX - wrapRect.left);
      mouseY = parseInt(e.clientY - wrapRect.top);

      dotHover = findHoverDot(o, mouseX, mouseY, $scope);

      if (dotHover){
          dotClick = dotHover;
          showDotTittle(o, dotHover, mouseX, mouseY, $scope);
      } else {
          dotClick = false;
          hideDotTittle(o, $scope);
      }
  });

  // graph.click(function(){
  //     if (dotClick)
  //         o.dotsClick(dotClick);
  // });
}

var linechartWarper = function($scope, elem, options) {
  var o = getOptions(options);

  $scope.tooltip = {'html': '', 'css': ''};
  o.graph = {"width": elem.parent().width(), "height": elem.parent().height()};
  var maxXY = maxXYFn(o.data);

  for (j=0;j<o.data.length;j++)
  {
    // Add position properties to the dots
    for (i=0;i<o.data[j].length;i++)
    angular.extend(o.data[j][i],{
        posX: getPointX(o.data[j][i].X, o, maxXY),
        posY: getPointY(o.data[j][i].Y, o, maxXY),
        rXr: 16
    });
  };

  // Container init
  var wrap = elem;
  dotsHover(o, wrap, $scope);
}

/** link fce této direktivy */
var linechartNgLink = function($scope, elem, attrs, JsonGraphRes) {
    var lineChartId = 'linechart-ang-widget-demo';

    /* funkce co smaže widget. V této fci se ještě dá udělat ošetření smazání, či vyhodit modal okno */
    var deleteWidget = function() {
      elem.remove();
      $scope.$broadcast('$destroy');
    };

    $scope.remove = deleteWidget;

    var addWarper = function(chartData) {
      linechartWarper($scope, elem, {
        id: lineChartId,
        data: chartData.linechart
      });
    };

    var relativeUrl = attrs.relativeUrl; //např. 'data/graph1.json'
    var graphData = JsonGraphRes.send(relativeUrl).get();

    graphData.$promise.then(addWarper);
};

// Prázdný widget
dashboardApp.directive('linechartNg', ['JsonGraphRes', function(JsonGraphRes) {
  return {
    restrict: 'E',
    //replace: true,
    scope: {
    },
    link: function($scope, elem, attrs) {
      return linechartNgLink($scope, elem, attrs, JsonGraphRes);
    },
    templateUrl: 'dashboard/widgets/linechartNg/templates/linechartNg.html',
    transclude: true
  };
}]);
