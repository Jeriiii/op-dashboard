/********************** funkce pro kreslení v canvasu  a práci se souřadnicemi**************************/

/**
 * Vrátí minimální a maximální hodnotu Xové a Yové souřadnice.
 * @param {object} data Data o křivkách v grafu.
 * @returns {object} Minimální a maximální hodnoty v grafu.
 */
var maxXYFn = function(data) {
    var maxX = 0;
    var maxY = 0;

    var minX = data[0][0].X;
    var minY = data[0][0].Y;

    for (j=0;j<data.length;j++)
    {
        for (i=0;i<data[j].length; i++)
        {
          if (data[j][i].X > maxX) maxX = data[j][i].X;
          if (data[j][i].Y > maxY) maxY = data[j][i].Y;

          if (data[j][i].X < minX) minX = data[j][i].X;
          if (data[j][i].Y < minY) minY = data[j][i].Y;
        }
        maxY += 10 - maxY % 10;
    }

    /* pokud je počátek souřadnic procentuálně hodně daleko od rozdílu */
    /* minimální a maximální hodnoty, nastaví se na ose poč. v minimální hodnotě grafu */
    var diffConstant = 2; //určuje, kdy se má použít poč. 0 a kdy poč. nejnižší zadaná hodnota
    if((diffConstant * (maxX - minX)) > (maxX - 0)) {
        minX = 0;
    }

    if((diffConstant * (maxY - minY)) > (maxY - 0)) {
        minY = 0;
    }

    return {
        'maxX': maxX,
        'maxY': maxY,
        'minX': minX,
        'minY': minY,
    };
};

/**
 * Inicializuje canvas.
 * @param {Element} graph Graf do kterého se má kreslit
 * @param {Object} o Nastavení pluginu.
 * @return {Canvas} Canvas grafu.
 */
var canvasInit = function(graph, o) {
  var c = graph[0].getContext('2d');
      c.strokeStyle = o.gridColor;
      c.fillStyle = o.gridFontColor;
      c.font = o.gridFont;
      c.textAlign = "right"
      c.textBaseline = "middle";

      return c;
}

/**
 * Nakreslí osy X a Y
 * @param {Canvas} c Canvas grafu.
 * @param {Object} o Nastavení pluginu.
 */
var drawAxises = function(c, o) {
  c.beginPath();
  c.moveTo(o.gridPaddingX, 0);
  c.lineTo(o.gridPaddingX, o.graph.height - o.gridPaddingY);
  c.lineTo(o.graph.width, o.graph.height - o.gridPaddingY);
  c.linesWidth = o.gridWidth;
  c.stroke();
}

/**
 * Nakreslí jednu křivku grafu.
 * @param {Canvas} c Canvas grafu.
 * @param {Object} o Nastavení pluginu.
 */
var drawLine = function(c, o, lineColor) {
  var lineColor = ((typeof o.linesColors[j] !== 'undefined')?o.linesColors[j]:'#000000');
  c.strokeStyle = lineColor;
  c.beginPath();
  c.moveTo(o.data[j][0].posX, o.data[j][0].posY);
  for (i=1;i<o.data[j].length;i++) {
     c.lineTo(o.data[j][i].posX, o.data[j][i].posY);
  }
  c.linesWidth = o.linesWidth;
  c.stroke();

  return lineColor;
}

/**
 * Nakreslí body v křivce grafu.
 * @param {Canvas} c Canvas grafu.
 * @param {Object} o Nastavení pluginu.
 * @param {string} dotsColor Barvy bodů.
 */
var drawDots = function(c, o, dotsColor) {
  c.fillStyle = dotsColor;
  for (i=0;i<o.data[j].length;i++){
      c.beginPath();
      c.arc(o.data[j][i].posX, o.data[j][i].posY, o.dotsWidth + 0.5, 0, Math.PI * 2, true);
      c.fill();
  }
}

/**
 * Nakreslí všechny křivky grafu.
 * @param {Canvas} c Canvas grafu.
 * @param {Object} o Nastavení pluginu.
 */
var drawLines = function(c, o) {
  for (j=0;j<o.data.length;j++)
  {
      var lineColor = drawLine(c, o);
      drawDots(c, o, lineColor);
  }
}

/**
 * Nakreslí popisky Xových a Yových .
 * @param {Canvas} c Canvas grafu.
 * @param {Object} o Nastavení pluginu.
 */
var drawAxisesValue = function(c, o) {
    var mmXY = o.mmXY;

    /* Nakreslí popisky Xových os*/
    for(var i = 0; i <= 10; i = i + 2) {
        var percent = i*10;
        var pointX = (mmXY.maxX - mmXY.minX)/100 * percent + mmXY.minX;

        c.fillText(pointX.toFixed(0) + o.unitX, getPointX(pointX, o) + 10, o.graph.height - o.gridPaddingY + 20);
    }

    /* Nakreslí popisky Yových os*/
    for(var i = 0; i <= 10; i = i + 2) {
        var percent = i*10;
        var corection = mmXY.maxY / 10;
        var pointY = (mmXY.maxY - mmXY.minY - corection)/100 * percent + mmXY.minY;

        c.fillText(pointY.toFixed(0) + o.unitY, o.gridPaddingX - 10, getPointY(pointY, o));
    }
}



/**
 * Vrátí X souřadnici bodu v grafu.
 * @param {Number} val Xová souřadnice.
 * @param {Object} o Nastavení pluginu.
 * @param {Object}  mmXY Minimální a maximální souřednice X a Y pro tuto křivku
 * @return {Number} Xová souřadnice bodu v grafu v pixelech.
 */
var getPointX = function(val, o){
    var mmXY = o.mmXY; //Minimální a maximální souřednice X a Y pro tuto křivku

    var graphWidth = o.graph.width - o.gridPaddingX;
    var maxValue = mmXY.maxX - mmXY.minX + 1;
    var val = val - mmXY.minX; //korekce hodnoty, aby nezačínala od nuly ale od nejnižší zadané hodnoty = 0

    var pointX = ((graphWidth / maxValue) * val + o.gridPaddingX);

    return pointX;
};

/**
 * Vrátí Y souřadnici bodu v grafu.
 * @param {Number} val Xová souřadnice.
 * @param {Object} o Nastavení pluginu.
 * @return {Number} Yová souřadnice bodu v grafu v pixelech.
 */
var getPointY = function(val, o){
    var mmXY = o.mmXY; //Minimální a maximální souřednice X a Y pro tuto křivku

    var graphHeight = o.graph.height - o.gridPaddingY;
    var maxValue = mmXY.maxY - mmXY.minY; //když nastavím mmXY.minY = 0, bude graf začínat od nuly
    var val = val - mmXY.minY; //korekce hodnoty, aby nezačínala od nuly ale od nejnižší zadané hodnoty = 0

    var pointY = (graphHeight - ((graphHeight / maxValue) * val));

    return pointY;
};
