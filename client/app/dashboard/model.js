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
    relativeUrl: '/server/?type=hightchart'
  }
};

/* direktivy - grafy */
var csschart = {
  type: 'csschart',
  settings: {
    tittle: 'Csschart',
    relativeUrl: '/server/?type=barchart'
  }
};

var pieNg = {
  type: 'pieNg',
  settings: {
    tittle: 'Věk studentů magisterského studia v roce 2015',
    relativeUrl: '/server/?type=pie'
  }
};

var barchartJQ = {
  type: 'barchartJQ',
  settings: {
    tittle: 'Přehled o přijimacím řízení 2013 / 2014 / 2015 JQ',
    relativeUrl: '/server/?type=barchart'
  }
};

var barchartNg = {
  type: 'barchartNg',
  settings: {
    tittle: 'Přehled o přijimacím řízení 2013 / 2014 / 2015 Ng',
    relativeUrl: '/server/?type=barchart'
    }
};

var barchartReact = {
  type: 'barchartReact',
  settings: {
    tittle: 'Přehled o přijimacím řízení 2013 / 2014 / 2015 React',
    relativeUrl: '/server/?type=barchart'
    }
};

var linechart = {
  type: 'linechart',
  settings: {
    tittle: 'Linechart',
    relativeUrl: '/server/?type=linechart'
    }
};

var linechartNg = {
type: 'linechart-ang',
settings: {
  tittle: 'Přihlášky na vysoké školy a počty přijatých uchazečů',
  relativeUrl: '/server/?type=linechart'
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
    widgets: [pieNg, barchartJQ, barchartNg, barchartReact, linechartNg]
  },
  aldAndNewCharts: { //porovnání starých a nových grafů
    widgets: [csschart, barchartNg, linechart, linechartNg]
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
  },
  widgets: {
    simpleText: simpleText, clock: clock, graph: graph, csschart: csschart,
    pieNg: pieNg, barchartJQ: barchartJQ, barchartNg: barchartNg,
    barchartReact: barchartReact, linechart: linechart, linechartNg: linechartNg
  }
};

dashboardApp.value('dModel', model);
