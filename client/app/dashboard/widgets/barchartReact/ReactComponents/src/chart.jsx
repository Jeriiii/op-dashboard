// Sloupcový graf - bez mřížky, pouze sloupce
var Bars = React.createClass({
  getInitialState: function() {
    return {
      opts: this.props.opts,
      groups: []
    };
  },
  componentDidMount: function() {
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
  render: function() {
    var groups = this.state.groups.map(function(group) { //skupiny sloupců
      var bars = group.bars.map(function(bar) { //jednotlivé sloupce
        return (
          <li style={bar.style} key={bar.id}>
            <span style={bar.span.style} title={bar.title}>
            </span>
          </li>
        );
      });

      return (
        <ul style={group.style} key={group.id}>
          {bars}
        </ul>
      );
    });

    return (
      <ul className="bar-chart bars-react" >
        {groups}
      </ul>
    );
  }
});

//Celý sloupcový graf (Grid - mříška (stupnice) grafu + sloupce)
var BarchartReact = React.createClass({displayName: "BarchartReactClass",
  componentWillMount: function() {
    correctOptsValReact(this.state.opts);
  },
  getInitialState: function() {
    var opts = this.props.opts;
    correctOptsValReact(opts);
    var lines = chartGridReact(opts);

    return {opts: opts, lines: lines};
  },
  update: function() {
    console.log('react was updated');
  },
  render: function() {
    var lines = this.state.lines.map(function(line) {
      var styles = {bottom: line.toPerc};
      return (
        <hr style={styles} data-y={line.dataY} key={line.id} />
      );
    });

    return (
      <div className="chart-bars-react">
        <div><Bars opts={this.state.opts} /></div>
        <div className="chart bar" ref="welcome">
          <div className="grid">
            {lines}
          </div>
        </div>
      </div>
    );
  }
})
dashboardApp.value('BarchartReact', BarchartReact);
