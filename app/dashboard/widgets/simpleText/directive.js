// Prázdný widget
dashboardApp.directive('widgetSimpleText', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
    },
    link: function(scope, elem, attrs) {
        scope.dbwText = attrs.dbwText;

    },
    templateUrl: 'dashboard/widgets/simpleText/template.html'
  };
});
