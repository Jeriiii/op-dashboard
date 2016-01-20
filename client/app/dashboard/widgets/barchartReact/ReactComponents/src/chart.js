var React = require('react');
var React = require('react-dom');
var React = require('react-native');

// Sloupcový graf
var Bars = React.createClass({
  getInitialState: function() {
    var opts = this.props.opts;
    var groups = createBarChartReact(elem, opts);

    return {opts: opts, groups: groups};
  },
  render: function() {
    var groups = this.state.groups.map(function(group) { //skupiny sloupců
      var bars = group.bars.map(function(bar) { //jednotlivé sloupce
        return (
          <li style={bar.style}>
            <span style={bar.span.style} title={bar.title}>
            </span>
          </li>
        );
      });

      var styles = group.style;
      return (
        <ul style={group.style}>
          {bars}
        </ul>
      );
    });

    return (
      <ul class="bar-chart bar-chart-ng" >
        {bars}
      </ul>
    );
  }
});

//grid - mříška (stupnice) grafu
var HelloComponent = React.createClass({
  propTypes: {
    fname : React.PropTypes.string.isRequired,
    lname : React.PropTypes.string.isRequired
  },
  componentDidMount: function() {
    correctOptsValReact(this.state.opts);
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
  ///////// https://github.com/facebook/react-native/issues/953
  measureWelcome() {
    this.refs.welcome.measure(this.logWelcomeLayout);
  },

  logWelcomeLayout(ox, oy, width, height, px, py) {
    console.log("ox: " + ox);
    console.log("oy: " + oy);
    console.log("width: " + width);
    console.log("height: " + height);
    console.log("px: " + px);
    console.log("py: " + py);
  },
  ////////
  render: function() {
    var lines = this.state.lines.map(function(line) {
      var styles = {bottom: line.toPerc};
      return (
        <hr style={styles} data-y={line.dataY} key={line.id} />
      );
    });
//<div><Bars opts={this.state.opts} /></div>
    return (
      <div>

        <div className="chart bar" ref="welcome">
          <div className="grid">
            {lines}
          </div>
        </div>
        <div onClick={this.measureWelcome}>
          <div>Measure it</div>
        </div>
      </div>
    );
  }
})
dashboardApp.value('HelloComponent', HelloComponent);
