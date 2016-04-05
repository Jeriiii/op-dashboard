/* direktivy - klasické */
var simpleText = {
  type: 'simpleText',
  settings: {
    title: 'Informační widget',
      text: 'Toto je opravdu jednoduchý informační widget s <b>vypnutým</b> escapováním. <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/AngularJS_logo.svg/2000px-AngularJS_logo.svg.png" width="300px">',
      escapeHtml: false
  }
};

var clock = {
  type: 'clock',
  settings: {
    title: 'Hodiny',
    format: 'HH:mm:ss'
  }
};

var graph = {
  type: 'graph',
  settings: {
    title: 'Hightchart',
    relativeUrl: '/server/?type=hightchart'
  }
};

/* direktivy - grafy */
var csschart = {
  type: 'csschart',
  settings: {
    title: 'Csschart',
    relativeUrl: '/server/?type=barchart'
  }
};

var pieNg = {
  type: 'pieNg',
  settings: {
    title: 'Věk studentů magisterského studia v roce 2015',
    relativeUrl: '/server/?type=pie'
  }
};

var barchartJQ = {
  type: 'barchartJQ',
  settings: {
    title: 'Přehled o přijimacím řízení 2013 / 2014 / 2015 JQ',
    relativeUrl: '/server/?type=barchart'
  }
};

var barchartNg = {
  type: 'barchartNg',
  settings: {
    title: 'Přehled o přijimacím řízení 2013 / 2014 / 2015 Ng',
    relativeUrl: '/server/?type=barchart'
    }
};

var barchartReact = {
  type: 'barchartReact',
  settings: {
    title: 'Přehled o přijimacím řízení 2013 / 2014 / 2015 React',
    relativeUrl: '/server/?type=barchart'
    }
};

var linechart = {
  type: 'linechart',
  settings: {
    title: 'Linechart',
    relativeUrl: '/server/?type=linechart'
    }
};

var linechartNg = {
type: 'linechart-ang',
settings: {
  title: 'Přihlášky na vysoké školy a počty přijatých uchazečů',
  relativeUrl: '/server/?type=linechart'
  }
};

var testBarchartJQ = {
  type: barchartJQ.type,
  settings: {title: barchartJQ.settings.title, relativeUrl:  barchartJQ.settings.relativeUrl + '-test'}
};

var testBarchartNg = {
  type: barchartNg.type,
  settings: {title: barchartNg.settings.title, relativeUrl:  barchartNg.settings.relativeUrl + '-test'}
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
