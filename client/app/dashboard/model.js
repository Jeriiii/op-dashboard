/* direktivy - klasické */
var simpleText = {
  type: 'simpleText',
  settings: {
    tittle: 'Jednoduchý widget 1',
      text: 'Toto je opravdu jednoduchý dashboard 1 jen s textem <b>ahoj</b>',
      escapeHtml: false
  }
};

var clock = {
  type: 'clock',
  settings: {
    tittle: 'Hodiny',
    format: 'HH:mm:ss'
  }
};

var graph = {
  type: 'graph',
  settings: {
    tittle: 'Jednoduchý graf 2',
    relativeUrl: 'http://localhost/skola/op/dashboard-op/server/?type=hightchart'
  }
};

/* direktivy - grafy */
var csschart = {
  type: 'csschart',
  settings: {
    tittle: 'Csschart',
    relativeUrl: 'http://localhost/skola/op/dashboard-op/server/?type=barchart'
  }
};

var pieNg = {
  type: 'pieNg',
  settings: {
    tittle: 'Pie chart Ng',
    relativeUrl: 'http://localhost/skola/op/dashboard-op/server/?type=pie'
  }
};

var barchartJQ = {
  type: 'barchartJQ',
  settings: {
    tittle: 'Bar chart JQ',
    relativeUrl: 'http://localhost/skola/op/dashboard-op/server/?type=barchart'
  }
};

var barchartNg = {
  type: 'barchartNg',
  settings: {
    tittle: 'Bar chart ng',
    relativeUrl: 'http://localhost/skola/op/dashboard-op/server/?type=barchart'
    }
};

var barchartReact = {
  type: 'barchartReact',
  settings: {
    tittle: 'Bar chart React',
    relativeUrl: 'http://localhost/skola/op/dashboard-op/server/?type=barchart'
    }
};

var linechart = {
  type: 'linechart',
  settings: {
    tittle: 'Linechart',
    relativeUrl: 'http://localhost/skola/op/dashboard-op/server/?type=linechart'
    }
};

var linechartNg = {
type: 'linechart-ang',
settings: {
  tittle: 'Linechart Angular',
  relativeUrl: 'http://localhost/skola/op/dashboard-op/server/?type=linechart'
  }
};

var model = {
  widgets: [csschart, pieNg, barchartJQ, barchartNg, barchartReact, linechart, linechartNg,
    simpleText, clock, graph]
};

dashboardApp.value('dModel', model);
