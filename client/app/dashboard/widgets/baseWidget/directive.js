// Prázdný widget
dashboardApp.directive('widgetBase', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
    },
    link: function(scope, elem, attrs) {
        scope.dbwTitle = attrs.dbwTitle;

        /* funkce co smaže widget. V této fci se ještě dá udělat ošetření smazání, či vyhodit modal okno */
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
