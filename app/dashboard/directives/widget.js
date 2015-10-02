// Prázdný widget
dashboardApp.directive('widget', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
    },
    link: function(scope, elem, attrs) {
        scope.dbwTitle = attrs.dbwTitle;
    },
    transclude: true,
    templateUrl: 'dashboard/templates/widget.html'
  };
});
