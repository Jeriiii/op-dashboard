var services = angular.module('dashboardServices', ['ngResource']);

services.factory('GraphRes', ['$resource',
  function($resource){
    return {
      send:function (relativeUrl) {
        //relativeUrl = 'data/graph1.json';
        return $resource(relativeUrl, {},{
          query: {method:'GET', isArray:true}
        })
      }
    };
  }
]);
