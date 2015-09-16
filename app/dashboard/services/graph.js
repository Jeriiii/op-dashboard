var services = angular.module('dashboardServices', ['ngResource']);

services.factory('GraphRes', ['$resource',
  function($resource){
    return $resource('data/graph1.json', {},{
        query: {method:'GET', isArray:true}
    });
  }
]);
