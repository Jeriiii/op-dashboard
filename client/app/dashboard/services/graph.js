var services = angular.module('dashboardServices', ['ngResource']);

services.factory('ChartResource', ['$resource',
  function($resource){
    return {
      send:function (relativeUrl) {
        return $resource(relativeUrl, {},{
          query: {method:'GET', isArray: true}
        })
      }
    };
  }
]);

services.factory('JsonChartResource', ['$resource',
  function($resource){
    return {
      send:function (relativeUrl, isArray) {
        return $resource(relativeUrl, {})
      }
    };
  }
]);
