/*******************************************************************************/
/***********************  kreslení sloupců grafu *******************************/
/*******************************************************************************/

 /**
  * Vytvoří HTML element = jeden sloupec
  * @param {element} li JQuery element - nový sloupec.
  * @param {element} title Popisek sloupce - zobrazený nad sloupcem.
  * @param {integer} percent Procentuální výška sloupce oproti velikosti widgetu.
  * @param {integer} barWrapperWidth Prostor pro jeden sloupec - kolik má místa na šířku + margin + padding.
  */
var createBarElement = function (li, title, percent, barWrapperWidth) {
  li.find("span").attr("title", title);

  var barWidth = barWrapperWidth / 5 * 3; // 3/4 prostoru pro sloupec bude jeho sirka
  var barMargin = barWrapperWidth / 5 * 2; // 1/4 prostoru pro sloupec bude jeho okraj
  li.find("span").attr(
    "style",
    "height:" + percent + "%;" +
    "width:" + barWidth + "px;" +
    "margin: 0 " +  barMargin / 2 + "px" // /2 = půl marginu z leva a pul z prava
    );
}

/**
 * Vytvoří uzávěr a vrátí funkci pro vytvoření jednoho sloupce. Díky uzávěru
 * může být tato fce použita ve fci each a přitom pracovat s dalšími daty
 * jako je např. šířka sloupce barWidth.
 * @param {object} opts Nastavení pluginu.
 * @param {element} lis JQuery element položky v seznamu, ze kterého se klonuje nový sloupec.
 * @param {element} ul JQuery element seznamu, do kterého se má přidat sloupec.
 */
var createBar = function(opts, lis, ul) {
  var barWidth = opts.width;
  var unit = opts.unit;
  var max = opts.max;

  if(!unit) unit = "%";

  return function(index, val) {
    var li = lis.clone();

    var title = val.name + ' ' + val.data + unit;
    var percent = (val.data/max) * 100;

    createBarElement(li, title, percent, barWidth);

    ul.append(li);
  }
}


 /**
  * Vytvoří jednotlivé sloupce v každé skupině sloupců.
  * @param {array} bars Data která se mají vykreslit so sloupců.
  * @param {object} opts Nastavení pluginu.
  * @param {element} uls JQuery element seznamu, ze kterého se klonuje.
  * @param {element} lis JQuery element položky v seznamu, ze kterého se klonuje.
  */
 var createBars = function(bars, opts, uls, lis) {
   var ul = uls.clone();

   $.each(bars, createBar(opts, lis, ul));

   return ul;
 };

/**
 * Vytvoří skupiny sloupců. V každé skupině se pak porovnávají data od různých zdrojů (např. data různých společností).
 * @param {object} barsData Data pro skupiny sloupců ve formátu [[x1, x2], [y1, y2], [z1, z2]]
 * @param {object} opts Nastavení pluginu.
 * @param {element} $node Element direktivy předaný angularem.
 */
var createGroupsBars = function(barsData, opts, $node) {
  var height = $node.height();

  /* Vytvoří jednu univerzální skupinu pro sloupce */
  var uls = $("<ul></ul>");

  var ulWrapperWidth = opts.parentWidth / (opts.countGroups); //šířka kterou může zabrat jedna skupina sloupců
  var ulWidth = ulWrapperWidth / 3 * 2;
  var ulMargin = ulWrapperWidth / 3 * 1;
  opts.ulWidth = ulWidth;

  uls.attr('style', 'width: ' + ulWidth +'px; margin: 0 ' + (ulMargin / 2) + 'px;');

  /* vytvoří univerzální sloupec */
  var lis = $("<li><span></span></li>").height(height);

  opts.width = ulWidth / opts.maxBarsInGroup;

  for (i = 0; i < barsData.length; i++){

    var ul = createBars(barsData[i], opts, uls, lis);
    $node.append(ul);
  }
};

/**
 * Odstraní všechny sloupce z grafu.
 * @param {element} $node Element direktivy předaný angularem.
 */
