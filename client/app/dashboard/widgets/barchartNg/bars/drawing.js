/*
 * cssCharts v0.3.0
 * jquery plugin to create donut and bar charts with css
 * https://github.com/sultantarimo
 *
 * (c)2015 Sultan Tarimo - sultantarimo@me.com
 * Released under the MIT license
 */

 /**
  * Vytvoří jednotlivé sloupce v každé skupině sloupců.
  *
  */
 var createBars = function(data, opts, uls, lis) {
   var barWidth = opts.width;
   var ul = uls.clone();
   var unit = opts.unit;
   var max = opts.max;

   // get max data point
   var maxData = function(){
     var arr = data;
     return Math.max.apply(Math, arr.map(function(i) { return i[0]; }));
   };

   // If "data-max" is not specified or if the heighest data-point is greater than data-max
   if(maxData() > max || !max){ max = maxData(); }



   if(!unit) unit = "%";

   $.each([ 52, 97 ], function(index, val) {
     // second dimension
     var li = lis.clone();

     var value = (data[index]);
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

   return ul;
  }

/**
 * Vytvoří skupiny sloupců. V každé skupině se pak porovnávají data od různých zdrojů (např. data různých společností).
 * @param {object} data Data pro skupiny sloupců ve formátu [[x1, x2], [y1, y2], [z1, z2]]
 * @param {object} opts Nastavení pluginu.
 * @param {element} $node Element direktivy předaný angularem.
 */
var createGroupsBars = function(data, opts, $node) {
  var height = $node.height();

  var uls = $("<ul></ul>");
  var lis = $("<li><span></span></li>").height(height);

  for (i = 0; i < data.length; i++){

    var ul = createBars(data[i], opts, uls, lis);
    $node.append(ul);
  }
}

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
    var grid = opts.grid;

    if(parseInt(grid,10) === 0) $node.css("background", "none");

    if(!data) return("No data to work with");


    //data = JSON.parse("[" + data + "]");
    var barsNo = data[0].length;

    createGroupsBars(data, opts, $node);

    opts.nodeParent.width(node.width());
  }
};
