var model = {
  widgets: [
    {
      type: 'linechart',
      settings: {
        tittle: 'Linechart',
        relativeUrl: 'data/graph1.json'
      }
    },
    {
      type: 'simpleText',
      settings: {
        tittle: 'Jednoduchý widget 1',
        text: 'Toto je opravdu jednoduchý dashboard 1 jen s textem <b>ahoj</b>',
        escapeHtml: false
      }
    },
    {
      type: 'clock',
      settings: {
        tittle: 'Hodiny',
        format: 'HH:mm:ss'
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