var removeBars = function($node) {
  $node.children().each(function() {
    var barsGroup = $(this);
    barsGroup.remove();
  });
}

/**
 * Test výkonosti jQuery změny dat pro jeden či více sloupců.
 * @param {element} $node Element direktivy předaný angularem.
 * @param {object} opts Nastavení pluginu.
 */
var testPerformance = function($node, opts) {
  setTimeout(function(){
    /* spuštění testu */
    console.log("*****************");
    console.log("Začíná test výkonnosti jQuery.");
    console.log("*****************");
    var timeAll = 0;

    /* test změny pouze tří hodnot za jiné hodnoty */
    timeAll = timeAll +  measuringTimeTester(function() {
      var barsTest1 = [
        [{"data":11, "name": "přihláš."},{"data":94, "name": "přijat."},{"data":88, "name": "zapsa."}],
        [{"data":121, "name": "přihláš."},{"data":7, "name": "přijat."},{"data":79, "name": "zapsa."}],
        [{"data":113, "name": "přihláš."},{"data":80, "name": "přijat."},{"data":55, "name": "zapsa."}]
      ];
      removeBars($node);
      createGroupsBars(barsTest1, opts, $node);
    }, 'změny pouze tří hodnot za jiné hodnoty');

    /*****************************************************************/
    /* test odstranění některých sloupců, zbytek ponechán beze změny */

    timeAll = timeAll +  measuringTimeTester(function() {
    var barsTest2 = [
      [{"data":11, "name": "přihláš."},{"data":88, "name": "zapsa."}],
      [{"data":121, "name": "přihláš."},{"data":7, "name": "přijat."}],
      [{"data":113, "name": "přihláš."},{"data":80, "name": "přijat."},{"data":55, "name": "zapsa."}]
    ];
      removeBars($node);
      createGroupsBars(barsTest2, opts, $node);
    }, 'odstranění některých sloupců, zbytek ponechán beze změny');

    /*****************************************************************/
    /* test vykreslení úplně jiné řady */
    timeAll = timeAll +  measuringTimeTester(function() {
      var barsTest3 = [
        [{"data":11, "name": "přihláš."},{"data":15, "name": "přijat."},{"data":25, "name": "zapsa."}],
        [{"data":33, "name": "přihláš."},{"data":66, "name": "přijat."},{"data":55, "name": "zapsa."}],
        [{"data":12, "name": "přihláš."},{"data":40, "name": "přijat."},{"data":20, "name": "zapsa."}]
      ];
      removeBars($node);
      createGroupsBars(barsTest3, opts, $node);
    }, 'vykreslení úplně jiné řady');

    /* ukončení testu testu */
    console.log("Končí test výkonnosti jQuery v čase " + timeAll + " ms");
  },
  opts.performanceStart.jquery);
};

/**
 * Pomocná metoda, která provede záznam času před spuštěním a po spuštění. Časy vypíše a spustí callback.
 * @param callback Callback, jehož časy se mají měřit.
 * @param testMessage Zpráva, která se má před spuštěním vypsat.
 * @returns {time} Doba trvání testu.
 */
var measuringTimeTester = function(callback, testMessage) {
  var time; var start;

  console.log("Začíná test " + testMessage + ".");
  start = new Date().getTime();

  callback();

  time = new Date().getTime() - start;
  console.log("Doba trvání " + time + " ms");
  console.log("-----------------");

  return time;
};

/**
 * Vytvoří sloupcový graf.
 * @param {element} node Element direktivy předaný angularem, ve kterém se má vytvořit graf.
 * @param {object} opts Nastavení pluginu.
 */
var createBarChart = function(node, opts){
  var barsData = opts.bars;
  var grid = opts.grid;
  opts.parentWidth = opts.nodeParent.width();

  node.width(opts.parentWidth);

  if(parseInt(grid,10) === 0) node.css("background", "none");
  if(!barsData) return("No data to work with");

  createGroupsBars(barsData, opts, node);

  if(opts.performanceTest == true) {
    testPerformance(node, opts);
  }
};
