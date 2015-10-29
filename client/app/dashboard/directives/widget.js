// Prázdný widget
dashboardApp.directive('widgetSimpleText', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
    },
    link: function(scope, elem, attrs) {
        scope.dbwTitle = attrs.dbwTitle;
        scope.dbwText = attrs.dbwText;

    },
    templateUrl: 'dashboard/templates/widget.html'
  };
});
