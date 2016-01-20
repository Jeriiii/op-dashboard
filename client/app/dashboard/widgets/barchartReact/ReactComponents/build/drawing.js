/*******************************************************************************/
/***********************  kreslení sloupců grafu *******************************/
/*******************************************************************************/

/**
 * Vytvoří HTML element = jeden sloupec
 * @param {integer} percent Procentuální výška sloupce oproti velikosti widgetu.
 * @param {integer} barWrapperWidth Prostor pro jeden sloupec - kolik má místa na šířku + margin + padding.
 * @param {integer} chartHeight Výška celého grafu.
 */
var createBarElementReact = function (percent, barWrapperWidth, chartHeight) {
  var li = {};

  var barWidth = barWrapperWidth / 5 * 3; // 3/4 prostoru pro sloupec bude jeho sirka
  var barMargin = barWrapperWidth / 5 * 2; // 1/4 prostoru pro sloupec bude jeho okraj

  li.style = { "height": chartHeight + "px" };
  li.span = {};
  li.span.style = {
    "height": percent + "%",
    "width": barWidth + "px",
    "margin": " 0 " + barMargin / 2 + "px" // /2 = půl marginu z leva a pul z prava
  };

  return li;
};

/**
 * Vytvoří uzávěr a vrátí funkci pro vytvoření jednoho sloupce. Díky uzávěru
 * může být tato fce použita ve fci each a přitom pracovat s dalšími daty
 * jako je např. šířka sloupce barWidth.
 * @param {object} opts Nastavení pluginu.
 * @param {array} bars Sloupce ve skupině.
 */
var createBarReact = function (opts, bars) {
  var barWidth = opts.barWidth;
  var unit = opts.unit;
  var max = opts.max;

  if (!unit) unit = "%";

  return function (val, index) {
    var percent = val / max * 100;

    var li = createBarElementReact(percent, barWidth, opts.chartHeight);
    li.title = val + unit;

    bars.push(li);
  };
};

/**
 * Vytvoří jednotlivé sloupce v každé skupině sloupců.
 * @param {array} barsData Data která se mají vykreslit so sloupců.
 * @param {object} opts Nastavení pluginu.
 */
var createBarsReact = function (barsData, opts) {
  var bars = [];

  //angular.forEach(barsData, createBarReact(opts, bars));

  barsData.forEach(createBarReact(opts, bars));

  return bars;
};

/**
 * Vytvoří skupiny sloupců. V každé skupině se pak porovnávají data od různých zdrojů (např. data různých společností).
 * @param {object} data Data pro skupiny sloupců ve formátu [[x1, x2], [y1, y2], [z1, z2]]
 * @param {object} opts Nastavení pluginu.
 * @param {element} node Element direktivy předaný angularem.
 * @return {array} Skupiny sloupců. V každé skupině se pak porovnávají data od různých zdrojů (např. data různých společností).
 */
var createGroupsBarsReact = function (data, opts, node) {
  opts.chartHeight = node.innerHeight(); //výška celého grafu

  /* Vypočítá univerzální šířky skupin */
  var gWrapperWidth = opts.parentWidth / opts.countGroups; //šířka kterou může zabrat jedna skupina sloupců
  var gWidth = gWrapperWidth / 3 * 2;
  var gMargin = gWrapperWidth / 3 * 1;
  opts.barWidth = gWidth / opts.maxBarsInGroup;

  var groups = [];

  for (i = 0; i < data.length; i++) {
    var group = {};
    group.bars = createBarsReact(data[i], opts);
    group.styles = { 'width': gWidth + 'px', 'margin:': '0 ' + gMargin / 2 + ' px;' };

    groups.push(group);
  }

  return groups;
};

/**
 * Vytvoří sloupcový graf.
 * @param {element} node Element direktivy předaný angularem, ve kterém se má vytvořit graf.
 * @param {object} opts Nastavení pluginu.
 * @param {element} node Element direktivy předaný angularem.
 * @return {array} Skupiny sloupců. V každé skupině se pak porovnávají data od různých zdrojů (např. data různých společností).
 */
var createBarChartReact = function (node, opts) {
  var data = opts.bars;
  var grid = opts.grid;
  opts.parentWidth = opts.nodeParent.width();
  node.width(opts.parentWidth);

  if (parseInt(grid, 10) === 0) node.css("background", "none");
  if (!data) return "No data to work with";

  var groups = createGroupsBarsReact(data, opts, node);
  return groups;
};