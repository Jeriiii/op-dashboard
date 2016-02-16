var model = {
  widgets: [
    {
      type: 'csschart',
      settings: {
        tittle: 'Csschart',
        relativeUrl: 'http://localhost/skola/op/dashboard-op/server/?type=barchart'
      }
    },
    {
      type: 'pieNg',
      settings: {
        tittle: 'Pie chart Ng',
        relativeUrl: 'http://localhost/skola/op/dashboard-op/server/?type=pie'
      }
    },
    {
      type: 'barchartJQ',
      settings: {
        tittle: 'Bar chart JQ',
        relativeUrl: 'http://localhost/skola/op/dashboard-op/server/?type=barchart'
      }
    },
    {
      type: 'barchartNg',
      settings: {
        tittle: 'Bar chart ng',
        relativeUrl: 'http://localhost/skola/op/dashboard-op/server/?type=barchart'
      }
    },
    {
      type: 'barchartReact',
      settings: {
        tittle: 'Bar chart React',
        relativeUrl: 'http://localhost/skola/op/dashboard-op/server/?type=barchart'
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
