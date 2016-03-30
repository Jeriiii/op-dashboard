var services = angular.module('dashboardServices', ['ngResource', 'dashboardApp']);

services.factory('ChartResource', ['$resource', 'wwwRoot',
  function($resource, wwwRoot){
    return {
      send:function (relativeUrl) {
        return $resource(wwwRoot + relativeUrl, {},{
          query: {method:'GET', isArray: true}
        })
      }
    };
  }
]);

services.factory('JsonChartResource', ['$resource', 'wwwRoot',
  function($resource, wwwRoot){
    return {
      send:function (relativeUrl, isArray) {
        return $resource(wwwRoot + relativeUrl, {})
      }
    };
  }
]);
