// Prázdný widget
dashboardApp.directive('widgetSimpleText', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
    },
    link: function(scope, elem, attrs) {
        scope.dbwText = attrs.dbwText;
        scope.escapeHtml = attrs.dbwEscapeHtml === 'true';
    },
    controller: function($scope, $sce) {
      $scope.toTrustedHTML = function( html ){
        return $sce.trustAsHtml( html );
      }
    },
    templateUrl: 'dashboard/widgets/simpleText/template.html'
  };
});
