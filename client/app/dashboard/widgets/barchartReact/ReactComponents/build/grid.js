/*******************************************************************************/
/***********************  vykreslení mřížky gridu ******************************/
/*******************************************************************************/

/**
 * Vypočítá počet sloupců, který je v uvedených datech. Pokud je maximální počet
 * sloupců v nastavení menší, než je skutečný počet, opraví maximální počet na skutečný.
 * @param {object} opts Nastavení pluginu.
 */
var correctOptsValReact = function (opts) {
  var max = opts.max;

  var arr = opts.bars;
  var countBars = 0; // počet sloupců
  var maxBarsInGroup = 0; // maximální počet sloupců v jedné skupině
  var countGroups = 0; // počet skupin sloupců
  var maxVal = 0; // maximální hodnota (výška) sloupce

  for (i = 0; i < arr.length; i++) {
    var barsInGroup = 0;
    countGroups++;
    for (j = 0; j < arr[i].length; j++) {
      countBars++;
      barsInGroup++;
      if (maxVal < arr[i][j]) {
        maxVal = arr[i][j];
      }
    }

    if (barsInGroup > maxBarsInGroup) {
      maxBarsInGroup = barsInGroup;
    }
  }

  opts.countBars = countBars;
  opts.maxBarsInGroup = maxBarsInGroup;
  opts.countGroups = countGroups;
  opts.max = maxVal;
};

/**
 * Vytvoří mřížku na pozadí grafu.
 * @param {object} opts Nastavení pluginu.
 * @return Čáry gridu, co se mají vykreslit.
 */
var chartGridReact = function (opts) {
  var lines = [];

  for (var i = 0; i <= 10; i++) {
    var percent = i * 10;
    var converter = opts.max / 100;
    var toUnit = (percent * converter).toFixed(0);

    if (i % 2 === 0) {
      var line = { "toPerc": percent + "%", "dataY": toUnit + opts.unit, "id": i };

      lines.push(line);
    }
  }
  return lines;
  // node.width('100%');
};