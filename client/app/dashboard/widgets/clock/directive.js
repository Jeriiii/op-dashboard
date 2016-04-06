// Widget pro hodiny
dashboardApp.directive('widgetClock', ['dateFilter', '$interval', function(dateFilter, $interval){
  return {
    restrict: 'E',
    replace: true,
    link: function(scope, element, attrs){
      var timer;

      scope.format = attrs.format;

      var updateTime = function(){
          var now = Date.now();

          element.html(dateFilter(now, scope.format));
          timer = $interval(updateTime, 1000);
      };

      scope.$on("$destroy", function( event ) {
        $timeout.cancel( timer );
      });

      updateTime();
    },
    templateUrl: 'dashboard/widgets/clock/template.html'
  };
}]);
