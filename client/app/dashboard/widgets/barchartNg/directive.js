var chartGrid = function (node, opts) {
  var $grid = $("<div class='grid'></div>");
      node.append($grid);

  for(var i = 0; i <= 10; i++) {
    var toPerc = (i*10).toFixed(0);
    var converter = opts.max/100;
    var toUnit = (toPerc * converter).toFixed(0);

    if(i % 2 === 0){
      var line = $("<hr/>").css({bottom: toPerc+"%"}).attr("data-y", toUnit + opts.unit);
      node.find(".grid").append(line);
    }
  }

  node.width(400);
}

// Příklad grafu pluginu highchart, který se dá vložit do vydgetu
dashboardApp.directive('barchartNg', ['JsonGraphRes', function(JsonGraphRes) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
    },
    link: function(scope, elem, attrs) {
      var opts = {
        type:"bar",
        bars: [[4,2],[4,5],[8,3],[4,2]],
        max:"8",
        unit:"k",
        grid:"1",
        width:"20"
      };

      chartGrid(elem, opts);

      opts.nodeParent = elem;
      scope.opts = opts;



      // var relativeUrl = attrs.relativeUrl; //např. 'data/graph1.json'
      // var graphData = JsonGraphRes.send(relativeUrl).get();
      //
      // graphData.$promise.then(addChart);
    },
    transclude: true,
    templateUrl: 'dashboard/widgets/barchartNg/template.html'
  };
}]);
