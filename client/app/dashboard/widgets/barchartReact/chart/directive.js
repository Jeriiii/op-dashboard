// Sloupcový graf React

var barchartReact = function(reactDirective, JsonChartResource) {
  var reactDir = reactDirective('BarchartReact', ['opts']);

  var link = reactDir.link;

  reactDir.link = function(scope, elem, attrs) {
    var addChart = function(opts) {
      attrs.opts = function(){ //bohužel to musí být fce, aby to prošlo přes scope.$eval(attrs[propName]) v ngReact
        return opts;
      };

      link(scope, elem, attrs);
    };

    var relativeUrl = attrs.relativeUrl; //např. 'data/graph1.json'
    var graphData = JsonChartResource.send(relativeUrl).get();

    graphData.$promise.then(addChart);
  }

  return reactDir;
};
barchartReact.$inject = ['reactDirective', 'JsonChartResource'];

dashboardApp.directive('barchartReact', barchartReact);
