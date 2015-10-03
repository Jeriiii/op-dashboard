'use strict';

dashboardApp.config(function(dashboardModelProvider){
  var model = {
    widgets: [
      {
        type: 'simpleText',
        settings: {
          tittle: 'Jednoduchý dashboard 1',
          text: 'Toto je opravdu jednoduchý dashboard 1 jen s textem'
        }
      },
      {
        type: 'simpleText',
        settings: {
          tittle: 'Jednoduchý dashboard 2',
          text: 'Toto je opravdu jednoduchý dashboard 2 jen s textem'
        }
      },
      {
        type: 'graph',
        settings: {
          tittle: 'Jednoduchý graf 2',
          relativeUrl: 'data/graph1.json'
        }
      }
    ]
  };

  dashboardModelProvider.setModel(model);
});
