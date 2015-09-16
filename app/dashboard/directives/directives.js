dashboardApp.directive('dashboardWidget', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
    },
    link: function(scope, elem, attrs) {
        scope.phone = 'Samsung Galaxi';
        scope.abcDef = attrs.dbwTitle;
    },
    transclude: true,
    templateUrl: 'dashboard/templates/simpleTemplate.html'
  };
});
