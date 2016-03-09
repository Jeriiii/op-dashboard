/********************** funkce pro kreslení v canvasu  a práci se souřadnicemi**************************/

/**
 * Vrátí minimální a maximální hodnotu Xové a Yové souřadnice.
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
      //c.textAlign = "center";
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
  c.fillStyle = dotsColor;//o.dotsColor;
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
      // Add position properties to the dots
      for (i=0;i<o.data[j].length;i++)
      angular.extend(o.data[j][i],{
          posX: getPointX(o.data[j][i].X, o),
          posY: getPointY(o.data[j][i].Y, o),
          rXr: 16
      });

      // Draw the line graph
      var lineColor = drawLine(c, o);

      // Draw the dots
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
    for (i= mmXY.minX;i<=mmXY.maxX;i++)
        c.fillText(i, getPointX(i, o), o.graph.height - o.gridPaddingY + 20);

    /* Nakreslí popisky Yových os*/
    for (j=mmXY.minY;j<mmXY.maxY;j+= 10)
        c.fillText(j, o.gridPaddingX - 10, getPointY(j, o));

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

    var pointX = ((graphWidth / maxValue) * val + (o.gridPaddingX * 1.5));

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
