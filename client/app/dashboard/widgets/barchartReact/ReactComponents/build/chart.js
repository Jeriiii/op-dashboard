var React = require('react');

// Sloupcový graf
var Bars = React.createClass({
  displayName: "Bars",

  getInitialState: function () {
    var opts = this.props.opts;
    var groups = createBarChartReact(elem, opts);

    return { opts: opts, groups: groups };
  },
  render: function () {
    var groups = this.state.groups.map(function (group) {
      //skupiny sloupců
      var bars = group.bars.map(function (bar) {
        //jednotlivé sloupce
        return React.createElement(
          "li",
          { style: bar.style },
          React.createElement("span", { style: bar.span.style, title: bar.title })
        );
      });

      var styles = group.style;
      return React.createElement(
        "ul",
        { style: group.style },
        bars
      );
    });

    return React.createElement(
      "ul",
      { "class": "bar-chart bar-chart-ng" },
      bars
    );
  }
});

//grid - mříška (stupnice) grafu
var HelloComponent = React.createClass({
  displayName: "HelloComponent",

  propTypes: {
    fname: React.PropTypes.string.isRequired,
    lname: React.PropTypes.string.isRequired
  },
  componentDidMount: function () {
    correctOptsValReact(this.state.opts);
  },
  getInitialState: function () {
    var opts = {
      bars: [[4, 2, 1, 1], [4, 5, 2, 1], [8, 9, 9, 2], [4, 4]],
      unit: "k",
      grid: "1"
    };
    correctOptsValReact(opts);
    var lines = chartGridReact(opts);

    return { opts: opts, lines: lines };
  },
  /////////
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
  render: function () {
    var lines = this.state.lines.map(function (line) {
      var styles = { bottom: line.toPerc };
      return React.createElement("hr", { style: styles, "data-y": line.dataY, key: line.id });
    });
    //<div><Bars opts={this.state.opts} /></div>
    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { className: "chart bar", ref: "welcome" },
        React.createElement(
          "div",
          { className: "grid" },
          lines
        )
      ),
      React.createElement(
        "div",
        { onClick: this.measureWelcome },
        React.createElement(
          "div",
          null,
          "Measure it"
        )
      )
    );
  }
});
dashboardApp.value('HelloComponent', HelloComponent);