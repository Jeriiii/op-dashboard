// Obalovací widget
dashboardApp.directive('widgetBase', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
    },
    link: function(scope, elem, attrs) {
        scope.dbwTitle = attrs.dbwTitle;

        /* Funkce co smaže widget.*/
        var deleteWidget = function() {
          elem.remove();
          scope.$broadcast('$destroy');
        };

        scope.remove = deleteWidget;
    },
    templateUrl: 'dashboard/widgets/baseWidget/template.html',
    transclude: true
  };
});
