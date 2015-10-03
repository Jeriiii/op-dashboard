// Widget pro hodiny
dashboardApp.directive('widgetClock', ['dateFilter', '$timeout', function(dateFilter, $timeout){
  return {
    restrict: 'E',
    replace: true,
    link: function(scope, element, attrs){
      console.log('clock');

      scope.format = attrs.format;

      var updateTime = function(){
          var now = Date.now();

          element.html(dateFilter(now, scope.format));
          $timeout(updateTime, now % 1000);
      };

      updateTime();
    },
    templateUrl: 'dashboard/widgets/clock/template.html'
  };
}]);
