// Sloupcový graf
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

      var styles = group.style;
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

//Grid - mříška (stupnice) grafu
var BarchartReact = React.createClass({
  propTypes: {
    fname : React.PropTypes.string.isRequired,
    lname : React.PropTypes.string.isRequired
  },
  componentWillMount: function() {
    correctOptsValReact(this.state.opts);
  },
  componentDidMount: function() {

    //opts.chartHeight = node.innerHeight(); //výška celého grafu
  },
  getInitialState: function() {
    var opts = {
      bars: [[4,2,1,1],[4,5,2,1],[8,9,9,2],[4,4]],
      unit:"k",
      grid:"1"
    };
    correctOptsValReact(opts);
    var lines = chartGridReact(opts);

    return {opts: opts, lines: lines};
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
