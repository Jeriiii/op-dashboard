// Sloupcový graf - bez mřížky, pouze sloupce
var Bars = React.createClass({
  displayName: 'Bars',

  getInitialState: function () {
    return {
      opts: this.props.opts,
      groups: []
    };
  },
  componentDidMount: function () {
    var opts = this.state.opts;

    var chartBarsReact = $('.chart-bars-react');
    var barsReact = chartBarsReact.find('bars-react');

    /* nastavení výšek a šířek grafu */
    opts.parentWidth = chartBarsReact.width();
    barsReact.width(opts.parentWidth);
    opts.chartHeight = chartBarsReact.height(); //výška celého grafu

    var groups = createBarChartReact(barsReact, opts);
    this.state.groups = groups;
  },
  render: function () {
    var groups = this.state.groups.map(function (group) {
      //skupiny sloupců
      var bars = group.bars.map(function (bar) {
        //jednotlivé sloupce
        return React.createElement(
          'li',
          { style: bar.style, key: bar.id },
          React.createElement('span', { style: bar.span.style, title: bar.title })
        );
      });

      var styles = group.style;
      return React.createElement(
        'ul',
        { style: group.style, key: group.id },
        bars
      );
    });

    return React.createElement(
      'ul',
      { className: 'bar-chart bars-react' },
      groups
    );
  }
});

//Celý sloupcový graf (Grid - mříška (stupnice) grafu + sloupce)
var BarchartReact = React.createClass({ displayName: "BarchartReactClass",
  componentWillMount: function () {
    correctOptsValReact(this.state.opts);
  },
  getInitialState: function () {
    var opts = this.props.opts;
    correctOptsValReact(opts);
    var lines = chartGridReact(opts);

    return { opts: opts, lines: lines };
  },
  update: function () {
    console.log('react was updated');
  },
  render: function () {
    var lines = this.state.lines.map(function (line) {
      var styles = { bottom: line.toPerc };
      return React.createElement('hr', { style: styles, 'data-y': line.dataY, key: line.id });
    });

    return React.createElement(
      'div',
      { className: 'chart-bars-react' },
      React.createElement(
        'div',
        null,
        React.createElement(Bars, { opts: this.state.opts })
      ),
      React.createElement(
        'div',
        { className: 'chart bar', ref: 'welcome' },
        React.createElement(
          'div',
          { className: 'grid' },
          lines
        )
      )
    );
  }
});
dashboardApp.value('BarchartReact', BarchartReact);

//var props = {
//  "bars": [[4,2,7,9],[4,5,2,1],[8,3,5,2],[4,2,2,4]],
//  "unit":"k",
//  "grid":"1"
//};
//ReactDOM.render(React.createElement(BarchartReact, props));