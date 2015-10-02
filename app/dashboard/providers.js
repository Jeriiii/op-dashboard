'use strict';

dashboardApp.provider('dashboardModel', function() {
  var config = {
    model : {}
  };
  //var notifications = [];
  return {
    setModel : function(model) {
      config.model = model || config.model;
    },
    $get : function() {
      return {
        getModel:function () {
          return config.model;
        }
      };
    }
  };
});
