/*
 * cssCharts v0.3.0
 * jquery plugin to create donut and bar charts with css
 * https://github.com/sultantarimo
 *
 * (c)2015 Sultan Tarimo - sultantarimo@me.com
 * Released under the MIT license
 */
(function($){
  $.fn.extend({
    cssCharts: function(opts) {
      var defs = {};
          opts =  $.extend(defs, opts);
      return this.each(function() {
          var _this = this;
          if(opts.type == "bar"){thychart.bar(this, opts);}
          else if(opts.type == "line"){thychart.line(this, opts);}
          else if(opts.type == "donut"){thychart.donut(this, opts);}
          else if(opts.type == "pie"){thychart.pie(this, opts);}
          else{$(this).parent().hide();}
      });
    }
  });

var thychart = {
  pie: function(node, opts){
    var makeSVG = function(tag, attrs, val, title, i, fill) {
      var $el = $(document.createElementNS('http://www.w3.org/2000/svg', tag));
      var $g = $(document.createElementNS('http://www.w3.org/2000/svg', "g"));

      var $rep = $('<li><i></i><p></p></li>');
          $rep.find("p").html(title+": " + val);
          $rep.find("i").css({background: fill});

          $chart.find("."+$leg.attr("class")).append($rep);

      for (var k in attrs){
          $el.attr(k,attrs[k]).attr("data-val", val).attr("data-title",title).attr("id","path"+i).attr("class","path");
          $g.append($el).attr("id","pathCont"+i).attr("class","pathCont");
      }
      return $g[0];
    };

    var drawArcs = function($svg, pieData){
      var titles = [];
      var values = [];

      $.each(pieData, function(index, value) {
          values.push(value[1]);
          titles.push(value[0]);
      });

          pieData = values;

      var total = pieData.reduce(function (accu, that) { return that + accu; }, 0);
      var sectorAngleArr = pieData.map(function (v) { return 360 * v / total; });

      var startAngle = -90; // from the top instead of side
      var endAngle = -90;
      for (var i=0; i<sectorAngleArr.length; i++){
          startAngle = endAngle;
          endAngle = startAngle + sectorAngleArr[i];

          var x1,x2,y1,y2 ;

          x1 = parseInt(Math.round(200 + 195*Math.cos(Math.PI*startAngle/180)));
          y1 = parseInt(Math.round(200 + 195*Math.sin(Math.PI*startAngle/180)));

          x2 = parseInt(Math.round(200 + 195*Math.cos(Math.PI*endAngle/180)));
          y2 = parseInt(Math.round(200 + 195*Math.sin(Math.PI*endAngle/180)));

          var d = "M200,200  L" + x1 + "," + y1 + "  A195,195 0 " +
                  ((endAngle-startAngle > 180) ? 1 : 0) + ",1 " + x2 + "," + y2 + " z";

          var rand = function(min, max) {
              return parseInt(Math.random() * (max-min+1), 10) + min;
          };

          var getColor = function () {
            var color;

            if(colorSet) {
              color = (colorSet[i]);
            }
            else{
              var h = rand(10, 60); // color hue between 0° and 360°
              var s = rand(20, 100); // saturation 0-100%
              var l = rand(30, 60); // lightness 0-100%
              color = 'hsl(' + h + ',' + s + '%,' + l + '%)';
            }

            return color;
          };

          var c = parseInt(i / sectorAngleArr.length * 360);
          var fill = getColor();
          var arc = makeSVG("path", {d: d, fill: fill}, pieData[i], titles[i], i, fill);
          $svg.prepend(arc);
          $chart.prepend($svg);
      }
    };


    var $chart   = $(node);
    var dataSet  = $(node).attr("data-set");
    var colorSet  = $(node).attr("data-colors");
        if(colorSet){ colorSet = colorSet.split(","); }

    var val = JSON.parse(dataSet);

    var $svg = $('<svg viewBox="0 0 400 400" class="svg"></svg>');
    var $leg = $('<ul class="pie-legend"></ul>');
        $chart.append($leg);

        $chart.parent().addClass("pie");
        drawArcs($svg, val);

    var mPos = {x: -1,y: -1};

    var getMousePos = function(){
      var $tooltip = $('<div class="charts-tip"></div>');

      $chart.mousemove(function(e) {
          mPos.x = e.pageX;
          mPos.y = e.pageY;
          var $target = $(e.target).clone();
          var $parent = $(e.target).parent().clone();

          var $last = $chart.find(".pathCont:last-child .path:last-child");
          var val = $target.attr("data-val");
          var title = $target.attr("data-title");
          var _id = $target.attr("id");
          var color = $target.attr("fill");

          if(val){
            $tooltip.css({
              left: mPos.x,
              top: mPos.y
            });

            var setTooltip = function(){
              $("body").find("."+$tooltip.attr("class")).remove();
              $tooltip.html(title+": " + val);
              $("body").append($tooltip);
            }();

            if(color){ $(e.target).attr("stroke", color); }

            var setOrder = function(){
              var $lastId = $last.attr("id");
              var $targetId = $target.attr("id");

              if($lastId !== $targetId){
                $chart.find("#"+$target.attr("id")).parent().remove();
                $chart.find(".svg").append($parent);
              }
            }();
          }
      });

      $chart.mouseleave(function(e) {
        //  remove tooltip
        $("body").find("."+$tooltip.attr("class")).remove();
      });

    }();


  },
  donut: function(node, opts){
    var $chart   = $(node);
    var val      = $(node).attr("data-percent");
    var title    = $(node).attr("data-title");

        $chart.parent().addClass("donut");

    if(!title) title = "%";
    if(val > 1 || val < 0) return("between 0 - 1 please");

    var r        = 180;
    var c        = 360;

        val      = parseFloat(val).toFixed(2)*c;
    var $temp    = $('<div></div>').addClass("pie spinner");

    var $title   = $("<h2><p></p><span></span></h2>");
        $title.find("p").text(val/360*100);
        $title.find("span").text(title);

        $chart.on('show-donut-chart', function(){
          $title.find("p").text(0);
          $({countNum: $title.find("p").text()}).animate({countNum: val/360*100}, {
            duration: 500,
            easing:'linear',
            step: function() {
              $title.find("p").text(Math.floor(this.countNum));
            },
            complete: function() {
              $title.find("p").text(this.countNum);
            }
          });
          $chart.on('hide-donut-chart', function(){
            $title.find("p").text(0);
          });
        });

    $chart.append($title);

    var chart = {
      nodes: {
        spinner: function(){
          return $temp.clone().attr(
            "style",

            '-webkit-transform: rotate('+ chart.values.spinner +'deg);' +
            '-moz-transform: rotate('+ chart.values.spinner +'deg);' +
            'transform: rotate('+ chart.values.spinner +'deg);'
            );
        },
        mask: function(){
          return $temp.clone().addClass(chart.values.selector).attr(
            "style",

            '-webkit-transform: rotate('+ chart.values.mask + 'deg);' +
            '-moz-transform: rotate('+ chart.values.mask + 'deg);' +
            'transform: rotate('+ chart.values.mask + 'deg);'
            );
      }
      },
      values: {spinner: val, mask: c, selector: "" }
    };
    var prependNodes = function(data){
      $.each(data, function(i, _node) {$chart.prepend(_node());});
    };

    // IF LESS THAN 50%
    var chart$clone,val1,val2;

    if(val < r){
      val1 = val;

      chart$clone = jQuery.extend({}, chart);
      chart$clone.values.spinner = val1;
      chart$clone.values.selector = "mask";

      prependNodes(chart$clone.nodes);
    }
    // IF GREATER THAN 50%
    else{
      val2 = val - r;
      val1 = val - val2;
      val2 = val2 + r;

      chart$clone = jQuery.extend({}, chart);
      chart$clone.values.spinner = val1;
      chart$clone.values.mask = val2;

      prependNodes(chart$clone.nodes);
    }
  },

  bar: function(node, opts){
    var $node = $(node);

   $node.parent().addClass("bar");

    var data = opts.bars;
    var unit = opts.unit;
    var height = $node.height();
    var grid = opts.grid;
    var barWidth = opts.width;
    var max = opts.max;

    if(parseInt(grid,10) === 0) $node.css("background", "none");

    if(!data) return("No data to work with");
    if(!unit) unit = "%";

    // get max data point
    var maxData = function(){
      var arr = data;
      return Math.max.apply(Math, arr.map(function(i) { return i[0]; }));
    };

    // If "data-max" is not specified or if the heighest data-point is greater than data-max
    if(maxData() > max || !max){ max = maxData(); }

    //data = JSON.parse("[" + data + "]");
    data = [data];
    var barsNo = data[0].length;

    $.each(data, function(i, v) {
      // first dimension
      var uls = $("<ul></ul>");
      var lis = $("<li><span></span></li>").height(height);

      for (i = 0; i < data[0].length; i++){
        var ul = uls.clone();

        $.each(v[i], function(index, val) {
          // second dimension
          var li = lis.clone();

          var value = (data[0][i][index]);
          var title = value + unit;
          var percent = (value/max) * 100;

          li.find("span").attr("title", title);
          if(!barWidth){
            li.find("span").attr(
              "style",
              "height:" + percent + "%"
              );
          }else{
            li.find("span").attr(
              "style",
              "height:" + percent + "%;" +
              "width:" + barWidth + "px"
              );
          }
          ul.append(li);
        });

        $node.append(ul);
      }
    });

    var $grid = $("<div class='grid'></div>");
        $node.parent().append($grid);

    for(var i = 0; i <= 10; i++) {
      var toPerc = (i*10).toFixed(0);
      var converter = max/100;
      var toUnit = (toPerc * converter).toFixed(0);

      if(i % 2 === 0){
        var line = $("<hr/>").css({bottom: toPerc+"%"}).attr("data-y", toUnit + unit);
        $node.parent().find(".grid").append(line);
      }
    }

    $node.parent().width($node.width());
  }
};
})(jQuery);


// Příklad grafu pluginu highchart, který se dá vložit do vydgetu
dashboardApp.directive('csschart', ['JsonGraphRes', function(JsonGraphRes) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
    },
    link: function(scope, elem, attrs) {
      /* po http požadavku přidá graf */
      var addChart = function(chartData) {
        $('.bar-chart').cssCharts({
          type:"bar",
          bars: [[4,2],[4,5],[8,3],[4,2]],
          max:"8",
          unit:"k",
          grid:"1",
          width:"20"
        });
      };

      addChart();

      // var relativeUrl = attrs.relativeUrl; //např. 'data/graph1.json'
      // var graphData = JsonGraphRes.send(relativeUrl).get();
      //
      // graphData.$promise.then(addChart);
    },
    transclude: true,
    templateUrl: 'dashboard/widgets/barchart/template.html'
  };
}]);
