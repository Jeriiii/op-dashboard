var model = {
  widgets: [
    {
      type: 'csschart',
      settings: {
        tittle: 'Csschart',
        relativeUrl: 'http://localhost/skola/op/dashboard-op/server/?type=csschart'
      }
    },
    {
      type: 'barchartNg',
      settings: {
        tittle: 'Bar chart ng',
        relativeUrl: 'http://localhost/skola/op/dashboard-op/server/?type=csschart'
      }
    },
    {
      type: 'linechart',
      settings: {
        tittle: 'Linechart',
        relativeUrl: 'http://localhost/skola/op/dashboard-op/server/?type=linechart'
      }
    },
    {
      type: 'linechart-ang',
      settings: {
        tittle: 'Linechart Angular',
        relativeUrl: 'http://localhost/skola/op/dashboard-op/server/?type=linechart'
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
        relativeUrl: 'http://localhost/skola/op/dashboard-op/server/?type=hightchart'
      }
    }
  ]
};
