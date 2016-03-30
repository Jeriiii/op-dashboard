/*******************************************************************************/
/***********************  vykreslení mřížky gridu ******************************/
/*******************************************************************************/

/**
 * Vypočítá počet sloupců, který je v uvedených datech. Pokud je maximální počet
 * sloupců v nastavení menší, než je skutečný počet, opraví maximální počet na skutečný.
 * @param {object} opts Nastavení pluginu.
 */
var correctOptsVal = function(opts) {
  var max = opts.max;

  var arr = opts.bars;
  var countBars = 0; // počet sloupců
  var maxBarsInGroup = 0; // maximální počet sloupců v jedné skupině
  var countGroups = 0; // počet skupin sloupců
  var maxVal = 0; // maximální hodnota (výška) sloupce

  for (i=0; i < arr.length; i++) {
    var barsInGroup = 0;
    countGroups++;
    for(j = 0; j < arr[i].length; j++) {
      countBars++;
      barsInGroup++;
      if(maxVal < arr[i][j].data) {
        maxVal = arr[i][j].data;
      }
    }

    if(barsInGroup > maxBarsInGroup) {maxBarsInGroup = barsInGroup;}
  }

  opts.countBars = countBars;
  opts.maxBarsInGroup = maxBarsInGroup;
  opts.countGroups = countGroups;
  opts.max = maxVal;
};

/**
 * Vytvoří mřížku na pozadí grafu.
 * @param {element} node Element direktivy předaný angularem, ve kterém se má vytvořit graf.
 * @param {object} opts Nastavení pluginu.
 */
var chartGrid = function (node, opts) {
  var $grid = $("<div class='grid'></div>");
      node.append($grid);

  for(var i = 0; i <= 10; i++) {
    var toPerc = (i*10).toFixed(0);
    var converter = opts.max/100;
    var toUnit = (toPerc * converter).toFixed(0);

    if(i % 2 === 0){
      var line = $("<hr/>").css({bottom: toPerc+"%"}).attr("data-y", toUnit + opts.unit);
      node.find(".grid").append(line);
    }
  }
  console.log(node);
  node.width('100%');
}
