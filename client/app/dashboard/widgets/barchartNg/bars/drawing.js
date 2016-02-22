/*******************************************************************************/
/***********************  kreslení sloupců grafu *******************************/
/*******************************************************************************/

 /**
  * Vytvoří HTML element = jeden sloupec
  * @param {integer} percent Procentuální výška sloupce oproti velikosti widgetu.
  * @param {integer} barWrapperWidth Prostor pro jeden sloupec - kolik má místa na šířku + margin + padding.
  * @param {integer} chartHeight Výška celého grafu.
  */
var createBarElementNg = function (percent, barWrapperWidth, chartHeight) {
  var li = {};

  var barWidth = barWrapperWidth / 5 * 3; // 3/4 prostoru pro sloupec bude jeho sirka
  var barMargin = barWrapperWidth / 5 * 2; // 1/4 prostoru pro sloupec bude jeho okraj

  li.style = {"height": chartHeight + "px",};
  li.span = {};
  li.span.style = {
    "height": percent + "%",
    "width": barWidth + "px",
    "margin":" 0 " +  barMargin / 2 + "px" // /2 = půl marginu z leva a pul z prava
  };

  return li;
}

/**
 * Vytvoří uzávěr a vrátí funkci pro vytvoření jednoho sloupce. Díky uzávěru
 * může být tato fce použita ve fci each a přitom pracovat s dalšími daty
 * jako je např. šířka sloupce barWidth.
 * @param {object} opts Nastavení pluginu.
 * @param {array} bars Sloupce ve skupině.
 */
var createBarNg = function(opts, bars) {
  var barWidth = opts.barWidth;
  var unit = opts.unit;
  var max = opts.max;

  if(!unit) unit = "%";

  return function(val, index) {
    var percent = (val/max) * 100;

    var li = createBarElementNg(percent, barWidth, opts.chartHeight);
    li.title = val + unit;

    bars.push(li);
  }
}

 /**
  * Vytvoří jednotlivé sloupce v každé skupině sloupců.
  * @param {array} barsData Data která se mají vykreslit so sloupců.
  * @param {object} opts Nastavení pluginu.
  */
 var createBarsNg = function(barsData, opts) {
   var bars = [];

   angular.forEach(barsData, createBarNg(opts, bars));

   return bars;
 };

/**
 * Vytvoří skupiny sloupců. V každé skupině se pak porovnávají data od různých zdrojů (např. data různých společností).
 * @param {scope} scope
 * @param {object} barsData Data pro skupiny sloupců ve formátu [[x1, x2], [y1, y2], [z1, z2]]
 * @param {object} opts Nastavení pluginu.
 * @param {element} node Element direktivy předaný angularem.
 */
var createGroupsBarsNg = function(scope, barsData, opts, node) {
  opts.chartHeight = node.innerHeight(); //výška celého grafu

  /* Vypočítá univerzální šířky skupin */
  var gWrapperWidth = opts.parentWidth / (opts.countGroups); //šířka kterou může zabrat jedna skupina sloupců
  var gWidth = gWrapperWidth / 3 * 2;
  var gMargin = gWrapperWidth / 3 * 1;
  opts.barWidth = gWidth / opts.maxBarsInGroup;

  var groups = [];

  for (i = 0; i < barsData.length; i++){
    var group = {};
    group.bars = createBarsNg(barsData[i], opts);
    group.styles = {'width': gWidth +'px', 'margin:': '0 ' + (gMargin / 2) + ' px;'};

    groups.push(group);
  }

  scope.groups = groups;
};

/**
 * Test výkonosti jQuery změny dat pro jeden či více sloupců.
 * @param {scope} scope
 * @param {service} $timeout
 * @param {element} $node Element direktivy předaný angularem.
 * @param {object} opts Nastavení pluginu.
 */
var testPerformanceNg = function(scope, $timeout, $node, opts) {
  $timeout(function(){
      /* spuštění testu */
      console.log("Začíná test výkonnosti angularu.");
      var start = new Date().getTime();

      /* test změny pouze tří hodnot za jiné hodnoty */
      var barsTest1 = [[3,2,7,9],[4,7,2,5],[8,3,5,2],[4,2,2,4]];
      createGroupsBarsNg(scope, barsTest1, opts, $node);
      scope.$digest();
      console.log(scope.groups);

      /* test odstranění některých sloupců, zbytek ponechán beze změny */
      var barsTest2 = [[4,2,],[4,5,2,1],[8,3],[4,2,2,4]];
            createGroupsBarsNg(scope, barsTest2, opts, $node);
      scope.$digest();
      console.log(scope.groups);

      /* test vykreslení úplně jiné řady */
      var barsTest3 = [[4,2,],[4,5,2,1],[8,3],[4,2,2,4]];
      createGroupsBarsNg(scope, barsTest3, opts, $node);
      scope.$digest();
      console.log(scope.groups);

      /* ukončení testu testu */
      var time = new Date().getTime() - start;
      console.log("Končí test výkonnosti angularu v čase " + time + " ms");
    },
    opts.performanceStart.angular);
};

/**
 * Vytvoří sloupcový graf.
 * @param {scope} scope
 * @param {service} $timeout
 * @param {element} node Element direktivy předaný angularem, ve kterém se má vytvořit graf.
 * @param {object} opts Nastavení pluginu.
 */
var createBarChartNg = function(scope, $timeout, node, opts){
  var barsData = opts.bars;
  var grid = opts.grid;
  opts.parentWidth = opts.nodeParent.width();
  node.width(opts.parentWidth);

  if(parseInt(grid,10) === 0) node.css("background", "none");
  if(!barsData) return("No data to work with");

  createGroupsBarsNg(scope, barsData, opts, node);

  if(opts.performanceTest == true) {
    testPerformanceNg(scope, $timeout, node, opts);
  }
};
