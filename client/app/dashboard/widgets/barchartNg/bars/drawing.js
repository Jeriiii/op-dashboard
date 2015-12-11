/*
 * cssCharts v0.3.0
 * jquery plugin to create donut and bar charts with css
 * https://github.com/sultantarimo
 *
 * (c)2015 Sultan Tarimo - sultantarimo@me.com
 * Released under the MIT license
 */

  // $.fn.extend({
  //   ngChart: function(opts) {
  //     var defs = {};
  //         opts =  $.extend(defs, opts);
  //     return this.each(function() {
  //         var _this = this;
  //         if(opts.type == "bar"){thychart.bar(this, opts);}
  //         else{$(this).parent().hide();}
  //     });
  //   }
  // });

var thychart = {
  bar: function(node, opts){
    var $node = node;



    var data = opts.bars;
    var unit = opts.unit;
    var height = $node.height();
    var grid = opts.grid;
    var barWidth = opts.width;
    var max = opts.max;

    console.log('neco0');

    if(parseInt(grid,10) === 0) $node.css("background", "none");

    console.log(opts.type);

    if(!data) return("No data to work with");
    if(!unit) unit = "%";

    console.log('neco2');

    // get max data point
    var maxData = function(){
      var arr = data;
      return Math.max.apply(Math, arr.map(function(i) { return i[0]; }));
    };

    console.log('neco3');

    // If "data-max" is not specified or if the heighest data-point is greater than data-max
    if(maxData() > max || !max){ max = maxData(); }

    //data = JSON.parse("[" + data + "]");
    data = [data];
    var barsNo = data[0].length;

    console.log('neco4');

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

    opts.parentNode.width(node.width());
  }
};
