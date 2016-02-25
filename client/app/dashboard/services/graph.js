var services = angular.module('dashboardServices', ['ngResource']);

services.factory('ChartResource', ['$resource',
  function($resource){
    return {
      send:function (relativeUrl) {
        //relativeUrl = 'data/graph1.json';
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
        //relativeUrl = 'data/graph1.json';
        return $resource(relativeUrl, {})
      }
    };
  }
]);
