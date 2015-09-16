dashboardApp.directive('dbwGraph', ['GraphRes', function(GraphRes) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
    },
    link: function(scope, elem, attrs) {
        scope.graph = 'Toto je graf';
        var graphData = GraphRes.get(function(data){
          scope.graphName = data.name;
        });
    },
    transclude: true,
    templateUrl: 'dashboard/widgets/graph/template.html'
  };
}]);
