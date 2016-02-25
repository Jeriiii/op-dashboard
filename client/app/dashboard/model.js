/* direktivy - klasické */
var simpleText = {
  type: 'simpleText',
  settings: {
    tittle: 'Informační widget',
      text: 'Toto je opravdu jednoduchý informační widget s <b>vypnutým</b> escapováním. <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/AngularJS_logo.svg/2000px-AngularJS_logo.svg.png" width="300px">',
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
    tittle: 'Hightchart',
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

var testBarchartJQ = {
  type: barchartJQ.type,
  settings: {tittle: barchartJQ.settings.tittle, relativeUrl:  barchartJQ.settings.relativeUrl + '-test'}
};

var testBarchartNg = {
  type: barchartNg.type,
  settings: {tittle: barchartNg.settings.tittle, relativeUrl:  barchartNg.settings.relativeUrl + '-test'}
};

var model = {
  baseWidgets: {
    widgets: [simpleText, clock, graph],
    dynamicAdd: true
  },
  allCharts: {
    widgets: [csschart, pieNg, barchartJQ, barchartNg, barchartReact, linechart, linechartNg]
  },
  performanceWidgets: {
    widgets: [testBarchartJQ, testBarchartNg]
  },

  barchartJQ: {
    widgets: [barchartJQ]
  },
  barchartNg: {
    widgets: [barchartNg]
  },
  barchartReact: {
    widgets: [barchartReact]
  }

};

dashboardApp.value('dModel', model);
