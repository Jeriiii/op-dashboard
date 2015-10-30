// Widget pro hodiny
dashboardApp.directive('widgetClock', ['dateFilter', '$timeout', function(dateFilter, $timeout){
  return {
    restrict: 'E',
    replace: true,
    link: function(scope, element, attrs){
      var timer;

      scope.format = attrs.format;

      var updateTime = function(){
          var now = Date.now();

          element.html(dateFilter(now, scope.format));
          timer = $timeout(updateTime, now % 1000);
      };

      scope.$on("$destroy", function( event ) {
        $timeout.cancel( timer );
      });

      updateTime();
    },
    templateUrl: 'dashboard/widgets/clock/template.html'
  };
}]);
