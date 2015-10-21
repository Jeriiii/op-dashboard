// Příklad grafu pluginu highchart, který se dá vložit do vydgetu
dashboardApp.directive('linechart', ['GraphRes', function(GraphRes) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
    },
    link: function(scope, elem, attrs) {
      $.linechart({
        id: 'linechart-demo',
        data: [
            [
                {
                    X: 0,
                    Y: 54,
                    tip: '<a href="http://www.jqueryscript.net/tooltip/">Tooltip</a> HTML 1#1'
                }, {
                    X: 2,
                    Y: 28,
                    tip: 'Tooltip HTML 1#2'
                }, {
                    X: 3,
                    Y: 22,
                    tip: 'Tooltip HTML 1#3'
                }, {
                    X: 4,
                    Y: 34,
                    tip: 'Tooltip HTML 1#4'
                }, {
                    X: 5,
                    Y: 40,
                    tip: 'Tooltip HTML 1#5'
                }, {
                    X: 6,
                    Y: 80,
                    tip: 'Tooltip HTML 1#6'
                }, {
                    X: 7,
                    Y: 76,
                    tip: 'Tooltip HTML 1#7'
                }
            ], [
                {
                    X: 0,
                    Y: 12,
                    tip: 'Tooltip HTML 2#1'
                }, {
                    X: 1,
                    Y: 56,
                    tip: 'Tooltip HTML 2#2'
                }, {
                    X: 4,
                    Y: 42,
                    tip: 'Tooltip HTML 2#3'
                }, {
                    X: 5,
                    Y: 85,
                    tip: 'Tooltip HTML 2#4'
                }, {
                    X: 7,
                    Y: 68,
                    tip: 'Tooltip HTML 2#5'
                }, {
                    X: 8,
                    Y: 53,
                    tip: 'Tooltip HTML 2#6'
                }, {
                    X: 9,
                    Y: 96,
                    tip: 'Tooltip HTML 2#7'
                }
            ]
        ]
      });
    },
    transclude: true,
    templateUrl: 'dashboard/widgets/linechart/template.html'
  };
}]);
