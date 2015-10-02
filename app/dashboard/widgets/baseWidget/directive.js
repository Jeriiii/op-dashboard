// Prázdný widget
dashboardApp.directive('widgetBase', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
    },
    link: function(scope, elem, attrs) {
        scope.dbwTitle = attrs.dbwTitle;

    },
    templateUrl: 'dashboard/widgets/baseWidget/template.html',
    transclude: true
  };
});
